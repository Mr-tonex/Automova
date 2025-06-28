import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import AboutSection from '@/components/landing/AboutSection';

export default function AboutUsPage({ params, searchParams }: { params: {}; searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* We can reuse the AboutSection component here.
            It already has its own <section> tag and container.
            If we want a different title or layout specifically for this page,
            we might adjust AboutSection or add content around it.
            For now, just rendering AboutSection directly. */}
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
