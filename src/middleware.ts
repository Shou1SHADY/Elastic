import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0]);
    for (const lang of languages) {
      if (locales.includes(lang.split('-')[0])) {
        return lang.split('-')[0];
      }
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);
  
  if (pathname === '/') {
    request.nextUrl.pathname = `/${locale}`;
  } else {
    request.nextUrl.pathname = `/${locale}${pathname}`;
  }
  
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'
  ],
};
