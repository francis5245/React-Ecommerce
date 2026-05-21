import { useState } from "react"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,      // ← ajouter ici
  SheetTrigger
} from "@/components/ui/sheet"
import DesktopNav from "./desktop-nav"
import MobileNav from "./mobile-nav"
import CartButton from "./cart-button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <a href="/" className="text-xl font-bold tracking-tight">
          SHOOP
        </a>

        <div className="hidden md:flex">
          <DesktopNav />
        </div>

        <div className="flex items-center gap-3">
          <CartButton />

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button aria-label="Ouvrir le menu">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">

                {/* Titre caché visuellement mais lu par les lecteurs d'écran */}
                <SheetTitle className="sr-only">
                  Menu de navigation
                </SheetTitle>

                <MobileNav onClose={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  )
}