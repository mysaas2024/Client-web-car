"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Phone,
  MessageSquare,
  Car,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";
import { PHONE, TEL, WA, CONTACT_NAME, fleet, img } from "@/lib/data";

const BASE_MARKET_FARE = 95;
const MIN_FARE = 95;

const VEHICLE_MODIFIERS: Record<string, { multiplier: number; tier: string }> = {
  "Lexus ES 350 Luxury Sedan": { multiplier: 1.0, tier: "Executive Sedan" },
  "Mercedes-Benz S-Class S500": { multiplier: 1.0, tier: "Executive Sedan" },
  "Cadillac Escalade ESV Platinum": { multiplier: 1.0, tier: "Flagship SUV" },
  "GMC Yukon XL Denali Ultimate": { multiplier: 1.0, tier: "Luxury SUV" },
  "Lincoln Navigator Black Label L": { multiplier: 1.0, tier: "Luxury SUV" },
  "Mercedes-Benz Sprinter Limo Van": { multiplier: 1.0, tier: "VIP Executive Van" },
  "Luxury Party Bus Executive Coach": { multiplier: 1.0, tier: "Coach / Party Bus" },
};

type BidStatus = "idle" | "evaluating" | "revealed";
type OfferOutcome = "accepted" | "counter_close" | "counter_budget";

interface OfferDetails {
  outcome: OfferOutcome;
  userBid: number;
  originalEstimate: number;
  offeredPrice: number;
  savings: number;
  vehicle: string;
  date: string;
  time: string;
  offerId: string;
  perks: string[];
}

export function FareBidder() {
  const [selectedVehicle, setSelectedVehicle] = useState(fleet[0].name);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("12:00");

  // Dynamic estimate calculation (All vehicles flat 95 CAD)
  const estimatedMarketFare = 95;

  // User bid state (All prices default to 95 CAD)
  const [userBid, setUserBid] = useState<number>(95);
  const [bidStatus, setBidStatus] = useState<BidStatus>("idle");
  const [offerDetails, setOfferDetails] = useState<OfferDetails | null>(null);
  const [countdown, setCountdown] = useState(900); // 15 mins timer for held offer

  // Keep user bid at 95 CAD when vehicle changes in idle mode
  useEffect(() => {
    if (bidStatus === "idle") {
      setUserBid(95);
    }
  }, [selectedVehicle, bidStatus]);

  // Countdown timer for locked offer
  useEffect(() => {
    if (bidStatus !== "revealed") return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [bidStatus]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Bid strength relative to estimate
  let bidStrengthText = "Guaranteed Best Rate ($95 CAD)";
  let bidStrengthColor = "text-emerald-400";
  let bidStrengthBg = "bg-emerald-400/10 border-emerald-400/30";

  if (userBid > 95) {
    bidStrengthText = "Priority VIP Expedited Booking";
    bidStrengthColor = "text-emerald-400";
    bidStrengthBg = "bg-emerald-400/10 border-emerald-400/30";
  } else if (userBid < 95) {
    bidStrengthText = "Minimum $95 CAD Required";
    bidStrengthColor = "text-rose-400";
    bidStrengthBg = "bg-rose-400/10 border-rose-400/30";
  }

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidStatus("evaluating");

    setTimeout(() => {
      const offerId = `BID-${Math.floor(100000 + Math.random() * 900000)}`;
      let outcome: OfferOutcome = "counter_close";
      let offeredPrice = userBid;
      const perks = [
        "Complimentary 30-min airport wait time",
        "Live flight & traffic telemetry tracking",
        "Dedicated VIP Chauffeur dispatch",
        "Zero surge guarantee & all taxes included",
      ];

      // All vehicles flat 95 CAD - instant acceptance
      outcome = "accepted";
      offeredPrice = Math.max(MIN_FARE, userBid);
      perks.unshift("VIP Priority Chauffeur: Classicontariolimo assigned");

      const savings = Math.max(0, estimatedMarketFare - offeredPrice);

      setOfferDetails({
        outcome,
        userBid,
        originalEstimate: estimatedMarketFare,
        offeredPrice,
        savings,
        vehicle: selectedVehicle,
        date,
        time,
        offerId,
        perks,
      });

      setCountdown(900); // 15 mins lock
      setBidStatus("revealed");
    }, 1200);
  };

  const handleReset = () => {
    setBidStatus("idle");
    setOfferDetails(null);
  };

  // WhatsApp payload generator
  const getWhatsAppBookingUrl = () => {
    if (!offerDetails) return WA;
    const outcomeText =
      offerDetails.outcome === "accepted"
        ? "✅ BID ACCEPTED AT MY RATE"
        : `🤝 SPECIAL COUNTER-OFFER ACCEPTED`;

    const message =
      `💎 *Classicontariolimo Fare Bid Offer Confirmation*\n` +
      `--------------------------------\n` +
      `🎫 *Offer ID:* ${offerDetails.offerId}\n` +
      `🚘 *Vehicle:* ${offerDetails.vehicle}\n` +
      `📍 *Service:* GTA Airport & Chauffeur Transfer\n` +
      `📅 *Date & Time:* ${offerDetails.date} at ${offerDetails.time}\n` +
      `💰 *My Bid:* $${offerDetails.userBid} CAD\n` +
      `🏷️ *Final Agreed Offer:* $${offerDetails.offeredPrice} CAD\n` +
      `✨ *Status:* ${outcomeText}\n` +
      `--------------------------------\n` +
      `Please lock in this rate and send me chauffeur dispatch confirmation!`;

    return `${WA}?text=${encodeURIComponent(message)}`;
  };

  const currentVehicleObj = fleet.find((v) => v.name === selectedVehicle) || fleet[0];

  return (
    <section id="fare-bid" className="scroll-mt-24 py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-6xl px-5 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(201,165,92,0.25)]">
            <Flame className="size-4 animate-pulse" />
            <span>Interactive Fare Bidding & Deal System</span>
          </div>
          <h2 className="text-3xl font-display font-bold sm:text-5xl text-white">
            Name Your Price. <span className="gold-text italic font-normal">Get an Instant VIP Offer.</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Don&apos;t just accept standard fixed rates. Enter the amount you want to pay for your luxury trip.
            Our intelligent executive dispatch system will instantly evaluate your bid and return a guaranteed offer.
          </p>
        </div>

        {/* Main Bidding Card */}
        <div className="mx-auto max-w-4xl rounded-3xl card-luxury p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] border border-primary/30 relative">
          {bidStatus === "idle" && (
            <form onSubmit={handlePlaceBid} className="space-y-8">
              {/* Step 1: Vehicle Selection & Timing */}
              <div>
                <label className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                  <span className="grid size-6 place-items-center rounded-full bg-primary/20 text-primary text-xs font-bold">1</span>
                  Select Vehicle Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {fleet.map((v) => {
                    const isSelected = selectedVehicle === v.name;
                    return (
                      <button
                        key={v.name}
                        type="button"
                        onClick={() => setSelectedVehicle(v.name)}
                        className={`group relative p-3 rounded-2xl border text-left transition-all ${isSelected
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(201,165,92,0.25)] ring-1 ring-primary"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                          }`}
                      >
                        <div className="relative h-20 w-full overflow-hidden rounded-lg mb-2 bg-black/40">
                          <Image
                            src={img(v.img)}
                            alt={v.name}
                            fill
                            sizes="200px"
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <p className="text-xs font-bold text-white line-clamp-1">{v.name}</p>
                        <p className="text-[10px] text-primary font-bold mt-0.5">
                          $95 CAD · {v.tag}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Timing controls */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Date of Travel</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-11 rounded-xl border border-white/20 bg-background/80 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Preferred Pickup Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full h-11 rounded-xl border border-white/20 bg-background/80 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Enter Your Bet / Bid Amount */}
              <div className="rounded-2xl border border-primary/30 bg-black/40 p-6 sm:p-7 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-full bg-primary text-black text-xs font-bold">2</span>
                      Enter Your Offer / Bet Amount ($ CAD)
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      What are you willing to pay for this luxury trip?
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
                      Standard Market Fare
                    </span>
                    <span className="text-lg font-bold text-white/90 line-through">
                      ${estimatedMarketFare} CAD
                    </span>
                  </div>
                </div>

                {/* Bid input & quick adjustments */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-1/2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-primary font-display">
                      $
                    </span>
                    <input
                      type="number"
                      min={MIN_FARE}
                      max={2000}
                      step={5}
                      value={userBid}
                      onChange={(e) => setUserBid(Math.max(1, Number(e.target.value) || 0))}
                      onBlur={() => setUserBid((prev) => Math.max(MIN_FARE, prev))}
                      className="w-full h-16 rounded-2xl border-2 border-primary/50 bg-[#0d0d18] pl-10 pr-16 text-3xl font-display font-bold text-white shadow-[0_0_25px_rgba(201,165,92,0.2)] focus:outline-none focus:border-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/50 uppercase">
                      CAD
                    </span>
                  </div>

                  {/* Fast Adjust Buttons */}
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-1/2">
                    {[
                      { label: "Flat $95", custom: 95 },
                      { label: "+$10 ($105)", custom: 105 },
                      { label: "+$25 ($120)", custom: 120 },
                      { label: "+$50 ($145)", custom: 145 },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setUserBid(btn.custom)}
                        className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition-colors"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground mt-2">
                  * Minimum guaranteed chauffeur reservation bid is <strong className="text-primary">${MIN_FARE} CAD</strong>.
                </p>

                {/* Live Bid Strength Indicator */}
                <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${bidStrengthBg} ${bidStrengthColor}`}>
                      {bidStrengthText}
                    </span>
                    <span className="text-xs text-white/70">
                      {userBid < estimatedMarketFare ? (
                        <>Saving <strong className="text-emerald-400">${estimatedMarketFare - userBid} CAD</strong> if approved</>
                      ) : (
                        <span className="text-emerald-400 font-semibold">Priority VIP Premium Rate</span>
                      )}
                    </span>
                  </div>

                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-primary" /> Instant automated negotiation
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="cta-primary w-full h-15 rounded-2xl text-base font-bold text-black flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(201,165,92,0.4)]"
                >
                  <Sparkles className="size-5" />
                  <span>Submit Bid & Reveal My Offer</span>
                  <ArrowRight className="size-5" />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  No credit card required. Free instant evaluation verified with {CONTACT_NAME}.
                </p>
              </div>
            </form>
          )}

          {/* Evaluating State */}
          {bidStatus === "evaluating" && (
            <div className="py-20 text-center space-y-6">
              <div className="relative mx-auto size-20">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-primary/40 border-b-transparent animate-spin" style={{ animationDirection: "reverse" }} />
                <div className="grid size-full place-items-center text-primary font-bold">
                  <Car className="size-8 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Calculating Best Available Chauffeur Rate...
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Cross-referencing real-time dispatch routes, vehicle availability for {selectedVehicle}, and your bid of ${userBid} CAD.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 text-xs text-primary font-medium animate-pulse">
                <Sparkles className="size-3.5" /> Negotiating with Executive Dispatch
              </div>
            </div>
          )}

          {/* Offer Revealed State */}
          {bidStatus === "revealed" && offerDetails && (
            <div className="space-y-7 animate-in fade-in zoom-in-95 duration-500">
              {/* Outcome Badge Banner */}
              <div
                className={`p-5 rounded-2xl border text-center ${offerDetails.outcome === "accepted"
                  ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                  : "bg-gradient-to-r from-primary/20 via-amber-950/30 to-primary/20 border-primary/50 text-amber-200 shadow-[0_0_40px_rgba(201,165,92,0.25)]"
                  }`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
                  <Award className="size-4" /> Official Chauffeur Dispatch Offer #{offerDetails.offerId}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                  {offerDetails.outcome === "accepted"
                    ? "🎉 Congratulations! Your Bid Has Been Accepted!"
                    : "🤝 Special Negotiated Counter-Offer Generated!"}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl mx-auto">
                  {offerDetails.outcome === "accepted"
                    ? `We have approved your bid of $${offerDetails.userBid} CAD for the ${offerDetails.vehicle}.`
                    : `Your bid of $${offerDetails.userBid} CAD unlocked our exclusive executive counter-offer of $${offerDetails.offeredPrice} CAD!`}
                </p>
              </div>

              {/* Offer Pricing Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
                    Your Bid
                  </span>
                  <span className="text-2xl font-bold text-white font-display mt-1 block">
                    ${offerDetails.userBid} <span className="text-xs text-muted-foreground">CAD</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Submitted amount</span>
                </div>

                <div className="rounded-2xl border-2 border-primary bg-primary/10 p-5 text-center relative shadow-[0_0_25px_rgba(201,165,92,0.2)] md:-translate-y-1">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
                    Guaranteed Rate
                  </span>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold block mt-1">
                    Your Final Offer
                  </span>
                  <span className="text-4xl font-black text-white font-display mt-1 block gold-text">
                    ${offerDetails.offeredPrice} <span className="text-sm font-semibold text-primary">CAD</span>
                  </span>
                  {offerDetails.savings > 0 ? (
                    <span className="text-xs font-bold text-emerald-400 mt-1 inline-block">
                      🔥 You Save ${offerDetails.savings} CAD
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-primary mt-1 inline-block">
                      All-Inclusive Fixed Fare
                    </span>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground block">
                    Standard Rate
                  </span>
                  <span className="text-2xl font-bold text-white/50 line-through font-display mt-1 block">
                    ${offerDetails.originalEstimate} <span className="text-xs">CAD</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1 block">Regular fixed rate</span>
                </div>
              </div>

              {/* Trip & Vehicle Details Recap */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 rounded-xl overflow-hidden bg-navy shrink-0 border border-primary/30">
                      <Image
                        src={img(currentVehicleObj.img)}
                        alt={offerDetails.vehicle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{offerDetails.vehicle}</h4>
                      <p className="text-xs text-primary font-medium">
                        {currentVehicleObj.tag} · Up to {currentVehicleObj.pax} passengers
                      </p>
                    </div>
                  </div>

                  {/* Countdown pill */}
                  <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs text-amber-300">
                    <Clock className="size-3.5 animate-spin" />
                    <span>Price held for: <strong>{formatCountdown(countdown)}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block">Service Area:</span>
                    <span className="font-semibold text-white mt-0.5 block">
                      GTA Airport & Chauffeur Service
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Scheduled Pickup:</span>
                    <span className="font-semibold text-white mt-0.5 block">
                      {offerDetails.date} at {offerDetails.time}
                    </span>
                  </div>
                </div>

                {/* Included Perks */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                    Included with this Offer:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                    {offerDetails.perks.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons to Lock in Offer */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary w-full h-15 rounded-2xl text-base font-bold text-black flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(201,165,92,0.45)] hover:scale-[1.01]"
                >
                  <MessageSquare className="size-5" />
                  <span>Accept & Lock In This Rate on WhatsApp</span>
                  <ArrowRight className="size-5" />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={TEL}
                    className="cta-secondary h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 text-white"
                  >
                    <Phone className="size-4 text-primary" />
                    <span>Call Chauffeur Dispatch ({PHONE})</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-12 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/70 hover:text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <RefreshCw className="size-3.5" />
                    <span>Revise Bid / Try Another Route</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
