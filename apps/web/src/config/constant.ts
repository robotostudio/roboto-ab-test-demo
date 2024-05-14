export const ogImageDimensions = {
  width: 1200,
  height: 630,
};


export const USER_VARIANT_COOKIE = 'user-variant';

export const SANITY_TAGS = {
  mainPage: 'main-page',
  blogPage: 'blog-page',
  blogs: 'blogs',
  blogIndex: 'blog-index',
  slugPage: 'slug-page',
  footer: 'footer',
  navbar: 'navbar',
  abTest: 'ab-test',
  abTestIndex: 'ab-test-index',
} as const;

type GetSanityTag = {
  type: string;
  slug?: string;
};

export const getSanityTags = ({ type, slug }: GetSanityTag) => {
  if (type === 'mainPage') {
    return [SANITY_TAGS.mainPage];
  }

  if (type === 'abTest') {
    return [SANITY_TAGS.abTest, SANITY_TAGS.abTestIndex];
  }

  if (type === 'page') {
    return [SANITY_TAGS.slugPage, ...(slug ? [slug] : [])];
  }

  if (type === 'blog') {
    return [
      SANITY_TAGS.blogs,
      SANITY_TAGS.blogPage,
      SANITY_TAGS.blogIndex,
      ...(slug ? [slug] : []),
    ];
  }

  if (type === 'blogIndex') {
    return [SANITY_TAGS.blogIndex];
  }

  if (type === 'footer') {
    return [SANITY_TAGS.footer];
  }
  if (type === 'navbar') {
    return [SANITY_TAGS.navbar];
  }

  return [];
};
