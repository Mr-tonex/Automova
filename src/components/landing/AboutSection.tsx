
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, Users, BarChart3, CheckCircle } from 'lucide-react';

export default function AboutSection() {
  const coreValues = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary mb-2" />,
      title: "Innovation",
      description: "We're always learning and exploring new tech to build the best possible solutions for you."
    },
    {
      icon: <Users className="h-8 w-8 text-primary mb-2" />,
      title: "Client-Centricity",
      description: "We're successful when you are. We listen to your needs and work with you to achieve your goals."
    },
    {
      icon: <Target className="h-8 w-8 text-primary mb-2" />,
      title: "Results-Driven",
      description: "We build solutions that deliver real, measurable results—saving time, cutting costs, and driving growth."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary mb-2" />,
      title: "Integrity & Transparency",
      description: "We build partnerships on trust. That means clear, honest communication every step of the way."
    }
  ];

  return (
    <section id="about">
      <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We're Your <span className="text-primary">Automation Partner</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
            We’re a team of problem-solvers passionate about helping businesses like yours work smarter, not harder. We believe automation should be a powerful tool that’s accessible to everyone, and we partner with you to make that happen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              To make powerful automation simple and accessible for businesses of all sizes, clearing the way for growth and innovation. We handle the complexity so you can focus on your core mission.
            </p>
          </div>
          <div className="order-1 md:order-2 shadow-[0_0_30px_5px_hsl(var(--primary)/0.25)] rounded-lg">
            <Image
              src="https://placehold.co/600x400.png"
              alt="AutoMova team working on automation solutions"
              width={600}
              height={400}
              className="rounded-lg" 
              data-ai-hint="teamwork office"
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value) => (
              <Card 
                key={value.title} 
                className="text-center bg-secondary/30 hover:shadow-lg transition-shadow shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)]"
              >
                <CardHeader className="items-center">
                  {value.icon}
                  <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 rounded-lg shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] bg-card">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground text-center mb-8">
            Why Partner with AutoMova?
          </h2>
          <div className="grid md:grid-cols-1 gap-8 text-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="mr-2 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <p className="text-muted-foreground"><strong className="text-foreground">Strategic Partnership:</strong> We work as an extension of your team, aligning our strategy with your goals to ensure our work has a real impact.</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="mr-2 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <p className="text-muted-foreground"><strong className="text-foreground">Truly Custom Solutions:</strong> Your business is unique, and your automation should be too. We create custom solutions that fit the way you work.</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="mr-2 mt-1 h-6 w-6 flex-shrink-0 text-primary" />
              <p className="text-muted-foreground"><strong className="text-foreground">Future-Ready & Scalable:</strong> We build solutions that grow with you, ready for today's challenges and tomorrow's opportunities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
