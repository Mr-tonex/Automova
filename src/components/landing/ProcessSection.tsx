
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const processSteps = [
  {
    title: '1. Discovery Call',
    description: "We'll sit down with you to understand your business and find the best opportunities for automation.",
  },
  {
    title: '2. Custom Build',
    description: 'Our team gets to work designing and building your custom solution, making sure it fits perfectly with your existing tools.',
  },
  {
    title: '3. Launch & Grow',
    description: 'We launch your new workflow and provide ongoing support to make sure everything runs smoothly as you scale.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process">
      <div className="container mx-auto max-w-screen-xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Path to Automation
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We keep it simple. Here’s our three-step process to get you up and running.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => {
            const [numberString, ...titlePartsArray] = step.title.split('.');
            const stepNumberDisplay = numberString;
            const actualTitle = titlePartsArray.join('.').trim();

            return (
              <Card 
                key={index} 
                className="flex flex-col items-center p-6 text-center transition-shadow duration-300 shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] bg-card"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl font-bold shadow-md">
                  {stepNumberDisplay}
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold text-foreground">{actualTitle}</CardTitle>
                </CardHeader>
                <CardDescription className="mt-2 text-sm text-muted-foreground">{step.description}</CardDescription>
              </Card>
            );
          })}
        </div>
        <div className="text-center pt-8">
          <Button asChild size="lg" className="shadow-lg transition-transform hover:scale-105 rounded-full">
            <Link href="/book-a-call">Let's Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
