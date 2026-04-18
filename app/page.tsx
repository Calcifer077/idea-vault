"use client";

import { Kbd } from "@/components/ui/kbd";
import InputBox from "./_components/index/InputBox";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      {/* Top border */}
      <div className="w-full border-t border-border" />

      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Capture your ideas
          </h1>

          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-muted-foreground">
            Your personal vault for thoughts, concepts, and inspiration.
            <br className="hidden sm:block" />
            Type freely and we&apos;ll handle the rest.
          </p>
        </div>
      </section>

      <div className="px-4 sm:px-6">
        <InputBox />
      </div>

      <p className="pt-4 text-xs text-center mb-10 px-4">
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to save
      </p>
    </div>
  );
}
