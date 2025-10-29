
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function CTA() {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const isAr = lang === 'ar';
  
  const translations = {
    en: {
      title: "Ready to bring your ideas to life?",
      subtitle: "Let's discuss your project and how we can help you create stunning custom rubber keychains and patches.",
      button: "Get a Quote",
    },
    ar: {
      title: "جاهز لتحويل أفكارك إلى حقيقة؟",
      subtitle: "دعنا نناقش مشروعك وكيف يمكننا مساعدتك في إنشاء سلاسل مفاتيح وبقع مطاطية مخصصة ومذهلة.",
      button: "اطلب عرض سعر",
    }
  };

  const t = isAr ? translations.ar : translations.en;
  const contactHref = isAr ? '/ar/contact' : '/en/contact';

  return (
    <section className="py-20 sm:py-24 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
          {t.title}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
          {t.subtitle}
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="group">
            <Link href={contactHref}>
              {t.button}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
