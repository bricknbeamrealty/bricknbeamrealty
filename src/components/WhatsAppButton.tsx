"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCheck,
  Send,
  BadgeCheck,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function WhatsAppButton() {
  const { isOpen: isConsultationOpen } = useConsultationModal();
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

  if (isConsultationOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
      {/* POPUP CHAT BOX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[min(320px,calc(100vw-2.5rem))] sm:w-[350px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-black/10 z-50 bg-[#efeae2] font-sans"
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
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold font-sans tracking-tight text-white leading-tight">
                      Brick &amp; Beams Properties
                    </h3>
                    <BadgeCheck className="w-4 h-4 text-emerald-300 fill-emerald-500/20 shrink-0" />
                  </div>
                  <p className="text-[11px] font-sans text-emerald-100/80 mt-0.5">
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
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-sans">
                    BRICK &amp; BEAMS
                  </span>
                </div>
                <div className="text-sm font-normal font-sans text-zinc-800 leading-snug space-y-1">
                  <p>Hi there 👋</p>
                  <p>How can I help you?</p>
                </div>
                <div className="text-[10px] text-zinc-400 text-right mt-1.5 font-medium font-sans select-none flex items-center justify-end gap-1">
                  <span>{timeString}</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                </div>
              </div>
            </div>

            {/* Bottom Action Footer with Start Chat Pill Button */}
            <div className="bg-white p-4 pt-3.5 rounded-b-3xl border-t border-zinc-200/50">
              <button
                type="button"
                onClick={handleStartChat}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-semibold font-sans py-3 rounded-full flex items-center justify-center gap-2.5 shadow-md shadow-green-500/25 transition-all text-sm sm:text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white text-white shrink-0" />
                <span>Start Chat</span>
                <Send className="w-3.5 h-3.5 text-white/90 ml-0.5" />
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
          <span className="absolute right-full mr-3.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-medium font-sans tracking-wide shadow-xl border border-stone-200/90 backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-2">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] fill-current" />
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
              <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-current relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
