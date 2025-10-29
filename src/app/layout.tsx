import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elastic - Molding Ideas Into Reality',
  description: 'Premium custom rubber keychains and patches manufacturer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
