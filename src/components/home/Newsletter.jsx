import { Mail } from "lucide-react"
import "./Newsletter.css"

export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="newsletter__content">

        {/* Titre */}
        <h2 className="newsletter__title">
          Sign Up for the <strong>NEWSLETTER</strong>
        </h2>

        {/* Formulaire */}
        <div className="newsletter__form">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="newsletter__input"
          />
          <button className="newsletter__btn">
            <Mail className="h-4 w-4" />
            Subscribe
          </button>
        </div>

        {/* Réseaux sociaux */}
        <div className="newsletter__socials">
          <a href="#" className="newsletter__social" aria-label="Facebook">f</a>
          <a href="#" className="newsletter__social" aria-label="Twitter">t</a>
          <a href="#" className="newsletter__social" aria-label="Instagram">in</a>
          <a href="#" className="newsletter__social" aria-label="Pinterest">p</a>
        </div>

      </div>
    </section>
  )
}