import { useState } from "react"
import { Menu, ShoppingBag, ShoppingCart, Heart, Search } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import DesktopNav from "./desktop-nav"
import MobileNav from "./mobile-nav"
import "./Navbar.css"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <header className="navbar-wrapper">

      {/* COUCHE 1 — barre du haut */}
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="navbar-top__left">
            <span>+221 00 00 00 00</span>
            <span>email@email.com</span>
            <span>17 Rue Somewhere</span>
          </div>
          <div className="navbar-top__right">
            <span>USD</span>
            <a href="/compte">My Account</a>
          </div>
        </div>
      </div>

      {/* COUCHE 2 — logo + recherche */}
      <div className="navbar-middle">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            SHOOP<span>.</span>
          </a>

          <div className="navbar-search">
            <select className="navbar-search__select">
              <option>All Categories</option>
              <option>Mode</option>
              <option>Électronique</option>
              <option>Maison</option>
              <option>Sport</option>
            </select>
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="navbar-search__input"
            />
            <button className="navbar-search__btn">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          <div className="navbar-actions">
            <a href="/wishlist" className="navbar-actions__item">
              <Heart className="h-5 w-5" />
              <span>Your Wishlist</span>
            </a>
            <a href="/panier" className="navbar-actions__item">
              <ShoppingCart className="h-5 w-5" />
              <span>Your Cart</span>
            </a>
          </div>
        </div>
      </div>

      {/* COUCHE 3 — desktop nav + mobile complet */}
      <div className="navbar-bottom">
        <div className="navbar-container">

          {/* Logo — visible uniquement sur mobile */}
          <a href="/" className="navbar-logo">
            SHOOP<span>.</span>
          </a>

          {/* Recherche mobile */}
          <div className="navbar-search-mobile">
            <input type="text" placeholder="Search here..." />
            <button>Search</button>
          </div>

          {/* Desktop : liens de navigation */}
          <div className="navbar-bottom__desktop">
            <DesktopNav />
          </div>

          {/* Mobile : wishlist + panier + menu */}
          <div className="navbar-bottom__mobile">
            <a href="/wishlist" className="navbar-mobile__item">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </a>
            <a href="/panier" className="navbar-mobile__item">
              <ShoppingCart className="h-5 w-5" />
              <span>Your Cart</span>
            </a>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button aria-label="Menu" className="navbar-mobile__item">
                  <Menu className="h-5 w-5" />
                  <span>Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <MobileNav onClose={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>

    </header>
  )
}