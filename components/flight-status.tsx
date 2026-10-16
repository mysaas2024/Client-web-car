"use client";
import { useState } from "react";
import { PlaneTakeoff } from "lucide-react";
import { Input } from "@/components/ui/input";

export function FlightStatus() {
  const [n, setN] = useState("");
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://www.google.com/search?q=${encodeURIComponent("flight status " + n)}`, "_blank");
  };
  return (
    <form onSubmit={go} className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
      <Input
        required
        placeholder="Flight number, e.g. AC123"
        value={n}
        onChange={(e) => setN(e.target.value)}
        aria-label="Flight number"
        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-primary focus-visible:border-primary"
      />
      <button
        type="submit"
        className="cta-secondary inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold hover:text-white"
      >
        <PlaneTakeoff className="size-4 text-primary" />
        Track Flight
      </button>
    </form>
  );
}
