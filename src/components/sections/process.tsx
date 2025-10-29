'use client';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { PencilRuler, WholeWord, Beaker, PackageCheck, Truck } from 'lucide-react';

const processSteps = [
  {
    icon: PencilRuler,
    title: 'Design & Consultation',
    description: 'We collaborate with you to finalize your design, ensuring every detail is perfect before production begins.',
  },
  {
    icon: WholeWord,
    title: 'Mold Creation',
    description: 'Our engineers use precision CNC machines to create a high-fidelity steel mold based on your approved design.',
  },
  {
    icon: Beaker,
    title: 'Sample Production',
    description: 'A physical sample is produced for your approval, allowing for final checks on color, texture, and quality.',
  },
  {
    icon: PackageCheck,
    title: 'Mass Production',
    description: 'Upon approval, we commence full-scale production, maintaining strict quality control at every stage.',
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'Your finished products are carefully packaged and shipped, arriving on schedule and ready for distribution.',
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(-1);
  const [progressHeight, setProgressHeight] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const refs = itemRefs.current;
    if (!refs.length) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.indexOf(entry.target as HTMLLIElement);
            setActiveStep(index);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );
  
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
  
    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [itemRefs]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      if(top > 0) {
        setProgressHeight(0);
        return;
      }
      if(top < -scrollableHeight) {
        setProgressHeight(100);
        return;
      }

      const progress = (-top / scrollableHeight) * 100;
      setProgressHeight(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-24 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold uppercase text-accent">How We Work</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl">
            A Journey of Precision
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Our streamlined process ensures quality, accuracy, and reliability from the first sketch to the final delivery. We've perfected every step to guarantee your complete satisfaction.
          </p>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <div className="relative">
            <div
              className="absolute left-6 top-0 h-full w-0.5 bg-border -translate-x-1/2"
              aria-hidden="true"
            />
            <div
              className="absolute left-6 top-0 w-0.5 bg-accent -translate-x-1/2 transition-all duration-300 ease-linear"
              style={{ height: `${progressHeight}%` }}
              aria-hidden="true"
            />
            <ul className="space-y-16">
              {processSteps.map((step, index) => (
                <li
                  key={step.title}
                  ref={el => itemRefs.current[index] = el}
                  className="relative pl-16 transition-opacity duration-500"
                >
                  <div className={cn(
                    "absolute left-6 -translate-x-1/2 h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500",
                    index <= activeStep ? 'bg-accent shadow-lg shadow-accent/20' : 'bg-border'
                  )}>
                    <step.icon className={cn(
                      "h-6 w-6 transition-colors duration-500",
                      index <= activeStep ? 'text-accent-foreground' : 'text-muted-foreground'
                    )} />
                  </div>
                  <div className={cn(
                    'transition-opacity duration-700',
                    index <= activeStep ? 'opacity-100' : 'opacity-50'
                  )}>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
