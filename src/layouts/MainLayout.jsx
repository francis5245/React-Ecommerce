import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar/Navbar"

export default function MainLayout() {
  return (
    
    <div className="min-h-screen flex flex-col">

      {/* Navbar — affiché sur toutes les pages */}
      <Navbar />

      {/* Outlet = la page courante injectée par React Router */}
      {/* Ex: si tu es sur /promotions → Outlet affiche Promotions.jsx */}
      <main className="flex-1">
        <Outlet /> {/* Ici le navbar et le footer seront tjrs à leurs place 
                        mais grace à oulet, on pourra changer ce qui 
                        va rester au milieu des deux en fonction de la 
                        route , on affiche ce qui doit rester sur l'accueil 
                        si on est sur / et sur /card si on est sur /card */}
      </main>

      {/* Footer simple — à enrichir plus tard */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2025 MonShop — Tous droits réservés
      </footer>

    </div>
  )
}