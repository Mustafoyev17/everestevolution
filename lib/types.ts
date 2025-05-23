export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  stock: number
  brand: string
  featured?: boolean
}

export type Category = {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}
