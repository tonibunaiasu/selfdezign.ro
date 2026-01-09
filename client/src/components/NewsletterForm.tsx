import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsletterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    if (!email.trim()) return;
    
    setStatus("loading");
    subscribeMutation.mutate({ email: email.trim() });
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-[var(--color-brand-yellow)]" />
        <h4 className="font-display font-bold text-lg uppercase tracking-wider">{t.footer.newsletter}</h4>
      </div>
      
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {t.footer.newsletterText}
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
              type="email"
              placeholder={t.footer.emailPlaceholder}
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
                t.footer.subscribe
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
