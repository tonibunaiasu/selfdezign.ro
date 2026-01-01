import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";

interface ContentEditorProps {
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: "text" | "textarea" | "image";
    placeholder?: string;
  }>;
  initialData?: Record<string, any>;
  onSave: (data: Record<string, any>) => Promise<void>;
  onCancel?: () => void;
}

export default function ContentEditor({
  title,
  fields,
  initialData = {},
  onSave,
  onCancel,
}: ContentEditorProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave(data);
      toast.success("Conținut salvat cu succes!");
    } catch (error) {
      toast.error("Eroare la salvarea conținutului");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>

            {field.type === "text" && (
              <Input
                id={field.name}
                type="text"
                placeholder={field.placeholder}
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="mt-2"
              />
            )}

            {field.type === "textarea" && (
              <div className="mt-2">
                <RichTextEditor
                  value={data[field.name] || ""}
                  onChange={(value) => handleChange(field.name, value)}
                  placeholder={field.placeholder}
                />
              </div>
            )}

            {field.type === "image" && (
              <div className="mt-2 space-y-2">
                <Input
                  id={field.name}
                  type="text"
                  placeholder="URL imagine"
                  value={data[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
                {data[field.name] && (
                  <img
                    src={data[field.name]}
                    alt={field.label}
                    className="w-full max-w-xs h-auto rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Se salvează...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvează
              </>
            )}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Anulează
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
