import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogIndexPage } from '~/components/pages/blog-page';
import {
  getAllBlogIndexTranslations,
  getBlogIndexData,
} from '~/components/pages/blog-page/blog-page-api';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateMetadata = async (): Promise<Metadata> => {
  const [data, err] = await getBlogIndexData();
  if (!data || err) return {};
  const { seo } = data;
  if (!seo) return {};
  return getMetaData(seo);
};

export default async function BlogPage({ params }: PageParams) {
  const [data, err] = await getBlogIndexData();
  if (!data || err) return notFound();
  return <BlogIndexPage data={data} />;
}
