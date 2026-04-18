"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Lightbulb, Moon, Sun, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useTheme} from "@/app/hooks/useTheme";

export function Navbar() {
  const {dark, toggle} = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 h-2 bg-background/80 backdrop-blur-md flex items-center justify-between p-8">
      <Link
        href="/"
        className="flex items-center gap-2 text-foreground font-semibold tracking-tight cursor-pointer"
      >
        <Lightbulb className="w-5 h-5 text-primary" />
        <span>Idea Vault</span>
      </Link>

      <nav className="flex items-center gap-1">
        <Link href="/">
          <Button
            variant={pathname === "/" ? "secondary" : "ghost"}
            size="sm"
            className="text-xs gap-1.5 font-bold cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="tracking-wide">Capture</span>
          </Button>
        </Link>
        <Link href="/vault">
          <Button
            variant={pathname === "/vault" ? "secondary" : "ghost"}
            size="sm"
            className="text-xs gap-1.5 font-bold cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Vault</span>
          </Button>
        </Link>

        {!dark && (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 ml-2 cursor-pointer"
            onClick={toggle}
          >
            <Moon className="w-4 h-4" />
          </Button>
        )}

        {dark&& (
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 ml-2 cursor-pointer"
            onClick={toggle}
          >
            <Sun className="w-4 h-4" />
          </Button>
        )}
      </nav>
    </header>
  );
}
