import { Outlet } from "react-router-dom"

// Notre Navbar — déjà entièrement codé
import Navbar from "@/components/Navbar/Navbar"

export default function MainLayout() {
  return (
    // min-h-screen garantit que le footer reste toujours en bas
    <div className="min-h-screen flex flex-col">

      {/* Navbar — affiché sur toutes les pages */}
      <Navbar />

      {/* Outlet = la page courante injectée par React Router */}
      {/* Ex: si tu es sur /promotions → Outlet affiche Promotions.jsx */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer simple — à enrichir plus tard */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2025 MonShop — Tous droits réservés
      </footer>

    </div>
  )
}