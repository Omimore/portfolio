"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  // --- 3D Wireframe Grid Animation ---
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // --- Animation Setup ---
    const gridSpacing = 40 // Space between lines
    const perspective = 300 // How strong the "3D" effect is
    const speed = 0.5 // How fast the grid moves
    const lineColor = `rgba(34, 211, 238, 0.2)` // Your neon cyan, but subtle
    // --- End of Setup ---

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    const animate = () => {
      time += speed

      // Reset time to prevent it from getting too large
      if (time > gridSpacing) {
        time = 0
      }

      // Draw the dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(8, 15, 25, 1)")
      gradient.addColorStop(1, "rgba(12, 22, 35, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set the line style
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1

      const centerX = canvas.width / 2
      const horizonY = canvas.height / 2 // Vanishing point Y

      // Draw horizontal lines (moving "down")
      for (let y = 0; y <= horizonY; y += gridSpacing) {
        // Project 3D lines onto 2D canvas
        const pY = horizonY + (y + time) * perspective / perspective
        const scale = perspective / (perspective + (y + time))
        const pWidth = canvas.width * scale

        if (pY < canvas.height) { // Only draw if on screen
          ctx.beginPath()
          ctx.moveTo(centerX - pWidth / 2, pY)
          ctx.lineTo(centerX + pWidth / 2, pY)
          ctx.stroke()
        }
      }

      // Draw vertical lines (converging at the horizon)
      for (let x = -canvas.width; x <= canvas.width; x += gridSpacing) {
        const pX = centerX + x * perspective / perspective
        
        ctx.beginPath()
        ctx.moveTo(centerX, horizonY) // Start at vanishing point
        ctx.lineTo(pX, canvas.height) // Draw down to bottom
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  // --- End of Animation ---

  // --- JSX Return (with CSS Layout Fix) ---
  return (
    // This <section> is the main container. 
    // `relative` lets us position children inside it.
    // `flex`, `items-center`, `justify-center` will center your text content.
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      
      {/* 1. THE BACKGROUND CANVAS 
        `absolute inset-0` makes it fill the whole <section>
        `z-0` puts it in the background.
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        style={{ background: "linear-gradient(135deg, #080f19 0%, #0c1623 100%)" }}
      />

      {/* 2. YOUR TEXT CONTENT 
        `relative z-10` puts this *on top of* the background canvas.
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl md:text-2xl text-cyan-400 mb-4"
        >
          Hello, I'm Omkar More.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent"
        >
          B.Tech Student & Web Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto"
        >
          Crafting intelligent web experiences with cutting-edge technology and
          creative problem-solving
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            View My Work
          </motion.button>
          
          <motion.button
            onClick={() => router.push("/contact")}
            whileHover={{ scale: 1.05, borderColor: "rgb(34, 211, 238)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 3. SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}