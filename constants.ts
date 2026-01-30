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