
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import React, { useState, MouseEvent, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NavItems = [
  { label: 'Services', href: '/services', defaultLabel: 'Services' },
  { label: 'Our Edge', href: '/why-automova', defaultLabel: 'Our Edge' },
  { label: 'Our Team', href: '/our-team', defaultLabel: 'Our Team' },
];

const ctaButtonText = "Book a Call"; 

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const NavLinkComponent = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string; }) => {
    const isHashLink = href.includes('#');
    const baseHref = href.split('#')[0] || '/';
    const hash = isHashLink ? href.substring(href.lastIndexOf('#')) : '';
    
    const isActive = !isHashLink && pathname === href;

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      closeMobileMenu();

      if (isHashLink && (baseHref === pathname || (baseHref === '/' && pathname === '/'))) {
        e.preventDefault();
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          if (window.location.pathname === (baseHref === '/' ? '' : baseHref) || (baseHref === '/' && window.location.pathname === '/')) {
             history.pushState(null, '', hash);
          }
        } else {
          router.push(href); 
        }
      }
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          "relative group py-2 font-medium tracking-wide text-slate-300 transition-colors hover:text-white",
          isActive && "text-white",
          className
        )}
        scroll={!(isHashLink && (baseHref === pathname || (baseHref === '/' && pathname === '/')))}
      >
        {children}
        <span className={cn(
          "absolute bottom-0 left-0 block h-[2px] w-full bg-gradient-to-r from-blue-500 to-cyan-400 transform transition-transform duration-300 ease-out origin-left",
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )} />
      </Link>
    );
  };


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
      hasScrolled ? "py-2" : "py-4"
    )}>
      <div className={cn(
        "container mx-auto flex h-16 max-w-screen-xl items-center justify-between rounded-full bg-[#0B0F1A]/80 backdrop-blur-md px-6 shadow-lg",
        "border border-[#2A2A2A]"
      )}>
        <Link href="/" className="group flex items-center space-x-2 transition-transform hover:scale-105" onClick={closeMobileMenu}>
          <Image
            src="/AutoMova 4k no bg.png"
            alt="AutoMova Logo"
            width={50}
            height={50}
            priority
            className="transition-transform duration-300 group-hover:rotate-[2deg] group-hover:scale-110"
          />
          <span className="font-extrabold text-2xl text-foreground">
            Auto<span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">M</span>ova
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden md:flex gap-6">
            {NavItems.map((item) => (
              <NavLinkComponent
                key={item.defaultLabel}
                href={item.href}
              >
                {item.defaultLabel}
              </NavLinkComponent>
            ))}
          </nav>

          <Link
            href="/book-a-call"
            className="hidden md:inline-block relative group rounded-full overflow-hidden
                       transition-transform duration-300 ease-in-out
                       hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.7)]"
          >
            <div
              className="absolute inset-[-1000%]
                         bg-[conic-gradient(from_var(--angle),_transparent_40%,_hsl(var(--accent)),_hsl(var(--primary))_55%,_transparent)]
                         animate-border-spin
                         group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent
                         group-hover:animate-none"
            />
            <div
              className="relative m-[1.5px] rounded-full px-5 py-2.5
                         bg-[#0B0F1A]/90 backdrop-blur-md
                         text-slate-200 font-medium tracking-wide
                         group-hover:text-white group-hover:font-semibold
                         transition-colors duration-300"
            >
              {ctaButtonText}
            </div>
          </Link>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0B0F1A]/95 border-l border-[#1A1A1A]">
              <div className="grid gap-6 p-6">
                <Link href="/" className="flex items-center space-x-2 mb-4" onClick={closeMobileMenu}>
                  <Image
                    src="/AutoMova 4k no bg.png"
                    alt="AutoMova Logo"
                    width={60}
                    height={60}
                    priority
                  />
                  <span className="font-extrabold text-2xl text-foreground">
                    Auto<span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">M</span>ova
                  </span>
                </Link>
                {NavItems.map((item) => (
                  <NavLinkComponent
                    key={item.defaultLabel}
                    href={item.href}
                    className="block py-2 text-lg"
                  >
                    {item.defaultLabel}
                  </NavLinkComponent>
                ))}
                <Button
                  asChild
                  className="w-full transition-transform hover:scale-105 rounded-full bg-primary text-primary-foreground cta-glow" 
                  variant="default"
                >
                  <Link href="/book-a-call" onClick={closeMobileMenu}>{ctaButtonText}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
