"use client";

import { Idea } from "@/types/idea";
import { Pin, PinOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IdeaCardProps {
  idea: Idea;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const TAG_COLORS: Record<string, string> = {};
const PALETTE = [
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
];

function getTagColor(tag: string): string {
  if (!TAG_COLORS[tag]) {
    const idx = Math.abs(
      tag.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
    ) % PALETTE.length;
    TAG_COLORS[tag] = PALETTE[idx];
  }
  return TAG_COLORS[tag];
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

export function IdeaCard({ idea, onDelete, onTogglePin }: IdeaCardProps) {
  const displayText = idea.summary || idea.content;
  const dateStr = idea.createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5 flex flex-col gap-3 transition-all duration-200",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "animate-[fade-in-up_0.3s_ease_forwards]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm leading-snug text-foreground pr-6">
          {idea.title}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "w-7 h-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
            idea.pinned && "opacity-100 text-primary"
          )}
          onClick={() => onTogglePin(idea.id)}
        >
          {idea.pinned ? (
            <Pin className="w-3.5 h-3.5" />
          ) : (
            <PinOff className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>

      {/* Content */}
      <p className="text-muted-foreground text-xs leading-relaxed flex-1">
        {truncate(displayText, 120)}
      </p>

      {/* Tags row */}
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-0.5 rounded-md text-[11px] font-medium border",
                "bg-secondary text-secondary-foreground border-border"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Tech stack */}
      {idea.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {idea.techStack.map((tech) => (
            <span
              key={tech}
              className={cn(
                "px-2 py-0.5 rounded-md text-[11px] font-medium border",
                getTagColor(tech)
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-muted-foreground">{dateStr}</span>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(idea.id)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
