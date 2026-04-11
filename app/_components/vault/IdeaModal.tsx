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

import { Idea } from "@/app/_lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IdeaModalProps {
  idea: Idea;
  onClose: () => void;
  onSave: (idea: Idea) => void;
}

export default function IdeaModal({ idea, onClose, onSave }: IdeaModalProps) {
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

  function handleSave() {
    onSave({
      ...idea,
      title,
      description,
      tags,
      techStack,
    });
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] p-6 roudned-2xl overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
          <DialogDescription>
            Make changes to your idea here, Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        {/* Title */}
        <Input
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* TAGS */}
        <div>
          <p className="text-sm font-medium mb-2">Tags</p>
        </div>
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
          placeholder="Enter any new tag (Press enter to save)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
        />

        {/* TECH STACK */}
        <div>
          <p className="text-sm font-medium mb-2">Tech Stack</p>
        </div>
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
          placeholder="Enter any new tech stack (Press enter to save)"
          value={techStackInput}
          onChange={(e) => setTechStackInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTechStack()}
        />

        <DialogClose asChild>
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
        </DialogClose>
        <Button onClick={handleSave} className="cursor-pointer">
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
