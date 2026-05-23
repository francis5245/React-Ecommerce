import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Menu, ShoppingBag, ShoppingCart, Heart, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import CartButton from "./cart-button";
import "./Navbar.css";
import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* COUCHE 1 — barre du haut */}
      <div className="navbar-top">
        <div className="navbar-container">
          <div className="navbar-top__left">
            <span>+229 0152454205</span>
            <span>francissagbo@gmail.com</span>
            <span>Cotonou, Bénin</span>
          </div>
          <div className="navbar-top__right">
            <span>CFA</span>
            <a href="/compte">Mon Compte</a>
          </div>
        </div>
      </div>

      {/* COUCHE 2 — logo + recherche */}
      <div className="navbar-middle">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            SHOOP<span>.</span>
          </a>

          {/* Barre de recherche desktop */}
          <form className="navbar-search" onSubmit={handleSearch}>
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
            <button type="submit" className="navbar-search__btn">
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>

          <div className="navbar-actions">
            <a href="/wishlist" className="navbar-actions__item">
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="navbar-actions__badge">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </div>
              <span>Vos Favoris</span>
            </a>
            <CartButton />
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
          <form className="navbar-search-mobile" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {/* Desktop : liens de navigation */}
          <div className="navbar-bottom__desktop">
            <DesktopNav />
          </div>

          {/* Mobile : wishlist + panier + menu */}
          <div className="navbar-bottom__mobile">
            <a href="/wishlist" className="navbar-mobile__item">
              <div className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="navbar-mobile__badge">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </div>
              <span>Wishlist</span>
            </a>
            <a href="/panier" className="navbar-mobile__item">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="navbar-mobile__badge">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span>Panier</span>
            </a>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button aria-label="Menu" className="navbar-mobile__item">
                  <Menu className="h-5 w-5" />
                  <span>Menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <MobileNav onClose={() => setIsOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
