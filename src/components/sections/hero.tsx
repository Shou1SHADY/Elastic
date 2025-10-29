'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    const text = textRef.current;
    const arrow = arrowRef.current;

    if (!video || !hero || !text || !arrow) return;

    // Ensure video is ready for seeking
    const onLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;

      const duration = video.duration || 1;

      // GSAP timeline for scroll-based video
      gsap.to(video, {
        currentTime: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5, // smooth scrubbing
        },
      });

      // Fade/move text with scroll
      gsap.to(text, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Fade out arrow quickly
      gsap.to(arrow, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '20% top',
          scrub: 0.5,
        },
      });
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    // Autoplay muted to allow seeking
    video.muted = true;
    video.play().catch(() => {
      console.info('Autoplay prevented, scroll will control video.');
    });

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          playsInline
          crossOrigin="anonymous"
        >
          <source src="https://storage.googleapis.com/studio-hosting-assets/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="absolute inset-0 z-10"
          style={{ boxShadow: 'inset 0 0 10rem 3rem hsl(var(--background))' }}
        />

        <div
          ref={textRef}
          className="relative z-20 flex h-full flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground drop-shadow-2xl">
            Elastic – Molding Ideas Into Reality
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl text-muted-foreground">
            Premium custom rubber keychains and patches, manufactured with precision and innovation.
          </p>
        </div>

        <div
          ref={arrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2"
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
