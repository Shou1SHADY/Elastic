
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Users, Target, Eye } from "lucide-react";
import Image from "next/image";
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    heroTitle: "Innovation in Every Mold",
    heroSubtitle: "Elastic is a B2B partner dedicated to transforming your creative ideas into tangible, high-quality custom rubber keychains and patches.",
    philosophyTitle: "Our Philosophy",
    philosophyBody: "Our futuristic approach to manufacturing combines precision engineering with durable materials to produce results that not only look good but last. We are the silent partner behind your brand's standout promotional material. We believe in building partnerships through quality and reliability.",
    valuesTitle: "Our Core Values",
    values: [
      {
        icon: Target,
        title: "Uncompromising Quality",
        description: "We use only the finest materials and state-of-the-art technology to ensure every product meets rigorous standards."
      },
      {
        icon: Users,
        title: "Client-Centric Collaboration",
        description: "Your vision is our blueprint. We work closely with you from concept to creation to deliver on your exact specifications."
      },
      {
        icon: Eye,
        title: "Reliable Delivery",
        description: "Precision in manufacturing is matched by our punctuality. We deliver on time, every time."
      }
    ]
  },
  ar: {
    heroTitle: "الابتكار في كل قالب",
    heroSubtitle: "إلاستيك هي شريك أعمال B2B مكرس لتحويل أفكارك الإبداعية إلى منتجات ملموسة وعالية الجودة من سلاسل المفاتيح والبقع المطاطية المخصصة.",
    philosophyTitle: "فلسفتنا",
    philosophyBody: "نهجنا المستقبلي في التصنيع يجمع بين الهندسة الدقيقة والمواد المتينة لإنتاج نتائج لا تبدو جيدة فحسب، بل تدوم طويلاً. نحن الشريك الصامت وراء المواد الترويجية المتميزة لعلامتك التجارية. نؤمن ببناء شراكات من خلال الجودة والموثوقية.",
    valuesTitle: "قيمنا الأساسية",
    values: [
      {
        icon: Target,
        title: "جودة لا تقبل المساومة",
        description: "نستخدم فقط أجود المواد وأحدث التقنيات لضمان تلبية كل منتج للمعايير الصارمة."
      },
      {
        icon: Users,
        title: "تعاون يركز على العميل",
        description: "رؤيتك هي مخططنا. نعمل معك عن كثب من المفهوم إلى الإنشاء لتقديم مواصفاتك الدقيقة."
      },
      {
        icon: Eye,
        title: "تسليم موثوق",
        description: "تتم مطابقة الدقة في التصنيع مع التزامنا بالمواعيد. نقوم بالتسليم في الوقت المحدد، في كل مرة."
      }
    ]
  }
};

export default function AboutPage() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] as 'en' | 'ar';
  const isAr = lang === 'ar';
  const t = translations[lang] || translations.en;
  
  useEffect(() => {
    // Animate hero section
    gsap.fromTo('.hero-animate', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2, delay: 0.2 }
    );

    // Animate philosophy section
    gsap.fromTo('.philosophy-animate',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '#about-philosophy',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

    // Animate values section title
     gsap.fromTo('.values-title-animate',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: '#about-values',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        duration: 1,
        ease: 'power3.out',
      }
    );
    
    // Animate value cards
    gsap.utils.toArray<HTMLDivElement>('.value-card-animate').forEach((card) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      <Header />
      <main className="flex-1">
        <section className="pt-32 pb-20 sm:pt-48 sm:pb-28 text-center bg-card/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="hero-animate text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
              {t.heroTitle}
            </h1>
            <p className="hero-animate mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
              {t.heroSubtitle}
            </p>
          </div>
        </section>

        <section id="about-philosophy" className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6">
                 <h2 className="philosophy-animate text-3xl font-bold tracking-tighter sm:text-4xl">
                  {t.philosophyTitle}
                </h2>
                <p className="philosophy-animate text-muted-foreground text-lg leading-relaxed">
                  {t.philosophyBody}
                </p>
              </div>
               <div className="philosophy-animate aspect-w-4 aspect-h-3">
                  <Image
                      src="https://picsum.photos/seed/about-us/800/600"
                      alt="Our team at work"
                      width={800}
                      height={600}
                      className="object-cover w-full h-full rounded-lg shadow-2xl"
                      data-ai-hint="team collaboration"
                  />
              </div>
            </div>
          </div>
        </section>

        <section id="about-values" className="py-24 sm:py-32 bg-card/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="values-title-animate text-3xl font-bold tracking-tighter sm:text-4xl">
                        {t.valuesTitle}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {t.values.map((value, index) => (
                        <div key={index} className="value-card-animate text-center p-8 bg-background rounded-lg shadow-lg">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-accent-foreground mx-auto mb-6">
                                <value.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                            <p className="mt-2 text-muted-foreground">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
