"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Heart,
  Stethoscope,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Reset errors
    Object.keys(newErrors).forEach((key) => {
      newErrors[key as keyof typeof errors] = "";
    });

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Additional validations for signup
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
        isValid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const actionType = isLogin ? "login" : "signup";

      console.log(`Performing ${actionType} with:`, {
        ...formData,
        actionType,
      });

      if (actionType === "login") {
        const res = await axios.post(
          `https://zengpt-api.vercel.app/api/users/zengpt/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        router.push(`${res.data.userId}/dashboard`);
      } else {
        const res = await axios.post(
          `https://zengpt-api.vercel.app/api/users/zengpt/signup`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );

        router.push(`${res.data.userId}/dashboard`);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Clear errors when switching modes
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Medical symbols floating in background */}
        {[...Array(15)].map((_, i) => {
          const icons = [
            <Heart key={`heart-${i}`} className="text-red-400/20" />,
            <Stethoscope
              key={`stethoscope-${i}`}
              className="text-cyan-500/20"
            />,
            <Activity key={`activity-${i}`} className="text-teal-500/20" />,
          ];
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];

          return (
            <motion.div
              key={i}
              className="absolute text-4xl md:text-6xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            >
              {randomIcon}
            </motion.div>
          );
        })}
      </div>

      {/* Header */}
      <header className="w-full py-6 px-4 flex justify-center">
        <div className="flex items-center">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="h-12 w-12 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 flex items-center justify-center text-white font-bold mr-4 shadow-lg"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            ZenMedic
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-cyan-200/50">
            {/* Auth Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={cn(
                  "flex-1 py-4 text-center font-medium text-sm transition-colors",
                  isLogin
                    ? "text-cyan-600 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
              <button
                className={cn(
                  "flex-1 py-4 text-center font-medium text-sm transition-colors",
                  !isLogin
                    ? "text-cyan-600 border-b-2 border-cyan-500"
                    : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {/* Form Container */}
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {isLogin ? "Welcome Back" : "Create Your Account"}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field - Only for Signup */}
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={cn(
                              "pl-10 py-5 bg-white border-2 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl",
                              errors.name &&
                                "border-red-300 focus:border-red-400 focus:ring-red-400"
                            )}
                            placeholder="Dr. John Doe"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(
                            "pl-10 py-5 bg-white border-2 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl",
                            errors.email &&
                              "border-red-300 focus:border-red-400 focus:ring-red-400"
                          )}
                          placeholder="doctor@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={cn(
                            "pl-10 py-5 bg-white border-2 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl",
                            errors.password &&
                              "border-red-300 focus:border-red-400 focus:ring-red-400"
                          )}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field - Only for Signup */}
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="confirmPassword"
                          className="text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={cn(
                              "pl-10 py-5 bg-white border-2 focus:border-cyan-400 focus:ring-cyan-400 rounded-xl",
                              errors.confirmPassword &&
                                "border-red-300 focus:border-red-400 focus:ring-red-400"
                            )}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Forgot Password Link - Only for Login */}
{/*                     {isLogin && (
                      <div className="flex justify-end">
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    )} */}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6"
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          {isLogin ? "Sign In" : "Create Account"}
                          <ArrowRight className="h-5 w-5" />
                        </>
                      )}
                    </Button>

                    {/* Toggle Auth Mode */}
                    <div className="text-center mt-6">
                      <button
                        type="button"
                        onClick={toggleAuthMode}
                        className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
                      >
                        {isLogin
                          ? "Need an account? Sign up"
                          : "Already have an account? Sign in"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <p className="text-xs text-center text-gray-500 mt-8">
            ZenMedic provides secure access to medical professionals and
            information.
            <br />
            Your data is encrypted and protected in accordance with healthcare
            privacy standards.
          </p>
        </div>
      </main>
    </div>
  );
}
