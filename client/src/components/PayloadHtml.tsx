import { cn } from "@/lib/utils";

type PayloadHtmlProps = {
  html: string;
  className?: string;
};

export default function PayloadHtml({ html, className }: PayloadHtmlProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-none",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
