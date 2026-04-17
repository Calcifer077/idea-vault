export async function updateGithubFile(markdown: string): Promise<void> {
  const res = await fetch("/api/github/updateFile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ markdown }),
  });

  if (!res.ok) {
    throw new Error("Failed to update GitHub file");
  }
}
