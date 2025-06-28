
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Workflow, BrainCircuit, BarChart3, Users } from 'lucide-react';

const services = [
  {
    icon: <Workflow className="h-10 w-10 text-primary mb-4" />,
    title: "Custom Workflow Automation",
    description: "We design and implement bespoke automation solutions to eliminate manual work, reduce errors, and streamline your entire operation.",
    dataAiHint: "workflow gears process"
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary mb-4" />,
    title: "AI-Powered Data Processing",
    description: "Use AI to handle data entry, extraction, and processing from any source, ensuring your data is accurate and your team's time is respected.",
    dataAiHint: "ai brain data"
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary mb-4" />,
    title: "Automated Reporting",
    description: "Put your reporting on autopilot. We build systems that gather data and generate key reports, so you always have the insights you need.",
    dataAiHint: "chart report analytics"
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: "CRM & Sales Automation",
    description: "Supercharge your sales process. We automate lead nurturing, follow-ups, and CRM updates to help you close more deals.",
    dataAiHint: "crm sales team"
  },
];

export default function ServicesPage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow py-12 md:py-20 lg:py-28">
        <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
          <section id="services" className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
                What We Do
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                We build smart, tailored automation solutions that change the way you work—for the better.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] flex flex-col bg-card" 
                >
                  <CardHeader className="items-center text-center">
                    {service.icon}
                    <CardTitle
                      className="text-2xl font-semibold text-foreground [text-shadow:0_0_8px_hsl(var(--primary)/0.3)]" 
                    >
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription
                      className="text-center text-muted-foreground" 
                    >
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Ready to see it in action?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Let's talk about what you need automated. We can help you find the right path to your goals.
              </p>
              <Button asChild size="lg" className="mt-8 shadow-[0_0_15px_2px_hsl(var(--primary)/0.3)] transition-transform hover:scale-105">
                <Link href="/book-a-call">Book a Free Demo</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
