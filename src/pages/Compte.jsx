import { useState } from "react"
import { Link } from "react-router-dom"
import {
  User, Package, Heart, MapPin, LogOut, Plus
} from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import { toast } from "sonner"
import "./Compte.css"

// Données fictives — viendront du backend plus tard
const FAKE_USER = {
  prenom: "Francis",
  nom: "SAGBO",
  email: "francissagbo1@gmail.com",
  telephone: "+229 00 00 00 00",
}

const FAKE_ORDERS = [
  {
    id: "CMD-2025-001",
    date: "12 Jan 2025",
    status: "livre",
    statusLabel: "Livré",
    items: [
      { name: "ProBook X500", qty: 1, price: 980, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&q=80" },
      { name: "SoundPro Headphones", qty: 2, price: 120, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" },
    ],
    total: 1220,
  },
  {
    id: "CMD-2025-002",
    date: "28 Jan 2025",
    status: "transit",
    statusLabel: "En transit",
    items: [
      { name: "Galaxy Phone X", qty: 1, price: 699, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80" },
    ],
    total: 699,
  },
  {
    id: "CMD-2025-003",
    date: "05 Fév 2025",
    status: "traitement",
    statusLabel: "En traitement",
    items: [
      { name: "ProCam 4K", qty: 1, price: 1200, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&q=80" },
    ],
    total: 1200,
  },
]

const FAKE_ADDRESSES = [
  {
    id: 1,
    name: "Domicile",
    text: "17 Rue Somewhere\nCotonou, 00100\nBénin",
    default: true,
  },
  {
    id: 2,
    name: "Bureau",
    text: "123 Avenue Industrielle\nAbomey-Calavi\nBénin",
    default: false,
  },
]

const NAV_ITEMS = [
  { id: "infos",     label: "Informations",   icon: User },
  { id: "commandes", label: "Mes commandes",  icon: Package },
  { id: "wishlist",  label: "Mes favoris",    icon: Heart },
  { id: "adresses",  label: "Mes adresses",   icon: MapPin },
]

export default function Compte() {
  const [activeTab, setActiveTab] = useState("infos")
  const [form, setForm] = useState(FAKE_USER)
  const { wishlist } = useWishlist()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = () => {
    toast.success("Informations mises à jour !")
  }

  const initials = `${form.prenom[0]}${form.nom[0]}`.toUpperCase()

  return (
    <div className="compte">
      <h1 className="compte__title">Mon Compte</h1>

      <div className="compte__layout">

        {/* SIDEBAR */}
        <aside className="compte__sidebar">
          <div className="compte__sidebar-header">
            <div className="compte__avatar">{initials}</div>
            <p className="compte__sidebar-name">{form.prenom} {form.nom}</p>
            <p className="compte__sidebar-email">{form.email}</p>
          </div>

          <nav className="compte__sidebar-nav">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className={`compte__nav-item ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
            <Link
              to="/"
              className="compte__nav-item compte__logout"
              style={{ textDecoration: "none" }}
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Link>
          </nav>
        </aside>

        {/* CONTENU */}
        <div className="compte__content">

          {/* ── INFOS PERSONNELLES ── */}
          {activeTab === "infos" && (
            <>
              <h2 className="compte__section-title">
                <User className="h-4 w-4" />
                Informations personnelles
              </h2>
              <div className="compte__form">
                <div className="compte__field">
                  <label className="compte__label">Prénom</label>
                  <input
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    className="compte__input"
                  />
                </div>
                <div className="compte__field">
                  <label className="compte__label">Nom</label>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="compte__input"
                  />
                </div>
                <div className="compte__field">
                  <label className="compte__label">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="compte__input"
                  />
                </div>
                <div className="compte__field">
                  <label className="compte__label">Téléphone</label>
                  <input
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className="compte__input"
                  />
                </div>
                <div className="compte__field compte__field--full">
                  <label className="compte__label">Nouveau mot de passe</label>
                  <input
                    type="password"
                    placeholder="Laisser vide pour ne pas changer"
                    className="compte__input"
                  />
                </div>
                <div className="compte__field compte__field--full">
                  <label className="compte__label">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    placeholder="Confirmer le nouveau mot de passe"
                    className="compte__input"
                  />
                </div>
                <button className="compte__save-btn" onClick={handleSave}>
                  Sauvegarder les modifications
                </button>
              </div>
            </>
          )}

          {/* ── COMMANDES ── */}
          {activeTab === "commandes" && (
            <>
              <h2 className="compte__section-title">
                <Package className="h-4 w-4" />
                Mes commandes
              </h2>
              <div className="compte__orders">
                {FAKE_ORDERS.length === 0 ? (
                  <div className="compte__empty">
                    <div className="compte__empty-icon">📦</div>
                    <p className="compte__empty-text">Aucune commande pour l'instant</p>
                  </div>
                ) : (
                  FAKE_ORDERS.map((order) => (
                    <div key={order.id} className="compte__order-card">
                      <div className="compte__order-header">
                        <span className="compte__order-id">{order.id}</span>
                        <span className="compte__order-date">{order.date}</span>
                        <span className={`compte__order-status compte__order-status--${order.status}`}>
                          {order.statusLabel}
                        </span>
                      </div>
                      <div className="compte__order-items">
                        {order.items.map((item, i) => (
                          <div key={i} className="compte__order-item">
                            <img src={item.image} alt={item.name} />
                            <span>{item.name} × {item.qty}</span>
                            <span style={{ marginLeft: "auto", color: "#e53935", fontWeight: 700 }}>
                              ${item.price}.00
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="compte__order-total">
                        Total : ${order.total}.00
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* ── WISHLIST ── */}
          {activeTab === "wishlist" && (
            <>
              <h2 className="compte__section-title">
                <Heart className="h-4 w-4" />
                Mes favoris ({wishlist.length})
              </h2>
              {wishlist.length === 0 ? (
                <div className="compte__empty">
                  <div className="compte__empty-icon">🤍</div>
                  <p className="compte__empty-text">Aucun favori pour l'instant</p>
                </div>
              ) : (
                <div className="compte__wishlist">
                  {wishlist.map((item) => (
                    <Link
                      key={item.id}
                      to={`/produit/${item.id}`}
                      className="compte__wishlist-item"
                      style={{ textDecoration: "none" }}
                    >
                      <img src={item.image} alt={item.name} />
                      <p className="compte__wishlist-name">{item.name}</p>
                      <p className="compte__wishlist-price">${item.price}.00</p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── ADRESSES ── */}
          {activeTab === "adresses" && (
            <>
              <h2 className="compte__section-title">
                <MapPin className="h-4 w-4" />
                Mes adresses
              </h2>
              <div className="compte__addresses">
                {FAKE_ADDRESSES.map((addr) => (
                  <div
                    key={addr.id}
                    className={`compte__address-card ${addr.default ? "default" : ""}`}
                  >
                    {addr.default && (
                      <span className="compte__address-badge">Par défaut</span>
                    )}
                    <p className="compte__address-name">{addr.name}</p>
                    <p className="compte__address-text">
                      {addr.text.split("\n").map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                ))}
                <button
                  className="compte__address-add"
                  onClick={() => toast.info("Fonctionnalité disponible avec le backend")}
                >
                  <Plus className="h-5 w-5" />
                  Ajouter une adresse
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}