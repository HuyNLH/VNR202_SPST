import SectionTitle from '@/components/ui/SectionTitle';
import PlatformAccordion from '@/components/interactive/PlatformAccordion';
import { SECTION_IDS } from '@/lib/constants';

export default function PlatformSection() {
  return (
    <section 
      id={SECTION_IDS.PLATFORM} 
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="standard-frame relative z-10 flex flex-col items-center">
        <SectionTitle
          title="Cương lĩnh đầu tiên"
          subtitle="Nền tảng tư tưởng và kim chỉ nam hành động của Đảng Cộng sản Việt Nam từ những ngày đầu sôi nổi."
          light
        />

        <div className="mt-20">
          <PlatformAccordion />
        </div>

        <div className="mt-24 glass-card rounded-[2.5rem] p-10 md:p-14 border-red-600/10 bg-red-600/[0.02] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <p className="text-xl text-stone-300 leading-relaxed max-w-2xl mx-auto font-sans font-light italic">
            "Cương lĩnh chính trị đầu tiên là văn kiện phản ánh sự vận dụng sáng tạo chủ nghĩa Mác – Lênin, 
            là nền tảng cho mọi thắng lợi của cách mạng Việt Nam."
          </p>
        </div>
      </div>
    </section>
  );
}
