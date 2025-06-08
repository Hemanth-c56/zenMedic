"use client";

import { motion } from "framer-motion";
import { RefreshCw, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface ChatHeaderProps {
  onNewChat: () => void;
}

export default function ChatHeader({ onNewChat }: ChatHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-20 border-b border-white/20 bg-white/80"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between h-20 px-6">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <div>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 bg-white/95 backdrop-blur-md"
            >
              <div className="flex flex-col h-full py-6">
                <div className="px-2">
                  <motion.h2
                    className="text-2xl font-bold text-gray-900 mb-8 flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="mr-3 text-cyan-500"
                    >
                      <Sparkles className="h-8 w-8" />
                    </motion.div>
                    ZenMedic
                  </motion.h2>
                  <Button
                    variant="outline"
                    className="w-full justify-start mb-4 bg-white/80 backdrop-blur-sm"
                    onClick={() => {
                      onNewChat();
                      setIsOpen(false);
                    }}
                  >
                    <RefreshCw className="mr-3 h-5 w-5" />
                    New Conversation
                  </Button>
                </div>
                <div className="mt-auto px-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Expert Medical Advises & Medical information provided. If
                    serious symptoms consult a healthcare professional.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

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
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <div className="ml-5">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                ZenMedic
              </motion.h1>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center border-2 border-cyan-200/50 bg-white hover:bg-cyan-50 hover:text-cyan-600 rounded-xl shadow-lg transition-all duration-300"
              onClick={onNewChat}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Conversation
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
