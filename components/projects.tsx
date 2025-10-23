"use client"

import { motion } from "framer-motion"
import ProjectCard from "./project-card"

export default function Projects() {
  const projects = [
    {
      title: "Visionary-Club website",
      description: "Real-time chat application with AI-powered responses and natural language processing",
      technologies: ["React.js", "TypeScript", "vite", "CSS Modules", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com",
      demo: "https://visionary-club.github.io/",
      image: "/visionarylogo.png",
    },
    {
      title: "sainath girls hostel website",
      description: "Full-stack e-commerce solution with payment integration and inventory management",
      technologies: ["React", "Node.js", "Stripe"],
      github: "https://github.com",
      demo: "https://sainathpg.vercel.app/",
      image: "/sainathpg.png",
    },
    {
      title: "Sovap",
      description: "waitlist",
      technologies: ["React.js","Python", "Supabase", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://waitlist.sovap.in/",
      image: "/Sovap.png",
    },
    {
      title: "Intrusion Detection System",
      description: "AI-powered system to detect and prevent unauthorized access in real-time",
      technologies: ["Python", "TensorFlow", "OpenCV"],
      github: "",
      demo: "https://demo.com",
      image: "/ml-model-visualization.jpg",
    },
    {
      title: "Real-time voice cloning ",
      description: "Web application that clones voices in real-time using deep learning techniques",
      technologies: ["Python", "PyTorch", "Flask","text-to-speech"],
      github: "",
      demo: "https://demo.com",
      image: "/social-media-interface.png",
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website with 3D animations and interactive components",
      technologies: ["Next.js", "Framer Motion", "Three.js", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://omkarmore-portfolio.vercel.app/",
      image: "/portfolio.png",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section id="projects" className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-foreground/60 text-lg">
            A selection of my recent work showcasing web development and AI integration
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
