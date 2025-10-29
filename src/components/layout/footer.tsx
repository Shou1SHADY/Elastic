import Link from 'next/link';
import Logo from '@/components/shared/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Molding your ideas into high-quality, tangible reality.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#about" className="text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="#process" className="text-muted-foreground hover:text-foreground">Process</Link></li>
              <li><Link href="#portfolio" className="text-muted-foreground hover:text-foreground">Portfolio</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground tracking-wider">Connect</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><span className="sr-only">Twitter</span><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><span className="sr-only">GitHub</span><Github /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><span className="sr-only">LinkedIn</span><Linkedin /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ElasticForm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
