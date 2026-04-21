import { getFileContent, updateFile } from "./github";
import { Idea } from "../../app/_lib/types";
import { parseMarkdownToIdeas } from "./parseMarkdown";
import { ideasToMarkdown } from "./convertToMarkdown";

export async function loadIdeas(): Promise<{ ideas: Idea[]; sha: string }> {
  const { content, sha } = await getFileContent();
  const ideas = parseMarkdownToIdeas(content);
  return { ideas, sha };
}

export async function saveIdeas(
  ideas: Idea[],
  sha: string,
  message?: string,
): Promise<void> {
  const markdown = ideasToMarkdown(ideas);

  await updateFile(markdown, sha, message || "Update from CLI");
}
