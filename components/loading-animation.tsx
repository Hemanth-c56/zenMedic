"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function LoadingMolecule() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 2
      groupRef.current.rotation.x = state.clock.elapsedTime * 1.5
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2
        const x = Math.cos(angle) * 0.8
        const z = Math.sin(angle) * 0.8
        return (
          <Float key={i} speed={4 + i} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.3} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} />
      <LoadingMolecule />
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-spin flex items-center justify-center">
      <div className="w-8 h-8 rounded-full bg-white" />
    </div>
  )
}

export default function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center space-x-4 p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-cyan-200/50"
    >
      <div className="w-16 h-16">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas camera={{ position: [0, 0, 2] }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      <div className="flex flex-col">
        <motion.div
          className="text-lg font-semibold text-gray-700 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Analyzing your query...
        </motion.div>

        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
