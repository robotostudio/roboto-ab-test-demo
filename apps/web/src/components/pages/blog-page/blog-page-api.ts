import { draftMode } from 'next/headers';
import { SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import {
  getAllBlogIndexTranslationsQuery,
  getAllBlogsPathsQuery,
  getBlogIndexDataQuery,
  getBlogPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import {
  GetAllBlogIndexTranslationsQueryResult,
  GetAllBlogsPathsQueryResult,
  GetBlogIndexDataQueryResult,
  GetBlogPageDataQueryResult,
} from '~/sanity.types';

export const cleanBlogSlug = (str: string) => {
  const arr = str.split('/');
  return arr[arr.length - 1];
};

export const getAllBlogsPaths = async () => {
  return await handleErrors(
    sanityServerFetch<GetAllBlogsPathsQueryResult>({
      query: getAllBlogsPathsQuery,
      tags: [SANITY_TAGS.blogs],
    }),
  );
};

export const getAllBlogIndexTranslations = async () => {
  return await handleErrors(
    sanityServerFetch<GetAllBlogIndexTranslationsQueryResult>({
      query: getAllBlogIndexTranslationsQuery,
      tags: [SANITY_TAGS.blogIndex],
    }),
  );
};

export const getBlogPageData = async (slug: string) => {
  const { isEnabled } = draftMode();

  return await handleErrors(
    sanityServerFetch<GetBlogPageDataQueryResult>({
      query: getBlogPageDataQuery,
      params: { slug: `/blog/${slug}` },
      preview: isEnabled,
      tags: [SANITY_TAGS.blogPage],
    }),
  );
};

export const getBlogIndexData = async () => {
  const { isEnabled } = draftMode();
  return await handleErrors(
    sanityServerFetch<GetBlogIndexDataQueryResult>({
      query: getBlogIndexDataQuery,
      preview: isEnabled,
      tags: [SANITY_TAGS.blogIndex],
    }),
  );
};
