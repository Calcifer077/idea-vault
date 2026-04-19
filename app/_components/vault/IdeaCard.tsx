"use client";

import { Badge } from "@/components/ui/badge";
import { Cloud, CloudOff, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import { motion, Variants, AnimatePresence } from "motion/react";

import { ideasToMarkdown } from "@/app/_lib/ideasToMarkdown";
import { useIdeas } from "../IdeasContext";
import { Idea } from "@/app/_lib/types";
import { updateGithubFile } from "@/app/_lib/updateGithubFile";

const TagsAndTechStackVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut", delay: i * 0.1 },
  }),
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

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

    try {
      const updatedState = state.filter((i) => i.id !== idea.id);

      dispatch({
        type: "remove",
        payload: idea.id,
      });

      toast.loading("Deleting idea...", {
        id: toastId,
        position: "top-center",
      });

      const ideasString = ideasToMarkdown(updatedState);

      await updateGithubFile(ideasString);

      toast.success("Idea deleted successfully", {
        id: toastId,
        position: "top-center",
      });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete idea",
        {
          id: toastId,
          position: "top-center",
        },
      );
    }
  }

  return (
    <motion.div
      className="group relative flex flex-col border w-full p-4 sm:p-5 rounded-xl hover:shadow-md transition cursor-pointer"
      onClick={() => onClick?.(idea)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="font-semibold text-sm text-foreground line-clamp-1">
          {idea.title}
        </div>
        <div className="flex items-center gap-2">
          {syncIcons[idea.syncStatus]}

          {/* Delete button (always visible on mobile) */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
              </motion.div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
        {idea.description}
      </p>

      {/* Tags */}
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          <AnimatePresence>
            {idea.tags.map((tag, i) => (
              <motion.div
                key={tag}
                custom={i}
                variants={TagsAndTechStackVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Tech stack */}
      {idea.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <AnimatePresence>
            {idea.techStack.map((tech, i) => (
              <motion.div
                key={tech}
                custom={i}
                variants={TagsAndTechStackVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 text-primary/70 border-primary/20"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Footer */}
      <p className="text-[10px] text-muted-foreground/60 mt-3">
        {new Date(idea.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
    </motion.div>
  );
}
