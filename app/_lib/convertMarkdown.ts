import { marked, Tokens, TokensList } from "marked";
import { fetchIdeas } from "@/app/_lib/actions";
import { Idea } from "../_lib/types";

function parseProjects(markdown: string): Idea[] {
  const tokens: TokensList = marked.lexer(markdown);

  const projects: Idea[] = [];
  let currentProject: Idea | null = null;
  let currentSection: string | null = null;

  tokens.forEach((token: Tokens.Generic) => {
    if (token.type === "heading") {
      const heading = token as Tokens.Heading;

      if (heading.depth === 2) {
        if (currentProject) projects.push(currentProject);
        currentProject = {
          id: "",
          title: heading.text,
          description: "",
          summary: "",
          tags: [],
          techStack: [],
          syncStatus: "synced",
          createdAt: "",
        };
      }

      if (heading.depth === 3 || heading.depth === 4) {
        currentSection = heading.text.toLowerCase();
      }
    }

    if (token.type === "paragraph" && currentProject && currentSection) {
      const paragraph = token as Tokens.Paragraph;
      if (currentSection === "id") {
        currentProject.id = paragraph.text;
      } else if (currentSection === "description") {
        currentProject.description = paragraph.text;
      } else if (currentSection === "summary") {
        currentProject.summary = paragraph.text;
      } else if (currentSection === "tags") {
        currentProject.tags = paragraph.text.split(", ").map((t) => t.trim());
      } else if (currentSection === "tech stack") {
        currentProject.techStack = paragraph.text
          .split(", ")
          .map((t) => t.trim());
      } else if (currentSection === "created_at") {
        currentProject.createdAt = paragraph.text;
      }
    }
  });

  if (currentProject) projects.push(currentProject);

  return projects;
}

export async function convertMarkdown() {
  const content = await fetchIdeas();
  const ideas = parseProjects(content);

  return { ideas };
}
