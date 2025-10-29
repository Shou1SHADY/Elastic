'use client';

import { useState } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/about', label: 'About', arLabel: 'من نحن' },
  { href: '/process', label: 'Process', arLabel: 'عمليتنا' },
  { href: '/portfolio', label: 'Portfolio', arLabel: 'أعمالنا' },
  { href: '/contact', label: 'Contact', arLabel: 'اتصل بنا' },
];

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const isAr = lang === 'ar';

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const getLabel = (link: typeof navLinks[0]) => (isAr ? link.arLabel : link.label);

  const getLocaleHref = (href: string) => {
    if (href === '/') return isAr ? '/ar' : '/en';
    return isAr ? `/ar${href}` : `/en${href}`;
  };

  return (
    <>
      <header
        className='fixed top-8 left-1/2 -translate-x-1/2 z-50'
      >
        <div className="flex h-14 items-center justify-center rounded-full border border-border/50 bg-background/30 px-4 shadow-lg backdrop-blur-lg md:px-6">
          <Link href={getLocaleHref("/")} className="flex-shrink-0 mr-6">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLocaleHref(link.href)}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {getLabel(link)}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
              </Link>
            ))}
          </nav>
          <div className="md:hidden ml-4">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden transition-opacity duration-300 ease-in-out',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        dir={isAr ? 'rtl' : 'ltr'}
      >
         <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
           <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocaleHref(link.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-foreground hover:text-accent transition-colors"
                >
                  {getLabel(link)}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-10">
               <Button asChild size="lg" variant="outline">
                <Link href={getLocaleHref("/contact")} onClick={() => setMobileMenuOpen(false)}>
                    {isAr ? "اطلب عرض سعر" : "Get a Quote"}
                </Link>
              </Button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;
