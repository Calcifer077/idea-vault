import { Idea } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudOff, Loader2, Trash2 } from "lucide-react";
import { useIdeas } from "../IdeasContext";
import { toast } from "sonner";
import { ideasToMarkdown } from "@/app/_lib/ideasToMarkdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IdeaCardProps {
  idea: Idea;
  index: number;
  onClick?: (idea: Idea) => void;
}

const syncIcons = {
  synced: <Cloud className="w-3.5 h-3.5 text-emerald-400" />,
  pending: <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />,
  local: <CloudOff className="w-3.5 h-3.5 text-muted-foreground" />,
};

export default function IdeaCard({ idea, onClick }: IdeaCardProps) {
  const { state, dispatch } = useIdeas();

  async function handleDelete() {
    const toastId = "delete-idea";

    toast.loading("Deleting...", { id: toastId, position: "top-center" });

    const updatedState = state.filter((i) => i.id !== idea.id);

    dispatch({
      type: "remove",
      payload: idea.id,
    });

    const ideasString = ideasToMarkdown(updatedState);

    toast.loading("Deleting idea...", { id: toastId, position: "top-center" });

    await fetch("/api/github/updateFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown: ideasString }),
    });

    toast.success("Idea deleted successfully", {
      id: toastId,
      position: "top-center",
    });
  }

  return (
    <div
      className="group relative flex flex-col border max-w-95 p-6 rounded-xl"
      onClick={() => onClick?.(idea)}
    >
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            onClick={(e) => {
              // To stop the modal from opening
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-destructive/10"
          >
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent
          // To stop event from propogating.
          onClick={(e) => e.stopPropagation()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your idea.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
