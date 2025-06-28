
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="container mx-auto max-w-screen-md px-4 sm:px-6 lg:px-8">
        <Card className="text-center overflow-hidden shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)]">
          <CardHeader className="bg-muted/30 p-8 md:p-10">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to simplify your work?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 md:p-10 space-y-6">
            <CardDescription className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Let's talk about how we can help your business. Schedule a free discovery call to get a personalized automation plan.
            </CardDescription>
            <div className="flex justify-center">
              <Button asChild size="lg" className="shadow-lg transition-transform hover:scale-105 rounded-full">
                <Link href="/book-a-call">Book a Free Call</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
