import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import NavLink from "./nav-link"

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
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

export default function MobileNav({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-[#1a1a2e]">

      {/* Logo en haut du tiroir */}
      <div className="px-4 py-5 border-b border-white/10">
        <a href="/" className="text-2xl font-black text-white tracking-wide">
          SHOOP<span className="text-[#e53935]">.</span>
        </a>
      </div>

      {/* Liste des liens */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <Accordion key={item.label} type="single" collapsible>
              <AccordionItem value={item.label} className="border-none">
                <AccordionTrigger className="px-3 py-2 text-sm rounded-md
                                             hover:bg-white/10 hover:no-underline
                                             text-white/80">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="flex flex-col pl-3 border-l border-white/20 ml-3 gap-1">
                    {item.children.map((child) => (
                      <NavLink key={child.label} href={child.href} onClick={onClose}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavLink key={item.label} href={item.href} onClick={onClose}>
              {item.label}
            </NavLink>
          )
        )}
      </nav>

      {/* Pied du tiroir */}
      <div className="border-t border-white/10 px-4 py-4 flex flex-col gap-2">
        <a href="/compte" className="text-sm text-white/60 hover:text-white transition-colors">
          Mon compte
        </a>
        <a href="/commandes" className="text-sm text-white/60 hover:text-white transition-colors">
          Mes commandes
        </a>
      </div>

    </div>
  )
}