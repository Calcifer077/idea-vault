# Idea Vault

A Next.js 15 app with TypeScript, Tailwind CSS v4, and shadcn/ui for capturing and organizing ideas with AI assistance.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Capture page** (`/`) — type an idea freely, add tags & tech stack, generate an AI summary via Claude API
- **Vault page** (`/vault`) — browse all saved ideas in a responsive grid, search by title/tag/tech, pin/delete cards
- **Dark/light mode** toggle
- **Persistent storage** via localStorage with 5 seed ideas
- **AI Summary** powered by the Anthropic API (requires the API key to be injected by your backend/proxy)

## Project Structure

```
src/
  app/
    page.tsx          # Capture page
    vault/page.tsx    # Vault page
    layout.tsx        # Root layout with ThemeProvider + Navbar
    globals.css       # Tailwind + CSS variable theme
  components/
    Navbar.tsx        # Top nav with route links + theme toggle
    IdeaCard.tsx      # Card component for vault grid
    ui/               # shadcn primitive components
  lib/
    storage.ts        # localStorage CRUD + seed data
    utils.ts          # cn() helper
  types/
    idea.ts           # Idea TypeScript types
```

## Adding the Anthropic API Key

The AI Summary feature calls `api.anthropic.com` directly from the client. In production, proxy this through your own API route and inject the key server-side:

```ts
// src/app/api/summarize/route.ts
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  const { content } = await req.json();
  const client = new Anthropic(); // uses ANTHROPIC_API_KEY env var
  const msg = await client.messages.create({ ... });
  return Response.json(msg);
}
```

Then update `generateAISummary` in `page.tsx` to call `/api/summarize` instead.
