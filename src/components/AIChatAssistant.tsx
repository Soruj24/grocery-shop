"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "আসসালামু আলাইকুম! আমি আপনার মুদি বাজার সহকারী। আপনাকে কীভাবে সাহায্য করতে পারি?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "দুঃখিত, আমি বর্তমানে উত্তর দিতে পারছি না।" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition-all z-50 flex items-center space-x-2"
      >
        <Bot className="w-6 h-6" />
        <span className="font-bold hidden sm:inline">AI সহকারী</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-green-600 dark:bg-green-700 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span className="font-bold">AI গ্রোসারি সহকারী</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-green-600 dark:bg-green-700 text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm rounded-tl-none border border-gray-100 dark:border-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 animate-pulse text-gray-800 dark:text-gray-100">
                  টাইপ করছে...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="এখানে লিখুন..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 px-4 focus:ring-2 focus:ring-green-500 text-sm dark:text-gray-100"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-green-600 dark:bg-green-700 text-white p-2 rounded-full hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
