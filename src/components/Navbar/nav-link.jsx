import { Link, useLocation } from "react-router-dom"

// cn() fusionne les classes Tailwind proprement
// Ce fichier a été créé automatiquement par shadcn lors du init
import { cn } from "@/lib/utils"

export default function NavLink({ href, children }) {

  // useLocation() te donne l'URL actuelle du navigateur
  const { pathname } = useLocation()

  // On compare l'URL actuelle avec le href du lien
  // Si c'est la même page → le lien est "actif"
  const isActive = pathname === href

  return (
    <Link
      to={href}
      className={cn(
        // Classes de base — appliquées sur tous les liens
        "px-3 py-2 rounded-md text-sm transition-colors",

        // Lien inactif → gris, devient foncé au survol
        "text-muted-foreground hover:text-foreground hover:bg-accent",

        // Lien actif → texte foncé et fond légèrement coloré
        isActive && "text-foreground bg-accent font-medium"
      )}
    >
      {children}
    </Link>
  )
}