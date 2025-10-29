import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Product = {
  id: string;
  name: string;
  description: string;
  details: string[];
  image: {
    url: string;
    hint: string;
  };
};

const getProductImage = (id: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === id);
    return {
        url: placeholder?.imageUrl || 'https://picsum.photos/seed/default/600/400',
        hint: placeholder?.imageHint || 'product image'
    };
};

export const products: Product[] = [
  {
    id: "prod-01",
    name: "CyberCorp Security Keychain",
    description: "A sleek, durable keychain designed for a leading cybersecurity firm, featuring a debossed logo and metallic accents.",
    details: ["Material: High-density PVC", "Process: 2D Layered Molding", "Attachment: Blackened Nickel Keyring", "Use Case: Corporate Swag"],
    image: getProductImage("portfolio-1"),
  },
  {
    id: "prod-02",
    name: "Adventure Co. Explorer Patch",
    description: "A rugged, weather-resistant patch for an outdoor apparel brand, with intricate details and a heat-sealed backing.",
    details: ["Material: Eco-friendly Soft Rubber", "Process: 3D Injection Molding", "Backing: Iron-on Adhesive", "Use Case: Apparel & Gear"],
    image: getProductImage("portfolio-2"),
  },
  {
    id: "prod-03",
    name: "QuantumLeap Tech Logo",
    description: "Promotional keychain showcasing a complex logo with vibrant, precise color-filling for a tech startup.",
    details: ["Material: Non-toxic Silicone", "Process: Automated Color Dispensing", "Feature: Glow-in-the-dark elements", "Use Case: Event Giveaway"],
    image: getProductImage("portfolio-3"),
  },
  {
    id: "prod-04",
    name: "Nomad Outfitter's Morale Patch",
    description: "Durable morale patch with hook-and-loop backing, designed to withstand extreme conditions for tactical gear.",
    details: ["Material: Heavy-duty PVC Rubber", "Process: Multi-layer 3D Molding", "Backing: Hook & Loop (Velcro)", "Use Case: Tactical & Outdoor"],
    image: getProductImage("portfolio-4"),
  },
  {
    id: "prod-05",
    name: "Pixel Pals Character Set",
    description: "A collection of colorful keychains featuring detailed character designs for a gaming merchandise line.",
    details: ["Material: Soft PVC", "Process: 2.5D Molding", "Attachment: Ball Chain", "Use Case: Collectible Merchandise"],
    image: getProductImage("portfolio-5"),
  },
  {
    id: "prod-06",
    name: "CodeBrew Coffee Patch",
    description: "A stylized patch for a coffee brand targeting developers, combining a retro-tech aesthetic with sharp, clean lines.",
    details: ["Material: Flexible PVC", "Process: 2D Molding with Recessed Details", "Feature: Scent-infused material (coffee aroma)", "Use Case: Brand Apparel"],
    image: getProductImage("portfolio-6"),
  },
];
