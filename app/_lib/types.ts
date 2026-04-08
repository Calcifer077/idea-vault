export interface Idea {
  id: string;
  title: string;
  description: string;
  summary: string;
  tags: string[];
  techStack: string[];
  syncStatus: "synced" | "pending" | "local";
  createdAt: string;
}
