
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AIChatbox from '@/components/AIChatbox';
import StarryBackground from '@/components/StarryBackground';
import CookieConsent from '@/components/CookieConsent';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AutoMova - Automate & Scale Your Business',
  description: 'Scale smarter with AutoMova. We build custom automations that save time, cut costs, and boost growth for startups, online businesses, and entrepreneurs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} dark`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <StarryBackground />
        {children}
        <Toaster />
        <AIChatbox />
        <CookieConsent />
      </body>
    </html>
  );
}
