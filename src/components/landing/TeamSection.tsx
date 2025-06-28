import Image from 'next/image';

const teamMembers = [
    {
        name: 'Savdar Khourn',
        title: 'Automation Specialist',
        bio: "Savdar is an automation specialist who helps businesses save time and boost efficiency using smart AI systems. With a practical approach and strong technical skills, he delivers solutions that work.",
        avatar: '/6264656628594885616.jpg',
    },
    {
        name: 'Sihak Khun',
        title: 'Sales Specialist',
        bio: "Sihak is a driven sales specialist with a sharp understanding of what businesses need. Focused and passionate about helping clients succeed through smart automation, he brings clarity and energy to every conversation.",
        avatar: '/6264656628594885618.jpg',
    },
    {
        name: 'Daniel Chhorn',
        title: 'Marketing Specialist',
        bio: "Daniel is a marketing specialist who helps businesses grow through smart, creative strategies. With a sharp eye for trends and a results-driven mindset, he turns ideas into campaigns that deliver real impact.",
        avatar: '/6264656628594885617.jpg',
    },
];

export default function TeamSection() {
    return (
        <section id="our-team">
            <div className="container mx-auto max-w-screen-xl space-y-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Meet the Team
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        We're a group of thinkers and builders dedicated to making your business run smoother.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {teamMembers.map((member) => (
                        <div key={member.name} className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-[0_0_25px_3px_hsl(var(--primary)/0.2)]">
                            <Image
                                src={member.avatar}
                                alt={`Portrait of ${member.name}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                data-ai-hint="person portrait"
                            />
                            {/* Translucent overlay that expands on hover */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/50 backdrop-blur-sm text-white transition-all duration-500 ease-in-out h-28 group-hover:h-full">
                                <h3 className="text-2xl font-bold">{member.name}</h3>
                                <p className="text-base font-medium text-accent">{member.title}</p>
                                <div className="mt-4 opacity-0 transition-opacity duration-300 delay-200 group-hover:opacity-100">
                                    <p className="text-sm text-primary-foreground/90">{member.bio}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
