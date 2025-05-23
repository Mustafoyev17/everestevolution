import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md border">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
