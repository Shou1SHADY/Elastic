import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Elastic - Molding Ideas Into Reality',
  description: 'Premium custom rubber keychains and patches manufacturer.',
};

export default function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'} className="dark">
      <body className={cn(inter.variable, 'font-sans')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
