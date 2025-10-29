'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [textTransform, setTextTransform] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure metadata is loaded before we try to manipulate the video
    const onLoadedMetadata = () => {
      video.pause();
      video.currentTime = 0;
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Run once on mount to set initial state
      handleScroll();
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    
    // We need to be able to play the video for seeking.
    // Muted allows autoplay without user interaction.
    video.muted = true; 
    video.play().catch(error => {
      // Autoplay was prevented. This is common and okay.
      // The user scrolling will still control the video.
      console.info("Autoplay was prevented, which is expected. User scrolling will control the video.");
    });
    
    const handleScroll = () => {
      if (!heroRef.current || !video) return;

      const { top, height } = heroRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;

      if (top > 0) {
        setTextTransform(0);
        video.currentTime = 0;
        return;
      }
      
      const videoDuration = video.duration;
      if (top < -scrollableHeight) {
        setTextTransform(100);
        if (videoDuration) {
          video.currentTime = videoDuration;
        }
        return;
      }
      
      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      
      if (videoDuration) {
        video.currentTime = progress * videoDuration;
      }
      
      setTextTransform(progress * 150);
    };

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    }
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
          playsInline
          muted // Muted is important for autoplay policies
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
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
