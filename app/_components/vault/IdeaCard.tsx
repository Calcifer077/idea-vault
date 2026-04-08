import { Idea } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudOff, Loader2 } from "lucide-react";

interface IdeaCardProps {
  idea: Idea;
  index: number;
}

const syncIcons = {
  synced: <Cloud className="w-3.5 h-3.5 text-emerald-400" />,
  pending: <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />,
  local: <CloudOff className="w-3.5 h-3.5 text-muted-foreground" />,
};

export default function IdeaCard({ idea, index }: IdeaCardProps) {
  return (
    <div className="flex flex-col border max-w-95 p-6 rounded-xl">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-semibold text-sm text-foreground line-clamp-1">
          {idea.title}
        </div>
        <div>{syncIcons[idea.syncStatus]}</div>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
        {idea.description}
      </p>

      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {idea.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] px-1.5 py-0"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {idea.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {idea.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[10px] px-1.5 py-0 text-primary/70 border-primary/20"
            >
              {tech}
            </Badge>
          ))}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground/60 mt-3">
        {new Date(idea.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
