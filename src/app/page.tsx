"use client"

import CaptionGenerator from "@/components/CaptionGenerator"
import ThemeToggle from "@/components/ThemeToggle"
import { motion } from "framer-motion"

export default function Home() {
  return (

    <main className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 py-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 px-2"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-2">
          <span className="text-primary">Caption Jet</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Turn your content's core idea into viral captions that slap, seduce, or sell. Your call.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full"
      >
        <div className="w-full flex justify-center">
          <CaptionGenerator />
        </div>
      </motion.div>

    </main>
  )
}
