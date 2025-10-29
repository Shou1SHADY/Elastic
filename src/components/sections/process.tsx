'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PencilRuler, WholeWord, Beaker, PackageCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: PencilRuler,
    title: 'Design & Consultation',
    arTitle: 'التصميم والاستشارة',
    description: 'We collaborate to finalize your design, ensuring every detail is perfect before production.',
    arDescription: 'نتعاون معك لوضع اللمسات الأخيرة على تصميمك، مع ضمان أن كل التفاصيل مثالية قبل بدء الإنتاج.',
  },
  {
    icon: WholeWord,
    title: 'Mold Creation',
    arTitle: 'إنشاء القالب',
    description: 'Our engineers create a high-fidelity steel mold based on your approved design.',
    arDescription: 'يقوم مهندسونا بإنشاء قالب فولاذي عالي الدقة بناءً على تصميمك المعتمد.',
  },
  {
    icon: Beaker,
    title: 'Production',
    arTitle: 'الإنتاج',
    description: 'A physical sample is produced for approval, followed by full-scale production.',
    arDescription: 'يتم إنتاج عينة مادية للموافقة عليها، يليها الإنتاج على نطاق واسع.',
  },
  {
    icon: PackageCheck,
    title: 'Delivery',
    arTitle: 'التسليم',
    description: 'Your finished products are carefully packaged and shipped, arriving on schedule.',
    arDescription: 'يتم تعبئة وشحن منتجاتك النهائية بعناية، وتصل في الموعد المحدد.',
  },
];

export default function Process() {
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
      subheading: "How We Work",
      heading: "A Journey of Precision",
      body: "Our streamlined process ensures quality, accuracy, and reliability from the first sketch to the final delivery.",
      button: "Explore Our Full Process"
    },
    ar: {
      subheading: "كيف نعمل",
      heading: "رحلة من الدقة",
      body: "عمليتنا المبسطة تضمن الجودة والدقة والموثوقية من الرسم الأول إلى التسليم النهائي.",
      button: "استكشف عمليتنا الكاملة"
    }
  }

  const localeContent = isAr ? t.ar : t.en;
  const localeHref = isAr ? '/ar/process' : '/en/process';

  return (
    <section id="process" ref={sectionRef} className="py-24 sm:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold uppercase text-accent">{localeContent.subheading}</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl">
            {localeContent.heading}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {localeContent.body}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 text-center">
          {processSteps.map((step) => (
            <div key={step.title} className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
                <div className="flex-shrink-0 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent text-accent-foreground">
                        <step.icon className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold">{isAr ? step.arTitle : step.title}</h3>
                <p className="mt-2 text-muted-foreground flex-grow">{isAr ? step.arDescription : step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
            <Button asChild size="lg" className="group">
                <Link href={localeHref}>
                  {localeContent.button}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
