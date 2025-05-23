"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, Minus, Plus, Share2, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getProductById, products } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { useLiked } from "@/components/liked-provider"
import { cn } from "@/lib/utils"
import ProductCard from "@/components/product-card"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toggleLiked, isLiked } = useLiked()
  const liked = product ? isLiked(product.id) : false

  // Get related products (same category)
  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : []

  if (!product) {
    notFound()
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({Math.floor(product.rating * 10)}) reviews
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Brand</h3>
              <p>{product.brand}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(liked ? "text-red-500 border-red-500" : "")}
                onClick={() => toggleLiked(product)}
              >
                <Heart className={cn("h-5 w-5", liked ? "fill-red-500" : "")} />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <div className="mt-6 flex items-center text-sm text-muted-foreground">
            <Truck className="h-4 w-4 mr-2" />
            <span>Free shipping on orders over $100</span>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <p>
              {product.description} Our {product.name} is designed for professionals who demand reliability and
              performance. Built with premium materials and cutting-edge technology, this tool delivers exceptional
              results for all your construction and industrial needs.
            </p>
            <p>
              The ergonomic design ensures comfortable use even during extended periods, while the durable construction
              guarantees longevity and consistent performance in challenging environments.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">General</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Brand</span>
                    <span>{product.brand}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span>EE-{product.id}00</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Warranty</span>
                    <span>2 Years</span>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Physical</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Weight</span>
                    <span>{(Math.random() * 10 + 1).toFixed(1)} kg</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>
                      {Math.floor(Math.random() * 30 + 20)} x {Math.floor(Math.random() * 20 + 10)} x{" "}
                      {Math.floor(Math.random() * 10 + 5)} cm
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Material</span>
                    <span>Premium Grade</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Customer Reviews</h3>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm">Based on {Math.floor(product.rating * 10)} reviews</span>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h4 className="font-medium">Customer {i + 1}</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <svg
                            key={j}
                            className={cn(
                              "h-4 w-4",
                              j < Math.floor(Math.random() * 2 + 4)
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted",
                            )}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
                    </span>
                  </div>
                  <p>
                    {
                      [
                        "This product exceeded my expectations. The quality is outstanding and it performs exactly as described.",
                        "Great value for the price. I've been using it for a few weeks now and it's holding up well.",
                        "Solid construction and easy to use. Would definitely recommend to others.",
                      ][i]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
