"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { addIdea } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

async function generateAISummary(content: string): Promise<{ title: string; summary: string; tags: string[]; techStack: string[] }> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Analyze this idea and respond ONLY with a JSON object (no markdown, no backticks):
{
  "title": "concise title (max 8 words)",
  "summary": "one sentence summary (max 20 words)",
  "tags": ["2-3 category tags like ai, productivity, devtools, etc"],
  "techStack": ["2-4 relevant technologies"]
}

Idea: ${content}`,
        },
      ],
    }),
  });
  const data = await response.json();
  const text = data.content?.[0]?.text || "{}";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return { title: "Untitled Idea", summary: content.slice(0, 80), tags: [], techStack: [] };
  }
}

export default function CapturePage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [techStack, setTechStack] = useState("");
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiResult, setAiResult] = useState<{ title?: string; summary?: string; tags?: string[]; techStack?: string[] } | null>(null);

  const handleAISummary = useCallback(async () => {
    if (!content.trim()) return;
    setIsSummarizing(true);
    try {
      const result = await generateAISummary(content);
      setAiResult(result);
      if (result.tags?.length && !tags) setTags(result.tags.join(", "));
      if (result.techStack?.length && !techStack) setTechStack(result.techStack.join(", "));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSummarizing(false);
    }
  }, [content, tags, techStack]);

  const handleSave = useCallback(async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    const parseTags = (s: string) =>
      s
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    addIdea({
      title: aiResult?.title || content.slice(0, 60),
      content,
      summary: aiResult?.summary,
      tags: parseTags(tags) || aiResult?.tags || [],
      techStack: parseTags(techStack) || aiResult?.techStack || [],
      pinned: false,
    });
    setIsSaving(false);
    router.push("/vault");
  }, [content, tags, techStack, aiResult, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
  };

  return (
    <main className="min-h-screen bg-background pt-14">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-10 animate-[fade-in-up_0.4s_ease_forwards]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-powered idea capture
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4 text-foreground">
            Capture your ideas
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            Your personal vault for thoughts, concepts, and inspiration.
            <br />
            Type freely — we&apos;ll organize it.
          </p>
        </div>

        {/* Card */}
        <div
          className={cn(
            "w-full max-w-2xl rounded-2xl border border-border bg-card shadow-xl shadow-black/5",
            "animate-[scale-up_0.4s_ease_forwards]",
            "glow-border"
          )}
        >
          {/* Textarea */}
          <Textarea
            placeholder="Type your idea..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "min-h-[180px] resize-none border-0 bg-transparent rounded-t-2xl",
              "text-base placeholder:text-muted-foreground/50 focus-visible:ring-0",
              "p-5 pb-3"
            )}
          />

          {/* AI result preview */}
          {aiResult && (
            <div className="mx-5 mb-3 px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs">
              <div className="font-semibold text-primary mb-0.5">
                {aiResult.title}
              </div>
              <div className="text-muted-foreground">{aiResult.summary}</div>
            </div>
          )}

          {/* Tag + Tech fields */}
          <div className="flex gap-3 px-5 pb-3">
            <Input
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="flex-1 h-9 text-sm bg-secondary border-border focus-visible:ring-0"
            />
            <Input
              placeholder="Tech stack (comma separated)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="flex-1 h-9 text-sm bg-secondary border-border focus-visible:ring-0"
            />
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between px-5 pb-5">
            <button
              className={cn(
                "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
                isMarkdown && "text-primary"
              )}
              onClick={() => setIsMarkdown(!isMarkdown)}
            >
              <FileText className="w-3.5 h-3.5" />
              Markdown
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs"
                onClick={handleAISummary}
                disabled={isSummarizing || !content.trim()}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isSummarizing ? "Thinking..." : "AI Summary"}
              </Button>
              <Button
                size="sm"
                className="gap-1.5 text-xs"
                onClick={handleSave}
                disabled={isSaving || !content.trim()}
              >
                <Send className="w-3.5 h-3.5" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <p className="mt-4 text-xs text-muted-foreground animate-[fade-in_0.6s_ease_forwards]">
          Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px]">
            ⌘
          </kbd>{" "}
          +{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border font-mono text-[10px]">
            Enter
          </kbd>{" "}
          to save
        </p>
      </div>
    </main>
  );
}
