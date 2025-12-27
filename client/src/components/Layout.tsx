import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Facebook, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

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
    { href: "/", label: t.nav.home },
    { href: "/despre", label: t.nav.about },
    { href: "/echipa", label: t.nav.team },
    { href: "/proiecte", label: t.nav.projects },
    { href: "/contact", label: t.nav.contact },
    { href: "/blog", label: t.nav.blog },
    { href: "/aparituri-media", label: "Media" },
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
              {/* Logo - SelfDezign brand */}
              <img 
                src="/images/logo_selfdezign.png" 
                alt="SelfDezign Logo" 
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors relative group",
                    location === link.href ? "text-accent font-bold" : "text-foreground/80 hover:text-foreground"
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
              <Button variant="outline" className="border-accent text-black bg-accent hover:bg-accent/90 hover:text-black rounded-none uppercase tracking-widest font-bold text-xs px-6">
                {t.nav.writeUs}
              </Button>
            </Link>
            <LanguageToggle />
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
                {t.nav.writeUs}
              </Button>
            </Link>
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 md:py-16 border-t border-white/10">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/logo-footer-ruler.png" alt="SelfDezign" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-accent uppercase tracking-widest mb-6 text-sm">{t.footer.contact}</h4>
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
        <div className="container mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="font-display font-bold text-accent uppercase tracking-widest mb-4 text-sm">Urmărește-ne</h4>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/selfdezign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300" title="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/selfdezign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300" title="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/company/selfdezign" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 SelfDezign®. {t.footer.rights}</p>
          <p>Din arhitectura personalității tale.</p>
        </div>
      </footer>
    </div>
  );
}
