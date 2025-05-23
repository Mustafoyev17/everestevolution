import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Award, Clock, Globe, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">About Everest Evolution</h1>
            <p className="text-xl text-muted-foreground mb-6">
              We're on a mission to provide premium construction tools and equipment that empower professionals and DIY
              enthusiasts to build with confidence.
            </p>
            <p className="text-muted-foreground mb-8">
              Founded in 2010, Everest Evolution has grown from a small local supplier to a nationwide provider of
              high-quality construction tools and equipment. Our commitment to quality, innovation, and customer
              satisfaction has made us a trusted partner for contractors, construction companies, and DIY enthusiasts
              across the country.
            </p>
            <Button asChild>
              <Link href="/products">Explore Our Products</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Everest Evolution team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Our Values */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-muted-foreground">
              We never compromise on the quality of our products, ensuring they meet the highest standards of durability
              and performance.
            </p>
          </div>
          <div className="p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
            <p className="text-muted-foreground">
              Our customers are at the heart of everything we do. We strive to exceed expectations and build lasting
              relationships.
            </p>
          </div>
          <div className="p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-muted-foreground">
              We're committed to environmentally responsible practices in our operations and product development.
            </p>
          </div>
          <div className="p-6 rounded-lg border text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously seek new ways to improve our products and services to meet the evolving needs of our
              customers.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Our Story */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The journey from a small workshop to a nationwide supplier
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4">From Humble Beginnings</h3>
            <p className="text-muted-foreground mb-4">
              Everest Evolution was founded in 2010 by John Everest, a former construction worker who saw the need for
              better quality tools in the industry. Starting with just a small workshop and a handful of products,
              John's commitment to quality and customer service quickly earned the company a loyal following.
            </p>
            <p className="text-muted-foreground mb-4">
              As word spread about the reliability and performance of Everest Evolution tools, the company began to
              expand its product line and reach. By 2015, we had opened our first distribution center and were shipping
              products nationwide.
            </p>
            <p className="text-muted-foreground">
              Today, Everest Evolution is a leading supplier of construction tools and equipment, with a comprehensive
              product range that caters to professionals and DIY enthusiasts alike. Despite our growth, we remain true
              to our founding principles of quality, innovation, and customer focus.
            </p>
          </div>
          <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Everest Evolution history"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Key milestones in the Everest Evolution story
          </p>
        </div>
        <div className="relative border-l border-muted ml-4 md:ml-0 md:mx-auto md:max-w-3xl">
          <div className="mb-12 ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:text-right md:pr-8 relative">
              <div className="absolute -left-12 md:-right-12 top-0 h-6 w-6 rounded-full bg-primary border-2 border-background"></div>
              <h3 className="text-xl font-semibold mb-2">2010</h3>
              <p className="text-muted-foreground">
                Everest Evolution is founded by John Everest in a small workshop with just 3 employees.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </div>
          <div className="mb-12 ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="hidden md:block"></div>
            <div className="md:pl-8 relative">
              <div className="absolute -left-12 md:-left-4 top-0 h-6 w-6 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold mb-2">2013</h3>
              <p className="text-muted-foreground">
                Launch of our first premium power tool line, which quickly gains popularity among professionals.
              </p>
            </div>
          </div>
          <div className="mb-12 ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:text-right md:pr-8 relative">
              <div className="absolute -left-12 md:-right-12 top-0 h-6 w-6 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold mb-2">2015</h3>
              <p className="text-muted-foreground">
                Opening of our first distribution center, enabling nationwide shipping and faster delivery times.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </div>
          <div className="mb-12 ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="hidden md:block"></div>
            <div className="md:pl-8 relative">
              <div className="absolute -left-12 md:-left-4 top-0 h-6 w-6 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold mb-2">2018</h3>
              <p className="text-muted-foreground">
                Introduction of our subscription service, providing regular customers with exclusive benefits and
                discounts.
              </p>
            </div>
          </div>
          <div className="ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8 md:items-center">
            <div className="md:text-right md:pr-8 relative">
              <div className="absolute -left-12 md:-right-12 top-0 h-6 w-6 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold mb-2">2023</h3>
              <p className="text-muted-foreground">
                Launch of our eco-friendly product line, reflecting our commitment to sustainability and environmental
                responsibility.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Team Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the people driving Everest Evolution forward
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=300" alt="John Everest" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">John Everest</h3>
            <p className="text-muted-foreground">Founder & CEO</p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=300" alt="Sarah Johnson" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">Sarah Johnson</h3>
            <p className="text-muted-foreground">Chief Operations Officer</p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=300" alt="Michael Chen" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">Michael Chen</h3>
            <p className="text-muted-foreground">Chief Product Officer</p>
          </div>
          <div className="text-center">
            <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=300" alt="Emily Rodriguez" fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">Emily Rodriguez</h3>
            <p className="text-muted-foreground">Chief Marketing Officer</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/40 rounded-lg">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Join the Everest Evolution Family</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're a professional contractor or a DIY enthusiast, we have the tools and equipment you need to
            bring your projects to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
