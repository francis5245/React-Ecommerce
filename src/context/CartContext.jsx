import { createContext, useContext, useState } from "react"

export const CartContext = createContext()
export function CartProvider({ children }) {

  // cart = tableau de produits : [{ id, name, price, image, category, qty }, ...]
  const [cart, setCart] = useState([])

  // Ajouter un produit — si déjà dans le panier, augmente la quantité
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // Augmenter la quantité d'un produit
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }

  // Diminuer la quantité — supprime si qty = 1
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  // Supprimer un produit complètement
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // Vider tout le panier
  const clearCart = () => setCart([])

  // Nombre total d'articles — utilisé par cart-button.jsx
  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  // Sous-total
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