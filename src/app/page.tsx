
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import ProcessSection from '@/components/landing/ProcessSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FaqSection from '@/components/landing/FaqSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';
import FeatureHighlightSection from '@/components/landing/FeatureHighlightSection';
import { Workflow, Cpu, Database, Clock, CheckCircle, Smile } from 'lucide-react';

export default function HomePage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />

        <FeatureHighlightSection
          title="Stop the Busywork, Start the Growth"
          text="Sick of manual tasks eating up your time? We create smart workflows that take care of the repetitive stuff—so your team can focus on what really moves your business forward."
          videoUrl="/vid/automova%20code.mp4"
          imageAlt="A video showing custom business workflows"
          layout="text-left"
          features={[
            {
              icon: <Workflow />,
              title: "Custom Workflows",
              description: "Solutions designed specifically for your unique processes."
            },
            {
              icon: <Cpu />,
              title: "AI-Powered Decisions",
              description: "Let AI handle the tough stuff, fast and accurate."
            },
            {
              icon: <Database />,
              title: "Seamless Integration",
              description: "Connects with the tools you already know and love."
            }
          ]}
        />
        
        <FeatureHighlightSection
          title="Automation That Works While You Rest"
          text="Free yourself from constant follow-ups, late-night work, and missed tasks. Our smart systems run in the background, so you can focus on growing and not just keeping up."
          videoUrl="/vid/pst.mp4"
          imageAlt="A video showing automated tasks running smoothly"
          layout="text-right"
          features={[
            {
              icon: <Clock />,
              title: "24/7 Task Handling",
              description: "Let automations take care of things even when you’re offline."
            },
            {
              icon: <CheckCircle />,
              title: "Smooth & Reliable",
              description: "Same results, every time and no stress, no surprises."
            },
            {
              icon: <Smile />,
              title: "Peace of Mind",
              description: "Rest easy knowing everything’s running smoothly."
            }
          ]}
        />

        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
