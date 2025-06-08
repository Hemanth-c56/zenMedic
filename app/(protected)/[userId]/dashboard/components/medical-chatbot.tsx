"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ChatHeader from "./chat-header";
import ChatMessage from "./chat-message";
import WelcomeScreen from "./welcome-screen";
import runMistral from "@/lib/mistral";
import MedicalBackground from "@/components/medical-background";
import FloatingParticles from "@/components/floating-particles";
import LoadingAnimation from "@/components/loading-animation";
import axios from "axios";
import { useParams } from "next/navigation";
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export default function MedicalChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY || "";
  const params = useParams();
  const id = params.userId as string;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (showWelcome) {
      setShowWelcome(false);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // console.log("Sending message to Mistral:", input, apiKey);
      let prompt = `You are an expert in medical assistance.You can answer the user with symptoms, health tips just like a expert doctor and also suggest with medicines. Answer the user's questions based on the provided input:\n\nUser: ${input}\nAssistant:`;
      const response = await runMistral(apiKey, prompt);
      // console.log("Received response from Mistral:", response);

      // request backend to update the prompt into the db
      console.log("Updating user prompt in the database:", input, id);
      const done = await axios.put(
        `https://zengpt-api.vercel.app/api/users/zengpt/${id}`,
        { data: input }
      );
      console.log("Database update response:", done);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setShowWelcome(true);
  };

  return (
    <div className="relative flex flex-col w-full h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <MedicalBackground />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full bg-gradient-to-b from-cyan-800/70 via-blue-800/65 to-teal-800/70 backdrop-blur-[2px]">
        <ChatHeader onNewChat={startNewChat} />

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {showWelcome ? (
              <WelcomeScreen onStartChat={() => setShowWelcome(false)} />
            ) : (
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <ChatMessage message={message} />
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LoadingAnimation />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Enhanced Input Area */}
        <motion.div
          className="relative border-t border-white/30 bg-white/40 p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-teal-400/20" />
          <form
            onSubmit={handleSubmit}
            className="relative max-w-4xl mx-auto flex space-x-4"
          >
            <div className="relative flex-1">
              <div>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your symptoms or ask a medical question..."
                  className="pr-16 py-6 text-lg bg-white border-2 border-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400 rounded-2xl shadow-lg transition-all duration-300"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  size="icon"
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl shadow-lg transition-all duration-300",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isLoading}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </form>
          <motion.p
            className="text-xs text-center text-gray-600 mt-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Expert Medical Advises & Medical information provided. If serious
            symptoms consult a healthcare professional.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
