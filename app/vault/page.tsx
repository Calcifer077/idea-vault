"use client";

import IdeaGroup from "../_components/vault/IdeaGroup";
import { useIdeas } from "../_components/IdeasContext";
import SearchIdeas from "../_components/vault/SearchIdeas";

export default function Page() {
  const { state } = useIdeas();

  return (
    <div className="w-full min-h-screen px-6 sm:px-8 lg:px-10">
      {/* Top border */}
      <div className="w-full border-t border-border" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 sm:py-8">
        {/* Title */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Vault
          </h1>
          <span className="text-sm text-muted-foreground">
            {state.length} ideas stored
          </span>
        </div>

        {/* Right section (future search/filter) */}
        <div className="w-full sm:w-64">
          <SearchIdeas />
        </div>
      </div>

      <IdeaGroup ideas={state} />
    </div>
  );
}
