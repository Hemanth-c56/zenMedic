import MedicalChatbot from "@/components/medical-chatbot"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MediChat - Your AI Medical Assistant",
  description: "Get instant answers to your medical questions with our AI-powered medical chatbot.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <MedicalChatbot />
    </main>
  )
}
