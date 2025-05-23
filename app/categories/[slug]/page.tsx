import Link from "next/link"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getProductsByCategory } from "@/lib/data"
import ProductCard from "@/components/product-card"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  const products = getProductsByCategory(params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to Categories
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground mt-1">{category.description}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found in this category</h3>
          <p className="text-muted-foreground">Check back later for new additions</p>
        </div>
      )}
    </div>
  )
}
