"use server";

import { getFileContent, updateFile as updateFileApi } from "./github";

export async function fetchIdeas() {
  const { content } = await getFileContent();

  return content;
}

export async function updateFile(newData: string) {
  const { sha } = await getFileContent();
  const newContent = newData;

  // console.log(newContent);

  await updateFileApi(newContent, sha);

  return { success: true };
}
