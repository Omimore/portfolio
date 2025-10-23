"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    technologies: string[]
    github: string
    demo: string
    image: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsHovered(!isHovered)}
      className="group relative h-96 rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-colors cursor-pointer md:cursor-default"
    >
      {/* Image background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Top section - always visible */}
        <div className="flex-1 flex flex-col justify-end">
          <motion.h3
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-white mb-2"
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Bottom section - expands on hover or click on mobile */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 overflow-hidden"
        >
          <p className="text-foreground/80 text-sm leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90 transition-colors text-center"
            >
              GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 border border-primary text-primary rounded text-sm font-medium hover:bg-primary/10 transition-colors text-center"
            >
              Demo
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
