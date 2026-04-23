"use client";

import Link from "next/link";

import { useIdeas } from "@/app/_components/IdeasContext";
import { useState, useEffect } from "react";

export default function Footer() {
  const [commitsToday, setCommitsToday] = useState(0);

  const { state } = useIdeas();
  const ideas = state.ideas;

  useEffect(() => {
    async function fetchCommitHistory() {
      try {
        const res = await fetch("/api/github/commitHistory");
        const data = await res.json();
        setCommitsToday(data.commits);
      } catch (error) {
        console.error("Failed to fetch commit history:", error);
      }
    }

    fetchCommitHistory();
  }, []);
  return (
    <footer className="sticky bottom-0 w-full border-t border-border bg-background">
      <div className="flex justify-between px-4 sm:px-6 lg:px-8 py-3 text-xs text-muted-foreground">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-6">
          <div>Database connected</div>
          <div>{commitsToday} commits today</div>
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-right">
          <div>{ideas.length} ideas stored</div>
          <div>
            Made by{" "}
            <Link href="https://github.com/Calcifer077" target="_blank">
              Calcifer077
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
