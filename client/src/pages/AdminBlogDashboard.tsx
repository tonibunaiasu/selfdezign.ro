import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Edit2, Trash2, Eye, X } from "lucide-react";
import { toast } from "sonner";

interface BlogFormData {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  tags: string;
  faqs: string;
  isPublished: "true" | "false";
}

const initialFormData: BlogFormData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  author: "SelfDezign",
  image: "",
  tags: "",
  faqs: "",
  isPublished: "false",
};

export default function AdminBlogDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [preview, setPreview] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // tRPC queries and mutations
  const { data: posts, isLoading: postsLoading, refetch } = trpc.blog.getPosts.useQuery();
  const createMutation = trpc.blog.createPost.useMutation();
  const updateMutation = trpc.blog.updatePost.useMutation();
  const deleteMutation = trpc.blog.deletePost.useMutation();

  // Check admin access
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Acces Refuzat</h1>
          <p className="text-gray-600">Doar administratorii pot accesa această pagină.</p>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slug || !formData.title || !formData.content) {
      toast.error("Completează câmpurile obligatorii: slug, titlu și conținut");
      return;
    }

    try {
      if (formData.id) {
        // Update existing post
        await updateMutation.mutateAsync({
          id: formData.id,
          ...formData,
        });
        toast.success("Articol actualizat cu succes!");
      } else {
        // Create new post
        await createMutation.mutateAsync(formData);
        toast.success("Articol creat cu succes!");
      }

      setFormData(initialFormData);
      setImageFile(null);
      setShowForm(false);
      refetch();
    } catch (error) {
      toast.error("Eroare la salvarea articolului");
      console.error(error);
    }
  };

  const handleEdit = (post: any) => {
    setFormData({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      author: post.author,
      image: post.image || "",
      tags: post.tags || "",
      faqs: post.faqs || "",
      isPublished: post.isPublished,
    });
    setShowForm(true);
    setPreview(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Ești sigur că vrei să ștergi acest articol?")) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success("Articol șters cu succes!");
        refetch();
      } catch (error) {
        toast.error("Eroare la ștergerea articolului");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard - Blog</h1>
          {!showForm && (
            <Button
              onClick={() => {
                setFormData(initialFormData);
                setShowForm(true);
              }}
              className="bg-accent text-black hover:bg-accent/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Articol Nou
            </Button>
          )}
        </div>

        {showForm ? (
          <Card className="p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {formData.id ? "Editare Articol" : "Articol Nou"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setPreview(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <Input
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="articol-titlu"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Titlu *</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Titlul articolului"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Rezumat scurt al articolului"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Conținut *</label>
                  <Textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Conținutul articolului"
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Autor</label>
                  <Input
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Autor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Imagine</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (CSV)</label>
                  <Input
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="design, interior, arhitectură"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    name="isPublished"
                    value={formData.isPublished}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="false">Ciornă</option>
                    <option value="true">Publicat</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPreview(!preview)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {preview ? "Ascunde Preview" : "Arată Preview"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="bg-accent text-black hover:bg-accent/90"
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvare...
                      </>
                    ) : (
                      "Salvează"
                    )}
                  </Button>
                </div>
              </form>

              {/* Preview */}
              {preview && (
                <div className="border rounded-lg p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-2">{formData.title || "Titlu articol"}</h3>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded mb-4" />
                  )}
                  <p className="text-sm text-gray-500 mb-4">
                    De {formData.author} | Status: {formData.isPublished === "true" ? "Publicat" : "Ciornă"}
                  </p>
                  {formData.excerpt && (
                    <p className="text-gray-600 mb-4 italic">{formData.excerpt}</p>
                  )}
                  <div className="prose prose-sm max-w-none">
                    {formData.content.split("\n").map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ) : null}

        {/* Articles List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Articole ({posts?.length || 0})</h2>
          {postsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin w-8 h-8" />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid gap-4">
              {posts.map((post: any) => (
                <Card key={post.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          post.isPublished === "true"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {post.isPublished === "true" ? "Publicat" : "Ciornă"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{post.excerpt}</p>
                      <p className="text-sm text-gray-500">
                        De {post.author} | {new Date(post.createdAt).toLocaleDateString("ro-RO")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">Nu sunt articole. Creează-l pe primul!</p>
              <Button
                onClick={() => {
                  setFormData(initialFormData);
                  setShowForm(true);
                }}
                className="bg-accent text-black hover:bg-accent/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Articol Nou
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
