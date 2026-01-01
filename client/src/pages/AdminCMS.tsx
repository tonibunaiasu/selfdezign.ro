import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentEditor from "@/components/ContentEditor";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState("team");

  // Team Page
  const teamContent = trpc.cms.getTeamPageContent.useQuery();
  const updateTeamContent = trpc.cms.updateTeamPageContent.useMutation();

  // Projects Page
  const projectsContent = trpc.cms.getProjectsPageContent.useQuery();
  const updateProjectsContent = trpc.cms.updateProjectsPageContent.useMutation();

  // Blog Page
  const blogContent = trpc.cms.getBlogPageContent.useQuery();
  const updateBlogContent = trpc.cms.updateBlogPageContent.useMutation();

  // Media Page
  const mediaContent = trpc.cms.getMediaPageContent.useQuery();
  const updateMediaContent = trpc.cms.updateMediaPageContent.useMutation();

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
            {teamContent.isLoading ? (
              <div>Se încarcă...</div>
            ) : (
              <ContentEditor
                title="Pagina Echipei"
                fields={[
                  { name: "title", label: "Titlu", type: "text" },
                  { name: "description", label: "Descriere", type: "textarea" },
                  { name: "image", label: "Imagine", type: "image" },
                ]}
                initialData={teamContent.data || {}}
                onSave={async (data) => {
                  await updateTeamContent.mutateAsync(data);
                }}
              />
            )}
          </TabsContent>

          {/* Projects Page */}
          <TabsContent value="projects">
            {projectsContent.isLoading ? (
              <div>Se încarcă...</div>
            ) : (
              <ContentEditor
                title="Pagina Proiecte"
                fields={[
                  { name: "title", label: "Titlu", type: "text" },
                  { name: "description", label: "Descriere", type: "textarea" },
                  { name: "image", label: "Imagine", type: "image" },
                ]}
                initialData={projectsContent.data || {}}
                onSave={async (data) => {
                  await updateProjectsContent.mutateAsync(data);
                }}
              />
            )}
          </TabsContent>

          {/* Blog Page */}
          <TabsContent value="blog">
            {blogContent.isLoading ? (
              <div>Se încarcă...</div>
            ) : (
              <ContentEditor
                title="Pagina Blog"
                fields={[
                  { name: "title", label: "Titlu", type: "text" },
                  { name: "description", label: "Descriere", type: "textarea" },
                  { name: "image", label: "Imagine", type: "image" },
                ]}
                initialData={blogContent.data || {}}
                onSave={async (data) => {
                  await updateBlogContent.mutateAsync(data);
                }}
              />
            )}
          </TabsContent>

          {/* Media Page */}
          <TabsContent value="media">
            {mediaContent.isLoading ? (
              <div>Se încarcă...</div>
            ) : (
              <ContentEditor
                title="Pagina Media"
                fields={[
                  { name: "title", label: "Titlu", type: "text" },
                  { name: "description", label: "Descriere", type: "textarea" },
                  { name: "image", label: "Imagine", type: "image" },
                ]}
                initialData={mediaContent.data || {}}
                onSave={async (data) => {
                  await updateMediaContent.mutateAsync(data);
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
