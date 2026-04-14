"use client";

import IdeaGroup from "../_components/vault/IdeaGroup";
import { Idea } from "../_lib/types";
import { useIdeas } from "../_components/IdeasContext";

export const ideas: Idea[] = [
  {
    id: "1",
    title: "AI Resume Analyzer",
    description:
      "A web app that analyzes resumes and provides suggestions using AI.",
    summary: "Improve resumes with AI feedback.",
    tags: ["AI", "Career", "Web App"],
    techStack: ["React", "Node.js", "OpenAI API"],
    syncStatus: "synced",
    createdAt: "2026-04-08T10:00:00Z",
  },
  {
    id: "2",
    title: "Habit Tracker",
    description:
      "A mobile-friendly app to track daily habits and visualize progress.",
    summary: "Track and build habits easily.",
    tags: ["Productivity", "Health"],
    techStack: ["Next.js", "Firebase"],
    syncStatus: "pending",
    createdAt: "2026-04-07T15:30:00Z",
  },
  {
    id: "3",
    title: "Local Event Finder",
    description:
      "Find events happening near your location with filters and maps.",
    summary: "Discover events nearby.",
    tags: ["Events", "Location"],
    techStack: ["React", "Google Maps API"],
    syncStatus: "local",
    createdAt: "2026-04-06T09:15:00Z",
  },
  {
    id: "4",
    title: "Code Snippet Manager",
    description:
      "Save, organize, and search code snippets with tagging support.",
    summary: "Organize reusable code snippets.",
    tags: ["Developer Tools"],
    techStack: ["Vue", "Supabase"],
    syncStatus: "synced",
    createdAt: "2026-04-05T12:45:00Z",
  },
  {
    id: "5",
    title: "Personal Finance Dashboard",
    description: "Track expenses, income, and visualize financial health.",
    summary: "Manage personal finances visually.",
    tags: ["Finance", "Dashboard"],
    techStack: ["Angular", "Node.js", "MongoDB"],
    syncStatus: "pending",
    createdAt: "2026-04-04T18:20:00Z",
  },
];

export default function Page() {
  const { state } = useIdeas();

  return (
    <div className="w-full h-full px-16 overflow-x-hidden">
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-border" />

      <div className="flex justify-between py-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Vault
          </h1>
          <span className="text-sm text-muted-foreground">6 ideas stored</span>
        </div>
        <div className="relative w-full sm:w-64 flex items-center"></div>
      </div>

      <IdeaGroup ideas={state} />
    </div>
  );
}
