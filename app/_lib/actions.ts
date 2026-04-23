"use server";

import {
  getFileContent,
  updateFile as updateFileApi,
  getTwentyFourCommitHistory as twentyFourCommitHistory,
} from "./github";

export async function fetchIdeas() {
  const { content } = await getFileContent();

  return content;
}

export async function updateFile(newData: string) {
  const { sha } = await getFileContent();
  const newContent = newData;

  await updateFileApi(newContent, sha);

  return { success: true };
}

export async function getCommitHistory() {
  const commits = await twentyFourCommitHistory();

  return commits;
}
