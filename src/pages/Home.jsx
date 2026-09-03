import HomeHero from '../components/home/HomeHero'
import StatementSection from '../components/home/StatementSection'
import FeaturesSection from '../components/home/FeaturesSection'
import PracticeLoop from '../components/home/PracticeLoop'
import HowItWorksSection from '../components/home/HowItWorksSection'
import InterviewPrepSection from '../components/home/InterviewPrepSection'
import PricingSection from '../components/home/PricingSection'
import ResourcesSection from '../components/home/ResourcesSection'
import FutureSection from '../components/home/FutureSection'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <main>
      <HomeHero />
      <StatementSection />
      <FeaturesSection />
      <PracticeLoop />
      <HowItWorksSection />
      <InterviewPrepSection />
      <PricingSection />
      <ResourcesSection />
      <FutureSection />
      <Footer />
    </main>
  )
}
