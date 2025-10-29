'use client';

import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ArrowUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useScroll } from '@/hooks/use-scroll';
import { gsap } from 'gsap';

const navLinks = [
  { href: '/about', label: 'About', arLabel: 'من نحن' },
  { href: '/process', label: 'Process', arLabel: 'عمليتنا' },
  { href: '/portfolio', label: 'Portfolio', arLabel: 'أعمالنا' },
  { href: '/contact', label: 'Contact', arLabel: 'اتصل بنا' },
];

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lang = pathname.split('/')[1] as 'en' | 'ar';
  const isAr = lang === 'ar';

  const { isScrolled, scrollDirection } = useScroll(100);
  const [isHovered, setIsHovered] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);


  const isShrunken = isScrolled && scrollDirection === 'down' && !isHovered;

  useEffect(() => {
    const tl = gsap.timeline();

    if (isShrunken) {
      tl.to(headerRef.current, { width: 56, height: 56, borderRadius: '50%', duration: 0.4, ease: 'power3.inOut' })
        .to([navRef.current, langRef.current], { opacity: 0, duration: 0.2, ease: 'power3.inOut' }, '-=0.4')
        .to(logoRef.current, { x: isAr ? 4 : -4, duration: 0.4, ease: 'power3.inOut'}, '-=0.4');
    } else {
      tl.to(headerRef.current, { width: 'auto', height: 56, borderRadius: '9999px', duration: 0.4, ease: 'power3.inOut' })
        .to([navRef.current, langRef.current], { opacity: 1, duration: 0.3, ease: 'power3.inOut' }, '-=0.2')
        .to(logoRef.current, { x: 0, duration: 0.4, ease: 'power3.inOut'}, '-=0.4');
    }

  }, [isShrunken, isAr]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const getLabel = (link: typeof navLinks[0]) => (isAr ? link.arLabel : link.label);

  const getLocaleHref = (href: string) => {
    if (href === '/') return isAr ? '/ar' : '/en';
    return isAr ? `/ar${href}` : `/en${href}`;
  };

  const handleLanguageChange = (newLang: 'en' | 'ar') => {
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };


  return (
    <>
      <header
        className='fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={headerRef} className="flex h-14 items-center justify-center border border-border/50 bg-background/30 px-4 shadow-lg backdrop-blur-lg md:px-6 overflow-hidden">
          <Link href={getLocaleHref("/")} className={cn("flex-shrink-0", isAr ? "ml-6" : "mr-6")}>
            <div ref={logoRef}>
              <Logo />
            </div>
          </Link>
          <nav ref={navRef} className={cn("hidden md:flex items-center", isAr ? "space-x-reverse space-x-6" : "space-x-6")}>
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

          <div ref={langRef} className={cn("hidden md:flex items-center", isAr ? "mr-4" : "ml-4")}>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className={cn("md:hidden", isAr ? "mr-4" : "ml-4")}>
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
            <div className="mt-8 flex gap-4">
               <Button variant={lang === 'en' ? 'secondary' : 'ghost'} onClick={() => { handleLanguageChange('en'); setMobileMenuOpen(false); }}>English</Button>
               <Button variant={lang === 'ar' ? 'secondary' : 'ghost'} onClick={() => { handleLanguageChange('ar'); setMobileMenuOpen(false); }}>العربية</Button>
            </div>
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
