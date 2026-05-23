import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Heart, ChevronRight } from "lucide-react"
import { PRODUCTS } from "@/data/products"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import "./Categorie.css"
import "../components/home/NewProducts.css"

// Correspondance slug → nom affiché
const CATEGORIES = {
  laptops:      "Laptops",
  smartphones:  "Smartphones",
  cameras:      "Cameras",
  accessories:  "Accessories",
}

// Filtres de prix
const PRIX_FILTRES = [
  { label: "Tous",        min: 0,    max: Infinity },
  { label: "< 100 FCFA",      min: 0,    max: 100 },
  { label: "100 FCFA - 500 FCFA", min: 100,  max: 500 },
  { label: "500 FCFA - 1000 FCFA",min: 500,  max: 1000 },
  { label: "> 1000 FCFA",     min: 1000, max: Infinity },
]

function CategorieCard({ product }) {
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

export default function Categorie() {
  const { slug } = useParams()
  const [prixFiltre, setPrixFiltre] = useState(0)
  const [tri, setTri] = useState("default")

  // Nom de la catégorie depuis le slug
  const categoryName = CATEGORIES[slug] || slug

  // Filtre par catégorie + prix
  let products = PRODUCTS.filter((p) =>
    p.category.toLowerCase() === categoryName.toLowerCase()
  )

  // Filtre prix
  const filtre = PRIX_FILTRES[prixFiltre]
  products = products.filter((p) =>
    p.price >= filtre.min && p.price < filtre.max
  )

  // Tri
  if (tri === "prix-asc")  products = [...products].sort((a, b) => a.price - b.price)
  if (tri === "prix-desc") products = [...products].sort((a, b) => b.price - a.price)
  if (tri === "nom")       products = [...products].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="categorie">

      {/* Fil d'Ariane */}
      <div className="categorie__breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span>{categoryName}</span>
      </div>

      {/* En-tête */}
      <div className="categorie__header">
        <h1 className="categorie__title">{categoryName}</h1>
        <p className="categorie__meta">
          {products.length} produit{products.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Filtres prix + tri */}
      <div className="categorie__filters">
        <span className="categorie__filter-label">Prix :</span>
        {PRIX_FILTRES.map((f, i) => (
          <button
            key={f.label}
            className={`categorie__filter-btn ${prixFiltre === i ? "active" : ""}`}
            onClick={() => setPrixFiltre(i)}
          >
            {f.label}
          </button>
        ))}
        <select
          className="categorie__sort"
          value={tri}
          onChange={(e) => setTri(e.target.value)}
        >
          <option value="default">Trier par défaut</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="nom">Nom A-Z</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div className="categorie__empty">
          <div className="categorie__empty-icon">📦</div>
          <p className="categorie__empty-text">
            Aucun produit dans cette catégorie
          </p>
          <Link to="/" className="categorie__empty-btn">
            ← Retour à l'accueil
          </Link>
        </div>
      ) : (
        <div className="categorie__grid">
          {products.map((product) => (
            <CategorieCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  )
}