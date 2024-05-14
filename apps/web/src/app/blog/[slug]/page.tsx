import { Metadata } from 'next';
import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { BlogSlugPage } from '~/components/pages/blog-page';
import {
  cleanBlogSlug,
  getAllBlogsPaths,
  getBlogPageData,
} from '~/components/pages/blog-page/blog-page-api';
import { BlogSlugPageClient } from '~/components/pages/blog-page/blog-page-client';
import { getBlogPageDataQuery } from '~/lib/sanity/query';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllBlogsPaths();
  console.log('🚀 ~ generateStaticParams ~ slugs:', slugs);
  if (err || !Array.isArray(slugs)) return [];
  const paths: { slug: string }[] = [];
  slugs.forEach((page) => {
    const slug = page?.slug ? cleanBlogSlug(page.slug) : undefined;
    if (slug) {
      paths.push({ slug });
    }
  });
  console.log('🚀 ~ generateStaticParams ~ paths:', paths);
  return paths;
};

export const generateMetadata = async ({
  params,
}: PageParams<{ slug: string }>): Promise<Metadata> => {
  const [data, err] = await getBlogPageData(params.slug);
  if (!data || err) return {};
  return getMetaData(data);
};

export default async function SlugPage({
  params,
}: PageParams<{ slug: string }>) {
  const [data, err] = await getBlogPageData(params.slug);
  if (!data || err) return notFound();
  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <LiveQuery
        enabled
        initialData={data}
        query={getBlogPageDataQuery}
        params={{
          slug: `/blog/${params.slug}`,
        }}
        as={BlogSlugPageClient}
      >
        <BlogSlugPage data={data} />
      </LiveQuery>
    );
  }
  return <BlogSlugPage data={data} />;
}
