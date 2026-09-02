import HomeHero from '../components/home/HomeHero'
import StatementSection from '../components/home/StatementSection'
import PracticeLoop from '../components/home/PracticeLoop'
import FutureSection from '../components/home/FutureSection'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <main>
      <HomeHero />
      <StatementSection />
      <PracticeLoop />
      <FutureSection />
      <Footer />
    </main>
  )
}
