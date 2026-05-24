import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Heart, ArrowRight, Clock } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import "./Promotions.css"

// Produits en promotion — ceux qui ont un badge
const PROMO_PRODUCTS = PRODUCTS
  .filter((p) => p.badge === "sale" || p.badge === "new")
  .map((p) => ({
    ...p,
    discount: p.badge === "sale" ? 30 : 10,
    promoPrice: Math.round(p.price * (p.badge === "sale" ? 0.7 : 0.9)),
  }))

// Countdown hook
function useCountdown(seconds) {
  const [time, setTime] = useState(seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = time % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

function PromoCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const countdown = useCountdown(Math.floor(Math.random() * 86400) + 3600)
  const saving = product.price - product.promoPrice

  return (
    <div className="promo-card">

      {/* Image */}
      <Link to={`/produit/${product.id}`}>
        <div className="promo-card__image-wrap">
          <img src={product.image} alt={product.name} />

          {/* Badge réduction */}
          <span className="promo-card__discount">-{product.discount}%</span>

          {/* Timer */}
          <div className="promo-card__timer">
            <Clock className="h-3 w-3" />
            Expire dans <span>{countdown}</span>
          </div>
        </div>
      </Link>

      {/* Corps */}
      <div className="promo-card__body">
        <p className="promo-card__category">{product.category}</p>

        <Link to={`/produit/${product.id}`} style={{ textDecoration: "none" }}>
          <p className="promo-card__name">{product.name}</p>
        </Link>

        <div className="promo-card__prices">
          <span className="promo-card__price">${product.promoPrice}.00</span>
          <span className="promo-card__price--old">${product.price}.00</span>
        </div>

        <p className="promo-card__saving">Vous économisez ${saving}.00 !</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <button
            onClick={() => toggleWishlist(product)}
            style={{
              background: "none", border: "1px solid #f0f0f0",
              borderRadius: 4, padding: "6px 8px", cursor: "pointer",
              color: isInWishlist(product.id) ? "#e53935" : "#bbb",
              transition: "all 0.2s",
            }}
          >
            <Heart
              className="h-4 w-4"
              fill={isInWishlist(product.id) ? "#e53935" : "none"}
            />
          </button>
        </div>

        <button
          className="promo-card__add-btn"
          onClick={() => addToCart({ ...product, price: product.promoPrice })}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  )
}

const CATEGORIES = ["Tous", "Laptops", "Smartphones", "Cameras", "Accessories"]

export default function Promotions() {
  const [activeFilter, setActiveFilter] = useState("Tous")
  const [tri, setTri] = useState("discount")

  // Filtre par catégorie
  let filtered = activeFilter === "Tous"
    ? PROMO_PRODUCTS
    : PROMO_PRODUCTS.filter((p) => p.category === activeFilter)

  // Tri
  if (tri === "discount")    filtered = [...filtered].sort((a, b) => b.discount - a.discount)
  if (tri === "prix-asc")    filtered = [...filtered].sort((a, b) => a.promoPrice - b.promoPrice)
  if (tri === "prix-desc")   filtered = [...filtered].sort((a, b) => b.promoPrice - a.promoPrice)
  if (tri === "economie")    filtered = [...filtered].sort((a, b) => (b.price - b.promoPrice) - (a.price - a.promoPrice))

  return (
    <div className="promotions">

      {/* Hero Banner */}
      <div className="promotions__hero">
        <div className="promotions__hero-content">
          <span className="promotions__hero-badge">🔥 Offres limitées</span>
          <h1 className="promotions__hero-title">
            Jusqu'à <span>-30%</span><br />sur nos produits
          </h1>
          <p className="promotions__hero-subtitle">
            Profitez de nos meilleures offres avant qu'elles expirent !
          </p>
          <a href="#promos" className="promotions__hero-btn">
            Voir les offres <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="promotions__hero-numbers">
          <div className="promotions__hero-number">
            <strong>{PROMO_PRODUCTS.length}</strong>
            <span>Produits</span>
          </div>
          <div className="promotions__hero-number">
            <strong>30%</strong>
            <span>Max remise</span>
          </div>
          <div className="promotions__hero-number">
            <strong>24h</strong>
            <span>Restantes</span>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="promotions__filters" id="promos">
        <span className="promotions__filter-label">Catégorie :</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`promotions__filter-btn ${activeFilter === cat ? "active" : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
        <select
          className="promotions__sort"
          value={tri}
          onChange={(e) => setTri(e.target.value)}
        >
          <option value="discount">Meilleure remise</option>
          <option value="economie">Plus grande économie</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
        </select>
      </div>

      {/* Header */}
      <div className="promotions__header">
        <h2 className="promotions__title">Promotions en cours</h2>
        <span className="promotions__count">
          {filtered.length} offre{filtered.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Grille */}
      <div className="promotions__grid">
        {filtered.length === 0 ? (
          <div className="promotions__empty">
            <p style={{ fontSize: 48, marginBottom: 12 }}>🏷️</p>
            <p>Aucune promotion dans cette catégorie</p>
          </div>
        ) : (
          filtered.map((product) => (
            <PromoCard key={product.id} product={product} />
          ))
        )}
      </div>

    </div>
  )
}