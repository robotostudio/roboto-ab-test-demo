'use server';
import { draftMode } from 'next/headers';
import { SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import {
  getAllSlugPagePathsQuery,
  getSlugPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import {
  GetAllSlugPagePathsQueryResult,
  GetSlugPageDataQueryResult,
} from '~/sanity.types';

export const getSlugPageData = async (slug: string) => {
  const { isEnabled } = draftMode();

  return await handleErrors(
    sanityServerFetch<GetSlugPageDataQueryResult>({
      query: getSlugPageDataQuery,
      params: { slug },
      tags: [SANITY_TAGS.slugPage, slug],
      preview: isEnabled,
    }),
  );
};

export const getAllSlugPagePaths = async () => {
  const [data, err] = await handleErrors(
    sanityServerFetch<GetAllSlugPagePathsQueryResult>({
      query: getAllSlugPagePathsQuery,
      tags: [SANITY_TAGS.slugPage],
    }),
  );
  if (!data || err) {
    return [];
  }
  const paths: { slug: string }[] = [];
  data.forEach((page) => {
    if (page?.slug) {
      const slugFragments = page.slug.split('/').filter(Boolean);
      if (slugFragments.length > 1) {
        const [, slug] = slugFragments;
        paths.push({
          slug,
        });
      } else {
        const [slug] = slugFragments;
        paths.push({
          slug,
        });
      }
    }
  });
  return paths;
};
