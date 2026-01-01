import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentEditor from "@/components/ContentEditor";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState("team");

  const handleSave = async (data: Record<string, any>) => {
    try {
      // Placeholder for API calls
      console.log("Saving content:", data);
      // TODO: Implement actual API calls when backend is ready
      return Promise.resolve();
    } catch (error) {
      throw error;
    }
  };

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
              initialData={{
                title: "Echipa Noastră",
                description: "<p>Descrierea echipei...</p>",
                image: "https://via.placeholder.com/800x400",
              }}
              onSave={handleSave}
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
              initialData={{
                title: "Proiectele Noastre",
                description: "<p>Descrierea proiectelor...</p>",
                image: "https://via.placeholder.com/800x400",
              }}
              onSave={handleSave}
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
              initialData={{
                title: "Blog",
                description: "<p>Descrierea blog-ului...</p>",
                image: "https://via.placeholder.com/800x400",
              }}
              onSave={handleSave}
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
              initialData={{
                title: "Aparituri Media",
                description: "<p>Descrierea apariturilor media...</p>",
                image: "https://via.placeholder.com/800x400",
              }}
              onSave={handleSave}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
