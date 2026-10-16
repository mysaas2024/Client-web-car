"use client";
import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Phone,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { PHONE, TEL, WA, EMAIL, CONTACT_NAME, fleet, areas } from "@/lib/data";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actions?: { label: string; href?: string; onClick?: () => void; isPrimary?: boolean }[];
}

const QUICK_PROMPTS = [
  "✈️ Airport Pickup Rates",
  "🚘 What vehicles are in the fleet?",
  "💰 How do fixed rates work?",
  "⏱️ Hourly Chauffeur Minimum",
  "📞 Connect with Abdul Jabbar",
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `Hello! Welcome to Classicontariolimo. I am your 24/7 VIP Concierge Assistant. How may I assist your travel plans today?`,
      time: "Just now",
      actions: [
        { label: "✈️ Airport Transfer", onClick: () => handleSend("Tell me about airport transfers") },
        { label: "🚘 View Fleet Options", onClick: () => handleSend("What vehicles do you have?") },
        { label: "📝 Request Fast Quote", href: "#quote", isPrimary: true },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const getTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const generateBotReply = (query: string): { text: string; actions?: Message["actions"] } => {
    const q = query.toLowerCase();

    // AIRPORT INQUIRIES
    if (q.includes("airport") || q.includes("pearson") || q.includes("flight") || q.includes("terminal") || q.includes("plane")) {
      return {
        text: `✈️ Classicontariolimo provides premier flat-rate transfers to & from Toronto Pearson (YYZ) and Billy Bishop (YTZ).\n\nKey VIP Features:\n• Live flight tracking (we automatically adapt to delays)\n• 30 minutes complimentary wait time after landing\n• Professional meet & greet with name placard\n• Guaranteed fixed rate with ZERO surge fees.`,
        actions: [
          { label: "Plan Airport Trip", href: "#quote", isPrimary: true },
          { label: "Check Flight Status", href: "#airport" },
          { label: `Call ${CONTACT_NAME}`, href: TEL },
        ],
      };
    }

    // FLEET INQUIRIES
    if (q.includes("fleet") || q.includes("vehicle") || q.includes("car") || q.includes("suv") || q.includes("suburban") || q.includes("escalade") || q.includes("sedan") || q.includes("party bus")) {
      const fleetList = fleet.map((v) => `• ${v.name} (${v.pax} passengers, ${v.bags} bags)`).join("\n");
      return {
        text: `🚘 Our impeccably maintained luxury fleet features:\n\n${fleetList}\n\nAll vehicles are driven by certified executive chauffeurs and include bottled water, climate control, and device charging.`,
        actions: [
          { label: "Select Vehicle & Quote", href: "#fleet", isPrimary: true },
          { label: "WhatsApp Photos & Availability", href: `${WA}?text=Hello, please send photos and availability for your fleet.` },
        ],
      };
    }

    // PRICING / RATES / COST
    if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("fare") || q.includes("how much") || q.includes("fee")) {
      return {
        text: `💰 We believe in transparent luxury pricing with NO hidden fees and NO dynamic surge charges.\n\nEvery fare is calculated directly from your pickup address, destination, and vehicle type. You pay nothing online upfront until you review and approve your customized quote.`,
        actions: [
          { label: "Calculate My Fare", href: "#quote", isPrimary: true },
          { label: "Call for Instant Price", href: TEL },
        ],
      };
    }

    // HOURLY CHAUFFEUR
    if (q.includes("hourly") || q.includes("hour") || q.includes("as directed") || q.includes("minimum")) {
      return {
        text: `⏱️ For executive meetings, dinners, and special tours, our Hourly Chauffeur service includes:\n\n• Minimum booking: 2 hours\n• Vehicle: Luxury SUV or Sedan\n• Dedicated on-call chauffeur at your disposal\n• Multi-stop itineraries permitted across the GTA.`,
        actions: [
          { label: "Book Hourly Service", href: "#quote", isPrimary: true },
          { label: `Inquire with ${CONTACT_NAME}`, href: TEL },
        ],
      };
    }

    // CONTACT / PHONE / ABDUL JABBAR
    if (q.includes("contact") || q.includes("phone") || q.includes("call") || q.includes("number") || q.includes("abdul") || q.includes("jabbar") || q.includes("email") || q.includes("manager")) {
      return {
        text: `👤 You can reach our General Manager & VIP Dispatcher directly:\n\n• Concierge: ${CONTACT_NAME}\n• Phone: ${PHONE} (24/7)\n• Email: ${EMAIL}\n• Base: Toronto, Mississauga & GTA`,
        actions: [
          { label: `Call ${PHONE}`, href: TEL, isPrimary: true },
          { label: "Chat on WhatsApp", href: WA },
          { label: "Send Email", href: `mailto:${EMAIL}` },
        ],
      };
    }

    // AREAS / COVERAGE
    if (q.includes("area") || q.includes("city") || q.includes("where") || q.includes("toronto") || q.includes("mississauga") || q.includes("niagara") || q.includes("brampton") || q.includes("oakville")) {
      return {
        text: `📍 Classicontariolimo services the entire Greater Toronto Area and southern Ontario, including:\n\n${areas.slice(0, 10).join(", ")}, Niagara Falls, and beyond.\n\nLong-distance trips and cross-border executive travel are available upon request.`,
        actions: [
          { label: "Get Quote for My Route", href: "#quote", isPrimary: true },
        ],
      };
    }

    // WEDDINGS & EVENTS / CORPORATE
    if (q.includes("wedding") || q.includes("event") || q.includes("party") || q.includes("corporate") || q.includes("business")) {
      return {
        text: `🎉 Whether it is a VIP corporate delegation or a wedding day celebration, we provide red-carpet service, multi-car motorcades, and our 30-passenger Executive Coach.\n\nCorporate accounts enjoy consolidated monthly billing and priority booking.`,
        actions: [
          { label: "Open Corporate / Event Request", href: "#contact", isPrimary: true },
          { label: `Speak with ${CONTACT_NAME}`, href: TEL },
        ],
      };
    }

    // GREETINGS / SMALL TALK
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("good morning") || q.includes("good evening")) {
      return {
        text: `Hello! I am delighted to assist you with Classicontariolimo. Are you looking to schedule an airport transfer, reserve an executive chauffeur, or check vehicle availability?`,
        actions: [
          { label: "Book a Ride", href: "#quote", isPrimary: true },
          { label: "See Our Vehicles", href: "#fleet" },
          { label: `Call ${PHONE}`, href: TEL },
        ],
      };
    }

    // DEFAULT FALLBACK
    return {
      text: `Thank you for your inquiry! I can immediately connect you with our General Manager, ${CONTACT_NAME}, or you can enter your trip details into our quick quote planner for a guaranteed flat fare.`,
      actions: [
        { label: "Enter Trip in Quote Form", href: "#quote", isPrimary: true },
        { label: `Direct Call (${PHONE})`, href: TEL },
        { label: "Message on WhatsApp", href: `${WA}?text=${encodeURIComponent("Hello Classicontariolimo, " + query)}` },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Natural assistant delay
    setTimeout(() => {
      const reply = generateBotReply(text);
      const botMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: reply.text,
        time: getTime(),
        actions: reply.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "bot",
        text: `Chat restarted. Welcome to Classicontariolimo! How can I assist you right now?`,
        time: getTime(),
        actions: [
          { label: "✈️ Airport Transfer", onClick: () => handleSend("Airport transfer quote") },
          { label: "🚘 Fleet Capacity", onClick: () => handleSend("What vehicles do you have?") },
          { label: `📞 Direct Call (${PHONE})`, href: TEL },
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50 sm:bottom-6 sm:left-6">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex h-12 sm:h-14 items-center gap-2 sm:gap-3 rounded-full border border-primary/50 bg-[#0d0d18] px-3.5 sm:px-5 text-white shadow-[0_4px_30px_rgba(201,165,92,0.35)] transition-all hover:scale-105 hover:border-primary hover:shadow-[0_4px_40px_rgba(201,165,92,0.5)] active:scale-95"
          aria-label="Open Classicontariolimo AI Concierge"
        >
          <div className="relative flex size-8 sm:size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#c9a55c] to-[#a7834e] text-black shadow-md">
            <Bot className="size-4 sm:size-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 size-2 sm:size-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0d0d18]" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary">VIP Concierge</span>
            <span className="hidden sm:inline text-xs font-semibold text-white/90">Instant Assistance</span>
          </div>

          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-extrabold text-black ring-2 ring-[#0a0a0f] animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 flex h-[580px] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-primary/40 bg-[#0d0d18] text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:bottom-24 sm:left-6 animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-primary/20 bg-gradient-to-r from-[#14141f] via-[#0d0d18] to-[#14141f] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="relative grid size-10 place-items-center rounded-xl bg-primary text-black font-bold font-display text-lg shadow-md">
                AJ
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-[#14141f]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-display text-sm font-bold text-white">
                  <span>Classicontariolimo</span>
                  <Sparkles className="size-3 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-primary/90">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Online · Managed by {CONTACT_NAME}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/60">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="rounded-lg p-1.5 hover:bg-white/10 hover:text-white transition-colors"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Concierge"
                className="rounded-lg p-1.5 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-[#0a0a0f] p-2.5 text-xs no-scrollbar">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="shrink-0 rounded-full border border-primary/25 bg-[#14141f] px-3 py-1 text-[11px] font-medium text-white/80 hover:border-primary hover:text-primary transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-md ${m.sender === "user"
                    ? "rounded-tr-none bg-gradient-to-r from-[#c9a55c] to-[#e8d5a3] font-medium text-black"
                    : "rounded-tl-none border border-primary/20 bg-[#14141f] text-white/95"
                    }`}
                >
                  <p className="whitespace-pre-line text-xs sm:text-[13px]">{m.text}</p>

                  {/* Message Action Chips */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-2.5">
                      {m.actions.map((act) => (
                        act.href ? (
                          <a
                            key={act.label}
                            href={act.href}
                            onClick={() => {
                              if (act.href?.startsWith("#")) setIsOpen(false);
                            }}
                            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${act.isPrimary
                              ? "cta-primary text-black"
                              : "border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                              }`}
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="size-3" />
                          </a>
                        ) : (
                          <button
                            key={act.label}
                            onClick={act.onClick}
                            className="inline-flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary hover:bg-primary/20 transition-all"
                          >
                            <span>{act.label}</span>
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
                <span className="mt-1 px-1 text-[10px] text-white/40">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none border border-primary/20 bg-[#14141f] p-3 text-xs text-primary w-fit">
                <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="size-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="size-1.5 rounded-full bg-primary animate-bounce" />
                <span className="ml-1 text-[11px] text-white/60">Concierge typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Direct Actions Footer Bar */}
          <div className="flex items-center justify-between border-t border-white/10 bg-[#0a0a0f] px-4 py-2 text-xs">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" /> Live 24/7 Support
            </span>
            <div className="flex items-center gap-2">
              <a
                href={TEL}
                className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                <Phone className="size-3" /> Call {CONTACT_NAME}
              </a>
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-primary/25 bg-[#14141f] p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rides, airport rates, cars..."
              className="h-11 flex-1 rounded-xl border border-white/10 bg-[#0a0a0f] px-3.5 text-xs text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid size-11 place-items-center rounded-xl bg-primary text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
