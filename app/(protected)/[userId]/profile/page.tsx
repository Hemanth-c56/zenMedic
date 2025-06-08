"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  Sparkles,
  User,
  Mail,
  MessageSquare,
  Calendar,
  ArrowLeft,
  AlertTriangle,
  Heart,
  Stethoscope,
  Activity,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import axios from "axios";

// Mock user data - replace with actual user data from your auth system
let mockUser = {
  name: "Getting...",
  email: "getting...",
  totalChats: 0,
};

export default function ProfilePage() {
  const [showDeleteChatsModal, setShowDeleteChatsModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  let id = userId;

  useEffect(() => {
    async function fetchUserHistory() {
      try {
        const res = await axios.get(
          `https://zengpt-api.vercel.app/api/users/zengpt/${id}`
        );

        const userData = await axios.get(
          `https://zengpt-api.vercel.app/api/users/zengpt/user/details/${id}`
        );

        setChatHistory(res.data.history);
        mockUser = {
          name: userData.data.userDetails.name,
          email: userData.data.userDetails.email,
          totalChats: res.data.history.length,
        };
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    }
    fetchUserHistory();
  }, []);

  // const handleDeleteChats = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Here you would make an API call to delete all user chats
  //     console.log("Deleting all user chats...");

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     // Clear chat history
  //     setChatHistory([]);
  //     setShowDeleteChatsModal(false);

  //     console.log("All chats deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting chats:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Here you would make an API call to delete the user account
      console.log("Deleting user account...");

      await axios.delete(
        `https://zengpt-api.vercel.app/api/users/zengpt/delete/account/${userId}`
      );

      console.log("Account deleted successfully");

      // Redirect to login page or home page
      router.push("/auth");
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const icons = [
            <Heart key={`heart-${i}`} className="text-red-400/10" />,
            <Stethoscope
              key={`stethoscope-${i}`}
              className="text-cyan-500/10"
            />,
            <Activity key={`activity-${i}`} className="text-teal-500/10" />,
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
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
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
      <header className="relative z-10 w-full py-6 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4"
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
              Profile
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* User Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-cyan-200/50 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-24 w-24 bg-gradient-to-r from-cyan-400 to-teal-500 shadow-lg">
                <div className="flex items-center justify-center h-full">
                  <User className="h-12 w-12 text-white" />
                </div>
              </Avatar>
              <motion.div
                className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="h-3 w-3 bg-white rounded-full" />
              </motion.div>
            </div>

            {/* User Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {mockUser.name}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 mb-4">
                <Mail className="h-4 w-4" />
                <span>{mockUser.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-600 font-medium">
                <MessageSquare className="h-4 w-4" />
                <span>{mockUser.totalChats} total conversations</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={() => setShowDeleteChatsModal(true)}
              variant="outline"
              className="flex-1 py-3 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 rounded-xl transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Button
              onClick={() => setShowDeleteAccountModal(true)}
              variant="outline"
              className="flex-1 py-3 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-300"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </motion.div>

        {/* Chat History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-cyan-200/50 p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-cyan-600" />
            Your Chat History
          </h3>

          {chatHistory.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No chat history found</p>
              <p className="text-gray-400 text-sm mt-2">
                Start a conversation to see your messages here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      {chat}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Delete Chats Modal */}
      <AnimatePresence>
        {showDeleteChatsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteChatsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Sign Out
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to Sign Out?
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteChatsModal(false)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    // onClick={handleDeleteChats}
                    onClick={() => {
                      router.push("/auth");
                    }}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Sign Out"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteAccountModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteAccountModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Delete Account
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to permanently delete your account? This
                  will remove all your data and cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteAccountModal(false)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Delete Account"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
