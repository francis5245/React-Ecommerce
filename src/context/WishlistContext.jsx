import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("shoop-wishlist")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("shoop-wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        toast.error("Retiré des favoris", {
          description: product.name,
        })
        return prev.filter((item) => item.id !== product.id)
      }
      toast.success("Ajouté aux favoris !", {
        description: product.name,
      })
      return [...prev, product]
    })
  }

  const isInWishlist = (id) => wishlist.some((item) => item.id === id)

  const clearWishlist = () => {
    setWishlist([])
    localStorage.removeItem("shoop-wishlist")
    toast.error("Favoris vidés")
  }

  const wishlistCount = wishlist.length

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistCount,
      toggleWishlist,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}