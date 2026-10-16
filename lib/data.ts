export const PHONE = "+1 (416) 824-7400";
export const TEL = "tel:+14168247400";
export const WA = "https://wa.me/14168247400";
export const EMAIL = "classicontariolimos@gmail.com";
export const CONTACT_NAME = "Abdul Jabbar Chaudrey";
export const img = (f: string) =>
  f.startsWith("http://") || f.startsWith("https://") || f.startsWith("/")
    ? f
    : `https://media.base44.com/images/public/6a00fb8d57def44ca97fd380/${f}`;

export const fleet = [
  {
    name: "Mercedes-Benz Sprinter Limo Van",
    tag: "Luxury Van",
    pax: 14,
    bags: 10,
    img: "https://www.grechmotors.com/wp-content/uploads/2024/05/luxury-sprinter-vans-grech-motors-1-scaled.jpg",
    text: "Luxury Mercedes-Benz Sprinter Limo van chauffeur service for Pearson transfers, executive travel and group transportation.",
  },
  { name: "Cadillac Escalade ESV Platinum", tag: "Executive choice", pax: 6, bags: 5, img: "f090f455b_generated_image.png", text: "Effortless power and whisper-quiet refinement for executives who expect the best." },
  { name: "GMC Yukon XL Denali Ultimate", tag: "Premium class", pax: 6, bags: 5, img: "6da890299_generated_image.png", text: "Bold design and sophisticated engineering for a first-class ride across the GTA." },
  { name: "Lincoln Navigator Black Label L", tag: "Luxury choice", pax: 7, bags: 5, img: "42ad83497_generated_image.png", text: "Serene, spacious and supremely appointed." },
  { name: "Mercedes-Benz S-Class S500", tag: "Executive sedan", pax: 3, bags: 3, img: "8c0ecc784_generated_image.png", text: "The luxury sedan for discerning executives." },
  { name: "Luxury Party Bus Executive Coach", tag: "Party bus", pax: 30, bags: 2, img: "cd29f8a9a_generated_image.png", text: "A mobile venue for celebrations, corporate events and VIP groups." },
];
export const services = [
  { t: "Airport transfers", d: "Pearson transfers with flight tracking and meet and greet." },
  { t: "Executive chauffeur", d: "A discreet, punctual private chauffeur for executives and VIPs." },
  { t: "Corporate travel", d: "Priority booking, monthly invoicing and a dedicated contact." },
  { t: "Weddings and events", d: "Galas, weddings and red carpet arrivals with presence." },
  { t: "Group transportation", d: "Multi-vehicle transport for conferences and private parties." },
];
export const steps = [
  { t: "Request your quote", d: "Enter your trip and contact details." },
  { t: "Receive your rate", d: "We review your request and send a personalized quote." },
  { t: "Confirm your ride", d: "Confirm the trip and pay any required deposit." },
  { t: "Meet your chauffeur", d: "Your chauffeur arrives at your scheduled pickup." },
];
export const features = [
  ["Real-time flight tracking", "We monitor your flight so pickup matches your landing."],
  ["Free airport wait time", "30 minutes of complimentary waiting on airport pickups."],
  ["Upfront quote", "Know your price before you confirm."],
  ["Professional chauffeurs", "Courteous, discreet and focused on your comfort."],
  ["Luxury black SUVs", "For airport, corporate, event and private travel."],
  ["Available 24/7", "Day and night across Toronto and the GTA."],
];
export const reviews = [
  { q: "Three beautiful SUV picked us up for a trip to our wedding venue. Very prompt and a great experience.", n: "Ken Sweatman" },
  { q: "Best in the business. Extremely professional and great service.", n: "Joe Oppedisano" },
  { q: "The driver was professional and on time, the vehicle very clean and comfortable, and the overall service excellent.", n: "Areeba Eshal" },
];
export const areas = ["Toronto", "Mississauga", "Brampton", "Oakville", "Vaughan", "Markham", "Milton", "Burlington", "Hamilton", "Etobicoke", "Scarborough", "Richmond Hill", "Pickering", "Ajax", "Whitby", "Oshawa", "Newmarket", "Barrie", "Niagara Falls", "Kitchener", "Waterloo", "Cambridge", "London", "Muskoka"];
export const faqs = [
  ["How much is a limo to Pearson Airport?", "Every fare is quoted from your exact pickup and drop-off addresses, vehicle and timing. Request a quote and we reply with your exact fare for approval."],
  ["Do you offer flat rates with no surge?", "Yes. Pricing is fixed and transparent, with no surge charges. You know the cost before you book."],
  ["Is flight tracking included?", "Yes. We track your flight in real time and time your pickup to your landing."],
  ["Do you provide corporate chauffeur service?", "Yes. Corporate clients get priority booking, monthly billing with itemized trip reports and a single point of contact."],
  ["What is your wait time policy?", "Airport pickups include 30 minutes of complimentary waiting time."],
  ["Do you operate 24/7?", "Yes, every day, day and night, across Toronto and the GTA."],
];
