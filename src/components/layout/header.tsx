'use client';

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const Header: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <header
        className='fixed top-4 left-1/2 -translate-x-1/2 z-50'
      >
        <div className="flex h-14 items-center justify-center rounded-full border border-border/50 bg-background/80 px-4 shadow-lg backdrop-blur-lg md:px-6">
          <Link href="/" className="flex-shrink-0 mr-6">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
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
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-10">
               <Button asChild size="lg" variant="outline">
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Get a Quote</Link>
              </Button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;
