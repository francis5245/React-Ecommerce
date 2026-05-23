import { useState } from "react"
import { Heart, Star, ChevronRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useCart } from "@/context/CartContext"
import "./Produit.css"

// Données produit — plus tard viendra d'une API
const PRODUIT = {
  id: 1,
  name: "Product Name Goes Here",
  category: "Laptops",
  price: 980,
  oldPrice: 990,
  stars: 4,
  reviews: 12,
  badge: "-10%",
  desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  images: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
  ],
  specs: [
    { label: "Marque",      value: "TechBrand" },
    { label: "Modèle",      value: "ProBook X500" },
    { label: "Processeur",  value: "Intel Core i7" },
    { label: "RAM",         value: "16 GB DDR4" },
    { label: "Stockage",    value: "512 GB SSD" },
    { label: "Écran",       value: "15.6 pouces FHD" },
    { label: "Système",     value: "Windows 11" },
    { label: "Garantie",    value: "2 ans" },
  ],
}

const SIMILAIRES = [
  { id: 2, name: "Product Name Goes Here", category: "Laptops", price: 980, oldPrice: 990, stars: 5, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
  { id: 3, name: "Product Name Goes Here", category: "Laptops", price: 750, oldPrice: 850, stars: 4, image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80" },
  { id: 4, name: "Product Name Goes Here", category: "Laptops", price: 600, oldPrice: 700, stars: 3, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
  { id: 5, name: "Product Name Goes Here", category: "Laptops", price: 850, oldPrice: 950, stars: 5, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },
]

function Stars({ count }) {
  return (
    <div className="produit__stars">
      {[1,2,3,4,5].map((i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i <= count ? "#e53935" : "none"}
          stroke={i <= count ? "#e53935" : "#ccc"}
        />
      ))}
    </div>
  )
}

function SimilaireCard({ product }) {
  const { addToCart } = useCart()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__prices">
          <span className="product-card__price">${product.price}.00</span>
          <span className="product-card__price--old">${product.oldPrice}.00</span>
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

export default function Produit() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...PRODUIT, image: PRODUIT.images[0] })
    }
  }

  return (
    <div className="produit">

      {/* Fil d'Ariane */}
      <div className="produit__breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/categorie/laptops">{PRODUIT.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span>{PRODUIT.name}</span>
      </div>

      {/* Section principale */}
      <div className="produit__main">

        {/* Galerie */}
        <div className="produit__gallery">
          <div className="produit__gallery-main">
            <img
              src={PRODUIT.images[activeImage]}
              alt={PRODUIT.name}
            />
          </div>
          <div className="produit__gallery-thumbs">
            {PRODUIT.images.map((img, i) => (
              <div
                key={i}
                className={`produit__gallery-thumb ${i === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={img} alt={`vue ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Infos */}
        <div className="produit__info">
          <p className="produit__category">{PRODUIT.category}</p>
          <h1 className="produit__name">{PRODUIT.name}</h1>

          <div className="produit__rating">
            <Stars count={PRODUIT.stars} />
            <span className="produit__reviews">({PRODUIT.reviews} avis)</span>
          </div>

          <div className="produit__prices">
            <span className="produit__price">${PRODUIT.price}.00</span>
            <span className="produit__price--old">${PRODUIT.oldPrice}.00</span>
            {PRODUIT.badge && (
              <span className="produit__badge">{PRODUIT.badge}</span>
            )}
          </div>

          <p className="produit__desc">{PRODUIT.desc}</p>

          {/* Quantité + boutons */}
          <div className="produit__actions">
            <div className="produit__qty">
              <button
                className="produit__qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="produit__qty-value">{qty}</span>
              <button
                className="produit__qty-btn"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button className="produit__add-btn" onClick={handleAddToCart}>
              Ajouter au panier
            </button>
            <button className="produit__wishlist-btn" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Meta */}
          <div className="produit__meta">
            <span><strong>Catégorie :</strong> {PRODUIT.category}</span>
            <span><strong>Disponibilité :</strong> En stock</span>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="produit__tabs">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specs">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({PRODUIT.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="produit__tab-content">
              <p>{PRODUIT.desc}</p>
              <p style={{ marginTop: "12px" }}>{PRODUIT.desc}</p>
            </div>
          </TabsContent>

          <TabsContent value="specs">
            <div className="produit__tab-content">
              <table className="produit__specs">
                <tbody>
                  {PRODUIT.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td>{spec.label}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="produit__tab-content">
              <p style={{ color: "#aaa" }}>
                Aucun avis pour l'instant. Soyez le premier à laisser un avis !
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Produits similaires */}
      <div className="produit__similar">
        <h2 className="produit__similar-title">Produits Similaires</h2>
        <div className="relative px-8">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {SIMILAIRES.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="pl-4 basis-full md:basis-1/3 lg:basis-1/4"
                >
                  <SimilaireCard product={p} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>

    </div>
  )
}