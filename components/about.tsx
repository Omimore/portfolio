"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function About() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText =
    "I'm a B.Tech TY AIML student passionate about web development. Web dev is my passion and I do it for fun, exploring React, Next.js, TypeScript, and machine learning technologies. My goal is to create innovative solutions that bridge the gap between beautiful design and powerful functionality."

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const skills = [
    { category: "Web Development", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "AI & ML", items: ["Python", "TensorFlow", "LLMs", "Data Analysis"] },
    { category: "Tools & Platforms", items: ["Git", "Docker", "AWS", "Vercel"] },
  ]

  return (
    <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Typing effect section */}
            <div className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed min-h-32">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="animate-pulse"
                >
                  |
                </motion.span>
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Key Strengths</h3>
                <ul className="space-y-2">
                  {[
                    "Full-stack development",
                    "AI/ML integration",
                    "Performance optimization",
                    "User experience design",
                  ].map((strength, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-foreground/80"
                    >
                      <motion.span
                        className="w-2 h-2 bg-primary rounded-full"
                        whileInView={{ scale: [0, 1] }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      />
                      {strength}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills grid */}
            <div className="space-y-6">
              {skills.map((skillGroup, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(34, 211, 238, 0.1)" }}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-primary mb-4">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, j) => (
                      <motion.span
                        key={j}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: j * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
