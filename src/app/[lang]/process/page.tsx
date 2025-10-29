
'use client';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { PencilRuler, WholeWord, Beaker, PackageCheck, Truck, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1" dir={isAr ? 'rtl' : 'ltr'}>
                 <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 text-center bg-card/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                            {t.heroTitle}
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                            {t.heroSubtitle}
                        </p>
                    </div>
                </section>

                <section id="process-steps" className="py-24 sm:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-24">
                            {processSteps.map((step, index) => (
                                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                                    <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground">
                                                <step.icon className="h-6 w-6" />
                                            </div>
                                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                                {step.title[lang]}
                                            </h2>
                                        </div>
                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                            {step.description[lang]}
                                        </p>
                                    </div>
                                    <div className="aspect-w-4 aspect-h-3">
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

                            <Card className="bg-card/60 border-accent/50 text-center p-12 rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl">{t.ctaTitle}</CardTitle>
                                    <CardDescription className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
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
        </div>
    );
}
