"use client"

import { useEffect, useState } from "react"
import ThemeToggle from "@/components/ThemeToggle"
import { RocketIcon } from "lucide-react"
import axios from "axios"

const Navbar = () => {
  const [visits, setVisits] = useState<number>(0)

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post('/api/visits')

        const res = await axios.get('/api/visits')
        setVisits(res.data.visits)
      } catch (err) {
        console.error("Tracking error:", err)
      }
    }

    trackVisit()
  }, [])

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-3 px-6 flex items-center justify-between shadow-md">
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        <RocketIcon className="h-5 w-5 text-primary animate-bounce" />
        <span className="text-xl font-extrabold tracking-tight text-primary hover:tracking-widest transition-all duration-300">
          Caption Jet
        </span>
      </div>


      <div className="flex items-center gap-4 text-sm font-medium">
        <span className="text-gray-700 dark:text-gray-300 hover:text-primary transition">
          👁️ {visits} views
        </span>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar
