import { useState } from "react"
import { Link } from "react-router-dom"
import { CheckCircle, CreditCard, Truck, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { toast } from "sonner"
import "./Checkout.css"

// Validation simple
function validate(form) {
  const errors = {}
  if (!form.prenom.trim())    errors.prenom    = "Requis"
  if (!form.nom.trim())       errors.nom       = "Requis"
  if (!form.email.trim())     errors.email     = "Requis"
  if (!form.telephone.trim()) errors.telephone = "Requis"
  if (!form.adresse.trim())   errors.adresse   = "Requis"
  if (!form.ville.trim())     errors.ville     = "Requis"
  if (!form.pays.trim())      errors.pays      = "Requis"
  if (form.payment === "card") {
    if (!form.cardNumber.trim())  errors.cardNumber  = "Requis"
    if (!form.cardExpiry.trim())  errors.cardExpiry  = "Requis"
    if (!form.cardCvv.trim())     errors.cardCvv     = "Requis"
  }
  return errors
}

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart()
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "",
    adresse: "", ville: "", codePostal: "", pays: "",
    payment: "card",
    cardNumber: "", cardExpiry: "", cardCvv: "",
  })

  const shipping = subtotal > 500 ? 0 : 15
  const total = subtotal + shipping

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
  }

  const handleSubmit = () => {
    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error("Veuillez remplir tous les champs requis")
      return
    }
    setLoading(true)
    // Simule un appel API
    setTimeout(() => {
      setLoading(false)
      setConfirmed(true)
      clearCart()
      toast.success("Commande confirmée !")
    }, 2000)
  }

  // Page de confirmation
  if (confirmed) {
    return (
      <div className="checkout">
        <div className="checkout__confirmation">
          <div className="checkout__confirmation-icon">
            <CheckCircle className="h-10 w-10" style={{ color: "#4caf50" }} />
          </div>
          <h1 className="checkout__confirmation-title">
            Commande confirmée !
          </h1>
          <p className="checkout__confirmation-text">
            Merci pour votre commande. Vous recevrez un email de confirmation
            à <strong>{form.email}</strong> avec les détails de votre livraison.
          </p>
          <Link to="/" className="checkout__confirmation-btn">
            <ShoppingBag className="h-4 w-4" />
            Continuer mes achats
          </Link>
        </div>
      </div>
    )
  }

  // Panier vide
  if (cart.length === 0) {
    return (
      <div className="checkout">
        <div className="checkout__confirmation">
          <div className="checkout__confirmation-icon">
            <ShoppingBag className="h-10 w-10" style={{ color: "#e53935" }} />
          </div>
          <h1 className="checkout__confirmation-title">Panier vide</h1>
          <p className="checkout__confirmation-text">
            Vous n'avez aucun produit dans votre panier.
          </p>
          <Link to="/" className="checkout__confirmation-btn">
            Découvrir nos produits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Finaliser la commande</h1>

      <div className="checkout__layout">

        {/* Formulaires */}
        <div>

          {/* Section 1 — Livraison */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__section-number">1</span>
              <Truck className="h-4 w-4" />
              Informations de livraison
            </h2>

            <div className="checkout__grid-2">
              <div className="checkout__field">
                <label className="checkout__label">Prénom *</label>
                <input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  className={`checkout__input ${errors.prenom ? "error" : ""}`}
                  placeholder="Jean"
                />
                {errors.prenom && <span className="checkout__error">{errors.prenom}</span>}
              </div>

              <div className="checkout__field">
                <label className="checkout__label">Nom *</label>
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  className={`checkout__input ${errors.nom ? "error" : ""}`}
                  placeholder="Dupont"
                />
                {errors.nom && <span className="checkout__error">{errors.nom}</span>}
              </div>

              <div className="checkout__field">
                <label className="checkout__label">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`checkout__input ${errors.email ? "error" : ""}`}
                  placeholder="jean@email.com"
                />
                {errors.email && <span className="checkout__error">{errors.email}</span>}
              </div>

              <div className="checkout__field">
                <label className="checkout__label">Téléphone *</label>
                <input
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  className={`checkout__input ${errors.telephone ? "error" : ""}`}
                  placeholder="+221 00 00 00 00"
                />
                {errors.telephone && <span className="checkout__error">{errors.telephone}</span>}
              </div>

              <div className="checkout__field checkout__field--full">
                <label className="checkout__label">Adresse *</label>
                <input
                  name="adresse"
                  value={form.adresse}
                  onChange={handleChange}
                  className={`checkout__input ${errors.adresse ? "error" : ""}`}
                  placeholder="17 Rue Somewhere"
                />
                {errors.adresse && <span className="checkout__error">{errors.adresse}</span>}
              </div>

              <div className="checkout__field">
                <label className="checkout__label">Ville *</label>
                <input
                  name="ville"
                  value={form.ville}
                  onChange={handleChange}
                  className={`checkout__input ${errors.ville ? "error" : ""}`}
                  placeholder="Dakar"
                />
                {errors.ville && <span className="checkout__error">{errors.ville}</span>}
              </div>

              <div className="checkout__field">
                <label className="checkout__label">Code Postal</label>
                <input
                  name="codePostal"
                  value={form.codePostal}
                  onChange={handleChange}
                  className="checkout__input"
                  placeholder="10000"
                />
              </div>

              <div className="checkout__field checkout__field--full">
                <label className="checkout__label">Pays *</label>
                <select
                  name="pays"
                  value={form.pays}
                  onChange={handleChange}
                  className={`checkout__select ${errors.pays ? "error" : ""}`}
                >
                  <option value="">Sélectionner un pays</option>
                  <option value="SN">Sénégal</option>
                  <option value="BJ">Bénin</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="ML">Mali</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="TG">Togo</option>
                  <option value="GH">Ghana</option>
                  <option value="NG">Nigeria</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                </select>
                {errors.pays && <span className="checkout__error">{errors.pays}</span>}
              </div>
            </div>
          </div>

          {/* Section 2 — Paiement */}
          <div className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__section-number">2</span>
              <CreditCard className="h-4 w-4" />
              Mode de paiement
            </h2>

            <div className="checkout__payment-methods">

              {/* Carte bancaire */}
              <div
                className={`checkout__payment-option ${form.payment === "card" ? "active" : ""}`}
                onClick={() => setForm((p) => ({ ...p, payment: "card" }))}
              >
                <input type="radio" readOnly checked={form.payment === "card"} />
                <span className="checkout__payment-label">Carte bancaire</span>
                <div className="checkout__payment-icons">
                  {["VISA", "MC", "AMEX"].map((b) => (
                    <span key={b} className="checkout__payment-badge">{b}</span>
                  ))}
                </div>
              </div>

              {/* Champs carte */}
              {form.payment === "card" && (
                <div className="checkout__card-fields">
                  <div className="checkout__field">
                    <label className="checkout__label">Numéro de carte *</label>
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      className={`checkout__input ${errors.cardNumber ? "error" : ""}`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.cardNumber && <span className="checkout__error">{errors.cardNumber}</span>}
                  </div>
                  <div className="checkout__grid-2">
                    <div className="checkout__field">
                      <label className="checkout__label">Date d'expiration *</label>
                      <input
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        className={`checkout__input ${errors.cardExpiry ? "error" : ""}`}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                      {errors.cardExpiry && <span className="checkout__error">{errors.cardExpiry}</span>}
                    </div>
                    <div className="checkout__field">
                      <label className="checkout__label">CVV *</label>
                      <input
                        name="cardCvv"
                        value={form.cardCvv}
                        onChange={handleChange}
                        className={`checkout__input ${errors.cardCvv ? "error" : ""}`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cardCvv && <span className="checkout__error">{errors.cardCvv}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal */}
              <div
                className={`checkout__payment-option ${form.payment === "paypal" ? "active" : ""}`}
                onClick={() => setForm((p) => ({ ...p, payment: "paypal" }))}
              >
                <input type="radio" readOnly checked={form.payment === "paypal"} />
                <span className="checkout__payment-label">PayPal</span>
                <span className="checkout__payment-badge">PAYPAL</span>
              </div>

              {/* Paiement à la livraison */}
              <div
                className={`checkout__payment-option ${form.payment === "cash" ? "active" : ""}`}
                onClick={() => setForm((p) => ({ ...p, payment: "cash" }))}
              >
                <input type="radio" readOnly checked={form.payment === "cash"} />
                <span className="checkout__payment-label">Paiement à la livraison</span>
              </div>

            </div>
          </div>
        </div>

        {/* Résumé commande */}
        <div className="checkout__summary">
          <h2 className="checkout__summary-title">Résumé</h2>

          {/* Liste produits */}
          {cart.map((item) => (
            <div key={item.id} className="checkout__summary-item">
              <img
                src={item.image}
                alt={item.name}
                className="checkout__summary-img"
              />
              <div className="checkout__summary-info">
                <p className="checkout__summary-name">{item.name}</p>
                <p className="checkout__summary-qty">x{item.qty}</p>
              </div>
              <span className="checkout__summary-price">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}

          <hr className="checkout__summary-divider" />

          <div className="checkout__summary-row">
            <span>Sous-total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout__summary-row">
            <span>Livraison</span>
            <span>{shipping === 0 ? "Gratuit 🎉" : `$${shipping}.00`}</span>
          </div>
          <div className="checkout__summary-row checkout__summary-row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="checkout__submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Traitement en cours..." : "Confirmer la commande"}
          </button>

        </div>
      </div>
    </div>
  )
}