import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Heart, ArrowLeft } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import "./Recherche.css"

// On réutilise le style des cartes de NewProducts
import "../components/home/NewProducts.css"

function ResultCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/produit/${product.id}`}>
        <div className="product-card__image-wrap">
          <img src={product.image} alt={product.name} />
          {product.badge === "new" && (
            <span className="product-card__badge product-card__badge--new">NEW</span>
          )}
          {product.badge === "sale" && (
            <span className="product-card__badge product-card__badge--sale">-30%</span>
          )}
        </div>
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <Link to={`/produit/${product.id}`}>
          <p className="product-card__name">{product.name}</p>
        </Link>
        <div className="product-card__prices">
          <span className="product-card__price">${product.price}.00</span>
          <span className="product-card__price--old">${product.oldPrice}.00</span>
        </div>
        <div className="product-card__actions">
          <button
            className="product-card__action"
            aria-label="Wishlist"
            onClick={() => toggleWishlist(product)}
          >
            <Heart
              className="h-4 w-4"
              fill={isInWishlist(product.id) ? "#e53935" : "none"}
              stroke={isInWishlist(product.id) ? "#e53935" : "currentColor"}
            />
          </button>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="product-card__add-btn"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function Recherche() {
  // Lit le paramètre ?q= dans l'URL
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  // Filtre les produits selon la recherche
  // Cherche dans le nom ET la catégorie
  const results = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="recherche">

      {/* En-tête */}
      <div className="recherche__header">
        <h1 className="recherche__title">Résultats de recherche</h1>
        <p className="recherche__meta">
          <strong>{results.length} résultat{results.length > 1 ? "s" : ""}</strong>
          {" "}pour{" "}
          <strong>"{query}"</strong>
        </p>
      </div>

      {results.length === 0 ? (

        /* Aucun résultat */
        <div className="recherche__empty">
          <div className="recherche__empty-icon">🔍</div>
          <p className="recherche__empty-text">
            Aucun résultat pour "{query}"
          </p>
          <p className="recherche__empty-sub">
            Vérifiez l'orthographe ou essayez un autre mot clé
          </p>
          <Link to="/" className="recherche__empty-btn">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

      ) : (

        /* Grille résultats */
        <div className="recherche__grid">
          {results.map((product) => (
            <ResultCard key={product.id} product={product} />
          ))}
        </div>

      )}
    </div>
  )
}