import { ServiceItem, Location } from './types';

export const CONTACT_INFO = {
  phone: "+41 76 630 87 68",
  email: "aristotelmultiple@mail.ch",
  address: "Sonnenrain 7, 4717 Mümliswil, Switzerland",
  addressLine1: "Sonnenrain 7",
  addressLine2: "4717 Mümliswil"
};

export const LOCATIONS: Location[] = [
  { name: "SCHWEIZ" },
  { name: "ZÜRICH" },
  { name: "AARGAU" },
  { name: "BASEL" },
  { name: "ZUG" },
  { name: "LUZERN" },
  { name: "BERN" }
];

export const RENOVATION_SERVICES = [
  "Painting",
  "Wallpapering",
  "Decorative Techniques",
  "Insulation",
  "Flooring",
  "Plastering & Drywall",
  "Facade Renovation"
];

export const CLEANING_SERVICES = [
  "Deep Cleaning",
  "Move-out Cleaning",
  "Window Cleaning",
  "Waste Removal"
];

export const FEATURED_PROJECTS: ServiceItem[] = [
  {
    id: "01",
    title: "3-Bedroom Apartment Renovation",
    description: "Full interior renovation including new flooring installation, wall insulation upgrade, and complete painting. Completed in 6 weeks with minimal disruption to neighboring units.",
    image: "/01.jpeg",
    categories: ["Flooring", "Insulation", "Painting"]
  },
  {
    id: "02",
    title: "Office Space Refurbishment",
    description: "Commercial property makeover: drywall installation, professional painting, and decorative finishes. Project delivered on schedule for client move-in deadline.",
    image: "/02.jpeg",
    categories: ["Painting", "Plastering", "Commercial"]
  },
  {
    id: "03",
    title: "Historic Building Restoration",
    description: "Facade renovation and exterior painting for 100-year-old property. Preserved original character while meeting modern building standards.",
    image: "/03.jpg",
    categories: ["Facade", "Painting"]
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Markus Weber",
    location: "Zürich",
    rating: 5,
    date: "2 weeks ago",
    text: "Had them paint our entire apartment and install new flooring. Finished on time and stayed within the quoted price. Clean work, would hire again."
  },
  {
    id: 2,
    name: "Sophie Laurent",
    location: "Basel",
    rating: 5,
    date: "1 month ago",
    text: "Patricia is absolutely wonderful to work with! She helped us with our move-out cleaning and made the whole process so stress-free. Super friendly, answered all our questions, and the place looked spotless. Highly recommend!"
  },
  {
    id: 3,
    name: "Thomas Müller",
    location: "Luzern",
    rating: 5,
    date: "3 weeks ago",
    text: "Professional team. Did plastering and painting in our office. Minimal disruption to business and quality work. Good value for money."
  },
  {
    id: 4,
    name: "Elena Rossi",
    location: "Zug",
    rating: 5,
    date: "2 months ago",
    text: "Used them for post-renovation cleanup. Removed all the dust and debris efficiently. Reliable service and reasonable rates."
  }
];

export const CLEANING_PROJECTS: ServiceItem[] = [
  {
    id: "01",
    title: "Post-Renovation Cleaning",
    description: "Removed all construction dust and debris from 120m² apartment after complete renovation. Includes dust removal from all surfaces, floor cleaning, and window washing. Ready for immediate move-in.",
    image: "/renovation-cleaning.jpg",
    categories: ["Deep Cleaning", "Post-Renovation"]
  },
  {
    id: "02",
    title: "Move-Out Cleaning Service",
    description: "Complete end-of-tenancy cleaning including kitchen appliances, bathroom sanitization, and window cleaning. Meets Swiss rental standards for deposit return.",
    image: "/move-out.jpg",
    categories: ["Move-Out", "Window Cleaning"]
  },
  {
    id: "03",
    title: "Office Deep Cleaning",
    description: "Regular deep cleaning service for 200m² office space. Includes floor care, desk sanitization, and common area maintenance. Scheduled during off-hours to avoid business disruption.",
    image: "/office-cleaning.jpg",
    categories: ["Deep Cleaning", "Commercial"]
  },
  {
    id: "04",
    title: "Construction Cleanup",
    description: "Removed 2 tons of construction waste and cleaned entire property after major renovation. Includes debris removal, heavy-duty cleaning, and final polish.",
    image: "/04-cleaning.jpg",
    categories: ["Waste Removal", "Deep Cleaning"]
  }
];