import { ServiceItem, Location } from './types';

export const CONTACT_INFO = {
  phone: "+41 76 630 87 68",
  email: "aristotelmultiple@mail.ch",
  address: "Zurich, Switzerland"
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
    title: "Alpine Residence",
    description: "Complete interior renovation focusing on sustainable insulation and premium hardwood flooring.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    categories: ["Flooring", "Insulation"]
  },
  {
    id: "02",
    title: "Zurich Penthouse",
    description: "Decorative painting techniques and bespoke plastering for a modern brutalist aesthetic.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2592&auto=format&fit=crop",
    categories: ["Painting", "Plastering"]
  },
  {
    id: "03",
    title: "Lakeside Villa",
    description: "Deep clean restoration and facade renovation for a historic property on Lake Lucerne.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    categories: ["Facade", "Cleaning"]
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Markus Weber",
    location: "Zürich",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely impeccable work. The team transformed our apartment with such precision and care. Every detail was perfect, from the wallpapering to the final deep clean. Highly recommended!"
  },
  {
    id: 2,
    name: "Sophie Laurent",
    location: "Basel",
    rating: 5,
    date: "1 month ago",
    text: "Professional, punctual, and the quality is outstanding. They renovated our kitchen and the decorative plastering is a work of art. Worth every franc!"
  },
  {
    id: 3,
    name: "Thomas Müller",
    location: "Luzern",
    rating: 5,
    date: "3 weeks ago",
    text: "Best cleaning service in Switzerland, hands down. After our renovation, they left everything spotless. The attention to detail is unmatched."
  },
  {
    id: 4,
    name: "Elena Rossi",
    location: "Zug",
    rating: 5,
    date: "2 months ago",
    text: "Excellent communication throughout the project. The painting and facade work exceeded our expectations. True Swiss quality and craftsmanship."
  }
];

export const CLEANING_PROJECTS: ServiceItem[] = [
  {
    id: "01",
    title: "Post-Renovation Deep Clean",
    description: "Complete deep cleaning service for a newly renovated 3-bedroom apartment in Zürich. Every surface meticulously cleaned to perfection.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2574&auto=format&fit=crop",
    categories: ["Deep Cleaning", "Post-Renovation"]
  },
  {
    id: "02",
    title: "Move-Out Cleaning Excellence",
    description: "Professional move-out cleaning for a luxury penthouse. Crystal-clear windows and spotless interiors guaranteed deposit return.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2670&auto=format&fit=crop",
    categories: ["Move-Out", "Window Cleaning"]
  },
  {
    id: "03",
    title: "Commercial Space Sanitization",
    description: "Clinical-grade deep cleaning and sanitization for an office space in Basel. Medical-standard cleanliness achieved.",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2670&auto=format&fit=crop",
    categories: ["Deep Cleaning", "Commercial"]
  },
  {
    id: "04",
    title: "Waste Removal & Restoration",
    description: "Complete waste removal and deep cleaning service after construction. Space restored to pristine condition.",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=2670&auto=format&fit=crop",
    categories: ["Waste Removal", "Deep Cleaning"]
  }
];