'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Process from '@/components/sections/process';
import Portfolio from '@/components/sections/portfolio';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';
import Splash from '@/components/sections/splash';
import { cn } from '@/lib/utils';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {loading && <Splash onFinished={() => setLoading(false)} />}
      <div className={cn('transition-opacity duration-500', loading ? 'opacity-0' : 'opacity-100')}>
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Process />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
