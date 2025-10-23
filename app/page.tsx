"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"


export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const lastActiveSection = useRef("hero")

  const handleScroll = useCallback(() => {
    const sections = ["hero", "about", "skills", "projects", "experience"]
    let newActiveSection = activeSection

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          newActiveSection = section
          break
        }
      }
    }

    if (newActiveSection !== lastActiveSection.current) {
      lastActiveSection.current = newActiveSection
      setActiveSection(newActiveSection)
    }
  }, [activeSection])

  useEffect(() => {
    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", throttledHandleScroll)
    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [handleScroll])

  return (
    <main className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
    </main>
  )
}
