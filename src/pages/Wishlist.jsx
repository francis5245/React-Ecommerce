import { Link } from "react-router-dom"
import { Heart, ArrowLeft } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import "./Wishlist.css"

function WishlistCard({ product }) {
  const { toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="wishlist-card">

      {/* Bouton retirer */}
      <button
        className="wishlist-card__remove"
        onClick={() => toggleWishlist(product)}
        aria-label="Retirer des favoris"
      >
        <Heart className="h-4 w-4" fill="#e53935" />
      </button>

      {/* Image cliquable */}
      <Link to={`/produit/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="wishlist-card__image"
        />
      </Link>

      {/* Contenu */}
      <div className="wishlist-card__body">
        <p className="wishlist-card__category">{product.category}</p>

        <Link to={`/produit/${product.id}`}>
          <p className="wishlist-card__name">{product.name}</p>
        </Link>

        <div className="wishlist-card__prices">
          <span className="wishlist-card__price">${product.price}.00</span>
          {product.oldPrice && (
            <span className="wishlist-card__price--old">${product.oldPrice}.00</span>
          )}
        </div>

        <button
          className="wishlist-card__add-btn"
          onClick={() => addToCart(product)}
        >
          Ajouter au panier
        </button>
      </div>

    </div>
  )
}

export default function Wishlist() {
  const { wishlist, clearWishlist } = useWishlist()

  return (
    <div className="wishlist">
      <h1 className="wishlist__title">
        Mes Favoris
        {wishlist.length > 0 && (
          <span style={{ fontSize: "14px", fontWeight: "400", color: "#aaa", marginLeft: "12px" }}>
            ({wishlist.length} article{wishlist.length > 1 ? "s" : ""})
          </span>
        )}
      </h1>

      {wishlist.length === 0 ? (

        /* Wishlist vide */
        <div className="wishlist__empty">
          <div className="wishlist__empty-icon">🤍</div>
          <p className="wishlist__empty-text">Votre liste de favoris est vide</p>
          <Link to="/" className="wishlist__empty-btn">
            <ArrowLeft className="h-4 w-4" />
            Découvrir nos produits
          </Link>
        </div>

      ) : (

        <>
          {/* Bouton vider */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button
              onClick={clearWishlist}
              style={{
                background: "none",
                border: "none",
                color: "#aaa",
                fontSize: "13px",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) => e.target.style.color = "#e53935"}
              onMouseOut={(e) => e.target.style.color = "#aaa"}
            >
              Tout supprimer
            </button>
          </div>

          {/* Grille produits */}
          <div className="wishlist__grid">
            {wishlist.map((product) => (
              <WishlistCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}