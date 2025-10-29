'use client';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { autoRespondToInquiry } from '@/ai/flows/auto-respond-to-inquiries';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Languages, Mail, Phone, MapPin } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  customerEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  inquiryText: z.string().min(10, { message: 'Please describe your inquiry in at least 10 characters.' }),
});

const translations = {
  en: {
    title: "Let's Create Together",
    subtitle: "Have a project in mind? We'd love to hear about it. Fill out the form or reach out via our contact details below.",
    name: "Full Name",
    email: "Email Address",
    company: "Company Name (Optional)",
    inquiry: "Your Inquiry",
    submit: "Submit Inquiry",
    submitting: "Submitting...",
    toggle: "Switch to Arabic",
    successTitle: "Inquiry Sent!",
    successDescription: "Thank you for reaching out. Here is a draft response to your inquiry:",
    errorTitle: "Submission Failed",
    errorDescription: "Something went wrong. Please try again.",
    contactInfo: "Contact Information"
  },
  ar: {
    title: "لنصنع معًا",
    subtitle: "هل لديك مشروع في ذهنك؟ نود أن نسمع عنه. املأ النموذج أو تواصل معنا عبر تفاصيل الاتصال أدناه.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    company: "اسم الشركة (اختياري)",
    inquiry: "استفسارك",
    submit: "إرسال الاستفسار",
    submitting: "جارٍ الإرسال...",
    toggle: "التبديل إلى الإنجليزية",
    successTitle: "تم إرسال الاستفسار!",
    successDescription: "شكرًا لتواصلك معنا. إليك مسودة رد على استفسارك:",
    errorTitle: "فشل الإرسال",
    errorDescription: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    contactInfo: "معلومات الاتصال"
  }
};

export default function ContactPage() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLang = pathname.startsWith('/ar') ? 'ar' : 'en';
    
    const [language, setLanguage] = useState<'en' | 'ar'>(currentLang);
    const { toast } = useToast();
    const t = translations[language];

    const formRef = useRef(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { customerName: "", customerEmail: "", company: "", inquiryText: "" },
    });

    useEffect(() => {
        setLanguage(currentLang);
    }, [currentLang]);

    useEffect(() => {
      const el = formRef.current;
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

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
        const response = await autoRespondToInquiry(values);
        toast({
            title: t.successTitle,
            description: (
            <div className="mt-2 w-[340px] rounded-md bg-background p-4">
                <h4 className="font-medium text-foreground">{t.successDescription}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{response.draftResponse}</p>
            </div>
            ),
            duration: 15000,
        });
        form.reset();
        } catch (error) {
        toast({
            variant: "destructive",
            title: t.errorTitle,
            description: t.errorDescription,
        });
        }
    }

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'ar' : 'en';
        const newPath = `/${newLang}/contact`;
        router.push(newPath);
      };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 text-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                           {t.title}
                        </h1>
                        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                            {t.subtitle}
                        </p>
                    </div>
                </section>
                
                <section id="contact-form" ref={formRef} className="py-24 sm:py-32 bg-card/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                       <div className="flex justify-end mb-6">
                          <Button variant="ghost" onClick={toggleLanguage} size="sm">
                            <Languages className="h-4 w-4 mr-2" />
                            {t.toggle}
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="customerName" render={({ field }) => (
                                            <FormItem><FormLabel>{t.name}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="customerEmail" render={({ field }) => (
                                            <FormItem><FormLabel>{t.email}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></Form--message></FormItem>
                                        )} />
                                        </div>
                                        <FormField control={form.control} name="company" render={({ field }) => (
                                        <FormItem><FormLabel>{t.company}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="inquiryText" render={({ field }) => (
                                        <FormItem><FormLabel>{t.inquiry}</FormLabel><FormControl><Textarea className="min-h-[150px]" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6">
                                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.submitting}</> : t.submit}
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold tracking-tight">{t.contactInfo}</h3>
                                <div className="space-y-6 text-lg">
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold">Email</p>
                                            <a href="mailto:hello@elasticform.com" className="text-muted-foreground hover:text-accent">hello@elasticform.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold">Phone</p>
                                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold">Office</p>
                                            <p className="text-muted-foreground">123 Innovation Drive<br/>Suite 404, Tech Park</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
