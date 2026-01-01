import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Values from "./pages/Values";
import ProjectDetail from "./pages/ProjectDetail";
import Team from "./pages/Team";
import MediaAppearances from "./pages/MediaAppearances";
import AdminBlogDashboard from "./pages/AdminBlogDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function Router() {
  return (
    <Switch>
      {/* Admin routes without Layout */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin">
        {() => (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        )}
      </Route>
      
      {/* Public routes with Layout */}
      <Route>
        {() => (
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/admin/blog" component={AdminBlogDashboard} />
              <Route path="/proiecte" component={Projects} />
              <Route path="/contact" component={Contact} />
              <Route path="/articole" component={Articles} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:slug" component={BlogPost} />
              <Route path="/despre" component={About} />
              <Route path="/viziune" component={Vision} />
              <Route path="/valori" component={Values} />
              <Route path="/echipa" component={Team} />
              <Route path="proiect/:slug" component={ProjectDetail} />
              <Route path="/aparituri-media" component={MediaAppearances} />
              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
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

export default App;
