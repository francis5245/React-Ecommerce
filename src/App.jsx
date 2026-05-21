import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "@/context/CartContext"
import MainLayout from "@/layouts/MainLayout"
import Home from "@/pages/Home"

export default function App() {
  return (
    // CartProvider enveloppe TOUT — comme ça cart-button.jsx
    // peut lire le panier depuis n'importe quelle page
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* MainLayout enveloppe toutes les routes enfants */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {/* Tu ajouteras tes autres pages ici au fur et à mesure */}
            {/* <Route path="/promotions" element={<Promotions />} /> */}
            {/* <Route path="/panier" element={<Panier />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}