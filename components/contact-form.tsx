"use client";
import { useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EMAIL, CONTACT_NAME } from "@/lib/data";

export function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Inquiry for ${CONTACT_NAME}:\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\n\nMessage:\n${f.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Priority Reservation Inquiry from " + f.name)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-white/80">Name</label>
          <Input
            required
            placeholder="Your name"
            value={f.name}
            onChange={set("name")}
            aria-label="Name"
            className="bg-[#0e0e17] border-[#2a2a3e] text-white focus-visible:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white/80">Phone</label>
          <Input
            required
            type="tel"
            placeholder="Phone number"
            value={f.phone}
            onChange={set("phone")}
            aria-label="Phone"
            className="bg-[#0e0e17] border-[#2a2a3e] text-white focus-visible:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white/80">Email</label>
          <Input
            required
            type="email"
            placeholder="Email address"
            value={f.email}
            onChange={set("email")}
            aria-label="Email"
            className="bg-[#0e0e17] border-[#2a2a3e] text-white focus-visible:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-white/80">Your Trip Details or Inquiry</label>
        <textarea
          required
          placeholder="Tell us your itinerary, date, timing, or special requests..."
          value={f.message}
          onChange={set("message")}
          aria-label="Message"
          className="min-h-28 w-full rounded-lg border border-[#2a2a3e] bg-[#0e0e17] px-3.5 py-2.5 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="cta-primary flex h-14 w-full items-center justify-center gap-2 rounded-xl text-base font-bold shadow-xl transition-transform hover:scale-[1.01]"
      >
        <Send className="size-4" />
        <span>Send Priority Inquiry to {CONTACT_NAME}</span>
      </button>

      <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" />
        <span>Inquiries are delivered directly to {EMAIL} · 24/7 Rapid Response</span>
      </div>
    </form>
  );
}
