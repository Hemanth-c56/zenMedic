"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  const helixPoints = []
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 4
    const x = Math.cos(angle) * 1.5
    const z = Math.sin(angle) * 1.5
    const y = (i / 50) * 8 - 4
    helixPoints.push([x, y, z])
  }

  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      {helixPoints.map((point, index) => (
        <Float key={index} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={point as [number, number, number]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#0ea5e9" : "#38bdf8"}
              emissive={index % 2 === 0 ? "#0ea5e9" : "#38bdf8"}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function MoleculeStructure() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[-3, 1, -1]}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#064e3b" emissive="#064e3b" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 1.2
        const z = Math.sin(angle) * 1.2
        return (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.8}>
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#065f46" emissive="#065f46" emissiveIntensity={0.1} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function HeartBeat() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      groupRef.current.scale.setScalar(pulse)
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, -2, -3]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#991b1b" emissive="#991b1b" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  )
}

function MedicalCross({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0ea5e9" />

      <DNAHelix />
      <MoleculeStructure />
      <HeartBeat />
      
      {/* Add medical crosses at different positions */}
      <MedicalCross position={[2, 2, -3]} />
      <MedicalCross position={[-2, -1, -2]} />
      <MedicalCross position={[3, -2, -1]} />

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

function Fallback() {
  return <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 to-blue-100/20" />
}

export default function MedicalBackground() {
  return (
    <Suspense fallback={<Fallback />}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        onCreated={(state) => {
          state.gl.setClearColor(0x000000, 0)
        }}
      >
        <Scene />
      </Canvas>
    </Suspense>
  )
}
