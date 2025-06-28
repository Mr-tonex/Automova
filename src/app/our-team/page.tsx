
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import TeamSection from '@/components/landing/TeamSection';

export default function OurTeamPage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* We can reuse the TeamSection component here.
            It already has its own <section> tag and container.
            If we want a different title or layout specifically for this page,
            we might adjust TeamSection or add content around it.
            For now, just rendering TeamSection directly. */}
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
