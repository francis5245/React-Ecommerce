import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  {
    label: "Catégories",
    href: "#",
    children: [
      { label: "Laptops", href: "/categorie/laptops" },
      { label: "Smartphones", href: "/categorie/smartphones" },
      { label: "Cameras", href: "/categorie/cameras" },
      { label: "Accessories", href: "/categorie/accessories" },
    ],
  },
  { label: "Promotions", href: "/promotions" },
  { label: "Nouveautés", href: "/nouveautes" },
  { label: "Contact", href: "/contact" },
];

function MobileNavLink({ href, children, onClick }) {
  const { pathname } = useLocation();
  const isActive = pathname === href;

  return (
    <Link
      to={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "12px 20px",
        fontSize: "14px",
        fontWeight: isActive ? "700" : "500",
        color: isActive ? "#e53935" : "rgba(255,255,255,0.85)",
        borderLeft: isActive ? "3px solid #e53935" : "3px solid transparent",
        textDecoration: "none",
        transition: "all 0.2s",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </Link>
  );
}

export default function MobileNav({ onClose }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#1a1a2e",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <a
          href="/"
          style={{
            fontSize: "24px",
            fontWeight: "900",
            color: "white",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}
        >
          SHOOP<span style={{ color: "#e53935" }}>.</span>
        </a>
      </div>

      {/* Liens */}
      <nav style={{ flex: 1, overflowY: "auto", paddingTop: "8px" }}>
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <Accordion key={item.label} type="single" collapsible>
              <AccordionItem value={item.label} style={{ border: "none" }}>
                <AccordionTrigger
                  style={{
                    padding: "12px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.85)",
                    borderLeft: "3px solid transparent",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </AccordionTrigger>
                <AccordionContent style={{ paddingBottom: 0 }}>
                  <div
                    style={{
                      borderLeft: "2px solid rgba(229,57,53,0.4)",
                      marginLeft: "20px",
                    }}
                  >
                    {item.children.map((child) => (
                      <MobileNavLink
                        key={child.label}
                        href={child.href}
                        onClick={onClose}
                      >
                        {child.label}
                      </MobileNavLink>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <MobileNavLink key={item.label} href={item.href} onClick={onClose}>
              {item.label}
            </MobileNavLink>
          ),
        )}
      </nav>

      {/* Pied */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <a
          href="/compte"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
          }}
        >
          Mon compte
        </a>
        <a
          href="/commandes"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
          }}
        >
          Mes commandes
        </a>
      </div>
    </div>
  );
}
