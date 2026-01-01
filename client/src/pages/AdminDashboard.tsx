import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { HomeContentForm, AboutContentForm, ContactContentForm, FooterContentForm, TeamMembersForm } from "@/components/AdminForms";

type AdminSection =
  | "home"
  | "about"
  | "team"
  | "blog"
  | "contact"
  | "footer"
  | "seo"
  | "cms";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [currentSection, setCurrentSection] = useState<AdminSection>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "cms", label: "Gestionare Conținut", icon: FileText },
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About & Vision", icon: FileText },
    { id: "team", label: "Team", icon: Users },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "contact", label: "Contact", icon: Settings },
    { id: "footer", label: "Footer", icon: Settings },
    { id: "seo", label: "SEO Metadata", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const handleCMSClick = () => {
    navigate("/admin/cms");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-foreground">SelfDezign</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "cms") {
                    handleCMSClick();
                  } else {
                    setCurrentSection(item.id as AdminSection);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentSection === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
                {sidebarOpen && currentSection === item.id && (
                  <ChevronRight size={16} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            {sidebarOpen ? (
              <>
                <LogOut size={16} className="mr-2" />
                Logout
              </>
            ) : (
              <LogOut size={16} />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {menuItems.find((m) => m.id === currentSection)?.label}
            </h2>
            <p className="text-muted-foreground">
              Edit your website content and settings
            </p>
          </div>

          {/* Content Area */}
          <div className="max-w-4xl">
            {currentSection === "home" && <HomeSection />}
            {currentSection === "about" && <AboutSection />}
            {currentSection === "team" && <TeamSection />}
            {currentSection === "blog" && <BlogSection />}
            {currentSection === "contact" && <ContactSection />}
            {currentSection === "footer" && <FooterSection />}
            {currentSection === "seo" && <SeoSection />}
          </div>
        </div>
      </main>
    </div>
  );
}

// Section Components
function HomeSection() {
  return <HomeContentForm />;
}

function AboutSection() {
  return <AboutContentForm />;
}

function TeamSection() {
  return <TeamMembersForm />;
}

function BlogSection() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Blog Posts</h3>
      <p className="text-muted-foreground">Blog management coming soon...</p>
    </Card>
  );
}

function ContactSection() {
  return <ContactContentForm />;
}

function FooterSection() {
  return <FooterContentForm />;
}

function SeoSection() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">SEO Metadata</h3>
      <p className="text-muted-foreground">SEO management coming soon...</p>
    </Card>
  );
}
