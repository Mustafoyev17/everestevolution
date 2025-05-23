"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

type LikedContextType = {
  likedItems: Product[]
  toggleLiked: (product: Product) => void
  isLiked: (productId: string) => boolean
  clearLiked: () => void
}

const LikedContext = createContext<LikedContextType | undefined>(undefined)

export function LikedProvider({ children }: { children: React.ReactNode }) {
  const [likedItems, setLikedItems] = useState<Product[]>([])
  const { toast } = useToast()

  // Load liked items from localStorage on mount
  useEffect(() => {
    const savedLiked = localStorage.getItem("liked")
    if (savedLiked) {
      try {
        setLikedItems(JSON.parse(savedLiked))
      } catch (error) {
        console.error("Failed to parse liked items from localStorage:", error)
      }
    }
  }, [])

  // Save liked items to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(likedItems))
  }, [likedItems])

  const toggleLiked = (product: Product) => {
    setLikedItems((prevItems) => {
      const isAlreadyLiked = prevItems.some((item) => item.id === product.id)

      if (isAlreadyLiked) {
        // Remove from liked
        toast({
          title: "Removed from liked items",
          description: `${product.name} removed from your liked items.`,
        })
        return prevItems.filter((item) => item.id !== product.id)
      } else {
        // Add to liked
        toast({
          title: "Added to liked items",
          description: `${product.name} added to your liked items.`,
        })
        return [...prevItems, product]
      }
    })
  }

  const isLiked = (productId: string) => {
    return likedItems.some((item) => item.id === productId)
  }

  const clearLiked = () => {
    setLikedItems([])
    toast({
      title: "Liked items cleared",
      description: "All items have been removed from your liked items.",
    })
  }

  return (
    <LikedContext.Provider
      value={{
        likedItems,
        toggleLiked,
        isLiked,
        clearLiked,
      }}
    >
      {children}
    </LikedContext.Provider>
  )
}

export function useLiked() {
  const context = useContext(LikedContext)
  if (context === undefined) {
    throw new Error("useLiked must be used within a LikedProvider")
  }
  return context
}
