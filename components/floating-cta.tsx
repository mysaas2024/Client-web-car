"use client";
import { MessageSquare, Phone } from "lucide-react";
import { TEL, WA, CONTACT_NAME } from "@/lib/data";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* Live availability pill */}
      <div className="hidden items-center gap-2 rounded-full border border-primary/40 bg-[#0d0d18]/90 px-3.5 py-1.5 text-xs text-white shadow-xl backdrop-blur-md sm:flex">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
        </span>
        <span className="font-medium text-white/90">24/7 Chauffeur Dispatch</span>
        <span className="text-primary font-semibold">· {CONTACT_NAME}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* WhatsApp Fast Quote */}
        <a
          href={`${WA}?text=${encodeURIComponent("Hello Classicontariolimo, I would like to inquire about a chauffeur booking.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-12 items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/50 bg-[#0a1f14] px-3.5 sm:px-4 text-xs font-bold text-emerald-400 shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:bg-emerald-950 sm:text-sm"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="size-4 transition-transform group-hover:scale-110" />
          <span className="hidden xs:inline sm:inline">WhatsApp</span>
          <span className="hidden sm:inline">Quote</span>
        </a>

        {/* Direct Call Abdul Jabbar */}
        <a
          href={TEL}
          className="cta-primary flex h-12 items-center gap-1.5 sm:gap-2 rounded-full px-4 sm:px-5 text-xs font-bold text-black shadow-[0_4px_25px_rgba(201,165,92,0.5)] transition-all hover:scale-105 sm:text-sm"
          title={`Call ${CONTACT_NAME} directly`}
        >
          <Phone className="size-4 animate-bounce" />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
}
