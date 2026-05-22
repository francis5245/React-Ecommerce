import HeroBanner from "@/components/home/HeroBanner"
import NewProducts from "@/components/home/NewProducts"
import HotDeal from "@/components/home/HotDeal"
import TopSelling from "@/components/home/TopSelling"
import Newsletter from "@/components/home/Newsletter"

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <NewProducts />
      <HotDeal />
      <TopSelling />
      <Newsletter />
    </main>
  )
}