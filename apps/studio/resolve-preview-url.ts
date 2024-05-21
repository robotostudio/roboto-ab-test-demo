import { SanityDocument, Slug } from 'sanity';

const previewSecret = '1370d142-342f-419f-aa63-1515bfdb68fa';

const localUrl = `http://localhost:3000`;

const remoteUrl = 'https://ab-test.roboto.studio';

const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl;

export function resolvePreviewUrl(
  doc: SanityDocument & {
    slug?: {
      current: string;
    };
  },
) {
  const previewUrl = new URL(baseUrl);
  const slug = doc?.slug?.current ?? '/';
  previewUrl.pathname = `/api/draft`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append(`slug`, slug);
  return previewUrl.toString();
}
