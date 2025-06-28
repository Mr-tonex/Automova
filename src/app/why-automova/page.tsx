
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Zap, Users, Target, Briefcase, CheckCircle, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: <Clock className="h-8 w-8 text-primary mb-3" />,
    title: "Reclaim Your Valuable Time",
    description: "Free up your team from tedious tasks so they can focus on what really matters: strategic growth.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary mb-3" />,
    title: "Boost Operational Efficiency",
    description: "Create smoother workflows, reduce errors, and get more done with less effort.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary mb-3" />,
    title: "Scale With Confidence",
    description: "Our solutions are built to scale, handling bigger workloads as your business grows.",
  },
  {
    icon: <Target className="h-8 w-8 text-primary mb-3" />,
    title: "Achieve Measurable ROI",
    description: "We focus on solutions that deliver a clear return, from cost savings to increased revenue.",
  },
];

const differentiators = [
  {
    icon: <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />,
    title: "Custom-Tailored Solutions",
    description: "No cookie-cutter solutions here. Everything we build is designed to fit your unique processes and goals.",
  },
  {
    icon: <Users className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />,
    title: "Expert Team, Proven Process",
    description: "Our team of specialists works with you every step of the way, from our first chat to launch and beyond.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent flex-shrink-0 mr-3 mt-1" />,
    title: "Focus on Your Success",
    description: "We're committed to your success. We build transparent partnerships focused on long-term value.",
  },
];

export default function WhyAutoMovaPage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
                Our Edge
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We help you overcome hurdles by transforming your workflows with custom-built automation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="transform transition-all duration-300 hover:scale-105 shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] bg-card text-card-foreground flex flex-col">
                  <CardHeader className="items-center text-center pt-6">
                    {benefit.icon}
                    <CardTitle className="text-xl font-semibold text-foreground">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-center text-sm text-muted-foreground">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 lg:py-28">
          <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl [text-shadow:0_0_10px_hsl(var(--primary)/0.4)]">What Makes Us Different</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We’re more than a service provider; we're your partner in success.
              </p>
            </div>
            <div className="grid md:grid-cols-1 gap-8">
              {differentiators.map((item, index) => (
                <div key={index} className="flex p-6 rounded-lg bg-background shadow-[0_0_15px_2px_hsl(var(--primary)/0.15)]">
                  {item.icon}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary text-primary-foreground p-8 md:p-12 text-center shadow-[0_0_35px_5px_hsl(var(--primary)/0.35)] rounded-xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Build a Smarter Business?
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                Let's find a path to a more efficient, scalable future for your business. Your first consultation is on us.
              </p>
              <div className="mt-10">
                <Button asChild size="lg" variant="secondary" className="shadow-lg transition-transform hover:scale-105 rounded-full hover:bg-secondary/90">
                  <Link href="/book-a-call">Book Your Free Consultation</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
