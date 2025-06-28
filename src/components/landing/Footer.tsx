
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/auto-mova-7b6799368', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
  { href: 'https://www.instagram.com/auto.mova/', label: 'Instagram', icon: <Instagram className="h-5 w-5" /> },
  { href: 'https://x.com/auto_mova', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
  { href: '#', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookie-policy', label: 'Cookie Policy'},
  { href: '/terms', label: 'Terms of Service' },
  { href: '/about-us', label: 'About Us' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-neutral-300">
      <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-12 md:items-start md:gap-8">
          <div className="text-center md:col-span-4 md:text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/AutoMova 4k no bg.png" 
                alt="AutoMova Logo"
                width={60} 
                height={60} 
                className="mx-auto md:mx-0"
                priority
              />
            </Link>
            <p className="mt-4 text-sm text-neutral-300 font-bold max-w-xs mx-auto md:mx-0 md:max-w-none">
              We help businesses save time and grow by automating the boring stuff. Simple as that.
            </p>
          </div>

          <div className="hidden md:col-span-1 md:block"></div>

          <div className="mt-8 md:mt-6 md:col-span-7">
            <div className="flex flex-col items-center space-y-8 md:items-end">
              <div className="flex justify-center space-x-6 md:justify-end">
                {socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href} 
                    aria-label={link.label}
                    className="text-neutral-300 hover:text-white transition-transform duration-300 hover:scale-110"
                    target="_blank" 
                    rel="noopener noreferrer" 
                  >
                    <span className="sr-only">{link.label}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700">
                      {link.icon}
                    </div>
                  </Link>
                ))}
              </div>

              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end" aria-label="Footer navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-700 pt-8 text-center text-sm text-neutral-400">
          <p>
            Copyright ©{new Date().getFullYear()} | AutoMova | Designed by AutoMova Team
          </p>
        </div>
      </div>
    </footer>
  );
}
