
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareQuote } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="container mx-auto max-w-screen-lg space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>
        <Card className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-card shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)] min-h-[300px]">
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-0">
            <MessageSquareQuote className="h-12 w-12 text-primary opacity-70 mb-4" />
            <p className="text-lg text-muted-foreground max-w-md">
              We’re still collecting feedback — but we’re proud of the results we’re seeing so far.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Check back soon for testimonials from our amazing clients!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
