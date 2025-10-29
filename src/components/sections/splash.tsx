'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from '@/components/shared/logo';

type SplashProps = {
  onFinished: () => void;
};

export default function Splash({ onFinished }: SplashProps) {
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinished) {
          onFinished();
        }
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
    )
      .to(splashRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        delay: 0.5,
      });

  }, [onFinished]);

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div ref={logoRef}>
        <Logo />
      </div>
    </div>
  );
}
