
'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PencilRuler, WholeWord, Beaker, PackageCheck, Truck, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: PencilRuler,
    title: {
      en: '1. Design & Consultation',
      ar: '١. التصميم والاستشارة'
    },
    description: {
      en: 'We collaborate with you to finalize your design, ensuring every detail is perfect before production begins. Our experts provide feedback to optimize for manufacturing.',
      ar: 'نتعاون معك لوضع اللمسات الأخيرة على تصميمك، مع ضمان أن كل التفاصيل مثالية قبل بدء الإنتاج. يقدم خبراؤنا ملاحظات لتحسين عملية التصنيع.'
    },
    imageUrl: "https://picsum.photos/seed/process-1/800/600",
    imageHint: "design meeting"
  },
  {
    icon: WholeWord,
    title: {
      en: '2. Mold Creation',
      ar: '٢. إنشاء القالب'
    },
    description: {
      en: 'Our engineers use precision CNC machines to create a high-fidelity steel mold based on your approved design. This is the blueprint for your product.',
      ar: 'يستخدم مهندسونا آلات CNC الدقيقة لإنشاء قالب فولاذي عالي الدقة بناءً على تصميمك المعتمد. هذا هو مخطط منتجك.'
    },
    imageUrl: "https://picsum.photos/seed/process-2/800/600",
    imageHint: "cnc machine"
  },
  {
    icon: Beaker,
    title: {
      en: '3. Sample Production',
      ar: '٣. إنتاج العينات'
    },
    description: {
      en: 'A physical sample is produced for your approval, allowing for final checks on color, texture, and quality. We iterate until it\'s perfect.',
      ar: 'يتم إنتاج عينة مادية للموافقة عليها، مما يسمح بإجراء فحوصات نهائية على اللون والملمس والجودة. نكرر العملية حتى تصبح مثالية.'
    },
    imageUrl: "https://picsum.photos/seed/process-3/800/600",
    imageHint: "product sample"
  },
  {
    icon: PackageCheck,
    title: {
      en: '4. Mass Production',
      ar: '٤. الإنتاج الضخم'
    },
    description: {
      en: 'Upon approval, we commence full-scale production, maintaining strict quality control at every stage to ensure consistency across the entire batch.',
      ar: 'بعد الموافقة، نبدأ الإنتاج على نطاق واسع، مع الحفاظ على رقابة صارمة على الجودة في كل مرحلة لضمان الاتساق في جميع أنحاء الدفعة بأكملها.'
    },
    imageUrl: "https://picsum.photos/seed/process-4/800/600",
    imageHint: "factory production"
  },
  {
    icon: Truck,
    title: {
      en: '5. Delivery & Logistics',
      ar: '٥. التسليم والخدمات اللوجستية'
    },
    description: {
      en: 'Your finished products are carefully packaged and shipped, arriving on schedule and ready for distribution. We handle all logistics, so you don\'t have to.',
      ar: 'يتم تعبئة وشحن منتجاتك النهائية بعناية، وتصل في الموعد المحدد وجاهزة للتوزيع. نحن نتولى جميع الخدمات اللوجستية، لذلك لا داعي للقلق.'
    },
    imageUrl: "https://picsum.photos/seed/process-5/800/600",
    imageHint: "shipping boxes"
  },
];

const translations = {
  en: {
    heroTitle: "A Journey of Precision",
    heroSubtitle: "Our streamlined process ensures quality, accuracy, and reliability from the first sketch to the final delivery. We've perfected every step to guarantee your complete satisfaction.",
    ctaTitle: "Ready to Start Your Project?",
    ctaDescription: "Let's bring your idea to life. Contact us today to begin the design and consultation phase.",
    ctaButton: "Get a Quote",
  },
  ar: {
    heroTitle: "رحلة من الدقة",
    heroSubtitle: "تضمن عمليتنا المبسطة الجودة والدقة والموثوقية من الرسم الأول إلى التسليم النهائي. لقد أتقننا كل خطوة لضمان رضاك التام.",
    ctaTitle: "هل أنت مستعد لبدء مشروعك؟",
    ctaDescription: "دعنا نحقق فكرتك. اتصل بنا اليوم لبدء مرحلة التصميم والاستشارة.",
    ctaButton: "اطلب عرض سعر",
  }
};

export default function ProcessPage() {
    const pathname = usePathname();
    const lang = pathname.split('/')[1] as 'en' | 'ar';
    const isAr = lang === 'ar';
    const t = translations[lang] || translations.en;
    
    useEffect(() => {
        let ctx = gsap.context(() => {
            // GSAP MatchMedia for responsive animations
            gsap.matchMedia().add({
                isDesktop: `(min-width: 1024px)`,
                isMobile: `(max-width: 1023px)`,
            }, (context) => {
                let { isDesktop, isMobile } = context.conditions!;

                if (isDesktop) {
                    const stepsContainer = document.querySelector("#desktop-steps-container");
                    const progress = document.querySelector("#desktop-progress-bar");
                    
                    if (stepsContainer && progress) {
                        ScrollTrigger.create({
                            trigger: stepsContainer,
                            start: "top center",
                            end: "bottom center",
                            onUpdate: (self) => {
                                gsap.set(progress, { height: `${self.progress * 100}%` });
                            },
                        });

                        const steps = gsap.utils.toArray<HTMLDivElement>('.desktop-process-step');
                        steps.forEach((step) => {
                            const icon = step.querySelector('.step-icon');
                            const content = step.querySelectorAll('.step-content');
                            const isReversed = step.classList.contains('lg:grid-flow-col-dense');

                            gsap.fromTo(icon, 
                                { scale: 0.5, autoAlpha: 0.5 }, 
                                {
                                    scale: 1,
                                    autoAlpha: 1,
                                    ease: "power2.inOut",
                                    scrollTrigger: {
                                        trigger: step,
                                        start: 'top center',
                                        end: 'top 40%',
                                        scrub: true,
                                        toggleClass: { targets: icon, className: 'is-active' }
                                    }
                                }
                            );

                            content.forEach((el) => {
                                const xVal = isReversed ? -100 : 100;
                                gsap.fromTo(el, 
                                    { x: isAr ? -xVal : xVal, autoAlpha: 0 }, 
                                    {
                                        x: 0,
                                        autoAlpha: 1,
                                        duration: 0.8,
                                        ease: 'power3.out',
                                        scrollTrigger: {
                                            trigger: step,
                                            start: 'top 75%',
                                            toggleActions: 'play none none reverse',
                                        }
                                    }
                                );
                            });
                        });
                    }
                }

                if (isMobile) {
                    const mobileSteps = gsap.utils.toArray<HTMLDivElement>('.mobile-process-step');
                    mobileSteps.forEach((step) => {
                         gsap.fromTo(step, 
                            { y: 50, autoAlpha: 0 }, 
                            {
                                y: 0,
                                autoAlpha: 1,
                                duration: 0.8,
                                ease: 'power3.out',
                                scrollTrigger: {
                                    trigger: step,
                                    start: 'top 85%',
                                    toggleActions: 'play none none reverse',
                                }
                            }
                        );
                    });
                }
            });

            // Animate the final CTA card (works on all screen sizes)
            gsap.fromTo('.cta-card-animate', {
                opacity: 0,
                y: 100
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cta-card-animate',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            });
        });

        return () => ctx.revert();
    }, [isAr]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1" dir={isAr ? 'rtl' : 'ltr'}>
                 <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 text-center bg-card/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                            {t.heroTitle}
                        </h1>
                        <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-md md:text-xl text-muted-foreground">
                            {t.heroSubtitle}
                        </p>
                    </div>
                </section>

                <section id="process-steps" className="py-24 sm:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative">
                            
                            {/* Desktop Timeline Layout */}
                            <div className="hidden lg:block relative" id="desktop-steps-container">
                                <div className="absolute left-1/2 top-0 h-full w-1 bg-border -translate-x-1/2">
                                    <div id="desktop-progress-bar" className="w-full bg-accent"></div>
                                </div>
                                <div className="space-y-32">
                                    {processSteps.map((step, index) => (
                                        <div key={index} className={`desktop-process-step relative grid grid-cols-2 gap-24 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                                             <div className="absolute left-1/2 -translate-x-1/2">
                                                <div className="step-icon flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-card border-2 border-border text-muted-foreground transition-all duration-300">
                                                    <step.icon className="h-8 w-8" />
                                                </div>
                                            </div>

                                            <div className={`step-content space-y-4 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                                    {step.title[lang]}
                                                </h2>
                                                <p className="text-muted-foreground text-lg leading-relaxed">
                                                    {step.description[lang]}
                                                </p>
                                            </div>
                                            
                                            <div className="step-content aspect-w-4 aspect-h-3">
                                                <Image
                                                    src={step.imageUrl}
                                                    alt={step.title.en}
                                                    width={800}
                                                    height={600}
                                                    className="object-cover w-full h-full rounded-lg shadow-2xl"
                                                    data-ai-hint={step.imageHint}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                             {/* Mobile Simple Layout */}
                            <div className="block lg:hidden space-y-16">
                                {processSteps.map((step, index) => (
                                    <div key={index} className="mobile-process-step text-center">
                                        <div className="flex justify-center items-center gap-4 mb-6">
                                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground">
                                                <step.icon className="h-6 w-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold tracking-tighter">
                                                {step.title[lang]}
                                            </h2>
                                        </div>
                                         <div className="aspect-w-4 aspect-h-3 mb-6">
                                            <Image
                                                src={step.imageUrl}
                                                alt={step.title.en}
                                                width={800}
                                                height={600}
                                                className="object-cover w-full h-full rounded-lg shadow-xl"
                                                data-ai-hint={step.imageHint}
                                            />
                                        </div>
                                        <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
                                            {step.description[lang]}
                                        </p>
                                    </div>
                                ))}
                            </div>


                            <Card className="bg-card/60 border-accent/50 text-center p-8 sm:p-12 rounded-lg mt-24 cta-card-animate">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl">{t.ctaTitle}</CardTitle>
                                    <CardDescription className="mt-4 text-md sm:text-lg max-w-2xl mx-auto text-muted-foreground">
                                        {t.ctaDescription}
                                    </CardDescription>
                                </CardHeader>
                                <div className="mt-6">
                                     <Button asChild size="lg" className="group">
                                        <Link href={isAr ? '/ar/contact' : '/en/contact'}>
                                        {t.ctaButton}
                                        <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${isAr ? 'mr-2 -scale-x-100 group-hover:-translate-x-1' : 'ml-2'}`} />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                @media (min-width: 1024px) {
                  .step-icon.is-active {
                      background-color: hsl(var(--accent));
                      color: hsl(var(--accent-foreground));
                      border-color: hsl(var(--accent));
                      transform: scale(1.1);
                  }
                }
            `}</style>
        </div>
    );
}
