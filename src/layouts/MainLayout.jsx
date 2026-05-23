import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import { Toaster } from "@/components/ui/sonner"

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

       <Footer />
v     <Toaster position="bottom-right" richColors />
    </div>
  )
}