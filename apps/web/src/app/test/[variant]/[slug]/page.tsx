import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getSlugPageData } from '~/components/pages/slug-page/slug-page-api';
import { SlugPageClient } from '~/components/pages/slug-page/slug-page-client';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import { SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import {
  abTestPageQuery,
  abTestQuery,
  getSlugPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import { AbTestPageQueryResult, AbTestQueryResult } from '~/sanity.types';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [res, err] = await handleErrors(
    sanityServerFetch<AbTestQueryResult>({
      query: abTestQuery,
      tags: [SANITY_TAGS.abTest, SANITY_TAGS.abTestIndex],
    }),
  );
  if (!res || err) return [];

  const paths: {
    slug: string;
    variant: string;
  }[] = [];

  res.forEach((test) => {
    const _variants = test.variants?.filter(Boolean) as string[];
    _variants.forEach((variant, index) => {
      const [slugFragments] = variant.split('/').filter(Boolean);
      if (slugFragments)
        paths.push({
          slug: slugFragments,
          variant: `${index}`,
        });
    });
  });
  return paths;
};

const pageToFetch = async (slug: string, variant: string) => {
  const { isEnabled } = draftMode();
  const filterVariant = Number(variant);
  const pageSlug = `/${slug}`;
  if (isEnabled) return pageSlug;
  if (isNaN(filterVariant)) return pageSlug;
  const [res, abError] = await handleErrors(
    sanityServerFetch<AbTestPageQueryResult>({
      query: abTestPageQuery,
      params: { slug: pageSlug },
      tags: [SANITY_TAGS.abTest, SANITY_TAGS.abTestIndex],
    }),
  );
  if (abError) return pageSlug;
  const finalSlug = res?.slugs?.at(filterVariant);
  if (!finalSlug) return pageSlug;
  return finalSlug;
};

const Page: FC<PageParams<{ slug: string; variant: string }>> = async ({
  params,
}) => {
  const { slug, variant } = params ?? {};
  const { isEnabled } = draftMode();
  const finalSlug = await pageToFetch(slug, variant);
  const [data, err] = await getSlugPageData(finalSlug);
  if (err || !data) return notFound();
  if (isEnabled) {
    return (
      <LiveQuery
        enabled
        initialData={data}
        query={getSlugPageDataQuery}
        params={{ slug: `/${slug}` }}
        as={SlugPageClient}
      >
        <SlugPage data={data} />
      </LiveQuery>
    );
  }
  return <SlugPage data={data} />;
};

export default Page;
