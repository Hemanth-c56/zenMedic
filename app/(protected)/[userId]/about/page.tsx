"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Heart,
  Stethoscope,
  Activity,
  Brain,
  Users,
  Zap,
  Shield,
  Server,
  Cpu,
  Globe,
  Palette,
  Layers,
  Monitor,
  Smartphone,
  ChevronRight,
  Star,
  Target,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// 3D Medical Symbol Component
function MedicalSymbol3D() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={2.5}
        height={0.4}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.04}
        bevelOffset={0}
        bevelSegments={5}
      >
        +
        <meshStandardMaterial color="#06b6d4" />
      </Text3D>
    </Float>
  );
}

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2,
}: {
  end: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useState(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  });

  return <span ref={ref}>{count}</span>;
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const techStackRef = useRef(null);
  const frontendRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isTechStackInView = useInView(techStackRef, { once: true });
  const isFrontendInView = useInView(frontendRef, { once: true });

  const router = useRouter();

  const features = [
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Symptom Analysis",
      description:
        "Advanced AI-powered symptom assessment and preliminary diagnosis suggestions",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Medical Knowledge",
      description:
        "Access to comprehensive medical database with latest research and treatments",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Fully Trained",
      description:
        "ZenMedic is trained on medical documents, ensuring accurate and reliable information",
      color: "from-red-400 to-red-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description:
        "HIPAA-compliant security ensuring your medical data stays protected",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Response",
      description:
        "Real-time AI responses powered by cutting-edge language models",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "24/7 Availability",
      description:
        "Round-the-clock medical assistance whenever you need it most",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const targetAudience = [
    {
      icon: <Users className="h-12 w-12" />,
      title: "Healthcare Professionals",
      description:
        "Doctors, nurses, and medical practitioners seeking quick reference and patient consultation support",
      stats: "85% faster diagnosis",
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Patients & Families",
      description:
        "Individuals seeking reliable medical information and preliminary health assessments",
      stats: "24/7 availability",
    },
    {
      icon: <Lightbulb className="h-12 w-12" />,
      title: "Medical Students",
      description:
        "Students learning medicine who need instant access to medical knowledge and case studies",
      stats: "10,000+ medical cases",
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Researchers",
      description:
        "Medical researchers requiring quick access to latest studies and treatment protocols",
      stats: "Real-time updates",
    },
  ];

  const techStack = [
    {
      category: "Frontend",
      icon: <Monitor className="h-8 w-8" />,
      technologies: [
        {
          name: "Next.js 15",
          description: "React framework with App Router",
          color: "bg-black",
        },
        {
          name: "TypeScript",
          description: "Type-safe development",
          color: "bg-blue-600",
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first styling",
          color: "bg-cyan-500",
        },
        {
          name: "Framer Motion",
          description: "Advanced animations",
          color: "bg-pink-500",
        },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="h-8 w-8" />,
      technologies: [
        {
          name: "Node.js",
          description: "JavaScript runtime",
          color: "bg-green-600",
        },
        {
          name: "Express.js",
          description: "Web application framework",
          color: "bg-gray-700",
        },
        {
          name: "MongoDB",
          description: "NoSQL database",
          color: "bg-green-500",
        },
        {
          name: "Mistral AI",
          description: "Advanced language model",
          color: "bg-orange-500",
        },
      ],
    }
  ];

  const frontendFeatures = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Medical Design System",
      description:
        "Carefully crafted UI components with healthcare-focused color palette and typography",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "3D Animations",
      description:
        "Interactive Three.js elements including DNA helixes, molecular structures, and medical symbols",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description:
        "Seamless experience across all devices with mobile-first approach and touch optimizations",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimized",
      description:
        "Lazy loading, code splitting, and optimized animations for lightning-fast user experience",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Accessibility First",
      description:
        "WCAG 2.1 compliant with screen reader support, keyboard navigation, and high contrast modes",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Robust Backend",
      description:
        "Scalable Node.js backend with secure API endpoints and real-time data processing",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const icons = [
            <Heart key={`heart-${i}`} className="text-red-400/10" />,
            <Stethoscope
              key={`stethoscope-${i}`}
              className="text-cyan-500/10"
            />,
            <Activity key={`activity-${i}`} className="text-teal-500/10" />,
            <Brain key={`brain-${i}`} className="text-purple-500/10" />,
          ];
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];

          return (
            <motion.div
              key={i}
              className="absolute text-4xl md:text-8xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 10,
              }}
            >
              {randomIcon}
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <header className="relative z-10 w-full py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 hover:text-cyan-600 transition-colors" />
          </Button>
          <div className="flex items-center">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="h-10 w-10 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 flex items-center justify-center text-white font-bold mr-3 shadow-lg"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              About ZenMedic
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
              ZenMedic AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionary AI-powered medical assistant that transforms
              healthcare accessibility through cutting-edge technology and
              compassionate care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes ZenMedic{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Special
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining artificial intelligence with medical expertise to
              provide accurate, accessible, and instant healthcare assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-cyan-200/50 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="relative z-10 py-20 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Who Benefits from{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ZenMedic
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for everyone in the healthcare ecosystem, from
              professionals to patients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-white/80 to-cyan-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-cyan-200/50"
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    {audience.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {audience.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {audience.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
                      <Star className="h-4 w-4" />
                      {audience.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techStackRef} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isTechStackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powered by{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Cutting-Edge Tech
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies to ensure scalability, security,
              and exceptional performance
            </p>
          </motion.div>

          <div className="space-y-12">
            {techStack.map((stack, stackIndex) => (
              <motion.div
                key={stackIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={isTechStackInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: stackIndex * 0.2 }}
                className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-cyan-200/50"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                    {stack.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stack.category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stack.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isTechStackInView ? { opacity: 1, scale: 1 } : {}
                      }
                      transition={{
                        duration: 0.4,
                        delay: stackIndex * 0.2 + techIndex * 0.1,
                      }}
                      className="bg-white/80 rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                    >
                      <div
                        className={`w-8 h-8 ${tech.color} rounded-lg mb-4`}
                      />
                      <h4 className="font-bold text-gray-900 mb-2">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {tech.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frontend Features Section */}
      <section
        ref={frontendRef}
        className="relative z-10 py-20 px-4 bg-gradient-to-r from-cyan-50/50 to-blue-50/50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFrontendInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ZenMedic{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meticulously crafted user interface that combines beauty with
              robust backend functionality for the ultimate healthcare experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {frontendFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isFrontendInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cyan-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
