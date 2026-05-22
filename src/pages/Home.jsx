import HeroBanner from "@/components/home/HeroBanner"
import NewProducts from "@/components/home/NewProducts"
import HotDeal from "@/components/home/HotDeal"

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <NewProducts />
      <HotDeal />
    </main>
  )
}