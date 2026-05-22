import { MapPin, Phone, Mail } from "lucide-react"
import "./Footer.css"

const CATEGORIES = [
  { label: "Hot Deals",   href: "/promotions" },
  { label: "Laptops",     href: "/categorie/laptops" },
  { label: "Smartphones", href: "/categorie/smartphones" },
  { label: "Cameras",     href: "/categorie/cameras" },
  { label: "Accessories", href: "/categorie/accessories" },
]

const INFORMATION = [
  { label: "About Us",         href: "/about" },
  { label: "Contact Us",       href: "/contact" },
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Orders & Returns", href: "/orders" },
  { label: "Terms & Conditions", href: "/terms" },
]

const SERVICE = [
  { label: "My Account",    href: "/compte" },
  { label: "View Cart",     href: "/panier" },
  { label: "Wishlist",      href: "/wishlist" },
  { label: "Track My Order", href: "/track" },
  { label: "Help",          href: "/help" },
]

export default function Footer() {
  return (
    <footer className="footer">

      {/* Section principale */}
      <div className="footer__main">

        {/* Colonne 1 — About */}
        <div>
          <h3 className="footer__col-title">About Us</h3>
          <p className="footer__about-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut.
          </p>
          <div className="footer__contact-item">
            <MapPin />
            <span>1734 Stonecoal Road</span>
          </div>
          <div className="footer__contact-item">
            <Phone />
            <span>+021-95-51-84</span>
          </div>
          <div className="footer__contact-item">
            <Mail />
            <span>email@email.com</span>
          </div>
        </div>

        {/* Colonne 2 — Categories */}
        <div>
          <h3 className="footer__col-title">Categories</h3>
          <ul className="footer__links">
            {CATEGORIES.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 — Information */}
        <div>
          <h3 className="footer__col-title">Information</h3>
          <ul className="footer__links">
            {INFORMATION.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 — Service */}
        <div>
          <h3 className="footer__col-title">Service</h3>
          <ul className="footer__links">
            {SERVICE.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Barre du bas */}
    
<div className="footer__bottom">
  <div className="footer__payments">
    {["VISA", "MC", "PAYPAL", "AMEX"].map((p) => (
      <span key={p} className="footer__payment-badge">{p}</span>
    ))}
  </div>
  <div className="footer__legal">
    <div className="footer__copyright">
      &copy; {new Date().getFullYear()} SHOOP. Tous droits réservés.
      <span className="footer__design"> Design by{" "}
        <a href="mailto:francissagbo1@gmail.com" className="footer__design-link">
          Francis SAGBO
        </a>
      </span>
    </div>
  </div>
</div>
        
    </footer>
  )
}