'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const isAr = lang === 'ar';

  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
          duration: 1,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const t = {
    en: {
      subheading: "Who We Are",
      heading: "Innovation in Every Mold",
      body: "ElasticForm is a B2B partner dedicated to transforming your creative ideas into tangible, high-quality custom rubber keychains and patches. Our futuristic approach to manufacturing combines precision engineering with durable materials to produce results that not only look good but last.",
      button: "Learn More About Us"
    },
    ar: {
      subheading: "من نحن",
      heading: "الابتكار في كل قالب",
      body: "إلاستيك فورم هي شريك أعمال B2B مكرس لتحويل أفكارك الإبداعية إلى منتجات ملموسة وعالية الجودة من سلاسل المفاتيح والبقع المطاطية المخصصة. نهجنا المستقبلي في التصنيع يجمع بين الهندسة الدقيقة والمواد المتينة لإنتاج نتائج لا تبدو جيدة فحسب، بل تدوم طويلاً.",
      button: "اعرف المزيد عنا"
    }
  }

  const localeContent = isAr ? t.ar : t.en;
  const localeHref = isAr ? '/ar/about' : '/en/about';

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-2xl">
             <Image
                src="https://picsum.photos/seed/about-main/800/600"
                alt="Crafting a custom mold"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                data-ai-hint="manufacturing process"
              />
          </div>
          <div className="space-y-6">
            <span className="text-sm font-bold uppercase text-accent">{localeContent.subheading}</span>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
              {localeContent.heading}
            </h2>
            <p className="text-muted-foreground text-lg">
              {localeContent.body}
            </p>
             <Button asChild size="lg" variant="outline" className="group">
                <Link href={localeHref}>
                  {localeContent.button}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
