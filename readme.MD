# Idea Vault – Your Personal Idea Management System

A clean, modern **idea management app + CLI** that lets you store, organize, and manage ideas in one central place — powered by a GitHub repository using **Markdown files**.

---

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui** – accessible, beautiful UI components
- **TypeScript**
- **Markdown** as the data layer

---

## ✨ Core Idea

Instead of storing ideas in a database, **Idea Vault uses a GitHub repository as the source of truth**, where:

- Each idea is stored as a **Markdown file**
- Your repo becomes your **portable, version-controlled idea database**
- You can access and edit ideas via:
  - 🌐 Web App (UI)
  - 💻 CLI [[Check it out]](https://github.com/Calcifer077/idea-vault-cli)

---

## Features

- Stores ideas in github repository
- Used `marked` for parsing markdown

## 🔥 Key Features

### 🌐 Web App

- Beautiful, minimal UI built with **shadcn + Tailwind**
- Browse and read ideas stored as Markdown
- Smooth animations using **motion**
- Dark/light mode support (`next-themes`)
- Markdown rendering with `marked`

### 💻 Have also implmented CLI, you can check it out here: [[Github Repo]](https://github.com/Calcifer077/idea-vault-cli)

---

## 📦 Quick start

- You will need to setup tokens for github. In my case I have used a seperate repo to store ideas, you can use the same repo, just have to pull every time you push something in your ideas.
- Used gemini for creating summaries of ideas, you can use any one you like (change code accordingly).

### 1. Clone the Repository

```bash
git clone https://github.com/Calcifer077/idea-vault.git
cd idea-vault
```

### 2. Install Dependencies

```bash
npm install
# or yarn / pnpm / bun install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open: http://localhost:3000

### .env exmpale

```bash
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
GITHUB_OWNER=YOUR_GITHUB_USERNAME
GITHUB_REPO=YOUR_GITHUB_REPO
GITHUB_FILE_PATH=PATH_TO_YOUR_FILE
GITHUB_BRANCH=GITHUB_BRANCH

GEMINI_KEY=GEMINI_API_KEY
GEMINI_KEY_Name=GEMINI_KEY_NAME
GEMINI_PROJECT_NAME=GEMINI_PROJECT_NAME
GEMINI_PROJECT_NUMBER=GEMINI_PROJECT_NUMBER
NEXT_PUBLIC_PROJECT_PASSWORD=PROJECT_PASSWORD
```

---

## 📁 Project Structure (simplified)

```
idea-vault/
├── app/
│   ├── _components/              → App-specific UI components
│   │   ├── IdeasContext.tsx
│   │   ├── index/                → Landing / homepage components
│   │   ├── ui/                   → Local UI wrappers (if any)
│   │   └── vault/                → Vault-related components
│   │
│   ├── _lib/                     → Core utilities & business logic
│   │   ├── actions.ts            → Server/client actions
│   │   ├── convertMarkdown.ts    → Markdown → HTML conversion
│   │   ├── gemini.ts             → Gemini API integration
│   │   ├── generateSummary.ts    → AI summary generation
│   │   ├── github.ts             → GitHub API helpers
│   │   ├── ideasToMarkdown.ts    → Ideas → Markdown formatter
│   │   ├── types.ts              → Shared TypeScript types
│   │   └── updateGithubFile.ts   → Update files on GitHub
│   │
│   ├── api/                      → Route handlers (API layer)
│   │   ├── gemini/
│   │   └── github/
│   │
│   ├── hooks/                    → Custom React hooks
│   │   └── useTheme.ts
│   │
│   ├── vault/                    → Vault feature routes
│   │   ├── loading.tsx
│   │   └── page.tsx
│   │
│   ├── layout.tsx                → Root layout
│   └── page.tsx                  → Home page
│
├── components/
│   └── ui/                       → Shared ShadCN UI components
│
├── public/                       → Static assets
│
└── sample-ideas.md               → Example ideas file
```

---

## ⚙️ Scripts

```bash
npm run dev      # start dev server
npm run build    # build for production
npm run start    # start production server
npm run lint     # lint code
```

---

## 🧩 Dependencies Highlights

- `marked` → Markdown parsing
- `motion` → animations
- `shadcn/ui` + `radix-ui` → UI components

---

## 📌 Future Ideas

- Make a mobile app

---

If you find this project useful, consider giving it a ⭐

---

---

### Entire project strucutre, for my understanding, feel free to skip:

```
idea-vault/
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── app/
│   ├── _components/
│   │   ├── IdeasContext.tsx
│   │   ├── index/
│   │   │   └── InputBox.tsx
│   │   ├── ui/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── vault/
│   │       ├── IdeaCard.tsx
│   │       ├── IdeaGroup.tsx
│   │       ├── IdeaModal.tsx
│   │       └── SearchIdeas.tsx
│   ├── _lib/
│   │   ├── actions.ts
│   │   ├── convertMarkdown.ts
│   │   ├── gemini.ts
│   │   ├── generateSummary.ts
│   │   ├── github.ts
│   │   ├── ideasToMarkdown.ts
│   │   ├── types.ts
│   │   └── updateGithubFile.ts
│   ├── api/
│   │   ├── gemini/
│   │   │   └── route.ts
│   │   └── github/
│   │       └── updateFile/
│   │           └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── vault/
│       ├── loading.tsx
│       └── page.tsx
├── components.json
├── components/
│   └── ui/
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── kbd.tsx
│       ├── navigation-menu.tsx
│       ├── sonner.tsx
│       └── textarea.tsx
├── eslint.config.mjs
├── lib/
│   └── utils.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── readme.MD
├── sample-ideas.md
└── tsconfig.json
```
