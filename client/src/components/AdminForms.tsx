import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Loader2, Save, Plus, Trash2, Edit2 } from "lucide-react";

// Home Content Form
export function HomeContentForm() {
  const [language, setLanguage] = useState("ro");
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    ctaText: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: homeContent } = trpc.content.getHome.useQuery({ language });
  const updateMutation = trpc.content.updateHome.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateMutation.mutateAsync({
        language,
        ...formData,
      });
      alert("Content updated successfully!");
    } catch (error) {
      alert("Error updating content");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Home Page Content</h3>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ro">Română</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="heroTitle">Hero Title</Label>
          <Input
            id="heroTitle"
            value={formData.heroTitle}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
            placeholder="Enter hero title"
          />
        </div>

        <div>
          <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
          <Input
            id="heroSubtitle"
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
            placeholder="Enter hero subtitle"
          />
        </div>

        <div>
          <Label htmlFor="heroDescription">Hero Description</Label>
          <Textarea
            id="heroDescription"
            value={formData.heroDescription}
            onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
            placeholder="Enter hero description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="ctaText">CTA Button Text</Label>
          <Input
            id="ctaText"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            placeholder="Enter CTA button text"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

// About Content Form
export function AboutContentForm() {
  const [language, setLanguage] = useState("ro");
  const [formData, setFormData] = useState({
    aboutText: "",
    visionText: "",
    valuesText: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateMutation = trpc.content.updateAbout.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateMutation.mutateAsync({
        language,
        ...formData,
      });
      alert("Content updated successfully!");
    } catch (error) {
      alert("Error updating content");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">About & Vision Content</h3>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ro">Română</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="aboutText">About Text</Label>
          <Textarea
            id="aboutText"
            value={formData.aboutText}
            onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
            placeholder="Enter about text"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="visionText">Vision Text</Label>
          <Textarea
            id="visionText"
            value={formData.visionText}
            onChange={(e) => setFormData({ ...formData, visionText: e.target.value })}
            placeholder="Enter vision text"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="valuesText">Values Text</Label>
          <Textarea
            id="valuesText"
            value={formData.valuesText}
            onChange={(e) => setFormData({ ...formData, valuesText: e.target.value })}
            placeholder="Enter values text"
            rows={4}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

// Contact Content Form
export function ContactContentForm() {
  const [language, setLanguage] = useState("ro");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address1: "",
    address2: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateMutation = trpc.content.updateContact.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateMutation.mutateAsync({
        language,
        ...formData,
      });
      alert("Contact info updated successfully!");
    } catch (error) {
      alert("Error updating contact info");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ro">Română</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            type="tel"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            type="email"
          />
        </div>

        <div>
          <Label htmlFor="address1">Address Line 1</Label>
          <Input
            id="address1"
            value={formData.address1}
            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
            placeholder="Enter address line 1"
          />
        </div>

        <div>
          <Label htmlFor="address2">Address Line 2</Label>
          <Input
            id="address2"
            value={formData.address2}
            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
            placeholder="Enter address line 2"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

// Footer Content Form
export function FooterContentForm() {
  const [language, setLanguage] = useState("ro");
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    socialLinks: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateMutation = trpc.content.updateFooter.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateMutation.mutateAsync({
        language,
        ...formData,
      });
      alert("Footer content updated successfully!");
    } catch (error) {
      alert("Error updating footer content");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Footer Content</h3>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ro">Română</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <Label htmlFor="companyDescription">Company Description</Label>
          <Textarea
            id="companyDescription"
            value={formData.companyDescription}
            onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
            placeholder="Enter company description"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="socialLinks">Social Links (JSON)</Label>
          <Textarea
            id="socialLinks"
            value={formData.socialLinks}
            onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
            placeholder='{"facebook": "...", "instagram": "..."}'
            rows={4}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}

// Team Members Form
export function TeamMembersForm() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { data: teamMembers = [] } = trpc.content.getTeam.useQuery({ language: "ro" });
  const createMutation = trpc.content.createTeamMember.useMutation();
  const deleteMutation = trpc.content.deleteTeamMember.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createMutation.mutateAsync({
        ...formData,
        language: "ro",
      });
      setFormData({ name: "", role: "", bio: "", image: "" });
      alert("Team member added successfully!");
    } catch (error) {
      alert("Error adding team member");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteMutation.mutateAsync({ id });
      alert("Team member deleted successfully!");
    } catch (error) {
      alert("Error deleting team member");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Add Team Member</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter team member name"
              required
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Enter role"
              required
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Enter bio"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Enter image URL"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </>
            )}
          </Button>
        </form>
      </Card>

      {teamMembers.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Current Team Members</h3>
          <div className="space-y-3">
            {teamMembers.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
