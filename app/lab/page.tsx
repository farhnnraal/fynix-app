"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LayoutGridIcon } from "lucide-react";
import HeaderElement from "@/components/HeaderElement";
import ButtonElement from "@/components/ButtonElement";

type Role = "ai" | "user";

interface Message {
  id: number;
  role: Role;
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Hello! I'm Fynix, your AI assistant. I'm here to help you answer any questions you have. What would you like to know today?",
    timestamp: "09:00",
  }
];

function AIAvatar() {
  return (
    <div className="ai-avatar" aria-hidden="true">
      <img src="/images/fynix-ai.jpeg" alt="" />
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4Z"
        fill="#6244FC"
      />
      <path
        d="M4 11a8 8 0 0 0 16 0M12 19v4M8 23h8"
        stroke="#6244FC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z"
        stroke="#6244FC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AiBubble({ message }: { message: Message }) {
  return (
    <div className="ai-message-group" role="listitem">
      <div className="ai-bubble">
        <p className="bubble-text">{message.text}</p>
        <div className="ai-meta">
          <AIAvatar />
          {/* <span className="bubble-timestamp">Fynix AI · {message.timestamp}</span> */}
        </div>
      </div>
    </div>
  );
}

function UserBubble({ message }: { message: Message }) {
  return (
    <div className="user-message-group" role="listitem">
      <div className="user-bubble">
        <p className="bubble-text">{message.text}</p>
      </div>
      {/* <span className="bubble-timestamp user-timestamp">You · {message.timestamp}</span> */}
    </div>
  );
}

export default function AnswerPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  let nextId = useRef(INITIAL_MESSAGES.length + 1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getTimestamp = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: nextId.current++,
      role: "user",
      text: trimmed,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: nextId.current++,
        role: "ai",
        text: "That's a great question! I'm processing your inquiry and will provide a detailed, thoughtful response. As an AI assistant, I strive to give you accurate and helpful information based on your specific needs.",
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);

    setIsSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    const target = e.target;
    target.style.height = "auto";
    const newHeight = Math.min(target.scrollHeight, 140);
    target.style.height = newHeight + "px";
    // Detect multi-line: compare scrollHeight against a single line-height (27px = 18px font * 1.5)
    const lineHeight = parseFloat(getComputedStyle(target).lineHeight) || 27;
    setIsMultiLine(target.scrollHeight > lineHeight + 1);
  };

  return (
    <div className="bg-neutral-50 flex justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        /* ── Design Tokens ── */
        :root {
          --primary-50:  #EDEEFF;
          --primary-100: #C3C4FF;
          --primary-300: #9F9EFF;
          --primary-500: #6244FC;
          --primary-700: #582CD6;
          --primary-900: #3C2788;
          --primary-950: #25174F;

          --neutral-50:  #FAFAFA;
          --neutral-100: #F5F5F5;
          --neutral-300: #D4D4D4;
          --neutral-500: #737373;
          --neutral-700: #404040;
          --neutral-900: #171717;
          --neutral-950: #121212;

          --font-family: 'Space Grotesk', sans-serif;

          --radius-bubble: 24px;
          --padding-bubble-lr: 16px;
          --padding-bubble-tb: 16px;
          --gap-bubble: 16px;
          --gap-bubble-content: 8px;
        }

        .header-center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header-center .progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 400;
          line-height: 16x;
          color: var(--neutral-500);
        }

        .header-center .progress-dots {
          display: flex;
          gap: 8px;
        }

        .header-center .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--neutral-300);
        }

        .header-center .dot.active {
          width: 12px;
          border-radius: 5px;
          background: var(--primary-500);
        }

        .header-title {
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          color: var(--neutral-900);
          letter-spacing: -0.01em;
        }

        .header-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--neutral-300);
          background: var(--neutral-50);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .header-icon-btn:hover {
          background: var(--primary-50);
          border-color: var(--primary-300);
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 2px #dcfce7; }
          50% { box-shadow: 0 0 0 4px #dcfce7; }
        }

        /* ── Chat Main ── */
        .answer-main {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: var(--gap-bubble);
          scroll-behavior: smooth;
        }

        /* Date divider */
        .date-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 8px 0;
        }
        .date-divider-line {
          flex: 1;
          height: 1px;
          background: var(--neutral-300);
        }
        .date-divider-label {
          font-size: 11px;
          font-weight: 500;
          line-height: 16px;
          color: var(--neutral-500);
          white-space: nowrap;
        }

        /* ── AI Bubble ── */
        .ai-message-group {
          display: flex;
          flex-direction: column;
          gap: var(--gap-bubble);
          align-items: flex-start;
          max-width: 75%;
          animation: fade-up 0.3s ease;
        }

        .ai-bubble {
          background: var(--neutral-50);
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-bubble);
          padding: var(--padding-bubble-tb) var(--padding-bubble-lr);
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--gap-bubble);
        }

        .ai-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ai-avatar {
          width: 32px;
          height: 32px;
          border-radius: 99px;
          background: var(--primary-50);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          // border: 1px solid var(--primary-100);
        }

        .ai-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 99px;
        }

        /* ── User Bubble ── */
        .user-message-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
          align-self: flex-end;
          max-width: 80%;
          animation: fade-up 0.3s ease;
        }

        .user-bubble {
          background: var(--primary-50);
          border: 1px solid var(--primary-300);
          border-radius: var(--radius-bubble);
          padding: var(--padding-bubble-tb) var(--padding-bubble-lr);
          width: 100%;
        }

        /* ── Shared Bubble Styles ── */
        .bubble-text {
          font-size: 18px;
          font-weight: 400;
          line-height: 150%;
          color: var(--neutral-700);
          white-space: pre-wrap;
          word-break: break-word;
        }

        .bubble-timestamp {
          font-size: 11px;
          font-weight: 500;
          line-height: 16px;
          color: var(--neutral-500);
        }

        .user-timestamp {
          text-align: right;
        }

        /* ── Typing Indicator ── */
        .typing-group {
          display: flex;
          flex-direction: column;
          gap: var(--gap-bubble);
          align-items: flex-start;
          max-width: 75%;
          animation: fade-up 0.3s ease;
        }

        .typing-bubble {
          background: var(--neutral-50);
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-bubble);
          padding: var(--padding-bubble-tb) var(--padding-bubble-lr);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary-300);
          animation: typing-bounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Footer ── */
        .answer-footer {
          flex-shrink: 0;
        }

        .footer-inner {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          gap: 10px;
        }

        .input-wrapper {
          display: flex;
          width: 100%;
          justify-content: center;
          gap: 16px;
          background: var(--neutral-50);
          border: 1.5px solid var(--primary-500);
          /* border-radius controlled via inline style from JS */
          box-shadow: 0 0 24px rgba(98, 68, 252, 0.3);
          transition: all 0.25s ease-in-out;
          padding: 8px 16px;
        }

        .input-wrapper:focus-within {
          box-shadow: 0 0 12px rgba(98, 68, 252, 0.3);
          border-color: var(--primary-500);
        }

        .next-button {
          height: 66px;
          width: 100%;
          display: flex;
          font-size: 18px;
          font-weight: 500;
          justify-content: center;
          align-items: center;
          gap: 16px;
          color: #fff;
          background: var(--primary-500);
          border-radius: 999px;
          padding: 16px;
          box-shadow: 0 0 24px rgba(98, 68, 252, 0.3);
          transition: all 0.25s ease-in-out;
          cursor: pointer;
        }

        .next-button:hover {
          background: var(--primary-700)
        }

        .prompt-textarea {
          width: 100%;
          background: transparent;
          // background: var(--primary-50);
          border: none;
          outline: none;
          resize: none;
          font-family: var(--font-family);
          font-size: 18px;
          font-weight: 400;
          line-height: 150%;
          padding: 0 16px;
          color: var(--neutral-700);
          // min-height: 24px;
          // max-height: 280px;
          overflow-y: auto;
        }

        .prompt-textarea::placeholder {
          color: var(--neutral-500);
        }

        .prompt-textarea::-webkit-scrollbar { width: 0; }

        .mic-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: background 0.15s;
        }
        .mic-btn:hover { background: var(--primary-50); }
        .mic-btn:disabled { display: none; }

        .send-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          background: transparent;
          border: none;
          transition: background 0.15s;
        }
        .send-btn:hover { background: var(--primary-50); }
        .send-btn:disabled { display: none; }

        .footer-hint {
          margin-top: 8px;
          text-align: center;
          font-size: 11px;
          line-height: 16px;
          font-weight: 400;
          color: var(--neutral-500);
        }

        .glass {
          opacity: 1;
          backdrop-filter: blur(30px) saturate(200%) brightness(1.12);
          -webkit-backdrop-filter: blur(30px) saturate(200%) brightness(1.12);
          background: rgba(255, 255, 255, 0.08);
          background-image: linear-gradient(
            -45deg,
            rgba(255, 80, 200, 0.09),
            rgba(80, 200, 255, 0.09),
            rgba(255, 200, 80, 0.07)
          );
        }

      `}</style>

      <div className="w-full box-border min-h-dvh gap-4 flex flex-col justify-between p-[16px]">

        {/* ── Header ── */}
        <HeaderElement elements={
          <>
            <ButtonElement icon={ <ArrowLeft className="w-7 h-7" /> } destination="/" />
            <div className="header-center">
              <div className="progress">
                <p>Question 1</p>
                <div className="progress-dots">
                  <span className="dot active" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            </div>
            <ButtonElement icon={ <LayoutGridIcon className="w-5 h-5" /> } destination="/" />
          </> 
        } />

        {/* ── Main ── */}
        <main className="answer-main" role="log" aria-live="polite" aria-label="Chat messages">

          <ul role="list" style={{ listStyle: "none", display: "contents" }}>
            {messages.map((msg) =>
              msg.role === "ai" ? (
                <AiBubble key={msg.id} message={msg} />
              ) : (
                <UserBubble key={msg.id} message={msg} />
              )
            )}
          </ul>

          {isTyping && (
            <div className="typing-group" aria-label="Fynix AI is typing">
              <div className="typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />

              </div>
              <div className="ai-meta">
                <AIAvatar />
                <span className="bubble-timestamp">Fynix AI is typing…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* ── Footer ── */}
        <footer className="answer-footer" role="contentinfo">
          <div className="footer-inner">
            <div
              className="input-wrapper glass"
              style={{
                borderRadius: isMultiLine ? "24px" : "9999px",
                flexDirection: isMultiLine ? "column" : "row",
                alignItems: isMultiLine ? "end" : "center",
                display: isSubmitted ? "none" : "flex"
              }}
            >
              <textarea
                ref={inputRef}
                id="prompt-input"
                className="prompt-textarea"
                placeholder="Ask anything…"
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                rows={1}
                aria-label="Type your message"
              />
              <button className="mic-btn" aria-label="Use microphone" id="mic-button" type="button" disabled={!!inputValue.trim() || isTyping}>
                <MicIcon />
              </button>
              <button className="send-btn" aria-label="Send message" id="send-button" type="button" onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
                <SendIcon />
              </button>
            </div>
            <button
              className="next-button"
              style={{ display: isSubmitted ? "flex" : "none" }}>
              Next Question
            </button>
          </div>
          <p className="footer-hint">Press Enter to send · Shift+Enter for new line</p>
        </footer>
      </div>
    </div>
  );
}
