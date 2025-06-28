import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Hourglass, Zap, Wrench, Target } from 'lucide-react';

const benefits = [
  {
    icon: <Hourglass className="h-8 w-8 text-primary" />,
    title: 'Save Time',
    description: 'Let automation handle the boring stuff so your team can focus on what really matters.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Get More Done',
    description: 'Make your work flow smoother and take on more without extra effort.',
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: 'We Handle Tech',
    description: 'No tech skills needed and we take care of all the complicated parts for you.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Made for You',
    description: 'Custom automations that fit your goals and work with the tools you already use.',
  },
];

export default function BenefitsSection() {
  return (
    <section id="features">
      <div className="container mx-auto max-w-screen-xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The AutoMova Advantage
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Here’s how our custom automations give you an edge.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="transform transition-all duration-300 hover:scale-105 shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] bg-card">
              <CardHeader className="items-center text-center"> 
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 p-2">
                  {benefit.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">{benefit.title}</CardTitle>
                <CardDescription className="mt-2 text-sm text-muted-foreground">{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="text-center pt-8">
          <Button asChild size="lg" className="shadow-lg transition-transform hover:scale-105 rounded-full">
            <Link href="/#process">See How It Works</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
