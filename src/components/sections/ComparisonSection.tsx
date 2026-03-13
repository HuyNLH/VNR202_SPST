import SectionTitle from '@/components/ui/SectionTitle';
import CompareTable from '@/components/ui/CompareTable';
import { comparisonData } from '@/data/comparison';
import { SECTION_IDS } from '@/lib/constants';

export default function ComparisonSection() {
  return (
    <section 
      id={SECTION_IDS.COMPARISON} 
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(251,191,36,0.03),transparent_50%)]" />
      
      <div className="standard-frame relative z-10">
        <SectionTitle
          title="Tầm vóc & Khác biệt"
          subtitle="Sự thay đổi căn bản về chất trong phong trào cách mạng Việt Nam kể từ khi có Đảng lãnh đạo."
          light
        />
        
        <div className="mt-20">
          <CompareTable data={comparisonData} />
        </div>
      </div>
    </section>
  );
}
