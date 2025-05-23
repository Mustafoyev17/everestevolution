"use client"

import Link from "next/link"
import { useLiked } from "@/components/liked-provider"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function LikedPage() {
  const { likedItems, clearLiked } = useLiked()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Liked Items</h1>
          <p className="text-muted-foreground mt-1">Products you've saved for later</p>
        </div>
        {likedItems.length > 0 && (
          <Button variant="outline" className="mt-4 md:mt-0" onClick={clearLiked}>
            Clear All
          </Button>
        )}
      </div>

      {likedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No liked items yet</h3>
          <p className="text-muted-foreground mb-6">Save items you like by clicking the heart icon on product cards</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
