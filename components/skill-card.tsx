"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface SkillCardProps {
  skill: {
    name: string
    category: string
    proficiency: number
    projects: string[]
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="h-64 cursor-pointer perspective"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {/* Front of card */}
        <motion.div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute w-full h-full bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-lg p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">{skill.name}</h3>
            <p className="text-foreground/60 text-sm">{skill.category}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/60">Proficiency</span>
              <span className="text-primary font-semibold">{skill.proficiency}%</span>
            </div>
            <div className="w-full bg-card/50 rounded-full h-2 border border-primary/20">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>

          <div className="text-xs text-foreground/40 text-center"></div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          style={{ backfaceVisibility: "hidden", rotateY: 180 }}
          className="absolute w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 rounded-lg p-6 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Projects Using {skill.name}</h4>
            <ul className="space-y-2">
              {skill.projects.map((project, i) => (
                <li key={i} className="flex items-center gap-2 text-foreground/80 text-sm">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {project}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xs text-foreground/40 text-center">Click to flip back</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
