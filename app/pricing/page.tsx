import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Pricing & Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Flexible pricing options for professionals and DIY enthusiasts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Standard Plan */}
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Standard</h3>
            <p className="text-muted-foreground mb-4">For occasional DIY projects</p>
            <div className="mb-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="p-6 bg-muted/40">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Standard shipping rates</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Access to all products</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Standard warranty</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Email support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="rounded-lg border shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
            Popular
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Pro</h3>
            <p className="text-muted-foreground mb-4">For regular contractors</p>
            <div className="mb-4">
              <span className="text-4xl font-bold">$29.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full" asChild>
              <Link href="/products">Subscribe</Link>
            </Button>
          </div>
          <div className="p-6 bg-muted/40">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Free shipping on all orders</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>10% discount on all products</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Extended warranty (3 years)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Priority email & phone support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Early access to new products</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
            <p className="text-muted-foreground mb-4">For construction companies</p>
            <div className="mb-4">
              <span className="text-4xl font-bold">$99.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
          <div className="p-6 bg-muted/40">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Free expedited shipping</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>20% discount on all products</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Lifetime warranty on select items</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>24/7 dedicated support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Bulk ordering & custom pricing</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>On-site training & consultation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Delivery Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Standard Shipping</h3>
            <p className="text-3xl font-bold mb-2">$9.99</p>
            <p className="text-muted-foreground mb-4">Delivery in 5-7 business days</p>
            <ul className="space-y-2 text-sm">
              <li>Available for all products</li>
              <li>Tracking included</li>
              <li>Free for orders over $100</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Express Shipping</h3>
            <p className="text-3xl font-bold mb-2">$19.99</p>
            <p className="text-muted-foreground mb-4">Delivery in 2-3 business days</p>
            <ul className="space-y-2 text-sm">
              <li>Available for most products</li>
              <li>Tracking included</li>
              <li>Free for Pro & Enterprise plans</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Same-Day Delivery</h3>
            <p className="text-3xl font-bold mb-2">$29.99</p>
            <p className="text-muted-foreground mb-4">Delivery within 24 hours</p>
            <ul className="space-y-2 text-sm">
              <li>Available in select areas</li>
              <li>For urgent requirements</li>
              <li>Free for Enterprise plan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change my plan later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect at the start of
              your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Do you offer discounts for bulk orders?</h3>
            <p className="text-muted-foreground">
              Yes, we offer special pricing for bulk orders. Please contact our sales team for a custom quote.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How does the warranty work?</h3>
            <p className="text-muted-foreground">
              Our standard warranty covers manufacturing defects for 1 year. Pro plan extends this to 3 years, and
              Enterprise offers lifetime warranty on select products.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Choose the plan that works best for you and start building with confidence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
