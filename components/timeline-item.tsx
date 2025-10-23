"use client"

import { motion } from "framer-motion"

interface TimelineItemProps {
  experience: {
    title: string
    company: string
    period: string
    description: string
    achievements: string[]
  }
}

export default function TimelineItem({ experience }: TimelineItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-colors"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary mb-1">{experience.title}</h3>
        <p className="text-accent font-semibold">{experience.company}</p>
        <p className="text-foreground/60 text-sm">{experience.period}</p>
      </div>

      <p className="text-foreground/80 mb-4 leading-relaxed">{experience.description}</p>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Key Achievements:</p>
        <ul className="space-y-1">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground/70 text-sm">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
