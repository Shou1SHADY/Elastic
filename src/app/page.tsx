import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Process from '@/components/sections/process';
import Portfolio from '@/components/sections/portfolio';
import Contact from '@/components/sections/contact';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
  );
}
