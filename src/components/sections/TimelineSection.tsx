import SectionTitle from '@/components/ui/SectionTitle';
import TimelineInteractive from '@/components/interactive/TimelineInteractive';
import { SECTION_IDS } from '@/lib/constants';

export default function TimelineSection() {
  return (
    <section 
      id={SECTION_IDS.TIMELINE} 
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="standard-frame relative z-10">
        <SectionTitle
          title="Dòng thời gian"
          subtitle="Từ họng súng kẻ thù đến ánh bình minh của Đảng. Một hành trình kiên thực và bất khuất của dân tộc qua từng dấu mốc lịch sử."
          light
        />
        
        <div className="mt-20">
          <TimelineInteractive />
        </div>
      </div>
    </section>
  );
}
