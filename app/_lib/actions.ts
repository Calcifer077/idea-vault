"use server";

import { getFileContent, updateFile } from "../../lib/github";

export async function fetchIdeas() {
  const { content } = await getFileContent();

  return content;
}

export async function updateConfig(newData: unknown) {
  const { sha } = await getFileContent();
  const newContent = JSON.stringify(newData, null, 2);
  await updateFile(newContent, sha, "Updated ideas from app");

  return { success: true };
}
