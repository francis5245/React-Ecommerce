import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import "./HeroBanner.css"

// Les données des slides — à modifier selon tes vrais produits
const SLIDES = [
  {
    id: 1,
    label: "Nouveauté",
    title: "Laptop\nCollection",
    href: "/categorie/laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  },
  {
    id: 2,
    label: "Tendance",
    title: "Accessories\nCollection",
    href: "/categorie/accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 3,
    label: "Découvrez",
    title: "Cameras\nCollection",
    href: "/categorie/cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
  },
]

export default function HeroBanner() {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)

  // Défilement automatique toutes les 4 secondes
  useEffect(() => {
    if (!api) return
    const timer = setInterval(() => {
      api.scrollNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [api])

  // Suivre le slide actif pour les dots
  useEffect(() => {
    if (!api) return
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="hero">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {SLIDES.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="hero__slide">

                {/* Texte */}
                <div className="hero__content">
                  <span className="hero__label">{slide.label}</span>
                  <h2 className="hero__title">
                    {/* \n devient un vrai saut de ligne */}
                    {slide.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </h2>
                  <a href={slide.href} className="hero__btn">
                    SHOP NOW <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {/* Image */}
                <div className="hero__image">
                  <img src={slide.image} alt={slide.title} />
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots de navigation */}
      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? "active" : ""}`}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}