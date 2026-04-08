import { Idea, IdeaInput } from "@/types/idea";

const STORAGE_KEY = "idea-vault-ideas";

const SEED_IDEAS: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Code Review",
    content:
      "Build an AI agent that reviews pull requests, suggests improvements, and auto-fixes common patterns. Integrate with GitHub Actions for seamless CI/CD workflows. Could use GPT-4 or Claude for analysis.",
    summary:
      "AI agent for automated PR reviews with GitHub Actions integration.",
    tags: ["ai", "devtools"],
    techStack: ["Python", "OpenAI", "GitHub API"],
    createdAt: new Date("2026-04-07"),
    updatedAt: new Date("2026-04-07"),
    pinned: false,
  },
  {
    id: "2",
    title: "Real-time Collaboration Canvas",
    content:
      "A multiplayer whiteboard for brainstorming sessions with live cursors, sticky notes, and drawing tools. Think Figma meets Miro but lightweight. Use CRDTs for conflict-free real-time editing.",
    summary: "Lightweight multiplayer whiteboard with real-time CRDT sync.",
    tags: ["collaboration", "real-time"],
    techStack: ["React", "WebSocket", "Canvas API"],
    createdAt: new Date("2026-04-07"),
    updatedAt: new Date("2026-04-07"),
    pinned: false,
  },
  {
    id: "3",
    title: "Smart Bookmark Manager",
    content:
      "Browser extension that auto-categorizes bookmarks using NLP, detects dead links, and provides weekly digest of unread saves. Syncs across devices via encrypted cloud storage.",
    summary: "NLP-powered bookmark manager with dead link detection.",
    tags: ["productivity", "browser"],
    techStack: ["TypeScript", "Chrome API", "TF.js"],
    createdAt: new Date("2026-04-07"),
    updatedAt: new Date("2026-04-07"),
    pinned: true,
  },
  {
    id: "4",
    title: "CLI Dashboard Generator",
    content:
      "Generate beautiful terminal dashboards from YAML config files. Support for charts, tables, logs, and real-time data streaming. Export to HTML for sharing.",
    summary: "YAML-driven terminal dashboard generator with export support.",
    tags: ["cli", "devtools"],
    techStack: ["Rust", "Ratatui", "YAML"],
    createdAt: new Date("2026-04-07"),
    updatedAt: new Date("2026-04-07"),
    pinned: false,
  },
  {
    id: "5",
    title: "Personal Knowledge Graph",
    content:
      "Connect notes, ideas, and references into an interactive knowledge graph. Auto-link related concepts using semantic embeddings. Export to Obsidian or Notion.",
    summary:
      "Interactive knowledge graph with semantic auto-linking and exports.",
    tags: ["knowledge", "ai"],
    techStack: ["Next.js", "D3.js", "Embeddings"],
    createdAt: new Date("2026-04-07"),
    updatedAt: new Date("2026-04-07"),
    pinned: false,
  },
];

export function getIdeas(): Idea[] {
  if (typeof window === "undefined") return SEED_IDEAS;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    saveIdeas(SEED_IDEAS);
    return SEED_IDEAS;
  }
  try {
    const parsed = JSON.parse(raw) as Idea[];
    return parsed.map((i) => ({
      ...i,
      createdAt: new Date(i.createdAt),
      updatedAt: new Date(i.updatedAt),
    }));
  } catch {
    return SEED_IDEAS;
  }
}

export function saveIdeas(ideas: Idea[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

export function addIdea(input: IdeaInput): Idea {
  const ideas = getIdeas();
  const newIdea: Idea = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  saveIdeas([newIdea, ...ideas]);
  return newIdea;
}

export function deleteIdea(id: string): void {
  const ideas = getIdeas().filter((i) => i.id !== id);
  saveIdeas(ideas);
}

export function togglePin(id: string): void {
  const ideas = getIdeas().map((i) =>
    i.id === id ? { ...i, pinned: !i.pinned, updatedAt: new Date() } : i
  );
  saveIdeas(ideas);
}

export function searchIdeas(ideas: Idea[], query: string): Idea[] {
  const q = query.toLowerCase();
  return ideas.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      i.content.toLowerCase().includes(q) ||
      i.tags.some((t) => t.toLowerCase().includes(q)) ||
      i.techStack.some((t) => t.toLowerCase().includes(q))
  );
}
