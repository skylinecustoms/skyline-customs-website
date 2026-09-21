/**
 * SKYLINE CUSTOMS — AI Quote Assistant
 * A floating chat widget that guides visitors through a conversation,
 * collects vehicle + service info, then pre-fills the Get a Quote form.
 */

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { trackLead } from "@/lib/analytics";
import { MessageSquare, X, Send, Loader2, Bot, ChevronDown } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  year: string;
  make: string;
  model: string;
  service: string;
}

// Global store so GetAQuote page can read the pre-filled data
export const quoteAssistantStore = {
  formData: null as FormData | null,
};

const GREETING =
  "Hey there! 👋 I'm the Skyline Customs Quote Assistant. I'll help you get a custom quote in about 60 seconds. What's your first name?";

export default function QuoteAssistant({ autoOpen = false }: { autoOpen?: boolean } = {}) {
  const [, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.quoteAssistant.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      if (data.done && data.formData) {
        quoteAssistantStore.formData = data.formData;
        trackLead("ai_assistant", (data.formData as { service?: string }).service);
        setIsDone(true);
        // After a short delay, navigate to the quote form
        setTimeout(() => {
          navigate("/get-a-quote");
          setIsOpen(false);
        }, 2200);
      }
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I hit a snag. You can still fill out the quote form directly — I'll link you there!",
        },
      ]);
    },
  });

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Show notification dot when closed and a new message arrives
  useEffect(() => {
    if (!isOpen) setHasNewMessage(true);
  }, [messages.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasNewMessage(false);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text || chatMutation.isPending || isDone) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");

    // Send full conversation history (excluding the initial greeting which is assistant-only)
    chatMutation.mutate({
      messages: newMessages.filter((m) => !(m.role === "assistant" && m.content === GREETING)),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([{ role: "assistant", content: GREETING }]);
    setInput("");
    setIsDone(false);
    quoteAssistantStore.formData = null;
  };

  return (
    <>
      {/* Floating trigger buttons */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          {/* AI Chat */}
          <button
            onClick={handleOpen}
            aria-label="Open AI Quote Assistant"
            className="group flex items-center gap-3 bg-[#E85D04] hover:bg-[#d14e00] text-black shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 rounded-full px-5 py-4"
          >
            <MessageSquare className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold tracking-wide text-sm whitespace-nowrap">
              Get a Quick Quote
            </span>
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
            )}
          </button>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-[#111] border border-zinc-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[520px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#0D0D0D] border-b border-zinc-800 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#E85D04] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Quote Assistant</p>
              <p className="text-[#E85D04] text-xs">Skyline Customs · AI-powered</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized((v) => !v)}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isMinimized ? "rotate-180" : ""}`}
                />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-zinc-700">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-[#E85D04] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#E85D04] text-black rounded-br-sm"
                          : "bg-zinc-800 text-zinc-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {chatMutation.isPending && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#E85D04] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                {/* Done state — redirect notice */}
                {isDone && (
                  <div className="text-center py-2">
                    <div className="inline-flex items-center gap-2 bg-zinc-800 text-zinc-300 text-xs px-3 py-1.5 rounded-full">
                      <Loader2 className="w-3 h-3 animate-spin text-[#E85D04]" />
                      Opening your pre-filled quote form…
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="px-4 py-3 border-t border-zinc-800 bg-[#0D0D0D] flex-shrink-0">
                {isDone ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/get-a-quote")}
                      className="flex-1 bg-[#E85D04] hover:bg-[#d14e00] text-black text-sm font-bold py-2.5 rounded-xl transition-colors"
                    >
                      Open Quote Form →
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-3 py-2.5 text-zinc-400 hover:text-white text-sm border border-zinc-700 rounded-xl transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your reply…"
                      disabled={chatMutation.isPending}
                      className="flex-1 bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#E85D04] transition-colors disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || chatMutation.isPending}
                      aria-label="Send message"
                      className="w-10 h-10 bg-[#E85D04] hover:bg-[#d14e00] disabled:opacity-40 disabled:cursor-not-allowed text-black rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                    >
                      {chatMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
                <p className="text-zinc-600 text-[10px] text-center mt-2">
                  Powered by Skyline Customs AI · Your info is secure
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
