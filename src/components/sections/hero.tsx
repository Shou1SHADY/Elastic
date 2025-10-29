'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 148;
const currentFrame = (index: number) => `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const text = textRef.current;
    const arrow = arrowRef.current;

    if (!canvas || !hero || !text || !arrow) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = 1158;
    canvas.height = 770;

    const images: HTMLImageElement[] = [];
    const imageSequence = {
      frame: 0,
    };

    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }
    };
    
    preloadImages();
    
    const firstImage = images[0];
    firstImage.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(firstImage, 0, 0);
    };

    const render = () => {
      if(images[imageSequence.frame]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[imageSequence.frame], 0, 0);
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
      onUpdate: render,
    });
    
    tl.to(imageSequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      duration: 1,
    });

    // Animate text fade/move
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-auto max-w-full max-h-full object-contain"></canvas>
        
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex h-full flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl">
            Elastic – Molding Ideas Into Reality
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl text-white/80">
            Premium custom rubber keychains and patches, manufactured with precision and innovation.
          </p>
        </div>

        <div
          ref={arrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2"
        >
          <span className="text-sm text-white/80">Scroll to explore</span>
          <ArrowDown className="animate-bounce text-white" />
        </div>
      </div>
    </section>
  );
}
