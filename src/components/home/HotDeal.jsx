import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import "./HotDeal.css"

// Date cible — dans 2 jours à partir d'aujourd'hui
const TARGET = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 })
        return
      }
      setTimeLeft({
        days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins:  Math.floor((diff / (1000 * 60)) % 60),
        secs:  Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [target])

  return timeLeft
}

export default function HotDeal() {
  const { days, hours, mins, secs } = useCountdown(TARGET)

  const units = [
    { value: days,  label: "Days" },
    { value: hours, label: "Hours" },
    { value: mins,  label: "Mins" },
    { value: secs,  label: "Secs" },
  ]

  return (
    <section className="hotdeal">
      <div className="hotdeal__container">

        {/* Image gauche */}
        <div className="hotdeal__image">
          <img
            src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80"
            alt="Hot deal produit"
          />
        </div>

        {/* Contenu central */}
        <div className="hotdeal__content">

          {/* Countdown */}
          <div className="hotdeal__countdown">
            {units.map((u) => (
              <div key={u.label} className="hotdeal__unit">
                <span className="hotdeal__number">
                  {String(u.value ?? 0).padStart(2, "0")}
                </span>
                <span className="hotdeal__label">{u.label}</span>
              </div>
            ))}
          </div>

          {/* Texte */}
          <h2 className="hotdeal__title">
            Hot Deal This Week
          </h2>
          <p className="hotdeal__subtitle">
            New Collection Up To 50% Off
          </p>

          {/* Bouton */}
          <a href="/promotions" className="hotdeal__btn">
            Shop Now <ArrowRight className="h-4 w-4" />
          </a>

        </div>

        {/* Image droite */}
        <div className="hotdeal__image hotdeal__image--right">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
            alt="Hot deal produit 2"
          />
        </div>

      </div>
    </section>
  )
}