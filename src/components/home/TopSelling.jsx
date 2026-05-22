import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import "./TopSelling.css"

const PRODUCTS = {
  laptops: [
    { id: 1,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80" },
    { id: 2,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" },
    { id: 3,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200&q=80" },
    { id: 4,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&q=80" },
    { id: 5,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&q=80" },
    { id: 6,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&q=80" },
    { id: 7,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=200&q=80" },
    { id: 8,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80" },
    { id: 9,  name: "Product Name Goes Here", category: "Laptops",      price: 980, oldPrice: 990, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" },
  ],
  smartphones: [
    { id: 10, name: "Product Name Goes Here", category: "Smartphones",  price: 699, oldPrice: 799, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
    { id: 11, name: "Product Name Goes Here", category: "Smartphones",  price: 599, oldPrice: 699, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=200&q=80" },
    { id: 12, name: "Product Name Goes Here", category: "Smartphones",  price: 499, oldPrice: 599, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&q=80" },
    { id: 13, name: "Product Name Goes Here", category: "Smartphones",  price: 399, oldPrice: 499, image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&q=80" },
    { id: 14, name: "Product Name Goes Here", category: "Smartphones",  price: 349, oldPrice: 449, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
    { id: 15, name: "Product Name Goes Here", category: "Smartphones",  price: 299, oldPrice: 399, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=200&q=80" },
    { id: 16, name: "Product Name Goes Here", category: "Smartphones",  price: 249, oldPrice: 349, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&q=80" },
    { id: 17, name: "Product Name Goes Here", category: "Smartphones",  price: 199, oldPrice: 299, image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=200&q=80" },
    { id: 18, name: "Product Name Goes Here", category: "Smartphones",  price: 149, oldPrice: 249, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
  ],
  cameras: [
    { id: 19, name: "Product Name Goes Here", category: "Cameras",      price: 1200, oldPrice: 1400, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" },
    { id: 20, name: "Product Name Goes Here", category: "Cameras",      price: 980,  oldPrice: 990,  image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=80" },
    { id: 21, name: "Product Name Goes Here", category: "Cameras",      price: 750,  oldPrice: 850,  image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=200&q=80" },
    { id: 22, name: "Product Name Goes Here", category: "Cameras",      price: 600,  oldPrice: 700,  image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&q=80" },
    { id: 23, name: "Product Name Goes Here", category: "Cameras",      price: 550,  oldPrice: 650,  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" },
    { id: 24, name: "Product Name Goes Here", category: "Cameras",      price: 500,  oldPrice: 600,  image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&q=80" },
    { id: 25, name: "Product Name Goes Here", category: "Cameras",      price: 450,  oldPrice: 550,  image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=200&q=80" },
    { id: 26, name: "Product Name Goes Here", category: "Cameras",      price: 400,  oldPrice: 500,  image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&q=80" },
    { id: 27, name: "Product Name Goes Here", category: "Cameras",      price: 350,  oldPrice: 450,  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" },
  ],
  accessories: [
    { id: 28, name: "Product Name Goes Here", category: "Accessories",  price: 120, oldPrice: 150, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { id: 29, name: "Product Name Goes Here", category: "Accessories",  price: 80,  oldPrice: 100, image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80" },
    { id: 30, name: "Product Name Goes Here", category: "Accessories",  price: 60,  oldPrice: 80,  image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&q=80" },
    { id: 31, name: "Product Name Goes Here", category: "Accessories",  price: 45,  oldPrice: 60,  image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80" },
    { id: 32, name: "Product Name Goes Here", category: "Accessories",  price: 40,  oldPrice: 55,  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
    { id: 33, name: "Product Name Goes Here", category: "Accessories",  price: 35,  oldPrice: 50,  image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&q=80" },
    { id: 34, name: "Product Name Goes Here", category: "Accessories",  price: 30,  oldPrice: 45,  image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200&q=80" },
    { id: 35, name: "Product Name Goes Here", category: "Accessories",  price: 25,  oldPrice: 40,  image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80" },
    { id: 36, name: "Product Name Goes Here", category: "Accessories",  price: 20,  oldPrice: 35,  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
  ],
}

// Petite carte produit
function MiniCard({ product }) {
  return (
    <div className="mini-card">
      <img
        src={product.image}
        alt={product.name}
        className="mini-card__image"
      />
      <div className="mini-card__body">
        <p className="mini-card__category">{product.category}</p>
        <p className="mini-card__name">{product.name}</p>
        <div className="mini-card__prices">
          <span className="mini-card__price">${product.price}.00</span>
          <span className="mini-card__price--old">${product.oldPrice}.00</span>
        </div>
      </div>
    </div>
  )
}

// Grille 3 colonnes de 3 produits chacune
function ProductGrid({ products }) {
  return (
    <div className="top-selling__grid">
      <div className="top-selling__col">
        {products.slice(0, 3).map((p) => <MiniCard key={p.id} product={p} />)}
      </div>
      <div className="top-selling__col">
        {products.slice(3, 6).map((p) => <MiniCard key={p.id} product={p} />)}
      </div>
      <div className="top-selling__col">
        {products.slice(6, 9).map((p) => <MiniCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

export default function TopSelling() {
  return (
    <section className="top-selling">
      <Tabs defaultValue="laptops">

        {/* En-tête */}
        <div className="top-selling__header">
          <h2 className="top-selling__title">Top Selling</h2>
          <div className="top-selling__tabs">
            <TabsList>
              <TabsTrigger value="laptops">Laptops</TabsTrigger>
              <TabsTrigger value="smartphones">Smartphones</TabsTrigger>
              <TabsTrigger value="cameras">Cameras</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Contenu */}
        <TabsContent value="laptops">
          <ProductGrid products={PRODUCTS.laptops} />
        </TabsContent>
        <TabsContent value="smartphones">
          <ProductGrid products={PRODUCTS.smartphones} />
        </TabsContent>
        <TabsContent value="cameras">
          <ProductGrid products={PRODUCTS.cameras} />
        </TabsContent>
        <TabsContent value="accessories">
          <ProductGrid products={PRODUCTS.accessories} />
        </TabsContent>

      </Tabs>
    </section>
  )
}