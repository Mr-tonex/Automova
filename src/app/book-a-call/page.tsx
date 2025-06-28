
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import CalEmbed from '@/components/landing/CalEmbed';

export default function BookCallPage() {
  // Your Cal.com link for embedding.
  const calLink = 'automova-egcgqk/30min'; 

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Book Your Free Strategy Session</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Choose a time that works for you. We look forward to speaking with you!
          </p>
        </div>
        <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
          <CalEmbed 
            calLink={calLink} 
            theme="dark" // Match the site's dark theme
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
