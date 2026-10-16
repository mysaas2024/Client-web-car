"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Car, Check, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { fleet, WA, CONTACT_NAME } from "@/lib/data";

const types = ["Airport transfer", "Point-to-point", "Hourly chauffeur", "Events and weddings"];
const steps = ["1. Journey", "2. Choose Vehicle", "3. Contact"];

export function QuoteForm() {
  const [type, setType] = useState(types[0]);
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ from: "", to: "", date: "", time: "", pax: "1", vehicle: fleet[0].name, name: "", phone: "" });
  const activeStep = useRef<HTMLFieldSetElement>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const availableVehicles = fleet.filter((vehicle) => vehicle.pax >= Number(f.pax));
  const vehicleOptions = [...availableVehicles.map((vehicle) => vehicle.name), "Recommend a vehicle"];
  const selectedVehicle = fleet.find((vehicle) => vehicle.name === f.vehicle);

  const setPassengers = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pax = e.target.value;
    setF((current) => ({
      ...current,
      pax,
      vehicle: fleet.some((vehicle) => vehicle.name === current.vehicle && vehicle.pax >= Number(pax)) ? current.vehicle : "Recommend a vehicle",
    }));
  };

  const next = () => {
    if (activeStep.current?.reportValidity()) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `🌟 Classicontariolimo Booking Request (${type})\n` +
      `👤 Name: ${f.name}\n` +
      `📞 Phone: ${f.phone}\n` +
      `📍 From: ${f.from}\n` +
      `🏁 To: ${f.to}\n` +
      `📅 Date & Time: ${f.date} at ${f.time}\n` +
      `👥 Passengers: ${f.pax}\n` +
      `🚘 Vehicle: ${f.vehicle}\n` +
      `Please provide fixed quote confirmation.`;
    window.open(`${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      <ol className="grid grid-cols-3 gap-2" aria-label="Quote request progress">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`flex items-center gap-2 border-b-2 pb-3 text-xs font-semibold sm:text-sm transition-colors ${index <= step ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            aria-current={index === step ? "step" : undefined}
          >
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-all ${index < step
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(201,165,92,0.5)]"
                  : index === step
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/40 ring-offset-2 ring-offset-[#14141f]"
                    : "bg-[#1f1f2e] text-muted-foreground"
                }`}
            >
              {index < step ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span className="truncate">{label}</span>
          </li>
        ))}
      </ol>

      {/* STEP 1 */}
      <fieldset ref={step === 0 ? activeStep : null} hidden={step !== 0} className="space-y-5">
        <legend className="sr-only">Journey details</legend>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Service Type</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Service type">
            {types.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`min-h-11 rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all sm:text-sm ${type === t
                    ? "border-primary bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(201,165,92,0.3)]"
                    : "border-border bg-[#0e0e17] text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Pickup Location</label>
            <Input
              required={step === 0}
              placeholder="e.g. Pearson Airport / Hotel / Home"
              value={f.from}
              onChange={set("from")}
              aria-label="Pickup location"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Drop-off Destination</label>
            <Input
              required={step === 0}
              placeholder="e.g. Downtown Toronto / Niagara / Address"
              value={f.to}
              onChange={set("to")}
              aria-label="Drop-off location"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Date</label>
            <Input
              required={step === 0}
              type="date"
              value={f.date}
              onChange={set("date")}
              aria-label="Pickup date"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Time</label>
            <Input
              required={step === 0}
              type="time"
              value={f.time}
              onChange={set("time")}
              aria-label="Pickup time"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
        </div>
      </fieldset>

      {/* STEP 2 */}
      <fieldset ref={step === 1 ? activeStep : null} hidden={step !== 1} className="space-y-5">
        <legend className="sr-only">Vehicle preferences</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Number of Passengers</label>
            <Select
              required={step === 1}
              value={f.pax}
              onChange={setPassengers}
              aria-label="Passengers"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30].map((n) => (
                <option key={n} value={n} className="bg-[#14141f] text-white">
                  {n} passenger{n > 1 && "s"}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Vehicle Preference</label>
            <Select
              required={step === 1}
              value={f.vehicle}
              onChange={set("vehicle")}
              aria-label="Preferred vehicle"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary"
            >
              {vehicleOptions.map((v) => (
                <option key={v} className="bg-[#14141f] text-white">
                  {v}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex min-h-23 items-center justify-between gap-4 rounded-xl border border-primary/25 bg-[#0e0e17] p-5 shadow-inner" aria-live="polite">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <p className="font-display text-lg text-primary">{selectedVehicle?.name ?? "Let us recommend the right vehicle"}</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{selectedVehicle?.text ?? "Share your group size and we will match the premier luxury vehicle."}</p>
          </div>
          {selectedVehicle && (
            <div className="flex shrink-0 gap-4 text-xs font-medium text-foreground/80">
              <span className="flex items-center gap-1.5 rounded-md bg-[#1a1a2e] px-2.5 py-1">
                <Users className="size-4 text-primary" /> {selectedVehicle.pax} Seats
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-[#1a1a2e] px-2.5 py-1">
                <Briefcase className="size-4 text-primary" /> {selectedVehicle.bags} Bags
              </span>
              <Car className="sr-only" />
            </div>
          )}
        </div>
      </fieldset>

      {/* STEP 3 */}
      <fieldset ref={step === 2 ? activeStep : null} hidden={step !== 2} className="space-y-5">
        <legend className="sr-only">Contact details</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Your Full Name</label>
            <Input
              required={step === 2}
              placeholder="e.g. John Smith"
              value={f.name}
              onChange={set("name")}
              aria-label="Full name"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/80">Your Contact Phone / WhatsApp</label>
            <Input
              required={step === 2}
              type="tel"
              placeholder="+1 (xxx) xxx-xxxx"
              value={f.phone}
              onChange={set("phone")}
              aria-label="Phone number"
              className="bg-[#0e0e17] border-[#2a2a3e] text-foreground focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/90">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <ShieldCheck className="size-5" />
            <span>Guaranteed Fixed Price · Handled by {CONTACT_NAME}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            No credit card or payment needed upfront. We review your route instantly and provide your locked-in flat rate with no surge pricing.
          </p>
        </div>
      </fieldset>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3 pt-2">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((current) => current - 1)}
            aria-label="Go back"
            className="border-primary/40 text-foreground hover:bg-primary/10"
          >
            <ArrowLeft className="size-4" /> Back
          </Button>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            className="cta-primary ml-auto inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 text-sm font-bold shadow-lg"
            onClick={next}
          >
            Continue to Next Step <ArrowRight className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="cta-primary ml-auto inline-flex h-14 items-center justify-center gap-2 rounded-lg px-9 text-base font-bold shadow-[0_0_30px_rgba(201,165,92,0.45)]"
          >
            <span>Lock In My Fixed Rate Quote</span>
            <ArrowRight className="size-5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary" /> Fixed All-Inclusive Rates</span>
        <span>•</span>
        <span>No Surprise Surge Fees</span>
        <span>•</span>
        <span>Fast VIP Response</span>
      </div>
    </form>
  );
}
