import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import PrePartyMovementsSection from '@/components/sections/PrePartyMovementsSection';
import TimelineSection from '@/components/sections/TimelineSection';
import PartyBirthSection from '@/components/sections/PartyBirthSection';
import PlatformSection from '@/components/sections/PlatformSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import QuizSection from '@/components/sections/QuizSection';
import ConclusionSection from '@/components/sections/ConclusionSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <PrePartyMovementsSection />
      <TimelineSection />
      <PartyBirthSection />
      <PlatformSection />
      <ComparisonSection />
      <QuizSection />
      <ConclusionSection />
    </>
  );
}
