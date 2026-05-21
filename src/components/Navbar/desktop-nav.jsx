import { ChevronDown } from "lucide-react"

// Composant shadcn — installé via : npx shadcn@latest add dropdown-menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import NavLink from "./nav-link"

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  {
    label: "Catégories",
    href: "#",
    // La présence de "children" indique que c'est un dropdown
    children: [
      { label: "Mode & Vêtements", href: "/categorie/mode" },
      { label: "Électronique",     href: "/categorie/electronique" },
      { label: "Maison & Déco",    href: "/categorie/maison" },
      { label: "Sport & Loisirs",  href: "/categorie/sport" },
    ],
  },
  { label: "Promotions", href: "/promotions" },
  { label: "Nouveautés",  href: "/nouveautes" },
  { label: "Contact",     href: "/contact" },
]

export default function DesktopNav() {
  return (
    <nav className="flex items-center gap-1">
      {NAV_ITEMS.map((item) =>

        // Si l'item a des enfants → on affiche un DropdownMenu
        item.children ? (
          <DropdownMenu key={item.label}>

            {/* Le bouton qui déclenche l'ouverture */}
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm
                                 rounded-md text-muted-foreground
                                 hover:text-foreground hover:bg-accent
                                 transition-colors">
                {item.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            </DropdownMenuTrigger>

            {/* Le panneau qui s'ouvre avec les sous-liens */}
            <DropdownMenuContent align="start" className="w-48">
              {item.children.map((child) => (
                <DropdownMenuItem key={child.label} asChild>
                  <a href={child.href} className="w-full cursor-pointer">
                    {child.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>

          </DropdownMenu>

        ) : (
          // Sinon → un simple lien via NavLink
          <NavLink key={item.label} href={item.href}>
            {item.label}
          </NavLink>
        )
      )}
    </nav>
  )
}