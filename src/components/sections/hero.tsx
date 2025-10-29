'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const text = textRef.current;
    const arrow = arrowRef.current;
    
    if (!hero || !canvas || !text || !arrow) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Create a video element programmatically to act as our data source
    const video = document.createElement('video');
    video.src = 'https://storage.googleapis.com/studio-hosting-assets/hero-video.mp4';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous'; // Important for canvas
    videoRef.current = video;

    const onLoadedMetadata = () => {
      // Set canvas dimensions once video is loaded
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the first frame
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frameCount = Math.floor(video.duration * 30); // Assuming 30fps

      // An object to animate
      const frameState = { frame: 0 };

      // GSAP timeline for scroll-based video frames
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * (frameCount - 1));
          if (frameState.frame !== frame) {
            frameState.frame = frame;
            video.currentTime = frame / 30;
          }
        },
      });

      video.addEventListener('seeked', () => {
        if(context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
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
    video.load(); // Start loading the video data

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      videoRef.current = null;
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

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
