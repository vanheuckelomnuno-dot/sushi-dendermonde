import { HeroSection } from '@/components/home/HeroSection'
import { FeatureStrip } from '@/components/home/FeatureStrip'
import { PopulaireGerechten } from '@/components/home/PopulaireGerechten'
import { GalerieSection } from '@/components/home/GalerieSection'
import { RestaurantSection } from '@/components/home/RestaurantSection'
import { CtaBanner } from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <PopulaireGerechten />
      <GalerieSection />
      <RestaurantSection />
      <CtaBanner />
    </>
  )
}
