import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("shoop-cart")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("shoop-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        toast.success(`Quantité mise à jour !`, {
          description: product.name,
        })
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      toast.success(`Ajouté au panier !`, {
        description: product.name,
      })
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
    toast.error("Produit retiré du panier")
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("shoop-cart")
    toast.error("Panier vidé")
  }

  const cartCount = cart.reduce((total, item) => total + item.qty, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      subtotal,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}