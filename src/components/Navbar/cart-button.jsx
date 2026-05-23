import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"

export default function CartButton() {
  const { cartCount } = useCart()

 return (
  <Button
    variant="ghost"
    size="icon"
    asChild
    className="navbar-cart-btn"
  >
    <Link to="/panier" aria-label={`Panier — ${cartCount} article(s)`}>
      <div className="relative">
        <ShoppingCart className="h-5 w-5" style={{ color: "white" }} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2
                           h-4 w-4 rounded-full
                           bg-[#e53935] text-white
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