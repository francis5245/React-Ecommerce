import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, ShoppingBag, Package, Tag, Truck } from "lucide-react"
import { toast } from "sonner"
import "./Login.css"

// Icône Google
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  )
}

// Icône GitHub
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "", remember: false })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      toast.error("Veuillez remplir tous les champs")
      return
    }
    setLoading(true)
    // Simule un appel API
    setTimeout(() => {
      setLoading(false)
      toast.success("Connexion réussie !")
      navigate("/compte")
    }, 1500)
  }

  const handleSocial = (provider) => {
    toast.info(`Connexion avec ${provider} — disponible avec le backend`)
  }

  return (
    <div className="auth">

      {/* GAUCHE — Visuel */}
      <div className="auth__left">
        <a href="/" className="auth__logo">
          SHOOP<span>.</span>
        </a>
        <p className="auth__tagline">
          Votre destination shopping en ligne, simple et rapide.
        </p>

        <div className="auth__features">
          <div className="auth__feature">
            <div className="auth__feature-icon">
              <Package className="h-4 w-4" />
            </div>
            Suivi de commandes en temps réel
          </div>
          <div className="auth__feature">
            <div className="auth__feature-icon">
              <Tag className="h-4 w-4" />
            </div>
            Offres et promotions exclusives
          </div>
          <div className="auth__feature">
            <div className="auth__feature-icon">
              <Truck className="h-4 w-4" />
            </div>
            Livraison gratuite dès 500$
          </div>
        </div>
      </div>

      {/* DROITE — Formulaire */}
      <div className="auth__right">
        <div className="auth__form-wrap">

          <h1 className="auth__form-title">Connexion</h1>
          <p className="auth__form-subtitle">
            Pas encore de compte ?{" "}
            <Link to="/register">Créer un compte</Link>
          </p>

          {/* Boutons sociaux */}
          <div className="auth__socials">
            <button
              className="auth__social-btn"
              onClick={() => handleSocial("Google")}
            >
              <GoogleIcon />
              Google
            </button>
            <button
              className="auth__social-btn"
              onClick={() => handleSocial("GitHub")}
            >
              <GithubIcon />
              GitHub
            </button>
          </div>

          {/* Séparateur */}
          <div className="auth__divider">
            <span>ou continuer avec email</span>
          </div>

          {/* Email */}
          <div className="auth__field">
            <label className="auth__label">Email</label>
            <div className="auth__input-wrap">
              <Mail className="auth__input-icon h-4 w-4" />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jean@email.com"
                className="auth__input"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="auth__field">
            <label className="auth__label">Mot de passe</label>
            <div className="auth__input-wrap">
              <Lock className="auth__input-icon h-4 w-4" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="auth__input"
              />
              <button
                className="auth__input-toggle"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword
                  ? <EyeOff className="h-4 w-4" />
                  : <Eye className="h-4 w-4" />
                }
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="auth__options">
            <label className="auth__remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Se souvenir de moi
            </label>
            <a href="#" className="auth__forgot">Mot de passe oublié ?</a>
          </div>

          {/* Submit */}
          <button
            className="auth__submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>

          <p className="auth__cgu">
            En vous connectant, vous acceptez nos{" "}
            <a href="/terms">Conditions d'utilisation</a>{" "}
            et notre{" "}
            <a href="/privacy">Politique de confidentialité</a>.
          </p>

        </div>
      </div>
    </div>
  )
}