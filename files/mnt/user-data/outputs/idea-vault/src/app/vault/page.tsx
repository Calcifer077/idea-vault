"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IdeaCard } from "@/components/IdeaCard";
import { getIdeas, deleteIdea, togglePin, searchIdeas } from "@/lib/storage";
import { Idea } from "@/types/idea";

export default function VaultPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIdeas(getIdeas());
  }, []);

  const displayed = useMemo(() => {
    const filtered = query.trim() ? searchIdeas(ideas, query) : ideas;
    // Pinned first
    return [...filtered].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [ideas, query]);

  const handleDelete = (id: string) => {
    deleteIdea(id);
    setIdeas(getIdeas());
  };

  const handleTogglePin = (id: string) => {
    togglePin(id);
    setIdeas(getIdeas());
  };

  return (
    <main className="min-h-screen bg-background pt-14">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Vault
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {ideas.length} {ideas.length === 1 ? "idea" : "ideas"} captured
            </p>
          </div>

          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ideas or tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-9 text-sm bg-secondary border-border focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Grid */}
        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-4xl mb-4">💡</div>
            <p className="text-muted-foreground text-sm">
              {query ? "No ideas match your search." : "No ideas yet. Capture your first one!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((idea, i) => (
              <div
                key={idea.id}
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
                className="animate-[fade-in-up_0.35s_ease_forwards] opacity-0"
              >
                <IdeaCard
                  idea={idea}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="fixed bottom-4 left-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Local Storage
        </span>
        <span className="text-border">·</span>
        <span>{ideas.length} ideas saved</span>
      </div>
    </main>
  );
}
