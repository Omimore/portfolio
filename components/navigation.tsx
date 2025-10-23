"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

   return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/05 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent cursor-pointer"
            >
              Omkar More
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {sections.map((section) => (
              section.id === "contact" ? (
                <Link key={section.id} href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-sm font-medium transition-all duration-300 ${
                        activeSection === section.id ? "text-cyan-400" : "text-foreground/60 hover:text-cyan-300"
                      }`}
                  >
                    {section.label}
                    {activeSection === section.id && (
                        <motion.div layoutId="underline" className="h-0.5 bg-cyan-400 mt-1" transition={{ duration: 0.3 }} />
                    )}
                  </motion.button>
                </Link>
              ) : section.id === "hero" ? (
                <Link key={section.id} href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-sm font-medium transition-all duration-300 ${
                        activeSection === section.id ? "text-cyan-400" : "text-foreground/60 hover:text-cyan-300"
                      }`}
                  >
                    {section.label}
                    {activeSection === section.id && (
                        <motion.div layoutId="underline" className="h-0.5 bg-cyan-400 mt-1" transition={{ duration: 0.3 }} />
                    )}
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm font-medium transition-all duration-300 ${
                      activeSection === section.id ? "text-cyan-400" : "text-foreground/60 hover:text-cyan-300"
                    }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                      <motion.div layoutId="underline" className="h-0.5 bg-cyan-400 mt-1" transition={{ duration: 0.3 }} />
                  )}
                </motion.button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pb-4 space-y-2"
          >
            {sections.map((section) => (
              section.id === "contact" ? (
                <Link key={section.id} href="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-cyan-400 text-white"
                        : "text-foreground/60 hover:bg-card"
                    }`}
                  >
                    {section.label}
                  </motion.button>
                </Link>
              ) : section.id === "hero" ? (
                <Link key={section.id} href="/" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-cyan-400 text-white"
                        : "text-foreground/60 hover:bg-card"
                    }`}
                  >
                    {section.label}
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  whileHover={{ x: 5 }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-cyan-400 text-white"
                      : "text-foreground/60 hover:bg-card"
                  }`}
                >
                  {section.label}
                </motion.button>
              )
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
