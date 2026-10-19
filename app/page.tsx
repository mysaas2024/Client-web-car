import Image from "next/image";
import { ArrowUpRight, Briefcase, Car, Check, Clock, Mail, MapPin, PartyPopper, Phone, Plane, ShieldCheck, Sparkles, Star, User, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { QuoteForm } from "@/components/quote-form";
import { FareBidder } from "@/components/fare-bidder";
import { ContactForm } from "@/components/contact-form";
import { FlightStatus } from "@/components/flight-status";
import { FloatingCTA } from "@/components/floating-cta";
import { ChatBot } from "@/components/chat-bot";
import { ServiceMap } from "@/components/service-map";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PHONE, TEL, WA, EMAIL, CONTACT_NAME, areas, faqs, features, fleet, img, reviews, services, steps } from "@/lib/data";

const wrap = "mx-auto max-w-6xl px-5";
const icons = [Plane, Car, Briefcase, PartyPopper, Users];
const H2 = ({ children, sub, light }: { children: React.ReactNode; sub?: string; light?: boolean }) => (
  <div className="mb-12 max-w-2xl">
    <h2 className="text-4xl leading-[1.05] sm:text-6xl">{children}</h2>
    {sub && <p className={`mt-4 text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
  </div>
);

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ── HERO ── */}
        <section className="relative isolate min-h-[670px] overflow-hidden bg-navy text-white lg:min-h-[720px]">
          <div className="hero-stage absolute inset-0 lg:left-[42%]">
            <div className="hero-photo absolute inset-0 overflow-hidden bg-navy lg:inset-y-[5%] lg:left-[8%] lg:right-[3%] lg:rounded-2xl lg:ring-1 lg:ring-[rgba(201,165,92,0.3)] shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
              <Image
                src={img("9f79d59bd_IMG_9201.jpg")}
                alt="2026 Chevrolet Suburban High Country - Classicontariolimo"
                fill
                priority
                sizes="(min-width:1024px) 56vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent lg:from-[#0a0a0f]/80 lg:via-transparent lg:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/40" />
            </div>

            {/* Floating Glass Pill */}
            <div className="hero-detail absolute bottom-[10%] right-[6%] z-10 hidden max-w-[290px] rounded-xl border border-primary/30 bg-[#0d0d18]/90 p-5 text-white shadow-2xl backdrop-blur-md lg:block">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <ShieldCheck className="size-4" /> VIP White-Glove Standard
              </div>
              <p className="mt-2.5 font-display text-xl font-bold">Classicontariolimo</p>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Personalized Service by {CONTACT_NAME}
              </p>
              <div className="mt-3 flex items-center gap-1 border-t border-white/10 pt-2 text-[11px] text-primary font-medium">
                <Sparkles className="size-3" /> Fixed Fares · Flight Tracking · 24/7
              </div>
            </div>
          </div>

          <div className={`${wrap} relative flex min-h-[670px] items-center py-20 lg:min-h-[720px]`}>
            <div className="max-w-2xl">
              {/* Trust Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                <div className="flex gap-0.5 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <span className="text-white/90">GTA Classicontariolimo</span>
              </div>

              <h1 className="max-w-xl text-5xl leading-[1.02] sm:text-7xl lg:text-[5.2rem]">
                Travel in Prestige.<br />
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg font-light">
                Experience first-class luxury with <strong>Classicontariolimo</strong>. Dedicated chauffeur service for Toronto Pearson airport transfers, executive itineraries, and VIP occasions.
              </p>

              {/* Conversion-Optimized CTA Buttons */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#quote"
                  className="cta-primary inline-flex h-14 items-center gap-3 rounded-xl px-8 text-base font-bold shadow-2xl hover:scale-105 transition-transform"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="size-5" />
                </a>



                <a
                  href={TEL}
                  className="hidden sm:inline-flex h-14 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white/90 hover:border-primary hover:text-primary transition-all"
                  title="Call Classicontariolimo"
                >
                  <Phone className="size-4 text-primary" />
                  <span>Call {PHONE}</span>
                </a>
              </div>

              {/* Psychological Guarantees */}
              <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-xs font-medium text-white/80 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-primary" /> Flat-Rate Pricing (No Surge)
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4 text-primary" /> 30-Min Free Flight Wait
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="size-4 text-primary" /> Managed by {CONTACT_NAME}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div id="areas" className="overflow-hidden border-b border-primary/20 bg-[#0d0d18] py-4 text-white/80" aria-hidden>
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-xl">
            {[...areas, ...areas].map((a, i) => (
              <span key={i} className="flex items-center gap-10">
                {a}
                <span className="text-primary font-bold">/</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── QUOTE FORM ── */}
        <section id="quote" className={`${wrap} scroll-mt-24 py-24`}>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Instant Guaranteed Pricing</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-5xl">Plan Your VIP Journey</h2>
            <p className="mt-3 text-muted-foreground">
              Submit your trip details below. {CONTACT_NAME} will confirm your vehicle and fixed all-inclusive rate with zero surge fees.
            </p>
          </div>
          <Card className="card-luxury mx-auto max-w-3xl rounded-3xl shadow-2xl">
            <CardContent className="p-6 sm:p-10">
              <QuoteForm />
            </CardContent>
          </Card>
        </section>

        {/* ── FARE BIDDING SYSTEM ── */}
        <FareBidder />

        {/* ── STEPS ── */}
        <section className={`${wrap} pb-24`}>
          <H2 sub="A seamless, stress-free reservation process from start to finish.">Four Steps to Your Pickup</H2>
          <ol className="grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="card-luxury rounded-3xl p-6 relative group hover:border-primary/50 transition-colors">
                <span className="grid size-10 place-items-center rounded-xl bg-primary font-display font-bold text-primary-foreground shadow-[0_0_15px_rgba(201,165,92,0.4)]">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FLEET ── */}
        <section id="fleet" className="scroll-mt-24 pb-24">
          <div className={wrap}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl leading-[1.05] sm:text-6xl">Our Prestige Fleet</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Impeccably detailed, fully licensed luxury vehicles chauffeured by executive professionals.
                </p>
              </div>
              <a
                href="#quote"
                className="cta-primary inline-flex h-11 shrink-0 items-center gap-2 rounded-lg px-6 text-xs font-bold uppercase tracking-wider"
              >
                Reserve a Vehicle <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="flex snap-x gap-5 overflow-x-auto px-5 pb-6 sm:px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
            {fleet.map((v) => (
              <article
                key={v.name}
                className="group relative aspect-[4/5] w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl bg-navy sm:w-[370px] ring-1 ring-primary/20 transition-all duration-500 hover:ring-primary/60 hover:shadow-[0_0_40px_rgba(201,165,92,0.2)]"
              >
                <Image src={img(v.img)} alt={v.name} fill sizes="370px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                      {v.tag}
                    </span>
                    <div className="flex gap-4 text-xs font-medium text-white/90">
                      <span className="flex items-center gap-1.5"><Users className="size-4 text-primary" /> {v.pax}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="size-4 text-primary" /> {v.bags}</span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold leading-tight">{v.name}</h3>
                  <p className="mt-2 text-sm text-white/75 line-clamp-2">{v.text}</p>
                  <a
                    href="#quote"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary/10 py-2.5 text-xs font-bold text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_20px_rgba(201,165,92,0.4)]"
                  >
                    Select This Vehicle <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className={`${wrap} scroll-mt-24 pb-24`}>
          <H2 sub="Tailored transportation designed around your schedule and prestige.">Chauffeur Services</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((s, i) => {
              const I = icons[i];
              return (
                <a
                  key={s.t}
                  href="#quote"
                  className={`group flex flex-col justify-between rounded-3xl p-7 transition-all duration-400 ${i === 0
                    ? "bg-gradient-to-br from-[#c9a55c] via-[#d4b97a] to-[#a7834e] text-black md:col-span-2 md:min-h-64 shadow-[0_0_35px_rgba(201,165,92,0.25)]"
                    : "card-luxury hover:border-primary/50"
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <I className={`size-8 ${i === 0 ? "text-black" : "text-primary"}`} />
                    <ArrowUpRight className="size-5 opacity-60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="mt-10">
                    <h3 className="text-2xl font-bold">{s.t}</h3>
                    <p className={`mt-2 max-w-sm text-sm ${i === 0 ? "text-black/85 font-medium" : "text-muted-foreground"}`}>
                      {s.d}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── AIRPORT ── */}
        <section id="airport" className="scroll-mt-24 bg-[#0a0a0f] py-24 text-white border-y border-primary/20">
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Toronto Pearson & Billy Bishop</span>
              <h2 className="mt-2 text-4xl leading-[1.05] sm:text-6xl font-bold">
                Land. Walk out.<br />Your chauffeur is waiting.
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/80 leading-relaxed font-light">
                Your chauffeur monitors your flight in real time, arrives early at arrivals with a personalized placard, and handles all luggage with executive care.
              </p>
              <ul className="mt-6 space-y-3 font-medium">
                {[
                  "Live flight tracking with automatic delay adjustment",
                  "30 minutes of complimentary waiting time included",
                  "Guaranteed flat rates with zero traffic surge",
                  "Direct curbside or VIP terminal meet & greet",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2.5 text-sm sm:text-base">
                    <Check className="size-5 shrink-0 text-primary font-bold" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#quote"
                  className="cta-primary inline-flex h-14 items-center gap-2 rounded-xl px-8 text-base font-bold shadow-xl"
                >
                  Book Airport Transfer <ArrowUpRight className="size-5" />
                </a>
              </div>
              <FlightStatus />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <Image
                src={img("10a1a846b_generated_image.png")}
                alt="Toronto Pearson Airport VIP Chauffeur"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className={`${wrap} py-24`}>
          <H2 sub="Premium chauffeur service built around comfort, reliability and white-glove care.">
            Why Discerning Clients Choose Classicontariolimo
          </H2>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([t, d]) => (
              <div key={t} className="card-luxury p-6 rounded-2xl border-t-2 border-t-primary">
                <h3 className="text-xl font-bold text-foreground">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className={`${wrap} scroll-mt-24 pb-24`}>
          <H2 sub="Every fare is custom-quoted based on your exact itinerary. You pay nothing until you approve.">
            Transparent Fixed Fares
          </H2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-luxury rounded-3xl relative overflow-hidden">
              <CardContent className="p-8 sm:p-10">
                <span className="rounded-full bg-primary/10 border border-primary/30 px-3 py-1 text-xs font-bold text-primary">
                  Most Popular
                </span>
                <h3 className="mt-4 text-3xl font-bold">Airport Transfers</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Priced from your exact addresses, vehicle category, and timing. 100% flat-rate with flight tracking and terminal meet-and-greet.
                </p>
                <a
                  href="#quote"
                  className="cta-primary mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold w-full sm:w-auto"
                >
                  Request Airport Quote <ArrowUpRight className="size-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="card-luxury rounded-3xl">
              <CardContent className="p-8 sm:p-10">
                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-white/80">
                  Dedicated Chauffeur
                </span>
                <h3 className="mt-4 text-3xl font-bold">Hourly Chauffeur Service</h3>
                <dl className="mt-4 divide-y divide-border text-sm">
                  {[
                    ["Minimum Booking", "2 hours"],
                    ["Vehicle", "Flagship SUV / Luxury Sedan"],
                    ["Availability", "24/7 On Demand"],
                    ["Multi-Stop Itinerary", "Included"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2.5">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-semibold text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#quote"
                  className="cta-secondary mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-sm font-bold w-full sm:w-auto hover:text-white"
                >
                  Request Chauffeur Quote <ArrowUpRight className="size-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── CORPORATE ── */}
        <section id="corporate" className={`${wrap} pb-24`}>
          <div className="grid gap-10 rounded-3xl bg-[#14141f] border border-primary/30 p-8 sm:p-14 lg:grid-cols-2 shadow-2xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Executive Accounts</span>
              <h2 className="mt-2 text-4xl sm:text-5xl font-bold">Corporate Accounts & Priority Dispatch</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Seamless corporate chauffeur service for CEOs, board members, and visiting VIP clients. Monthly billing, itemized reports, and {CONTACT_NAME} as your dedicated single point of contact.
              </p>
              <a
                href="#contact"
                className="cta-primary mt-8 inline-flex h-13 items-center gap-2 rounded-xl px-8 text-base font-bold"
              >
                Open Corporate Account <ArrowUpRight className="size-5" />
              </a>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {[
                ["Priority VIP Dispatch", "Dedicated on-call scheduling 24/7."],
                ["Consolidated Billing", "Itemized monthly corporate statements."],
                ["Central Coordination", "One single contact for all executive travel."],
                ["Direct Access", "Instant phone access to Classicontariolimo."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-2xl bg-[#0a0a0f] p-5 border border-white/5">
                  <h3 className="text-base font-bold text-primary">{t}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section className="bg-[#0a0a0f] py-24 text-white border-t border-primary/20">
          <div className={wrap}>
            <H2 light sub="Real 5-star testimonials from verified Classicontariolimo riders across Ontario.">
              Words From Our Clients
            </H2>
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((r) => (
                <figure
                  key={r.n}
                  className="card-luxury rounded-3xl p-7 transition-all duration-400 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(201,165,92,0.12)]"
                >
                  <div className="mb-4 flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-display text-lg leading-relaxed text-white/90">
                    &ldquo;{r.q}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary">
                    <ShieldCheck className="size-4" /> {r.n} · Verified Rider
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className={`${wrap} scroll-mt-24 py-24`}>
          <H2 sub="Clear answers to common questions about booking, rates, and vehicles.">
            Frequently Asked Questions
          </H2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="card-luxury rounded-2xl px-6 border border-border">
                <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:text-primary">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className={`${wrap} scroll-mt-24 pb-24`}>
          <div className="grid gap-10 rounded-3xl bg-[#14141f] p-8 shadow-2xl border border-primary/30 sm:p-14 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Direct Contact</span>
              <h2 className="mt-2 text-4xl sm:text-5xl font-bold">Speak with Our Concierge</h2>
              <p className="mt-3 text-muted-foreground">
                We believe in personalized, white-glove hospitality. Reach out directly at any hour for immediate chauffeur bookings or custom requests.
              </p>

              {/* Dedicated Concierge Box */}
              <div className="mt-7 rounded-2xl border border-primary/40 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5">
                <div className="flex items-center gap-4">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-black font-bold font-display text-xl shadow-lg">
                    AJ
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{CONTACT_NAME}</h3>
                    <p className="text-xs font-semibold text-primary">General Manager & VIP Chauffeur Dispatch</p>
                    <p className="mt-1 text-xs text-muted-foreground">Classicontariolimo</p>
                  </div>
                </div>
              </div>

              <ul className="mt-8 space-y-4 text-sm sm:text-base font-medium">
                <li className="flex items-center gap-3">
                  <Phone className="size-5 text-primary" />
                  <a href={TEL} className="hover:text-primary transition-colors font-bold text-white">
                    {PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-5 text-primary" />
                  <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors text-white">
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <MapPin className="size-5 text-primary" />
                  <span>Toronto, Mississauga, Oakville, GTA & Niagara</span>
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <Clock className="size-5 text-primary" />
                  <span>24 Hours a Day · 7 Days a Week</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Send a Message Directly to {CONTACT_NAME}</h3>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* ── SERVICE AREA & MAP ── */}
        <section id="areas" className={`${wrap} scroll-mt-24 pb-24`}>
          <ServiceMap />
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a0a0f] py-16 text-white border-t border-primary/20">
        <div className={wrap}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Classicontariolimo
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Premier Chauffeur & Executive Limousine Service across Ontario
              </p>
              <p className="mt-1 text-xs text-primary font-semibold">
                Contact: {CONTACT_NAME} · {PHONE}
              </p>
            </div>
            <div>
              <a
                href={TEL}
                className="font-display text-3xl font-bold text-primary hover:text-white transition-colors sm:text-5xl"
              >
                {PHONE}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
            <p>&copy; 2026 Classicontariolimo. All rights reserved.</p>
            <p className="text-white/70">
              Inquiries: <a href={`mailto:${EMAIL}`} className="hover:text-primary transition-colors font-medium text-white">{EMAIL}</a>
            </p>
            <div className="flex gap-6">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">WhatsApp</a>
              <a href="#quote" className="hover:text-primary transition-colors font-medium">Request Quote</a>
              <a href="#fleet" className="hover:text-primary transition-colors font-medium">Fleet</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CONVERSION & CONCIERGE WIDGETS ── */}
      <FloatingCTA />
      <ChatBot />
    </>
  );
}
