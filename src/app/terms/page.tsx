
"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
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
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>Last Updated:</strong> {lastUpdated || 'Loading...'}</p>

            <h2 className="text-xl font-semibold text-foreground">1. Welcome to AutoMova!</h2>
            <p>Hey there! Thanks for choosing AutoMova. These Terms of Service ("Terms") outline the rules and regulations for the use of AutoMova's Website, located at automova.co (our "Site"), and the services we provide (our "Services"). By accessing this Site or using our Services, we assume you accept these Terms. Do not continue to use AutoMova if you do not agree to all of the terms stated on this page.</p>

            <h2 className="text-xl font-semibold text-foreground">2. Our Services</h2>
            <p>AutoMova specializes in providing business automation solutions, including custom workflow design, AI-powered data processing, and other related services as described on our Site. We're constantly innovating, so our Services might change from time to time, but we'll always aim to keep you informed of any significant updates.</p>

            <h2 className="text-xl font-semibold text-foreground">3. Using Our Site and Services</h2>
            <p>We grant you permission to use our Site and Services for your business needs, in accordance with these Terms. We expect you to use them responsibly and lawfully. This means you agree not to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Use our Site or Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
              <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.</li>
              <li>Attempt to gain unauthorized access to our systems or engage in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of, our Site or Services.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">4. Intellectual Property Rights</h2>
            <p>We love what we've built! Other than the content you provide, under these Terms, AutoMova and/or its licensors own all the intellectual property rights and materials contained in this Site and our Services. This includes things like our logo, design, text, graphics, and software. You are granted a limited license only for purposes of viewing the material contained on this Site and using our Services as intended.</p>

            <h2 className="text-xl font-semibold text-foreground">5. Your Content</h2>
            <p>If you provide us with any information, data, or materials ("Your Content") in connection with our Services (for example, when filling out a contact form or discussing your business processes), you retain ownership of Your Content. However, you grant us a worldwide, royalty-free license to use, reproduce, modify, and adapt Your Content solely for the purpose of providing and improving our Services to you.</p>
            
            <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p>We strive to provide excellent Services, but like any service, things can sometimes go wrong. To the fullest extent permitted by applicable law, AutoMova shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Services; (b) any conduct or content of any third party on the Services; (c) any content obtained from the Services; or (d) unauthorized access, use, or alteration of your transmissions or content. Our goal is always your success, but we can't guarantee specific outcomes from using our automation services.</p>
            
            <h2 className="text-xl font-semibold text-foreground">7. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. We encourage you to review these Terms periodically for any changes. Changes to these Terms are effective when they are posted on this page.</p>

            <h2 className="text-xl font-semibold text-foreground">8. Governing Law</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which AutoMova operates, without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the courts located in that jurisdiction for any actions for which we retain the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation or violation of our copyrights, trademarks, trade secrets, patents, or other intellectual property or proprietary rights.</p>

            <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please don't hesitate to contact us at automova.s@gmail.com. We're here to help!</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
