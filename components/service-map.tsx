"use client";

import { useState } from "react";
import { MapPin, Navigation, Plane, ShieldCheck, ExternalLink, Car, Clock } from "lucide-react";
import { areas, TEL, PHONE, WA } from "@/lib/data";

const KEY_HUBS = [
  {
    name: "Toronto Pearson (YYZ)",
    query: "Toronto Pearson International Airport, ON, Canada",
    tag: "Primary Airport Hub",
    zoom: 12,
  },
  {
    name: "Downtown Toronto",
    query: "Downtown Toronto, Financial District, ON, Canada",
    tag: "Executive Core",
    zoom: 13,
  },
  {
    name: "Mississauga & Oakville",
    query: "Mississauga, ON, Canada",
    tag: "West GTA Hub",
    zoom: 11,
  },
  {
    name: "Markham & Vaughan",
    query: "Vaughan, ON, Canada",
    tag: "North GTA Hub",
    zoom: 11,
  },
  {
    name: "Niagara Falls & Region",
    query: "Niagara Falls, ON, Canada",
    tag: "VIP Chauffeur Tour",
    zoom: 11,
  },
];

export function ServiceMap() {
  const [activeHub, setActiveHub] = useState(KEY_HUBS[0]);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeHub.query
  )}&t=&z=${activeHub.zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="rounded-3xl border border-primary/30 bg-[#12121c] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <MapPin className="size-3.5" /> Service Coverage Map
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Serving Toronto, the GTA & Beyond
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
            24/7 dedicated door-to-door luxury ground transportation, airport transfers, and executive chauffeur service across Southern Ontario.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(201,165,92,0.3)] hover:brightness-110 transition-all"
          >
            <Car className="size-4" /> Book Chauffeur In Area
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs font-semibold text-white hover:border-primary/50 hover:bg-white/10 transition-colors"
          >
            Ask Dispatch <ExternalLink className="size-3.5 text-primary" />
          </a>
        </div>
      </div>

      {/* Hub filter pills */}
      <div className="relative z-10 mb-6 flex flex-wrap gap-2">
        {KEY_HUBS.map((hub) => {
          const isActive = activeHub.name === hub.name;
          return (
            <button
              key={hub.name}
              type="button"
              onClick={() => setActiveHub(hub)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-primary text-black shadow-[0_0_20px_rgba(201,165,92,0.35)]"
                  : "border border-white/10 bg-white/5 text-white/80 hover:border-primary/40 hover:text-white"
              }`}
            >
              <Navigation className={`size-3.5 ${isActive ? "text-black" : "text-primary"}`} />
              {hub.name}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                  isActive ? "bg-black/20 text-black" : "bg-white/10 text-white/60"
                }`}
              >
                {hub.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Map Display & Stats Box */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Google Map iframe */}
        <div className="lg:col-span-2 relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-primary/30 shadow-2xl bg-black">
          <iframe
            title="Service Coverage Area Map"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
          {/* Active Location Overlay Badge */}
          <div className="absolute top-4 left-4 rounded-xl border border-white/20 bg-[#0d0d18]/90 backdrop-blur-md px-3.5 py-2 shadow-xl flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white">{activeHub.name}</span>
            <span className="text-[10px] text-primary font-semibold">Active Dispatch Zone</span>
          </div>
        </div>

        {/* Service Details & Area Tags Sidebar */}
        <div className="flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6">
          <div>
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" /> Comprehensive Coverage
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              We provide fixed flat-rate pricing to and from all municipalities across Ontario with complimentary flight tracking and 30 minutes wait time.
            </p>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-white/90">
                <Plane className="size-4 text-primary shrink-0" />
                <span><strong>Pearson (YYZ) & Billy Bishop (YTZ)</strong> transfers</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="size-4 text-primary shrink-0" />
                <span><strong>24/7 Guaranteed Availability</strong> with advance booking</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Car className="size-4 text-primary shrink-0" />
                <span><strong>Point-to-Point & Hourly</strong> chauffeur service</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-2">
              Key Municipalities & Cities Served:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1">
              {areas.map((city) => (
                <span
                  key={city}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/80 hover:border-primary/40 hover:text-white transition-colors"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
