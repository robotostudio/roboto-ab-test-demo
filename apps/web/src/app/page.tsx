import { Metadata } from 'next';
import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { MainPageComponent } from '~/components/pages/main-page';
import { getMainPageData } from '~/components/pages/main-page/main-page-api';
import { MainPageComponentClient } from '~/components/pages/main-page/main-page-client';
import { getMainPageDataQuery } from '~/lib/sanity/query';

import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const [data, err] = await getMainPageData();
  if (!data || err) return {};
  return getMetaData(data);
};

export default async function Page({ params }: PageParams) {
  const [data, err] = await getMainPageData();
  if (!data || err) return notFound();

  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <LiveQuery
        enabled
        initialData={data}
        query={getMainPageDataQuery}
        as={MainPageComponentClient}
      >
        <MainPageComponent data={data} />
      </LiveQuery>
    );
  }

  return <MainPageComponent data={data} />;
}
