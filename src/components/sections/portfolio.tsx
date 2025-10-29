'use client';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { products, type Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) => {
  return (
    <div
      className="group portfolio-card relative overflow-hidden rounded-lg bg-card shadow-lg cursor-pointer transition-all duration-300 hover:shadow-accent/20 hover:-translate-y-2"
      onClick={() => onSelect(product)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
      role="button"
      tabIndex={0}
    >
      <div className="aspect-w-3 aspect-h-2 w-full">
        <Image
          src={product.image.url}
          alt={product.name}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          data-ai-hint={product.image.hint}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs">{product.description}</p>
        <div className="mt-4 flex items-center text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.portfolio-card');
    if (cards.length > 0) {
      gsap.fromTo(cards, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold uppercase text-accent">Our Work</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl">
            Portfolio of Precision
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Explore a selection of projects that demonstrate our commitment to quality and our capability to bring complex designs to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>

        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="sm:max-w-[825px] bg-card border-border">
            {selectedProduct && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedProduct.image.url}
                    alt={selectedProduct.name}
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={selectedProduct.image.hint}
                  />
                </div>
                <div>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold tracking-tighter">{selectedProduct.name}</DialogTitle>
                    <DialogDescription className="text-base pt-2">{selectedProduct.description}</DialogDescription>
                  </DialogHeader>
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground">Project Details:</h4>
                    <ul className="mt-4 space-y-2">
                      {selectedProduct.details.map((detail, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 mr-3 text-accent flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                     <Button asChild size="lg" className="w-full md:w-auto">
                        <a href="#contact" onClick={() => setSelectedProduct(null)}>Inquire about a similar project</a>
                      </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
