
"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-md py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)]">
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>Last Updated:</strong> {lastUpdated || 'Loading...'}</p>
            
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>Welcome to AutoMova ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website automova.co .Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you fill out a contact form or otherwise interact with the Site.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Respond to your inquiries and fulfill your requests.</li>
              <li>Send you administrative information, such as changes to our terms, conditions, and policies.</li>
              <li>Improve our website and services.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">4. Disclosure of Your Information</h2>
            <p>We will not share your information with third parties except as described in this Privacy Policy or with your consent.</p>
            
            <h2 className="text-xl font-semibold text-foreground">5. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

            <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
            <p>For any questions or concerns regarding this Privacy Policy, please contact us at automova.s@gmail.com </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
