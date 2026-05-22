import { Trash2, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "@/context/CartContext"
import "./Panier.css"

export default function Panier() {
  const { cart, subtotal, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart()

  // Frais de livraison — gratuit au dessus de 500$
  const shipping = subtotal > 500 ? 0 : 15
  const total = subtotal + shipping

  return (
    <div className="panier">
      <h1 className="panier__title">Mon Panier</h1>

      {cart.length === 0 ? (

        /* Panier vide */
        <div className="panier__empty">
          <div className="panier__empty-icon">🛒</div>
          <p className="panier__empty-text">Votre panier est vide</p>
          <Link to="/" className="panier__empty-btn">
            <ArrowLeft className="h-4 w-4" />
            Continuer mes achats
          </Link>
        </div>

      ) : (

        /* Panier avec produits */
        <div className="panier__layout">

          {/* Tableau produits */}
          <div className="panier__table">

            {/* En-tête */}
            <div className="panier__table-head">
              <span>Produit</span>
              <span>Prix</span>
              <span>Quantité</span>
              <span>Total</span>
              <span></span>
            </div>

            {/* Lignes produits */}
            {cart.map((item) => (
              <div key={item.id} className="panier__row">

                {/* Produit */}
                <div className="panier__product">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="panier__product-img"
                  />
                  <div>
                    <p className="panier__product-name">{item.name}</p>
                    <p className="panier__product-category">{item.category}</p>
                  </div>
                </div>

                {/* Prix unitaire */}
                <span className="panier__price">
                  ${item.price}.00
                </span>

                {/* Quantité */}
                <div className="panier__qty">
                  <button
                    className="panier__qty-btn"
                    onClick={() => decreaseQty(item.id)}
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <span className="panier__qty-value">{item.qty}</span>
                  <button
                    className="panier__qty-btn"
                    onClick={() => increaseQty(item.id)}
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>

                {/* Total ligne */}
                <span className="panier__total-line">
                  ${(item.price * item.qty).toFixed(2)}
                </span>

                {/* Supprimer */}
                <button
                  className="panier__remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

              </div>
            ))}

          </div>

          {/* Résumé commande */}
          <div className="panier__summary">
            <h2 className="panier__summary-title">Résumé</h2>

            <div className="panier__summary-row">
              <span>Sous-total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="panier__summary-row">
              <span>Livraison</span>
              <span>
                {shipping === 0 ? "Gratuit 🎉" : `$${shipping}.00`}
              </span>
            </div>

            {subtotal < 500 && (
              <div className="panier__summary-row" style={{ color: "#e53935", fontSize: "12px" }}>
                <span>Plus que ${(500 - subtotal).toFixed(2)} pour la livraison gratuite !</span>
              </div>
            )}

            <div className="panier__summary-row panier__summary-row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <a href="/checkout" className="panier__checkout-btn">
              Passer la commande
            </a>

            <Link to="/" className="panier__continue-btn">
              ← Continuer mes achats
            </Link>

            <button
              onClick={clearCart}
              style={{
                display: "block",
                width: "100%",
                marginTop: "10px",
                background: "none",
                border: "none",
                color: "#aaa",
                fontSize: "12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => e.target.style.color = "#e53935"}
              onMouseOut={(e) => e.target.style.color = "#aaa"}
            >
              Vider le panier
            </button>

          </div>
        </div>
      )}
    </div>
  )
}