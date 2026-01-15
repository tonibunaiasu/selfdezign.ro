import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Redirect, Route, Switch, type RouteComponentProps } from "wouter";
import { lazy, Suspense } from "react";

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const NotFound = lazy(() => import("@/pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const AdminBlogDashboard = lazy(() => import("./pages/AdminBlogDashboard"));
const Articles = lazy(() => import("./pages/Articles"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogTag = lazy(() => import("./pages/BlogTag"));
const Contact = lazy(() => import("./pages/Contact"));
const ComponentShowcase = import.meta.env.DEV
  ? lazy(() => import("./pages/ComponentShowcase"))
  : null;
const Home = lazy(() => import("./pages/Home"));
const MediaAppearances = lazy(() => import("./pages/MediaAppearances"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const Team = lazy(() => import("./pages/Team"));
const Values = lazy(() => import("./pages/Values"));
const Vision = lazy(() => import("./pages/Vision"));

function CmsRedirect({ params }: RouteComponentProps<{ rest?: string }>) {
  if (typeof window !== "undefined") {
    const suffix = params?.rest ? `/${params.rest}` : "";
    window.location.replace(`https://cms.selfdezign.ro${suffix}`);
  }
  return null;
}

function Router() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Home} />
          {import.meta.env.DEV && ComponentShowcase ? (
            <Route path="/components" component={ComponentShowcase} />
          ) : null}

          <Route path="/admin/blog" component={AdminBlogDashboard} />
          <Route path="/admin">{() => <Redirect to="/admin/blog" />}</Route>

          <Route path="/proiecte" component={Projects} />
          <Route path="/proiect/:slug" component={ProjectDetail} />

          <Route path="/contact" component={Contact} />
          <Route path="/articole" component={Articles} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/tag/:tag" component={BlogTag} />
          <Route path="/blog/:slug" component={BlogPost} />

          <Route path="/cms" component={CmsRedirect} />
          <Route path="/cms/:rest*" component={CmsRedirect} />

          <Route path="/despre" component={About} />
          <Route path="/viziune" component={Vision} />
          <Route path="/valori" component={Values} />
          <Route path="/echipa" component={Team} />
          <Route path="/aparituri-media">{() => <Redirect to="/aparitii-media" />}</Route>
          <Route path="/aparitii-media" component={MediaAppearances} />

          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
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
