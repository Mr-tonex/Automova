
"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiePolicyPage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setLastUpdated(new Date().toLocaleDateString());
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto max-w-screen-md py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)]">
          <CardHeader>
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>Last Updated:</strong> {lastUpdated || 'Loading...'}</p>
            
            <h2 className="text-xl font-semibold text-foreground">1. What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

            <h2 className="text-xl font-semibold text-foreground">2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
            <p>We may use cookies to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Understand and save user preferences for future visits.</li>
              <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future.</li>
              <li>Keep track of advertisements.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">3. Types of Cookies We Use</h2>
            <p>The types of cookies used on our Site may include:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site.</li>
              <li><strong>Performance Cookies:</strong> These cookies collect information about how you use our website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole purpose is to improve website functions.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow our website to remember choices you have made in the past, like what language you prefer or what your user name and password are so you can automatically log in.</li>
              <li><strong>Marketing Cookies:</strong> These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-foreground">4. Your Choices Regarding Cookies</h2>
            <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
            <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-accent">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-accent">www.allaboutcookies.org</a>.</p>

            <h2 className="text-xl font-semibold text-foreground">5. Changes to This Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>

            <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
            <p>If you have any questions about our use of cookies or other technologies, please email us at: automova.s@gmail.com</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
