import type { Product, Category, Testimonial } from "@/lib/types"

export const products: Product[] = [
  {
    id: "1",
    name: "Professional Cordless Drill",
    description:
      "High-performance cordless drill with 20V lithium-ion battery, perfect for construction and home projects.",
    price: 129.99,
    category: "power-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    stock: 45,
    brand: "PowerMaster",
    featured: true,
  },
  {
    id: "2",
    name: "Heavy-Duty Angle Grinder",
    description:
      "Industrial-grade angle grinder with 7-inch disc and 15 Amp motor for cutting and grinding metal and masonry.",
    price: 89.99,
    category: "power-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
    stock: 32,
    brand: "ToolPro",
  },
  {
    id: "3",
    name: "Precision Laser Level",
    description:
      "Self-leveling laser level with 360-degree horizontal and vertical lines for accurate alignment in construction.",
    price: 199.99,
    category: "measuring-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    stock: 18,
    brand: "PrecisionTech",
    featured: true,
  },
  {
    id: "4",
    name: "Compact Circular Saw",
    description: "Lightweight circular saw with 7¼-inch blade and 15 Amp motor, ideal for cutting lumber and plywood.",
    price: 149.99,
    category: "power-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    stock: 27,
    brand: "PowerMaster",
  },
  {
    id: "5",
    name: "Digital Caliper",
    description: "Stainless steel digital caliper with 0-6 inch range and LCD display for precise measurements.",
    price: 39.99,
    category: "measuring-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    stock: 53,
    brand: "PrecisionTech",
  },
  {
    id: "6",
    name: "Pneumatic Nail Gun",
    description: "Professional-grade pneumatic framing nailer for construction and woodworking projects.",
    price: 219.99,
    category: "air-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    stock: 21,
    brand: "FastenPro",
    featured: true,
  },
  {
    id: "7",
    name: "Welding Machine",
    description: "Multi-process welder with MIG, TIG, and Stick capabilities for versatile welding applications.",
    price: 499.99,
    category: "welding-equipment",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.9,
    stock: 12,
    brand: "WeldTech",
  },
  {
    id: "8",
    name: "Portable Air Compressor",
    description: "Oil-free portable air compressor with 6-gallon tank and 150 PSI for powering pneumatic tools.",
    price: 179.99,
    category: "air-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
    stock: 24,
    brand: "AirForce",
  },
  {
    id: "9",
    name: "Concrete Mixer",
    description: "Electric concrete mixer with 3.5 cubic feet capacity for small to medium construction projects.",
    price: 349.99,
    category: "construction-equipment",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    stock: 9,
    brand: "BuildPro",
  },
  {
    id: "10",
    name: "Rotary Hammer Drill",
    description: "SDS-Plus rotary hammer drill for drilling into concrete, brick, and stone with ease.",
    price: 159.99,
    category: "power-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    stock: 17,
    brand: "PowerMaster",
  },
  {
    id: "11",
    name: "Digital Moisture Meter",
    description: "Professional moisture meter for detecting water damage in wood, drywall, and concrete.",
    price: 59.99,
    category: "measuring-tools",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.5,
    stock: 38,
    brand: "PrecisionTech",
  },
  {
    id: "12",
    name: "Hydraulic Floor Jack",
    description: "3-ton capacity hydraulic floor jack for lifting vehicles and heavy equipment.",
    price: 129.99,
    category: "lifting-equipment",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    stock: 22,
    brand: "LiftMaster",
  },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Power Tools",
    description: "High-performance electric and battery-powered tools for construction and DIY projects.",
    image: "/placeholder.svg?height=300&width=300",
    slug: "power-tools",
  },
  {
    id: "2",
    name: "Measuring Tools",
    description: "Precision instruments for accurate measurements in construction and woodworking.",
    image: "/placeholder.svg?height=300&width=300",
    slug: "measuring-tools",
  },
  {
    id: "3",
    name: "Air Tools",
    description: "Pneumatic tools powered by compressed air for construction and automotive applications.",
    image: "/placeholder.svg?height=300&width=300",
    slug: "air-tools",
  },
  {
    id: "4",
    name: "Welding Equipment",
    description: "Professional welding machines and accessories for metal fabrication and repairs.",
    image: "/placeholder.svg?height=300&width=300",
    slug: "welding-equipment",
  },
  {
    id: "5",
    name: "Construction Equipment",
    description: "Heavy-duty equipment for construction sites and large-scale projects.",
    image: "/placeholder.svg?height=300&width=300",
    slug: "construction-equipment",
  },
  {
    id: "6",
    name: "Lifting Equipment",
    description: "Tools and machinery for safely lifting and moving heavy objects.",
    image: "/placeholder.svg?height=300&width=300",
    slug: "lifting-equipment",
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael Johnson",
    role: "Construction Manager",
    company: "Johnson Construction Inc.",
    content:
      "Everest Evolution has been our go-to supplier for construction tools for over 5 years. Their products are reliable, durable, and backed by excellent customer service.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "DIY Enthusiast",
    company: "Home Renovation Blog",
    content:
      "As someone who works on home projects regularly, I can't recommend Everest Evolution enough. Their tools are professional-grade but still accessible for hobbyists like me.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
  },
  {
    id: "3",
    name: "Robert Chen",
    role: "General Contractor",
    company: "Chen Building Solutions",
    content:
      "The quality and durability of Everest Evolution's equipment have significantly improved our efficiency on job sites. Their after-sales support is also exceptional.",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}
