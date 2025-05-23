"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowLeft, ArrowRight, CreditCard, Loader2, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"

// Form schema for shipping information
const shippingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "Please select a state." }),
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),
  country: z.string().min(2, { message: "Please select a country." }),
})

// Form schema for payment information
const paymentFormSchema = z.object({
  paymentMethod: z.enum(["credit-card", "paypal", "bank-transfer"], {
    required_error: "Please select a payment method.",
  }),
  cardHolder: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
})

// Combined form schema
const checkoutFormSchema = z.object({
  shipping: shippingFormSchema,
  payment: paymentFormSchema,
})

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

// US States for dropdown
const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

// Countries for dropdown
const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" },
  { value: "UK", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "JP", label: "Japan" },
]

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState("shipping")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  // Calculate cart totals
  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  // Initialize form with default values
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shipping: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      },
      payment: {
        paymentMethod: "credit-card",
        cardHolder: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
    },
  })

  // Handle tab change
  const handleTabChange = (value: string) => {
    // Only allow changing to payment tab if shipping is valid
    if (value === "payment") {
      const shippingValues = form.getValues("shipping")
      const shippingResult = shippingFormSchema.safeParse(shippingValues)

      if (!shippingResult.success) {
        // Trigger validation on all shipping fields
        Object.keys(shippingValues).forEach((key) => {
          form.trigger(`shipping.${key as keyof typeof shippingValues}`)
        })
        return
      }
    }

    setActiveTab(value)
  }

  // Handle form submission
  const onSubmit = async (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderComplete(true)
      setOrderId(`EE-${Math.floor(100000 + Math.random() * 900000)}`)
      clearCart()

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
    }, 2000)
  }

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  // If order is complete, show success message
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Card className="border shadow-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <CardDescription>Thank you for your purchase.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4 pt-6">
            <p>
              Your order number is: <span className="font-bold">{orderId}</span>
            </p>
            <p className="text-muted-foreground">
              We've sent a confirmation email to {form.getValues("shipping.email")} with your order details.
            </p>
            <div className="border rounded-lg p-4 mt-6 bg-muted/30 text-left">
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <p>{form.getValues("shipping.fullName")}</p>
              <p>{form.getValues("shipping.address")}</p>
              <p>
                {form.getValues("shipping.city")}, {form.getValues("shipping.state")}{" "}
                {form.getValues("shipping.zipCode")}
              </p>
              <p>{countries.find((c) => c.value === form.getValues("shipping.country"))?.label}</p>
              <p>{form.getValues("shipping.phone")}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipping" disabled={isSubmitting}>
                <Truck className="h-4 w-4 mr-2" />
                Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={isSubmitting}>
                <CreditCard className="h-4 w-4 mr-2" />
                Payment
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="shipping" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Information</CardTitle>
                      <CardDescription>Enter your shipping details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shipping.fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="shipping.email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="shipping.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="shipping.address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shipping.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shipping.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {usStates.map((state) => (
                                    <SelectItem key={state.value} value={state.value}>
                                      {state.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="shipping.zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shipping.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem key={country.value} value={country.value}>
                                      {country.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" asChild>
                        <Link href="/cart">Back to Cart</Link>
                      </Button>
                      <Button type="button" onClick={() => handleTabChange("payment")}>
                        Continue to Payment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="payment" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>Select your preferred payment method.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="payment.paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="credit-card" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">Credit Card</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="paypal" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">PayPal</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="bank-transfer" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">Bank Transfer</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("payment.paymentMethod") === "credit-card" && (
                        <div className="space-y-4 pt-4 border-t">
                          <FormField
                            control={form.control}
                            name="payment.cardHolder"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="payment.cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="4242 4242 4242 4242" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="payment.expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="payment.cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {form.watch("payment.paymentMethod") === "paypal" && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to PayPal to complete your payment.
                          </p>
                        </div>
                      )}

                      {form.watch("payment.paymentMethod") === "bank-transfer" && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            Please use the following details to make your bank transfer:
                          </p>
                          <div className="mt-4 p-4 bg-muted rounded-md">
                            <p className="text-sm">
                              <span className="font-medium">Bank:</span> Everest National Bank
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Account Name:</span> Everest Evolution Inc.
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Account Number:</span> 1234567890
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Routing Number:</span> 987654321
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Reference:</span> Your order number (will be provided after
                              checkout)
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => setActiveTab("shipping")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Shipping
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Place Order"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-start space-x-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden border flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground w-full">
                <p className="mb-2">
                  By placing your order, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <svg
                    className="h-6 w-auto text-muted-foreground"
                    viewBox="0 0 36 24"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" />
                    <path
                      d="M16 16.4l-1-1.2-1 1.2c-.2.3-.6.4-1 .4-.6 0-1.2-.5-1.2-1.2 0-.3.1-.6.3-.8L13.2 14l-1.1-1.4c-.2-.2-.3-.5-.3-.8 0-.7.5-1.2 1.2-1.2.4 0 .7.2.9.4l1 1.2 1-1.2c.2-.3.6-.4 1-.4.6 0 1.2.5 1.2 1.2 0 .3-.1.6-.3.8L16.8 14l1.1 1.4c.2.2.3.5.3.8 0 .7-.6 1.2-1.2 1.2-.5 0-.8-.1-1-.4Z"
                      fill="#fff"
                    />
                    <path
                      d="M22 14.5h3c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-3c-.3 0-.5.2-.5.5s.2.5.5.5Zm1 2h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2c-.3 0-.5.2-.5.5s.2.5.5.5Zm1-4h1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1c-.3 0-.5.2-.5.5s.2.5.5.5ZM8.3 14.1l2.2-5.4c.2-.4.3-.7.8-.7h1.4c.5 0 .7.3.8.7l2.2 5.4c.1.2.1.4.1.5 0 .4-.3.7-.7.7-.3 0-.6-.2-.7-.5l-.4-1.1H10l-.4 1.1c-.1.3-.4.5-.7.5-.4 0-.7-.3-.7-.7.1-.1.1-.3.1-.5Zm4.4-2.3l-.7-1.9h-.1l-.7 1.9h1.5Z"
                      fill="#fff"
                    />
                  </svg>
                  <svg
                    className="h-6 w-auto text-muted-foreground"
                    viewBox="0 0 36 24"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" />
                    <path
                      d="M15 9v6c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h1c.6 0 1 .4 1 1Zm7 0v6c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h1c.6 0 1 .4 1 1Zm7 0v6c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h1c.6 0 1 .4 1 1ZM8 9v6c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h1c.6 0 1 .4 1 1Z"
                      fill="#fff"
                    />
                  </svg>
                  <svg
                    className="h-6 w-auto text-muted-foreground"
                    viewBox="0 0 36 24"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" />
                    <path
                      d="M18.9 9.9c0-.7-.6-1.3-1.3-1.3h-1.3c-.7 0-1.3.6-1.3 1.3v4.2c0 .7.6 1.3 1.3 1.3h1.3c.7 0 1.3-.6 1.3-1.3V9.9Zm-1.3 4.2h-1.3V9.9h1.3v4.2Zm-3.8-4.2c0-.7-.6-1.3-1.3-1.3H11c-.7 0-1.3.6-1.3 1.3v4.2c0 .7.6 1.3 1.3 1.3h1.3c.7 0 1.3-.6 1.3-1.3V9.9h.2Zm-1.3 4.2H11V9.9h1.3v4.2Zm11.3-5.5h-1.3c-.7 0-1.3.6-1.3 1.3v4.2c0 .7.6 1.3 1.3 1.3h1.3c.7 0 1.3-.6 1.3-1.3V9.9c0-.7-.6-1.3-1.3-1.3Zm0 5.5h-1.3V9.9h1.3v4.2Zm3.8-5.5h-1.3c-.7 0-1.3.6-1.3 1.3v4.2c0 .7.6 1.3 1.3 1.3H27c.7 0 1.3-.6 1.3-1.3V9.9c.1-.7-.5-1.3-1.2-1.3Zm0 5.5h-1.3V9.9H27v4.2Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
