"use client";

import { useState } from "react";
import { useIdeas } from "../IdeasContext";

import { Idea } from "@/app/_lib/types";
import { Send, Sparkles, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ideasToMarkdown } from "@/app/_lib/ideasToMarkdown";

export default function InputBox() {
  const { state, dispatch } = useIdeas();

  const [markdownSupport, setMarkdownSupport] = useState(false);
  const [idea, setIdea] = useState("");
  const [tags, setTags] = useState("");
  const [techStack, setTechStack] = useState("");

  const [error, setError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const toastId = "save-idea";

    setIsSaving(true);

    toast.loading("Working...", { id: toastId, position: "top-center" });

    const titleToUpload = idea.split(/\r?\n/)[0];
    const descriptionToUpload = idea.split(/\r?\n/).slice(1).join("\n").trim();

    const tagsToUpload = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const techStackToUpload = techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (
      !titleToUpload.length ||
      !descriptionToUpload.length ||
      !tagsToUpload.length ||
      !techStackToUpload.length
    ) {
      setError(true);

      toast.error("Kindly fill all the fields", {
        id: toastId,
        position: "top-center",
      });

      setIsSaving(false);

      return;
    }

    const prompt = `
      You are an assistant that writes concise, high-quality summaries.

      Given the following idea details:
      - Title: ${titleToUpload}
      - Description: ${descriptionToUpload}
      - Tags: ${tagsToUpload.join(", ")}
      - Tech Stack: ${techStackToUpload.join(", ")}

      Write a short summary (1 sentence) that:
      - Clearly explains the core idea
      - Highlights the main purpose or value
      - Mentions key technologies only if relevant
      - Avoids repetition or fluff

      Keep the tone clear, professional, and easy to understand.
      Do NOT copy sentences directly from the description. Paraphrase instead.

      Return ONLY the summary text.
    `;

    toast.loading("Generating summary...", {
      id: toastId,
      position: "top-center",
    });

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      toast.error("Failed to generate summary", {
        id: toastId,
        position: "top-center",
      });
      return;
    }

    const summaryData = await res.json();
    const summaryToUpload =
      summaryData.summary || summaryData.text || summaryData;

    const newIdea: Idea = {
      id: crypto.randomUUID().toString(),
      title: titleToUpload,
      description: descriptionToUpload,
      summary: summaryToUpload,
      tags: tagsToUpload,
      techStack: techStackToUpload,
      syncStatus: "synced",
      createdAt: new Date().toISOString(),
    };

    const updatedIdeas = [...state, newIdea];

    dispatch({
      type: "add",
      payload: newIdea,
    });

    const ideasString = ideasToMarkdown(updatedIdeas);

    toast.loading("Saving idea...", { id: toastId, position: "top-center" });

    await fetch("/api/github/updateFile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown: ideasString }),
    });

    resetState();

    setIsSaving(false);

    toast.success("Idea saved successfully", {
      id: toastId,
      position: "top-center",
    });

    return "success";
  }

  function resetState() {
    setIdea("");
    setTags("");
    setTechStack("");
  }

  // function handleToast(state: string, message: string) {
  //   if (state === "Error") {
  //     toast.error(message, { position: "top-left" });
  //   } else if (state === "Success") {
  //     toast.success(message, { position: "top-left" });
  //   } else if (state === "Loading") {
  //     toast.loading(message, { position: "top-left" });
  //   }
  // }

  return (
    <div
      className={`
      w-2xl mx-auto rounded-xl border border-border bg-card
      transition-all duration-300

      shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_30px_rgba(139,92,246,0.1)]

      focus-within:shadow-[0_0_20px_rgba(59,130,246,0.35),0_0_50px_rgba(139,92,246,0.2)]
      focus-within:border-blue-500
      
      ${error ? "shadow-[0_0_20px_rgba(239,68,68,0.35),0_0_50px_rgba(220,38,38,0.2)] border-destructive" : ""}
      
    `}
    >
      <div className="p-4">
        <textarea
          placeholder="Type your idea... (First line will be title)"
          className="w-full min-h-30 bg-transparent border-none focus:ring-0 outline-none resize-none text-base placeholder:text-muted-foreground"
          value={idea}
          onChange={(e) => {
            setIdea(e.target.value);
            setError(false);
          }}
          disabled={isSaving}
        />
      </div>

      <div className="flex w-full gap-3 px-4 pb-4">
        <div className="flex-1">
          <Input
            placeholder="Tags (comma separated)"
            className="bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
              setError(false);
            }}
            disabled={isSaving}
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Tech Stack (comma separated)"
            className="bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
            value={techStack}
            onChange={(e) => {
              setTechStack(e.target.value);
              setError(false);
            }}
            disabled={isSaving}
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center p-3 border-t border-border bg-muted/30 rounded-b-xl">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMarkdownSupport(!markdownSupport)}
        >
          {markdownSupport ? (
            <ToggleRight className="text-primary" />
          ) : (
            <ToggleLeft />
          )}
          Markdown Support
        </Button>

        <div className="flex gap-2">
          {/* AI Button using Secondary/Accent logic */}
          <Button variant="secondary" className="gap-2 shadow-sm">
            <Sparkles size={16} className="text-primary" />
            Ai Summary
          </Button>

          {/* Primary Action */}
          <Button
            className="bg-primary text-primary-foreground hover:opacity-90 gap-2 px-6"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Send size={16} />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
