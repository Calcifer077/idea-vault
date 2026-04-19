"use client";

import { useState } from "react";
import { useIdeas } from "../IdeasContext";

import { Send, Sparkles, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { Idea } from "@/app/_lib/types";
import { ideasToMarkdown } from "@/app/_lib/ideasToMarkdown";
import { generateSummary } from "@/app/_lib/generateSummary";
import { updateGithubFile } from "@/app/_lib/updateGithubFile";

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

    try {
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

      const summaryToUpload = await generateSummary(prompt);

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

      await updateGithubFile(ideasString);

      resetState();

      setIsSaving(false);

      toast.success("Idea saved successfully", {
        id: toastId,
        position: "top-center",
      });

      return "success";
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong", {
        id: toastId,
        position: "top-center",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function resetState() {
    setIdea("");
    setTags("");
    setTechStack("");
  }

  return (
    <div
      className={`
    w-full max-w-2xl mx-auto rounded-xl border border-border bg-card
    transition-all duration-300

    shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_30px_rgba(139,92,246,0.1)]

    focus-within:shadow-[0_0_20px_rgba(59,130,246,0.35),0_0_50px_rgba(139,92,246,0.2)]
    focus-within:border-blue-500
    
    ${error ? "shadow-[0_0_20px_rgba(239,68,68,0.35),0_0_50px_rgba(220,38,38,0.2)] border-destructive" : ""}
  `}
    >
      {/* Textarea */}
      <div className="p-3 sm:p-4">
        <textarea
          placeholder="Type your idea... (First line will be title)"
          className="w-full min-h-30 sm:min-h-35 bg-transparent border-none focus:ring-0 outline-none resize-none text-sm sm:text-base placeholder:text-muted-foreground"
          value={idea}
          onChange={(e) => {
            setIdea(e.target.value);
            setError(false);
          }}
          disabled={isSaving}
        />
      </div>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-3 px-3 sm:px-4 pb-4">
        <Input
          placeholder="Tags (comma separated)"
          className="w-full bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            setError(false);
          }}
          disabled={isSaving}
        />

        <Input
          placeholder="Tech Stack (comma separated)"
          className="w-full bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
          value={techStack}
          onChange={(e) => {
            setTechStack(e.target.value);
            setError(false);
          }}
          disabled={isSaving}
        />
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-3 border-t border-border bg-muted/30 rounded-b-xl">
        {/* Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full sm:w-auto"
          onClick={() => setMarkdownSupport(!markdownSupport)}
        >
          {markdownSupport ? (
            <ToggleRight className="text-primary" />
          ) : (
            <ToggleLeft />
          )}
          Markdown Support
        </Button>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            className="w-full sm:w-auto gap-2 shadow-sm"
          >
            <Sparkles size={16} className="text-primary" />
            Ai Summary
          </Button>

          <Button
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 gap-2"
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
