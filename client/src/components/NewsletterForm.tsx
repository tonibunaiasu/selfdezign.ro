import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type NewsletterFormProps = {
  title?: string;
  text?: string;
  placeholder?: string;
  buttonLabel?: string;
};

export default function NewsletterForm({
  title,
  text,
  placeholder,
  buttonLabel,
}: NewsletterFormProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const titleText = title || t.footer.newsletter;
  const bodyText = text || t.footer.newsletterText;
  const placeholderText = placeholder || t.footer.emailPlaceholder;
  const submitLabel = buttonLabel || t.footer.subscribe;

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    },
    onError: (error) => {
      setStatus("error");
      setMessage(error.message || t.footer.subscribeError);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      setStatus("error");
      setMessage(t.footer.subscribeError);
      return;
    }
    
    setStatus("loading");
    subscribeMutation.mutate({ email: trimmed });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-[var(--color-brand-yellow)]" />
        <h4 className="font-display font-bold text-lg uppercase tracking-wider">{titleText}</h4>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {bodyText}
      </p>

      {status === "success" ? (
        <div className="flex items-center gap-2 text-[var(--color-brand-yellow)] bg-[var(--color-brand-yellow)]/10 p-4 border border-accent/20">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              aria-label={placeholderText}
              type="email"
              placeholder={placeholderText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-none focus:border-accent focus:ring-accent"
              disabled={status === "loading"}
            />
            <Button 
              type="submit" 
              className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none px-6 font-bold uppercase tracking-wider"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                submitLabel
              )}
            </Button>
          </div>
          
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
