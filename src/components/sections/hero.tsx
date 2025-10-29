'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 148;
const currentFrame = (index: number) => `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`;

// Function to draw image with 'cover' behavior
const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}


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
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        if(context) {
          drawImageCover(context, firstImage);
        }
    };

    const render = () => {
      const img = images[imageSequence.frame];
      if (
        img &&
        img.complete &&
        img.naturalWidth > 0 &&
        context
      ) {
        drawImageCover(context, img);
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
    
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-[600vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover"></canvas>
        
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