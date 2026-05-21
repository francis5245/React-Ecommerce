import { X } from "lucide-react"

// Composant shadcn — installé via : npx shadcn@latest add accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Notre lien réutilisable — déjà codé
import NavLink from "./nav-link"

// On réutilise la même structure de données que desktop-nav
// Astuce pro : idéalement ce tableau serait dans un fichier séparé
// src/config/nav.js — mais on garde ça simple pour l'instant
const NAV_ITEMS = [
  { label: "Accueil",     href: "/" },
  {
    label: "Catégories",
    href: "#",
    children: [
      { label: "Mode & Vêtements", href: "/categorie/mode" },
      { label: "Électronique",     href: "/categorie/electronique" },
      { label: "Maison & Déco",    href: "/categorie/maison" },
      { label: "Sport & Loisirs",  href: "/categorie/sport" },
    ],
  },
  { label: "Promotions",  href: "/promotions" },
  { label: "Nouveautés",  href: "/nouveautes" },
  { label: "Contact",     href: "/contact" },
]

// onClose est passé depuis Navbar.jsx pour fermer le Sheet
// quand l'utilisateur clique sur un lien
export default function MobileNav({ onClose }) {
  return (
    <div className="flex flex-col h-full">

      {/* En-tête du tiroir avec bouton de fermeture */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <span className="text-lg font-bold">MonShop</span>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          className="rounded-md p-1 hover:bg-accent transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Liste des liens — prend tout l'espace disponible */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {NAV_ITEMS.map((item) =>

          // Si l'item a des enfants → Accordion dépliable
          item.children ? (
            <Accordion key={item.label} type="single" collapsible>
              <AccordionItem value={item.label} className="border-none">

                {/* Le titre cliquable qui déplie/replie */}
                <AccordionTrigger className="px-3 py-2 text-sm rounded-md
                                             hover:bg-accent hover:no-underline
                                             text-muted-foreground">
                  {item.label}
                </AccordionTrigger>

                {/* Les sous-liens qui apparaissent quand on déplie */}
                <AccordionContent className="pb-0">
                  <div className="flex flex-col pl-3 border-l ml-3 gap-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        href={child.href}
                        onClick={onClose}  /* ferme le menu au clic */
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </AccordionContent>

              </AccordionItem>
            </Accordion>

          ) : (
            // Lien simple → NavLink avec fermeture du menu au clic
            <NavLink
              key={item.label}
              href={item.href}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      {/* Pied du tiroir — liens secondaires */}
      <div className="border-t px-4 py-4 flex flex-col gap-2">
        <a href="/compte"
           className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Mon compte
        </a>
        <a href="/commandes"
           className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Mes commandes
        </a>
      </div>

    </div>
  )
}