import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    { href: "/proiecte", label: "Proiecte" },
    { href: "/contact", label: "Contact" },
    { href: "/articole", label: "Media" },
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
              <div className="relative w-10 h-10 bg-accent flex items-center justify-center overflow-hidden">
                <span className="font-display font-bold text-2xl text-black transform group-hover:scale-110 transition-transform duration-300">S</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
              <span className="font-display font-bold text-xl tracking-tighter uppercase hidden sm:block">
                SelfDezign
              </span>
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
              <div className="w-8 h-8 bg-accent flex items-center justify-center">
                <span className="font-display font-bold text-xl text-black">S</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tighter uppercase">
                SelfDezign
              </span>
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
            <h4 className="font-display font-bold text-accent uppercase tracking-widest mb-6 text-sm">Social</h4>
            <div className="flex gap-4">
              {/* Social Icons placeholders */}
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300">FB</a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300">IG</a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all duration-300">LI</a>
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
