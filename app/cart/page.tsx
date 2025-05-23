"use client"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <div className="hidden md:grid md:grid-cols-6 text-sm font-medium text-muted-foreground mb-4">
                  <div className="col-span-3">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                <Separator className="hidden md:block mb-4" />
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 py-4">
                      <div className="col-span-3 flex items-center space-x-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">Brand: {item.product.brand}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="md:hidden font-medium mr-2">Price:</span>
                        <span>${item.product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="md:hidden font-medium mr-2">Quantity:</span>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end">
                        <span className="md:hidden font-medium mr-2">Total:</span>
                        <div className="flex items-center">
                          <span className="mr-4">${(item.product.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator className="col-span-6 md:hidden" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-muted/40 rounded-b-lg">
                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (7%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-muted/40 rounded-b-lg">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">Secure checkout powered by Stripe</p>
              </div>
            </div>
            <div className="mt-6 rounded-lg border p-6">
              <h3 className="font-medium mb-3">Have a promo code?</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter code"
                  className={cn(
                    "flex h-10 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm",
                    "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
                    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                />
                <Button className="rounded-l-none">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
