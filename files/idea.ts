export interface Idea {
  id: string;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
  pinned?: boolean;
}

export type IdeaInput = Omit<Idea, "id" | "createdAt" | "updatedAt">;
