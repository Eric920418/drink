import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Products } from '@/components/Products'
import { Events } from '@/components/Events'
import { Franchise } from '@/components/Franchise'
import { Stores } from '@/components/Stores'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="bg-silk-white">
      <Navigation />
      <Hero />
      <About />
      <Products />
      <Events />
      <Franchise />
      <Stores />
      <Contact />
      <Footer />
    </main>
  )
}
