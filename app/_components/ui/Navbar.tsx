"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Lightbulb, Moon, Sun, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/hooks/useTheme";

export function Navbar() {
  const { dark, toggle } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground font-semibold tracking-tight"
        >
          <Lightbulb className="w-5 h-5 text-primary" />
          <span className="hidden sm:inline">Idea Vault</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Capture */}
          <Link href="/">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              size="sm"
              className="gap-1.5 font-medium"
            >
              <Lightbulb className="w-4 h-4" />
              <span
                className={pathname === "/" ? "hidden sm:inline" : "inline"}
              >
                Capture
              </span>
            </Button>
          </Link>

          {/* Vault */}
          <Link href="/vault">
            <Button
              variant={pathname === "/vault" ? "secondary" : "ghost"}
              size="sm"
              className="gap-1.5 font-medium"
            >
              <Archive className="w-4 h-4" />
              <span
                className={
                  pathname === "/vault" ? "hidden sm:inline" : "inline"
                }
              >
                Vault
              </span>
            </Button>
          </Link>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-1 sm:ml-2 w-9 h-9"
            onClick={toggle}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </nav>
      </div>
    </header>
  );
}
