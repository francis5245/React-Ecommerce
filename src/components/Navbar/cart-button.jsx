import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

// CartContext est maintenant bien exporté
import { CartContext } from "@/context/CartContext"

export default function CartButton() {

  // Ton contexte expose cartCount directement — pas besoin de .reduce()
  const { cartCount } = useContext(CartContext)

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to="/panier" aria-label={`Panier — ${cartCount} article(s)`}>
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />

          {/* Badge — affiché uniquement si le panier n'est pas vide */}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2
                             h-4 w-4 rounded-full
                             bg-primary text-primary-foreground
                             text-[10px] font-medium
                             flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </div>
      </Link>
    </Button>
  )
}