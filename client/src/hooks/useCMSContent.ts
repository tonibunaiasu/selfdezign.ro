import { useState, useEffect } from "react";

export interface CMSContent {
  title: string;
  description: string;
  image: string;
}

export function useCMSContent(endpoint: string) {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/trpc/${endpoint}`);
        const data = await response.json();
        
        if (data?.result?.data) {
          setContent(data.result.data);
        } else {
          setContent(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error(`Error fetching ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [endpoint]);

  return { content, loading, error };
}
