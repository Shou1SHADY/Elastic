'use client';

import { CheckCircle } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import { usePathname } from 'next/navigation';


export default function About() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const isAr = lang === 'ar';

  const values = [
    {
      title: isAr ? "جودة لا تهاون فيها" : "Uncompromising Quality",
      description: isAr ? "نستخدم فقط أجود المواد وأحدث التقنيات لضمان تلبية كل منتج للمعايير الصارمة." : "We use only the finest materials and state-of-the-art technology to ensure every product meets rigorous standards."
    },
    {
      title: isAr ? "تعاون محوره العميل" : "Client-Centric Collaboration",
      description: isAr ? "رؤيتك هي مخططنا. نعمل معك عن كثب من الفكرة إلى التنفيذ لتقديم ما يوافق مواصفاتك تمامًا." : "Your vision is our blueprint. We work closely with you from concept to creation to deliver on your exact specifications."
    },
    {
      title: isAr ? "تسليم موثوق" : "Reliable Delivery",
      description: isAr ? "دقتنا في التصنيع تضاهيها دقة مواعيدنا. نسلم في الوقت المحدد، في كل مرة." : "Precision in manufacturing is matched by our punctuality. We deliver on time, every time."
    }
  ];

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
    <section id="about" className="py-24 sm:py-32 bg-background">
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
