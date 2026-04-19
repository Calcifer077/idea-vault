"use client";

import { useState } from "react";

import { Idea } from "@/app/_lib/types";
import IdeaCard from "./IdeaCard";
import IdeaModal from "./IdeaModal";

import { motion, Variants, AnimatePresence } from "motion/react";

const IdeaCardVariants: Variants = {
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence>
            {ideas.map((idea, i) => (
              <motion.div
                key={idea.id}
                custom={i}
                variants={IdeaCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <IdeaCard idea={idea} index={i} onClick={setSelectedIdea} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {selectedIdea && (
        <IdeaModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
      )}
    </div>
  );
}
