import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react"
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

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "",
    telephone: "", password: "", confirm: "", cgu: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = () => {
    if (!form.prenom || !form.nom || !form.email || !form.password || !form.confirm) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }
    if (form.password !== form.confirm) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }
    if (form.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères")
      return
    }
    if (!form.cgu) {
      toast.error("Veuillez accepter les conditions d'utilisation")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Compte créé avec succès !")
      navigate("/compte")
    }, 1500)
  }

  const handleSocial = (provider) => {
    toast.info(`Inscription avec ${provider} — disponible avec le backend`)
  }

  return (
    <div className="auth">

      {/* GAUCHE — Visuel */}
      <div className="auth__left">
        <a href="/" className="auth__logo">
          SHOOP<span>.</span>
        </a>
        <p className="auth__tagline">
          Rejoignez des milliers de clients satisfaits et profitez de nos offres exclusives.
        </p>

        {/* Stats */}
        <div className="auth__features" style={{ marginTop: 48 }}>
          <div className="auth__feature">
            <div className="auth__feature-icon" style={{ fontSize: 16, fontWeight: 800, width: 32, height: 32 }}>
              🛍️
            </div>
            +10 000 produits disponibles
          </div>
          <div className="auth__feature">
            <div className="auth__feature-icon" style={{ fontSize: 16, fontWeight: 800, width: 32, height: 32 }}>
              ⭐
            </div>
            4.8/5 — Note moyenne clients
          </div>
          <div className="auth__feature">
            <div className="auth__feature-icon" style={{ fontSize: 16, fontWeight: 800, width: 32, height: 32 }}>
              🔒
            </div>
            Paiement 100% sécurisé
          </div>
        </div>
      </div>

      {/* DROITE — Formulaire */}
      <div className="auth__right">
        <div className="auth__form-wrap">

          <h1 className="auth__form-title">Créer un compte</h1>
          <p className="auth__form-subtitle">
            Déjà inscrit ?{" "}
            <Link to="/login">Se connecter</Link>
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
            <span>ou s'inscrire avec email</span>
          </div>

          {/* Prénom + Nom */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="auth__field">
              <label className="auth__label">Prénom *</label>
              <div className="auth__input-wrap">
                <User className="auth__input-icon h-4 w-4" />
                <input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  placeholder="Jean"
                  className="auth__input"
                />
              </div>
            </div>
            <div className="auth__field">
              <label className="auth__label">Nom *</label>
              <div className="auth__input-wrap">
                <User className="auth__input-icon h-4 w-4" />
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Dupont"
                  className="auth__input"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="auth__field">
            <label className="auth__label">Email *</label>
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

          {/* Téléphone */}
          <div className="auth__field">
            <label className="auth__label">Téléphone</label>
            <div className="auth__input-wrap">
              <Phone className="auth__input-icon h-4 w-4" />
              <input
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                placeholder="+229 00 00 00 00"
                className="auth__input"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="auth__field">
            <label className="auth__label">Mot de passe *</label>
            <div className="auth__input-wrap">
              <Lock className="auth__input-icon h-4 w-4" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 caractères"
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

          {/* Confirmer mot de passe */}
          <div className="auth__field">
            <label className="auth__label">Confirmer le mot de passe *</label>
            <div className="auth__input-wrap">
              <Lock className="auth__input-icon h-4 w-4" />
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                value={form.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                className="auth__input"
              />
              <button
                className="auth__input-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                type="button"
              >
                {showConfirm
                  ? <EyeOff className="h-4 w-4" />
                  : <Eye className="h-4 w-4" />
                }
              </button>
            </div>
          </div>

          {/* CGU */}
          <div style={{ marginBottom: 20 }}>
            <label className="auth__remember" style={{ alignItems: "flex-start", gap: 8 }}>
              <input
                type="checkbox"
                name="cgu"
                checked={form.cgu}
                onChange={handleChange}
                style={{ marginTop: 2 }}
              />
              <span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>
                J'accepte les{" "}
                <a href="/terms" style={{ color: "#e53935", textDecoration: "none" }}>
                  Conditions d'utilisation
                </a>
                {" "}et la{" "}
                <a href="/privacy" style={{ color: "#e53935", textDecoration: "none" }}>
                  Politique de confidentialité
                </a>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            className="auth__submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>

        </div>
      </div>
    </div>
  )
}