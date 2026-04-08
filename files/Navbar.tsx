"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightbulb, Archive, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-md flex items-center px-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-auto">
        <Lightbulb className="w-5 h-5 text-primary" strokeWidth={1.5} />
        <span className="font-semibold text-sm tracking-tight">Idea Vault</span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        <Link href="/">
          <Button
            variant={pathname === "/" ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "gap-2 text-sm",
              pathname === "/" && "font-medium"
            )}
          >
            <Lightbulb className="w-4 h-4" strokeWidth={1.5} />
            Capture
          </Button>
        </Link>
        <Link href="/vault">
          <Button
            variant={pathname === "/vault" ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "gap-2 text-sm",
              pathname === "/vault" && "font-medium"
            )}
          >
            <Archive className="w-4 h-4" strokeWidth={1.5} />
            Vault
          </Button>
        </Link>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 ml-1"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </nav>
    </header>
  );
}
