"use client"
import { motion } from "framer-motion"
import SkillCard from "./skill-card"

export default function Skills() {
  const skillsData = [
    {
      name: "React",
      category: "Web Development",
      proficiency: 95,
      projects: ["Portfolio", "E-commerce", "Dashboard"],
    },
    {
      name: "Next.js",
      category: "Web Development",
      proficiency: 90,
      projects: ["Full-stack Apps", "SSR/SSG", "API Routes"],
    },
    {
      name: "TypeScript",
      category: "Programming",
      proficiency: 88,
      projects: ["Type Safety", "Large Projects", "Libraries"],
    },
    {
      name: "JavaScript",
      category: "Programming",
      proficiency: 80,
      projects: ["Web Development", "DOM Manipulation", "ES6+ Features"],
    },
    {
      name: "Python",
      category: "AI/ML",
      proficiency: 85,
      projects: ["Data Analysis", "ML Models", "Automation"],
    },
    {
      name: "TensorFlow",
      category: "AI/ML",
      proficiency: 80,
      projects: ["Neural Networks", "NLP", "Computer Vision"],
    },
    {
      name: "Tailwind CSS",
      category: "Web Development",
      proficiency: 92,
      projects: ["Responsive Design", "Animations", "Theming"],
    },
    {
      name: "Node.js",
      category: "Backend",
      proficiency: 87,
      projects: ["REST APIs", "Real-time Apps", "Microservices"],
    },
    {
      name: "AWS",
      category: "Cloud",
      proficiency: 70,
      projects: ["EC2", "Lambda", "S3 Storage"],
    },
  ]

  const categories = Array.from(new Set(skillsData.map((s) => s.category)))

  return (
    <section className="relative py-20 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-foreground/60 mb-12 text-lg">Hover over cards to see proficiency and project usage</p>

          {/* Skills by category */}
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-8">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <SkillCard skill={skill} />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
