import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentEditor from "@/components/ContentEditor";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

interface PageContent {
  title: string;
  description: string;
  image: string;
}

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState("team");
  const [teamContent, setTeamContent] = useState<PageContent>({
    title: "",
    description: "",
    image: "",
  });
  const [projectsContent, setProjectsContent] = useState<PageContent>({
    title: "",
    description: "",
    image: "",
  });
  const [blogContent, setBlogContent] = useState<PageContent>({
    title: "",
    description: "",
    image: "",
  });
  const [mediaContent, setMediaContent] = useState<PageContent>({
    title: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch content on mount
  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      const [team, projects, blog, media] = await Promise.all([
        fetch("/api/trpc/cms.getTeamPageContent").then((r) => r.json()),
        fetch("/api/trpc/cms.getProjectsPageContent").then((r) => r.json()),
        fetch("/api/trpc/cms.getBlogPageContent").then((r) => r.json()),
        fetch("/api/trpc/cms.getMediaPageContent").then((r) => r.json()),
      ]);

      if (team?.result?.data) setTeamContent(team.result.data);
      if (projects?.result?.data) setProjectsContent(projects.result.data);
      if (blog?.result?.data) setBlogContent(blog.result.data);
      if (media?.result?.data) setMediaContent(media.result.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTeam = async (data: Record<string, any>) => {
    try {
      const response = await fetch("/api/trpc/cms.updateTeamPageContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await response.json();
      if (result?.result?.data?.success) {
        setTeamContent(data);
        toast.success("Conținut salvat cu succes!");
      }
    } catch (error) {
      toast.error("Eroare la salvarea conținutului");
      console.error(error);
    }
  };

  const handleSaveProjects = async (data: Record<string, any>) => {
    try {
      const response = await fetch("/api/trpc/cms.updateProjectsPageContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await response.json();
      if (result?.result?.data?.success) {
        setProjectsContent(data);
        toast.success("Conținut salvat cu succes!");
      }
    } catch (error) {
      toast.error("Eroare la salvarea conținutului");
      console.error(error);
    }
  };

  const handleSaveBlog = async (data: Record<string, any>) => {
    try {
      const response = await fetch("/api/trpc/cms.updateBlogPageContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await response.json();
      if (result?.result?.data?.success) {
        setBlogContent(data);
        toast.success("Conținut salvat cu succes!");
      }
    } catch (error) {
      toast.error("Eroare la salvarea conținutului");
      console.error(error);
    }
  };

  const handleSaveMedia = async (data: Record<string, any>) => {
    try {
      const response = await fetch("/api/trpc/cms.updateMediaPageContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const result = await response.json();
      if (result?.result?.data?.success) {
        setMediaContent(data);
        toast.success("Conținut salvat cu succes!");
      }
    } catch (error) {
      toast.error("Eroare la salvarea conținutului");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Se încarcă conținutul...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestionare Conținut</h1>
          <p className="text-muted-foreground mt-2">
            Editează textele și imaginile de pe paginile website-ului
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="team">Echipa</TabsTrigger>
            <TabsTrigger value="projects">Proiecte</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          {/* Team Page */}
          <TabsContent value="team">
            <ContentEditor
              title="Pagina Echipei"
              fields={[
                { name: "title", label: "Titlu", type: "text" },
                { name: "description", label: "Descriere", type: "textarea" },
                { name: "image", label: "Imagine", type: "image" },
              ]}
              initialData={teamContent}
              onSave={handleSaveTeam}
            />
          </TabsContent>

          {/* Projects Page */}
          <TabsContent value="projects">
            <ContentEditor
              title="Pagina Proiecte"
              fields={[
                { name: "title", label: "Titlu", type: "text" },
                { name: "description", label: "Descriere", type: "textarea" },
                { name: "image", label: "Imagine", type: "image" },
              ]}
              initialData={projectsContent}
              onSave={handleSaveProjects}
            />
          </TabsContent>

          {/* Blog Page */}
          <TabsContent value="blog">
            <ContentEditor
              title="Pagina Blog"
              fields={[
                { name: "title", label: "Titlu", type: "text" },
                { name: "description", label: "Descriere", type: "textarea" },
                { name: "image", label: "Imagine", type: "image" },
              ]}
              initialData={blogContent}
              onSave={handleSaveBlog}
            />
          </TabsContent>

          {/* Media Page */}
          <TabsContent value="media">
            <ContentEditor
              title="Pagina Media"
              fields={[
                { name: "title", label: "Titlu", type: "text" },
                { name: "description", label: "Descriere", type: "textarea" },
                { name: "image", label: "Imagine", type: "image" },
              ]}
              initialData={mediaContent}
              onSave={handleSaveMedia}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
