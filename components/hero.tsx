"use client"

import { Suspense, useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import * as THREE from "three"
import { shaderMaterial } from "@react-three/drei"

// --- Custom Neon Core Shader ---
const CoreMaterial = shaderMaterial(
  { time: 0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    varying vec2 vUv;
    void main() {
      float core = 0.31 + 0.17 * sin(time * 2.0 + vUv.x * 6.28);
      float glow = smoothstep(core, core + 0.15, length(vUv - 0.5));
      vec3 mainColor = mix(vec3(0, 1, 1), vec3(0,0.2,0.45), vUv.y + 0.2 * sin(time));
      gl_FragColor = vec4(mainColor, 1.0 - glow);
    }
  `
)
extend({ CoreMaterial })

function NeonCore() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.time.value = clock.getElapsedTime()
      ref.current.rotation.y += 0.002
      ref.current.rotation.x += 0.001
    }
  })
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2.6, 128, 128]} />
      <coreMaterial ref={ref} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16 bg-black">
      {/* Three.js Canvas Neon Core Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.9} />
            <NeonCore />
          </Canvas>
        </Suspense>
        {/* Overlay for contrast */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "linear-gradient(120deg, rgba(0,18,40,0.56), rgba(0,255,255,0.09) 90%)"
          }}
        />
      </div>
      {/* Content overlay */}
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
          Crafting intelligent web experiences with cutting-edge technology and creative problem-solving
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05, borderColor: "rgb(34, 211, 238)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
