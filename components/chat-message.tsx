"use client"

import { motion } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { User, Bot, Heart, Brain } from "lucide-react"

interface ChatMessageProps {
  message: {
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} max-w-[85%]`}>
        <div>
          <Avatar
            className={`h-12 w-12 ${isUser ? "ml-3" : "mr-3"} ${
              isUser ? "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-gradient-to-r from-cyan-400 to-teal-500"
            } shadow-lg`}
          >
            <div className="flex items-center justify-center h-full">
              {isUser ? (
                <User className="h-6 w-6 text-white" />
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </div>
          </Avatar>
        </div>

        <motion.div
          initial={{ opacity: 0, x: isUser ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`relative p-6 rounded-2xl shadow-xl border ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none border-blue-300/50"
              : "bg-white text-gray-800 rounded-tl-none border-cyan-200/50"
          }`}
        >
          {/* Decorative elements for assistant messages */}
          {!isUser && (
            <div className="absolute top-2 right-2 flex space-x-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="h-3 w-3 text-red-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Brain className="h-3 w-3 text-purple-400" />
              </motion.div>
            </div>
          )}

          <div className="text-sm leading-relaxed whitespace-pre-wrap pr-8">{message.content}</div>

          <motion.div
            className={`text-xs mt-3 ${isUser ? "text-blue-100" : "text-gray-500"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </motion.div>

          {/* Animated border for user messages */}
          {isUser && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
