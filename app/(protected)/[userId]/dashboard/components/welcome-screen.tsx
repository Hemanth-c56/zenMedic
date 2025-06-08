"use client";

import { motion } from "framer-motion";
import { Heart, Brain, Stethoscope, Activity, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

function Welcome3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Text
          font="/fonts/Inter-Bold.ttf"
          fontSize={0.5}
          color="#06b6d4"
          anchorX="center"
          anchorY="middle"
        >
          ZenMedic
        </Text>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Welcome3D />
    </>
  );
}

function TextFallback() {
  return (
    <div className="flex items-center justify-center h-32">
      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        ZenMedic
      </motion.h1>
    </div>
  );
}

export default function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const features = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      text: "Symptom Analysis",
      color: "from-cyan-400 to-cyan-600",
      description: "AI-powered symptom assessment",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      text: "Health Information",
      color: "from-blue-400 to-blue-600",
      description: "Comprehensive medical knowledge",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      text: "Medical Guidance",
      color: "from-teal-400 to-teal-600",
      description: "Professional health advice",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      text: "Wellness Tips",
      color: "from-red-400 to-red-600",
      description: "Personalized health recommendations",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      text: "Instant Response",
      color: "from-yellow-400 to-orange-500",
      description: "Real-time medical assistance, with accurate answers",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      text: "Medication Info",
      color: "from-green-400 to-green-600",
      description: "Accurate details on drug usage, dosage, and side effects",
    },
  ];
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-cyan-200/50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-200/20 to-blue-200/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Title */}
      <motion.div variants={itemVariants} className="h-32 w-full mb-6">
        <Suspense fallback={<TextFallback />}>
          <Canvas camera={{ position: [0, 0, 3] }}>
            <Scene />
          </Canvas>
        </Suspense>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4"
      >
        Your AI Medical Assistant
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-gray-600 mb-8 max-w-2xl text-lg leading-relaxed"
      >
        Experience the future of healthcare with our advanced AI-powered medical
        chatbot. Get instant, reliable answers to your health questions with
        cutting-edge technology.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 w-full max-w-4xl"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="relative group"
          >
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-300">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg`}
              >
                {feature.icon}
              </div>
              <span className="text-sm font-bold text-gray-800 mb-2">
                {feature.text}
              </span>
              <span className="text-xs text-gray-600 text-center">
                {feature.description}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          onClick={onStartChat}
          size="lg"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-12 py-4 text-lg rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Start Your Health Journey</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
