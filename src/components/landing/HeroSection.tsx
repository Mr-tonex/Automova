"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const dynamicTexts = ["Business Automations", "Smart Workflows"]; 

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicTexts.length);
    }, 4000); // Increased interval for better animation visibility

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const heroTitlePart1 = "Scale Smarter with ";
  const heroDescription = "We build smart automations that save you time and money. You do what you love and we’ll handle the rest.";
  const ctaButtonText = "Book a Free Demo";
  const learnMoreButtonText = "Learn More";

  return (
    <section className="pt-6 pb-12 md:pt-10 md:pb-20 lg:pt-14 lg:pb-28">
      <div className="container mx-auto grid max-w-screen-xl items-center gap-8 px-4 pt-8 pb-12 sm:px-6 md:grid-cols-2 md:pt-16 md:pb-24 lg:px-8 lg:pt-20 lg:pb-32">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {heroTitlePart1}
            <span
              key={dynamicTexts[currentIndex]}
              className="block text-primary sm:inline hero-text-scroll-up"
            >
              {dynamicTexts[currentIndex]}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl md:max-w-md">
            {heroDescription}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild size="lg" className="shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] transition-transform hover:scale-105">
              <Link href="/book-a-call">{ctaButtonText}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group flex items-center shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] transition-transform hover:scale-105"
            >
              <Link href="/why-automova">
                {learnMoreButtonText}
                <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground md:max-w-md opacity-60">
            <span className="font-bold">Disclaimer:</span> This is not a sales call. It is a <span className="font-bold text-primary">free strategy consultation</span> to explore how your business can start using AI to automate and scale smarter—no commitments, just value.
          </p>
        </div>
        <div
          className="relative group md:col-start-2 md:row-start-1 w-full aspect-video rounded-xl shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] overflow-hidden"
          data-ai-hint="onboarding video tutorial"
        >
          <video
            src="/vid/Automova%20Vid.mp4"
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
