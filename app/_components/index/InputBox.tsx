"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Send, Sparkles, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

export default function InputBox() {
  const [markdownSupport, setMarkdownSupport] = useState(false);

  return (
    <div
      className="
      w-2xl mx-auto rounded-xl border border-border bg-card
      transition-all duration-300

      shadow-[0_0_10px_rgba(59,130,246,0.15),0_0_30px_rgba(139,92,246,0.1)]

      focus-within:shadow-[0_0_20px_rgba(59,130,246,0.35),0_0_50px_rgba(139,92,246,0.2)]
      focus-within:border-blue-500
    "
    >
      <div className="p-4">
        <textarea
          placeholder="Type your idea..."
          className="w-full min-h-30 bg-transparent border-none focus:ring-0 outline-none resize-none text-base placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex w-full gap-3 px-4 pb-4">
        <div className="flex-1">
          <Input
            placeholder="Tags (comma separated)"
            className="bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Tech Stack (comma separated)"
            className="bg-background/50 border-border focus-visible:ring-primary focus-visible:ring-1"
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
          <Button className="bg-primary text-primary-foreground hover:opacity-90 gap-2 px-6">
            <Send size={16} />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
