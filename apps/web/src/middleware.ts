import { NextRequest, NextResponse } from 'next/server';
import { USER_VARIANT_COOKIE } from './config';
import { getBucket } from './lib/ab-testing';

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

const getPageSlug = (pathname: string) => {
  const pathnameWithoutSlug = pathname.split('/').filter(Boolean);
  if (pathnameWithoutSlug.length === 1) {
    const [slug] = pathnameWithoutSlug;
    if (['blog'].includes(slug)) return null;
    return slug;
  }

  return null;
};

export function middleware(req: NextRequest) {
  let cookie = req.cookies.get(USER_VARIANT_COOKIE)?.value;

  if (!cookie) {
    const variant = getBucket(['0', '1']);
    cookie = `variant-${variant}`;
  }

  const [, variantId] = cookie.split('-');
  const url = req.nextUrl;

  const pageSlug = getPageSlug(url.pathname);
  console.log('🚀 ~ middleware ~ pageSlug:', pageSlug);
  if (!pageSlug) {
    const res = NextResponse.next();
    if (!req.cookies.has(USER_VARIANT_COOKIE)) {
      res.cookies.set(USER_VARIANT_COOKIE, cookie);
    }
    return res;
  }

  if (variantId !== '0') {
    url.pathname = `/test/${variantId}/${pageSlug}`;
  }

  const res = NextResponse.rewrite(url);

  if (!req.cookies.has(USER_VARIANT_COOKIE)) {
    res.cookies.set(USER_VARIANT_COOKIE, cookie);
  }

  return res;
}
