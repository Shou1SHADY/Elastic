'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { autoRespondToInquiry } from '@/ai/flows/auto-respond-to-inquiries';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { usePathname, useRouter } from 'next/navigation';

const formSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  customerEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  company: z.string().optional(),
  inquiryText: z.string().min(10, { message: 'Please describe your inquiry in at least 10 characters.' }),
});

const translations = {
  en: {
    title: "Let's Create Together",
    subtitle: "Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you promptly.",
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
  },
  ar: {
    title: "لنصنع معًا",
    subtitle: "هل لديك مشروع في ذهنك؟ نود أن نسمع عنه. املأ النموذج أدناه وسنعاود الاتصال بك على الفور.",
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
  }
};

export default function Contact() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ar') ? 'ar' : 'en';
  
  const [language, setLanguage] = useState<'en' | 'ar'>(currentLang);
  const { toast } = useToast();
  const t = translations[language];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { customerName: "", customerEmail: "", company: "", inquiryText: "" },
  });

  useEffect(() => {
    setLanguage(currentLang);
  }, [currentLang]);

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
    const currentPath = pathname.substring(3); // Remove /en or /ar
    const newPath = `/${newLang}${currentPath}`;
    router.push(newPath);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-card/50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold uppercase text-accent">{t.title}</span>
          <h2 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl">
            Ready to Start Your Project?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card className="max-w-3xl mx-auto mt-16 p-4 sm:p-8 border-border/50 shadow-2xl">
          <CardContent className="p-2">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" onClick={toggleLanguage} size="sm">
                <Languages className="h-4 w-4 mr-2" />
                {t.toggle}
              </Button>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FormField control={form.control} name="customerName" render={({ field }) => (
                    <FormItem><FormLabel>{t.name}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="customerEmail" render={({ field }) => (
                    <FormItem><FormLabel>{t.email}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
