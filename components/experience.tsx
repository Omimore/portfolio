"use client"

import { motion } from "framer-motion"
import TimelineItem from "./timeline-item"

export default function Experience() {
  const experiences = [
    {
      title: "B.Tech TY AIML Student",
      company: "Current Institution",
      period: "Present",
      description:
        "Currently pursuing B.Tech in Artificial Intelligence and Machine Learning. Passionate about web development and exploring the intersection of AI and web technologies.",
      achievements: ["Active in web development projects", "Learning AIML concepts", "Building portfolio projects"],
    },
    {
      title: "Web Development Enthusiast",
      company: "Personal Projects",
      period: "2023 - Present",
      description:
        "Building personal web development projects for fun and learning. Exploring React, Next.js, and modern web technologies.",
      achievements: [
        "Created multiple portfolio projects",
        "Learned full-stack development independently",
        "Contributed to open-source projects",
      ],
    },
    {
      title: "AIML Learning Journey",
      company: "Self-Learning",
      period: "2022 - Present",
      description:
        "Self-studying Artificial Intelligence and Machine Learning concepts while pursuing B.Tech. Applying ML concepts in personal projects.",
      achievements: [
        "Completed online courses in ML and AI",
        "Built small ML models for fun",
        "Participated in coding challenges",
      ],
    },
  ]

  return (
    <section className="relative py-20 px-4 md:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-foreground/60 text-lg">My professional journey and key milestones</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="flex-1 md:text-right md:pr-12">
                  <TimelineItem experience={experience} />
                </div>

                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute left-0 md:left-1/2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1.5 md:-translate-x-2"
                />

                {/* Spacer for mobile */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
