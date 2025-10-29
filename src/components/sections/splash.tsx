'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type SplashProps = {
  onFinished: () => void;
};

export default function Splash({ onFinished }: SplashProps) {
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const elasticRef = useRef<HTMLSpanElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinished) {
          onFinished();
        }
      },
    });

    gsap.set([elasticRef.current], { y: 0, opacity: 1 });
    gsap.set(backgroundRef.current, { scale: 1.2, opacity: 0 });

    tl.to(backgroundRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out',
    })
      .from(
        elasticRef.current,
        { x: -50, opacity: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.2'
      )
      .to(splashRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.75,
      });

  }, [onFinished]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
    >
      <div ref={backgroundRef} className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div ref={logoRef} className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground flex">
        <span ref={elasticRef} className="opacity-0">Elastic</span>
      </div>
    </div>
  );
}
