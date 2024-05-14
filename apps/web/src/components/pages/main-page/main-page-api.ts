import { draftMode } from 'next/headers';
import { SANITY_TAGS } from '~/config';
import { handleErrors } from '~/lib/helper';
import {
  getAllMainPageTranslationsQuery,
  getMainPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import {
  GetAllMainPageTranslationsQueryResult,
  GetMainPageDataQueryResult,
} from '~/sanity.types';

export const getMainPageData = async () => {
  const { isEnabled } = draftMode();
  return await handleErrors(
    sanityServerFetch<GetMainPageDataQueryResult>({
      query: getMainPageDataQuery,
      preview: isEnabled,
      tags: [SANITY_TAGS.mainPage],
    }),
  );
};

export const getAllMainPageTranslations = async () => {
  return await handleErrors(
    sanityServerFetch<GetAllMainPageTranslationsQueryResult>({
      query: getAllMainPageTranslationsQuery,
      tags: [SANITY_TAGS.mainPage],
    }),
  );
};
