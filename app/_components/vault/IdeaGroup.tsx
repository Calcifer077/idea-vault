"use client";

import { useState } from "react";

import { Idea } from "@/app/_lib/types";
import IdeaCard from "./IdeaCard";
import IdeaModal from "./IdeaModal";

interface IdeaGroupProps {
  ideas: Idea[];
}

export default function IdeaGroup({ ideas }: IdeaGroupProps) {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  return (
    <div className="w-full flex justify-center mb-8">
      {ideas.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground text-sm">
          No ideas found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea, i) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              index={i}
              onClick={setSelectedIdea}
            />
          ))}
        </div>
      )}

      {selectedIdea && (
        <IdeaModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
      )}
    </div>
  );
}
