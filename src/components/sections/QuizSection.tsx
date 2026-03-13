import SectionTitle from '@/components/ui/SectionTitle';
import QuizClient from '@/components/interactive/QuizClient';
import { SECTION_IDS } from '@/lib/constants';

export default function QuizSection() {
  return (
    <section 
      id={SECTION_IDS.QUIZ} 
      className="py-32 md:py-48 bg-obsidian relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-0 w-full h-[600px] bg-gradient-to-r from-red-600/5 to-transparent -translate-y-1/2 -skew-y-3 pointer-events-none" />
      
      <div className="standard-frame relative z-10 flex flex-col items-center">
        <SectionTitle
          title="Thử thách tri thức"
          subtitle="Khẳng định kiến thức của bạn. Trả lời 5 câu hỏi trắc nghiệm để kiểm tra sự nắm bắt về bước ngoặt 1930."
          light
        />
        
        <div className="mt-16">
          <QuizClient />
        </div>
      </div>
    </section>
  );
}
