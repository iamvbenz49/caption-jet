"use client"

import CaptionGenerator from "@/components/CaptionGenerator"
import ThemeToggle from "@/components/ThemeToggle"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 md:px-10 py-8 sm:py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="scale-100 sm:scale-110 md:scale-125 lg:scale-140">
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-10 px-2 mt-20"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4">
          <span className="text-primary">Caption Jet</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
          Turn your content's core idea into viral captions that slap, seduce, or sell. Your call.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full max-w-3xl"
      >
        <div className="w-full flex justify-center">
          <CaptionGenerator />
        </div>
      </motion.div>
      </div>
      
    </div>
  )
}
