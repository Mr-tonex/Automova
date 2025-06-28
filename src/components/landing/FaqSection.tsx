
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer: "We partner with a wide range of businesses, from startups to established companies. If you're looking to streamline your processes, we can help.",
  },
  {
    question: "How long does it take to build an automation?",
    answer: "It depends on the project. A simple automation can be up and running in a few days, while more complex builds might take a couple of weeks. We'll give you a clear timeline after our first call.",
  },
  {
    question: "What tools or platforms do you integrate with?",
    answer: "We work with the tools you already use, including popular CRMs, email platforms, and more. We'll find a solution that fits right into your existing tech stack.",
  },
  {
    question: "Is there a minimum contract length?",
    answer: "We’re flexible. For one-off projects, there are no long-term contracts. If you need ongoing support, we can discuss a plan that works for you.",
  },
  {
    question: "How do I get started?",
    answer: "Getting started is simple. Just fill out our contact form or book a free call. We'll connect with you to understand your needs and map out a plan.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq">
      <div className="container mx-auto max-w-screen-lg space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Have Questions? We Have Answers.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Here are some answers to common questions. If you don't find what you're looking for, feel free to reach out!
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full rounded-lg bg-card p-6 sm:p-8 shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)]">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
