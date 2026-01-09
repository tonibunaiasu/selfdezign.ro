import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import About from "./pages/About";
import AdminBlogDashboard from "./pages/AdminBlogDashboard";
import Articles from "./pages/Articles";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import ComponentShowcase from "./pages/ComponentShowcase";
import Home from "./pages/Home";
import MediaAppearances from "./pages/MediaAppearances";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Values from "./pages/Values";
import Vision from "./pages/Vision";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        {import.meta.env.DEV ? (
          <Route path="/components" component={ComponentShowcase} />
        ) : null}

        <Route path="/admin/blog" component={AdminBlogDashboard} />
        <Route path="/admin">{() => <Redirect to="/admin/blog" />}</Route>

        <Route path="/proiecte" component={Projects} />
        <Route path="/proiect/:slug" component={ProjectDetail} />

        <Route path="/contact" component={Contact} />
        <Route path="/articole" component={Articles} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />

        <Route path="/despre" component={About} />
        <Route path="/viziune" component={Vision} />
        <Route path="/valori" component={Values} />
        <Route path="/echipa" component={Team} />
        <Route path="/aparituri-media" component={MediaAppearances} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
