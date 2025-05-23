import { categories } from "@/lib/data"
import CategoryCard from "@/components/category-card"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Product Categories</h1>
        <p className="text-muted-foreground mt-1">
          Browse our wide range of construction tools and equipment categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
