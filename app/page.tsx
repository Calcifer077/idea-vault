"use client";

import { Kbd } from "@/components/ui/kbd";

import InputBox from "./_components/index/InputBox";

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full h-full">
      <hr className="-mx-8 border-border" />
      {/* Hero */}
      <section className="py-18 text-center">
        <div className="container mx-auto">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-normal lg:text-6xl text-foreground">
            Capture your ideas
          </h1>

          <p className="mx-auto mt-6 max-w-150 text-md text-muted-foreground ">
            Your personal vault for thoughts, concepts, and inspiration. <br />
            Type freely and we&apos;ll handle the rest.
          </p>
        </div>
      </section>
      <InputBox />
      <p className="pt-4 text-xs text-center">
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to save
      </p>
    </div>
  );
}
