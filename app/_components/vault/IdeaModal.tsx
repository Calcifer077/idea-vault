"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Idea } from "@/app/_lib/types";
import { useIdeas } from "../IdeasContext";
import { ideasToMarkdown } from "@/app/_lib/ideasToMarkdown";
import { updateGithubFile } from "@/app/_lib/updateGithubFile";

interface IdeaModalProps {
  idea: Idea;
  onClose: () => void;
}

export default function IdeaModal({ idea, onClose }: IdeaModalProps) {
  const { state, dispatch } = useIdeas();

  const [title, setTitle] = useState<string>(idea.title);
  const [description, setDescription] = useState<string>(idea.description);

  const [tags, setTags] = useState<string[]>(idea.tags || []);
  const [techStack, setTechStack] = useState<string[]>(idea.techStack || []);

  const [tagInput, setTagInput] = useState<string>("");
  const [techStackInput, setTechStackInput] = useState<string>("");

  function handleAddTag() {
    if (tags.includes(tagInput)) return;

    setTags([...tags, tagInput]);
    setTagInput("");
  }

  function handleRemoveTag(idx: number) {
    if (idx < 0 || idx >= tags.length) return;

    setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
  }

  function handleAddTechStack() {
    if (techStack.includes(techStackInput)) return;
    setTechStack([...techStack, techStackInput]);
    setTechStackInput("");
  }

  function handleRemoveTechStack(idx: number) {
    if (idx < 0 || idx >= techStack.length) return;

    setTechStack([...techStack.slice(0, idx), ...techStack.slice(idx + 1)]);
  }

  async function handleSave() {
    const toastId = "update-idea";

    toast.loading("Working...", { id: toastId, position: "top-center" });

    if (
      !title.length ||
      !description.length ||
      !tags.length ||
      !techStack.length
    ) {
      toast.error("Kindly fill all the fields", {
        id: toastId,
        position: "top-center",
      });
      return;
    }

    try {
      const updatedIdeas: Idea[] = [];

      for (const oldIdea of state) {
        if (oldIdea.id === idea.id) {
          const updatedIdea = { title, description, tags, techStack };
          updatedIdeas.push({ ...idea, ...updatedIdea, syncStatus: "pending" });
        } else {
          updatedIdeas.push({ ...oldIdea });
        }
      }

      dispatch({
        type: "update",
        payload: {
          id: idea.id,
          title,
          description,
          tags,
          techStack,
        },
      });

      toast.loading("Saving idea...", { id: toastId, position: "top-center" });

      const ideasString = ideasToMarkdown(updatedIdeas);

      await updateGithubFile(ideasString);

      toast.success("Idea updated successfully", {
        id: toastId,
        position: "top-center",
      });

      onClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update idea",
        {
          id: toastId,
          position: "top-center",
        },
      );
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-lg max-h-[90vh] p-4 sm:p-6 rounded-2xl overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle>Edit Idea</DialogTitle>
          <DialogDescription>
            Make changes to your idea here. Click save when done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          {/* Description */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-25"
          />

          {/* TAGS */}
          <div>
            <p className="text-sm font-medium mb-2">Tags</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(i)}
                    >
                      ✕
                    </span>
                  </Badge>
                ))}
              </div>
            )}

            <Input
              placeholder="Add tag + Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
          </div>

          {/* TECH STACK */}
          <div>
            <p className="text-sm font-medium mb-2">Tech Stack</p>

            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {techStack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="flex items-center gap-1 text-primary"
                  >
                    {tech}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleRemoveTechStack(i)}
                    >
                      ✕
                    </span>
                  </Badge>
                ))}
              </div>
            )}

            <Input
              placeholder="Add tech + Enter"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTechStack()}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>

            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
