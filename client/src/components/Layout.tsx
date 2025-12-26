import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Acasă" },
    { href: "/despre", label: "Despre" },
    { href: "/proiecte", label: "Proiecte" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Navigation */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              {/* Logo - Ruler icon representing the brand */}
              <div className="relative flex items-center">
                <div className="relative w-8 h-10 sm:w-10 sm:h-12 bg-accent flex items-center justify-center overflow-hidden rounded-t-sm">
                  {/* Ruler markings */}
                  <div className="absolute inset-0 flex flex-col justify-between py-1">
                    <div className="w-full h-[2px] bg-black/80"></div>
                    <div className="w-3/4 h-[1.5px] bg-black/60 ml-auto"></div>
                    <div className="w-full h-[2px] bg-black/80"></div>
                    <div className="w-3/4 h-[1.5px] bg-black/60 ml-auto"></div>
                    <div className="w-full h-[2px] bg-black/80"></div>
                    <div className="w-3/4 h-[1.5px] bg-black/60 ml-auto"></div>
                    <div className="w-full h-[2px] bg-black/80"></div>
                  </div>
                  {/* Hole at top */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black/20 rounded-full"></div>
                </div>
              </div>
              {/* Brand name - visible on all screens */}
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-lg sm:text-xl tracking-tighter uppercase">
                  SELF
                </span>
                <span className="font-display font-black text-lg sm:text-xl tracking-tighter uppercase">
                  DEZIGN
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors relative group",
                    location === link.href ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-[2px] bg-accent transform transition-transform duration-300 origin-left",
                    location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}></span>
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black rounded-none uppercase tracking-widest font-bold text-xs px-6">
                Scrie-ne
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="text-3xl font-display font-bold uppercase hover:text-accent transition-colors">
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button size="lg" className="bg-accent text-black hover:bg-accent/90 rounded-none uppercase tracking-widest font-bold mt-8">
                Scrie-ne
              </Button>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-white/10">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Footer Logo - Ruler icon */}
              <div className="relative w-8 h-10 bg-accent flex items-center justify-center overflow-hidden rounded-t-sm">
                <div className="absolute inset-0 flex flex-col justify-between py-1">
                  <div className="w-full h-[2px] bg-black/80"></div>
                  <div className="w-3/4 h-[1.5px] bg-black/60 ml-auto"></div>
                  <div className="w-full h-[2px] bg-black/80"></div>
                  <div className="w-3/4 h-[1.5px] bg-black/60 ml-auto"></div>
                  <div className="w-full h-[2px] bg-black/80"></div>
                  <div className="w-3/4 h-[1.5px] bg-black/60 ml-auto"></div>
                  <div className="w-full h-[2px] bg-black/80"></div>
                </div>
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/20 rounded-full"></div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-base tracking-tighter uppercase">SELF</span>
                <span className="font-display font-bold text-base tracking-tighter uppercase">DEZIGN</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transformăm spațiul într-o operă de artă care te reprezintă. 100% autentică. 100% funcțională.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-accent uppercase tracking-widest mb-6 text-sm">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <a href="tel:+40721528448" className="hover:text-white transition-colors">
                  +40-721-528-448
                </a>
              </li>
              <li>
                <a href="mailto:hello@selfdezign.ro" className="hover:text-white transition-colors">
                  hello@selfdezign.ro
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-accent uppercase tracking-widest mb-6 text-sm">Birouri</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <span className="block text-white mb-1">B1:</span>
                Strada Politiei, nr. 3, București
              </li>
              <li>
                <span className="block text-white mb-1">B2:</span>
                Sky Tower, Calea Floreasca nr. 246C, etaj 18, București
              </li>
            </ul>
          </div>

          <div>
            <NewsletterForm />
          </div>
        </div>

        {/* Second Row - Social */}
        <div className="container mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-display font-bold text-accent uppercase tracking-widest mb-4 text-sm">Urmărește-ne</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 text-sm font-bold">FB</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 text-sm font-bold">IG</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 text-sm font-bold">LI</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 SelfDezign®. Toate drepturile rezervate.</p>
          <p>Din arhitectura personalității tale.</p>
        </div>
      </footer>
    </div>
  );
}
