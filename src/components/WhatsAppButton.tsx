"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeString, setTimeString] = useState("17:03");

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleStartChat = () => {
    const phoneNumber = "18008492742";
    const message = encodeURIComponent(
      "Hi there! I would like to inquire about Brick & Beams properties."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      {/* POPUP CHAT BOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[310px] sm:w-[350px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-black/10 z-50 bg-[#efeae2] font-sans"
          >
            {/* Header: Dark WhatsApp Teal */}
            <div className="bg-[#005c4b] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {/* Official Brand Logo in Circular Avatar with White Background & Active Online Badge */}
                <div className="relative w-12 h-12 shrink-0 rounded-full bg-white border-2 border-white/90 shadow-md flex items-center justify-center p-1 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Brick & Beams Realty"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                  <span
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-white shadow-sm"
                    title="Online"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-white leading-tight">
                    Brick &amp; Beams Properties
                  </h3>
                  <p className="text-[11px] text-emerald-100/80 mt-0.5">
                    Typically replies within an hour
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Body (WhatsApp Cream Textured Background) */}
            <div className="p-4 pt-5 pb-6 min-h-[140px] flex flex-col justify-start">
              {/* Message Bubble */}
              <div className="relative bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm text-zinc-800 max-w-[90%] self-start border border-black/5">
                {/* Little speech bubble tail on top-left */}
                <span className="absolute -top-0 -left-2 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />

                <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-zinc-100">
                  <Image
                    src="/logo.png"
                    alt="Brick & Beams"
                    width={48}
                    height={24}
                    className="h-3.5 w-auto object-contain"
                  />
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    BRICK &amp; BEAMS
                  </span>
                </div>
                <div className="text-sm font-normal text-zinc-800 leading-snug space-y-1">
                  <p>Hi there 👋</p>
                  <p>How can I help you?</p>
                </div>
                <div className="text-[10px] text-zinc-400 text-right mt-1.5 font-medium select-none">
                  {timeString}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer with Start Chat Pill Button */}
            <div className="bg-white p-4 pt-3.5 rounded-b-3xl border-t border-zinc-200/50">
              <button
                type="button"
                onClick={handleStartChat}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-medium py-3 rounded-full flex items-center justify-center gap-2.5 shadow-md shadow-green-500/25 transition-all text-sm sm:text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400"
              >
                {/* WhatsApp White Icon */}
                <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Start Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION TOGGLE BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Radar Pulse Ping when chat is closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
        )}

        {/* Hover Tooltip when closed */}
        {!isOpen && (
          <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-semibold tracking-wide shadow-xl border border-stone-200/90 backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-2">
            <span>Chat with us</span>
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          </span>
        )}

        {/* Icon toggle: X when open, WhatsApp when closed */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-white relative z-10 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
