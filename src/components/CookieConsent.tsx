
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const LOCAL_STORAGE_KEY = 'automova_cookie_consent';

export default function CookieConsent() {
  // Start with consent assumed to be true on the server and check on the client.
  // This prevents the component from flashing on page load for users who have consented.
  const [hasConsented, setHasConsented] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // This runs only on the client.
    if (localStorage.getItem(LOCAL_STORAGE_KEY) !== 'true') {
      setHasConsented(false);
    }
  }, []);

  const acceptConsent = () => {
    setHasConsented(true);
    setIsPopupOpen(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
  };

  const handleIconClick = () => {
      // Only toggle the popup if consent has not been given.
      if (!hasConsented) {
          setIsPopupOpen((prev) => !prev);
      }
  };

  // If consent has been given, don't render anything.
  if (hasConsented) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-[100]">
      {/* The pop-up message that appears on icon click */}
      <div
        className={cn(
          'absolute bottom-full mb-3 w-72 rounded-lg border bg-card p-4 text-card-foreground shadow-2xl shadow-primary/20 transition-all duration-300 ease-in-out',
          isPopupOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <p className="text-sm">
          We use cookies to improve your experience. By clicking "Accept", you agree to our use of cookies.
          For more details, see our{' '}
          <Link href="/cookie-policy" className="underline text-primary hover:text-primary/80">
            Cookie Policy
          </Link>.
        </p>
        <Button size="sm" className="mt-4 w-full" onClick={acceptConsent}>
          Accept
        </Button>
      </div>

      {/* The cookie icon that acts as a trigger */}
      <Button
        onClick={handleIconClick}
        variant="default"
        size="icon"
        className="h-14 w-14 rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95"
        aria-label="Manage cookie consent"
      >
        <Cookie className="h-7 w-7" />
      </Button>
    </div>
  );
}
