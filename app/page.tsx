"use client";

import { Kbd } from "@/components/ui/kbd";

import { Navbar } from "./_components/Navbar";
import InputBox from "./_components/InputBox";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    // Used bg-background to match your :root definition
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground transition-colors">
      <Navbar />
      <hr className="-mx-8 border-border" />
      {/* Hero */}
      <section className="py-10 text-center">
        <div className="container mx-auto">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-normal lg:text-6xl text-foreground">
            Capture your ideas
          </h1>
          {/* text-muted-foreground used here as per your CSS mapping */}
          <p className="mx-auto mt-6 max-w-150 text-md text-muted-foreground ">
            Your personal vault for thoughts, concepts, and inspiration. <br />
            Type freely and we&apos;ll handle the rest.
          </p>
        </div>
      </section>
      <InputBox />
      <p className="mx-auto pt-4 text-xs">
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to save
      </p>
      <div className="flex-1" /> {/* pushes footer down */}
      <Footer />
    </div>
  );
}
