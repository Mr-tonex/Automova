import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface FeatureHighlightProps {
  title: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;
  videoUrl?: string;
  layout?: 'text-left' | 'text-right';
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

export default function FeatureHighlightSection({
  title,
  text,
  imageUrl,
  imageAlt,
  imageHint,
  videoUrl,
  layout = 'text-left',
  features,
}: FeatureHighlightProps) {
  const isTextLeft = layout === 'text-left';

  return (
    <section>
      <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 lg:gap-20">
          <div className={`space-y-6 ${isTextLeft ? 'md:order-1 md:col-span-5' : 'md:order-2 md:col-span-5'}`}>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {text}
            </p>
            <ul className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={`flex items-center justify-center ${isTextLeft ? 'md:order-2 md:col-span-7' : 'md:order-1 md:col-span-7'}`}>
            <Card className="overflow-hidden rounded-xl shadow-[0_0_35px_5px_hsl(var(--primary)/0.2)] transition-transform duration-300 hover:scale-105 w-full aspect-video">
              {videoUrl ? (
                <video
                  src={videoUrl}
                  className="h-full w-full rounded-md object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                >
                  Your browser does not support the video tag.
                </video>
              ) : imageUrl && imageAlt && imageHint ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={600}
                  height={450}
                  className="h-full w-full rounded-md object-cover"
                  data-ai-hint={imageHint}
                />
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
