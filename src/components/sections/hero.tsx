'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

const heroFrames = PlaceHolderImages.filter(img => img.id.startsWith('hero-frame-'));
const totalFrames = heroFrames.length;

export default function Hero() {
  const [frame, setFrame] = useState(0);
  const [textTransform, setTextTransform] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const { top, height } = heroRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;

      if (top > 0) {
        setFrame(0);
        setTextTransform(0);
        return;
      }

      if (top < -scrollableHeight) {
        setFrame(totalFrames - 1);
        setTextTransform(100);
        return;
      }
      
      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      const currentFrame = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      setFrame(currentFrame);
      setTextTransform(progress * 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {heroFrames.map((img, i) => (
          <div
            key={img.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-300 ease-in-out",
              i === frame ? "opacity-100 z-0" : "opacity-0"
            )}
            aria-hidden={i !== frame}
          >
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              priority={i === 0}
              className="object-cover"
              data-ai-hint={img.imageHint}
              quality={80}
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 z-10"
          style={{ boxShadow: 'inset 0 0 10rem 3rem hsl(var(--background))' }}
        />
        
        <div className="relative z-20 flex h-full items-center justify-center">
          <div 
            className="flex flex-col items-center text-center transition-transform duration-100 ease-out"
            style={{ transform: `translateY(-${textTransform / 4}px)` }}
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground drop-shadow-2xl"
              style={{ opacity: 1 - (textTransform / 100) }}
            >
              Elastic – Molding Ideas Into Reality
            </h1>
            <p 
              className="mt-6 text-lg md:text-xl max-w-2xl text-muted-foreground"
              style={{ opacity: 1 - (textTransform / 90) }}
            >
              Premium custom rubber keychains and patches, manufactured with precision and innovation.
            </p>
          </div>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 transition-opacity duration-300"
          style={{ opacity: 1 - (textTransform / 20) }}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
