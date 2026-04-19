"use client";

import { Kbd } from "@/components/ui/kbd";
import InputBox from "./_components/index/InputBox";
import { motion, Variants } from "motion/react";

const pageVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const inputBoxVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export default function Home() {
  return (
    <motion.div
      className="w-full min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top border */}
      <div className="w-full border-t border-border" />

      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground"
          >
            Capture your ideas
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-muted-foreground"
          >
            Your personal vault for thoughts, concepts, and inspiration.
            <br className="hidden sm:block" />
            Type freely and we&apos;ll handle the rest.
          </motion.p>
        </div>
      </section>

      <motion.div variants={inputBoxVariants} className="px-4 sm:px-6">
        <InputBox />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="pt-4 text-xs text-center mb-10 px-4"
      >
        Press <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd> to save
      </motion.p>
    </motion.div>
  );
}
