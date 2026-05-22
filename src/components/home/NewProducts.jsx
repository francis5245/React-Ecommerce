import { Heart, ArrowLeftRight, Eye, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { useCart } from "@/context/CartContext"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import "./NewProducts.css"

// Données produits par catégorie
const PRODUCTS = {
  laptops: [
    { id: 1, name: "Product Name Goes Here", category: "Laptops", price: 980, oldPrice: 990, stars: 4, badge: "new", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },
    { id: 2, name: "Product Name Goes Here", category: "Laptops", price: 980, oldPrice: 990, stars: 5, badge: null, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
    { id: 3, name: "Product Name Goes Here", category: "Laptops", price: 980, oldPrice: 990, stars: 3, badge: "sale", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80" },
    { id: 4, name: "Product Name Goes Here", category: "Laptops", price: 980, oldPrice: 990, stars: 5, badge: null, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80" },
  ],
  smartphones: [
    { id: 5, name: "Product Name Goes Here", category: "Smartphones", price: 699, oldPrice: 799, stars: 5, badge: "new", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
    { id: 6, name: "Product Name Goes Here", category: "Smartphones", price: 599, oldPrice: 699, stars: 4, badge: null, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80" },
    { id: 7, name: "Product Name Goes Here", category: "Smartphones", price: 499, oldPrice: 599, stars: 3, badge: "sale", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80" },
    { id: 8, name: "Product Name Goes Here", category: "Smartphones", price: 399, oldPrice: 499, stars: 5, badge: null, image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80" },
  ],
  cameras: [
    { id: 9,  name: "Product Name Goes Here", category: "Cameras", price: 1200, oldPrice: 1400, stars: 5, badge: "new", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80" },
    { id: 10, name: "Product Name Goes Here", category: "Cameras", price: 980,  oldPrice: 990,  stars: 4, badge: null, image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80" },
    { id: 11, name: "Product Name Goes Here", category: "Cameras", price: 750,  oldPrice: 850,  stars: 3, badge: "sale", image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&q=80" },
    { id: 12, name: "Product Name Goes Here", category: "Cameras", price: 600,  oldPrice: 700,  stars: 5, badge: null, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80" },
  ],
  accessories: [
    { id: 13, name: "Product Name Goes Here", category: "Accessories", price: 120, oldPrice: 150, stars: 4, badge: "new",  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
    { id: 14, name: "Product Name Goes Here", category: "Accessories", price: 80,  oldPrice: 100, stars: 5, badge: null,   image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80" },
    { id: 15, name: "Product Name Goes Here", category: "Accessories", price: 60,  oldPrice: 80,  stars: 3, badge: "sale", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80" },
    { id: 16, name: "Product Name Goes Here", category: "Accessories", price: 45,  oldPrice: 60,  stars: 5, badge: null,   image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80" },
  ],
}

// Composant étoiles
function Stars({ count }) {
  return (
    <div className="product-card__stars">
      {[1,2,3,4,5].map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          fill={i <= count ? "#e53935" : "none"}
          stroke={i <= count ? "#e53935" : "#ccc"}
        />
      ))}
    </div>
  )
}

// Composant carte produit
function ProductCard({ product }) {
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
        {product.badge === "new" && (
          <span className="product-card__badge product-card__badge--new">NEW</span>
        )}
        {product.badge === "sale" && (
          <span className="product-card__badge product-card__badge--sale">-30%</span>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__prices">
          <span className="product-card__price">${product.price}.00</span>
          <span className="product-card__price--old">${product.oldPrice}.00</span>
        </div>
        <Stars count={product.stars} />
        <div className="product-card__actions">
          <button className="product-card__action" aria-label="Wishlist">
            <Heart className="h-4 w-4" />
          </button>
          <button className="product-card__action" aria-label="Comparer">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <button className="product-card__action" aria-label="Voir">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Bouton visible uniquement au survol */}
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

// Carousel de produits
function ProductCarousel({ products }) {
  const [api, setApi] = useState(null)

  // Défilement automatique toutes les 3 secondes sur mobile
  useEffect(() => {
    if (!api) return
    const timer = setInterval(() => {
      api.scrollNext()
    }, 3000)
    return () => clearInterval(timer)
  }, [api])

  return (
    <div className="new-products__carousel relative px-8">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  )
}

export default function NewProducts() {
  return (
    <section className="new-products">
      <Tabs defaultValue="laptops">

        {/* En-tête : titre + tabs */}
        <div className="new-products__header">
          <h2 className="new-products__title">New Products</h2>
          <div className="new-products__tabs">
            <TabsList>
              <TabsTrigger value="laptops">Laptops</TabsTrigger>
              <TabsTrigger value="smartphones">Smartphones</TabsTrigger>
              <TabsTrigger value="cameras">Cameras</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Contenu par tab */}
        <TabsContent value="laptops">
          <ProductCarousel products={PRODUCTS.laptops} />
        </TabsContent>
        <TabsContent value="smartphones">
          <ProductCarousel products={PRODUCTS.smartphones} />
        </TabsContent>
        <TabsContent value="cameras">
          <ProductCarousel products={PRODUCTS.cameras} />
        </TabsContent>
        <TabsContent value="accessories">
          <ProductCarousel products={PRODUCTS.accessories} />
        </TabsContent>

      </Tabs>
    </section>
  )
}