"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { useCart } from "@/components/cart-provider"
import { useLiked } from "@/components/liked-provider"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toggleLiked, isLiked } = useLiked()
  const liked = isLiked(product.id)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => toggleLiked(product)}
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-red-500 text-red-500" : "")} />
          <span className="sr-only">Toggle liked</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">({product.rating})</span>
          </div>
          <p className="font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
