// src/components/Navbar.jsx

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

// ── 1. Imports des composants de base Shadcn ───────────────────
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// ── 2. Imports du Navigation Menu Shadcn ───────────────────────
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle, // Fonction essentielle pour le style
} from "@/components/ui/navigation-menu";

// ── 3. Les constantes et contextes du projet ───────────────────
import { NAV_LINKS } from "@/constants/navLinks";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* BLOC 1 : LOGO */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-black tracking-widest text-yellow-300 hover:text-yellow-200 transition-colors"
        >
          DRFT.
        </button>

        {/* BLOC 2 : NAVIGATION DESKTOP (OPTION SHADCN PURE) */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuLink
                      asChild
                      className={`${navigationMenuTriggerStyle()} bg-transparent text-zinc-100 hover:bg-zinc-800 focus:bg-zinc-800 ${
                        isActive ? "bg-zinc-800 text-yellow-300 font-semibold" : ""
                      }`}
                    >
                      <Link to={link.path}>
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* BLOC 3 : ACTIONS (PANIER + BURGER MOBILE) */}
        <div className="flex items-center gap-2">
          
          {/* Bouton Panier */}
          <Button
            variant="outline"
            onClick={() => navigate("/cart")}
            className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 gap-2"
          >
            🛒 <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <Badge className="bg-yellow-300 text-black hover:bg-yellow-300 px-1.5 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>

          {/* Menu Hamburger Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-zinc-100">
                <span className="text-xl">☰</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="bg-zinc-950 border-zinc-800 w-72">
              <SheetHeader>
                <SheetTitle className="text-yellow-300 text-xl tracking-widest font-black">
                  DRFT.
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4 bg-zinc-800" />
              
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Button
                      key={link.path}
                      variant={isActive ? "secondary" : "ghost"}
                      asChild
                      onClick={closeMenu}
                      className="justify-start font-medium text-sm text-zinc-100"
                    >
                      <Link to={link.path}>{link.label}</Link>
                    </Button>
                  );
                })}
                <Separator className="my-2 bg-zinc-800" />
                <Button
                  variant="ghost"
                  className="justify-start gap-2 text-zinc-100"
                  onClick={() => { navigate("/cart"); closeMenu(); }}
                >
                  🛒 Panier
                  {cartCount > 0 && (
                    <Badge className="bg-yellow-300 text-black hover:bg-yellow-300">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

        </div>

      </div>
    </header>
  );
}