import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'ar'];

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
  return 'en'; // Default language
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Redirect to the detected locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Use a permanent redirect (308) to avoid issues with search engines
  // and to ensure POST requests are not changed to GET requests.
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Match all paths except for static files, API routes, and the Next.js internal directory.
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'
  ],
};
