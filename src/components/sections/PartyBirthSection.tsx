import * as motion from 'motion/react-client';
import SectionTitle from '@/components/ui/SectionTitle';
import { SECTION_IDS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ScrollText, ShieldCheck, ClipboardList, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

const outcomes = [
  {
    icon: <ScrollText className="w-6 h-6" />,
    title: 'Chánh cương vắn tắt',
    desc: 'Xác định đường lối chiến lược: làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản.',
    color: 'amber'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Sách lược vắn tắt',
    desc: 'Đề ra phương hướng tập hợp lực lượng cách mạng, phát huy vai trò lãnh đạo của Đảng và xây dựng khối đoàn kết rộng rãi để giành độc lập dân tộc.',
    color: 'red'
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Chương trình tóm tắt',
    desc: 'Nêu những nhiệm vụ chủ yếu trước mắt của cách mạng: đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến, làm cho nước Nam được hoàn toàn độc lập.',
    color: 'orange'
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: 'Điều lệ vắn tắt',
    desc: 'Quy định tôn chỉ, điều kiện vào Đảng và những nguyên tắc tổ chức cơ bản, làm nền tảng cho hệ thống tổ chức thống nhất của Đảng.',
    color: 'rose'
  },
];

export default function PartyBirthSection() {
  return (
    <section id={SECTION_IDS.BIRTH} className="py-32 md:py-48 bg-gradient-to-br from-stone-950 via-[#0a0505] to-stone-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="standard-frame relative z-10">
        <SectionTitle
          title="Sự ra đời của Đảng"
          subtitle="Ngày 3 tháng 2 năm 1930 – Đảng Cộng sản Việt Nam chính thức được thành lập."
          light
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10 mb-20 max-w-4xl mx-auto shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle progress glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          
          <p className="text-stone-200 leading-relaxed text-center text-lg md:text-xl font-light font-sans">
            Trước yêu cầu cấp bách phải thống nhất phong trào cộng sản,{' '}
            <strong className="text-amber-400 font-bold">Nguyễn Ái Quốc</strong> đã chủ trì Hội nghị hợp nhất
            tại Cửu Long (Hương Cảng, Trung Quốc), thống nhất ba tổ chức cộng sản thành{' '}
            <strong className="text-white font-extrabold tracking-tight">Đảng Cộng sản Việt Nam</strong>. 
            Hội nghị thông qua các văn kiện quan trọng, hình thành{' '}
            <strong className="text-amber-400 font-bold">Cương lĩnh chính trị đầu tiên</strong> của Đảng.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {outcomes.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="relative group h-full"
            >
              {/* Card Hover Glow */}
              <div className={cn(
                "absolute -inset-0.5 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl blur",
                item.color === 'amber' ? "from-amber-500/20 to-transparent" :
                item.color === 'red' ? "from-red-500/20 to-transparent" :
                item.color === 'orange' ? "from-orange-500/20 to-transparent" :
                "from-rose-500/20 to-transparent"
              )} />
              
              <div className="relative h-full bg-[#0c0c0c] backdrop-blur-sm rounded-3xl p-8 border border-white/5 group-hover:border-white/10 transition-all duration-300 flex flex-col items-start shadow-xl overflow-hidden">
                {/* Decorative Icon Background */}
                <div className={cn(
                  "absolute -top-4 -right-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
                  item.color === 'amber' ? "bg-amber-500" :
                  item.color === 'red' ? "bg-red-500" :
                  item.color === 'orange' ? "bg-orange-500" :
                  "bg-rose-500"
                )} />

                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110",
                  item.color === 'amber' ? "bg-amber-500/10 text-amber-500" :
                  item.color === 'red' ? "bg-red-500/10 text-red-500" :
                  item.color === 'orange' ? "bg-orange-500/10 text-orange-500" :
                  "bg-rose-500/10 text-rose-500"
                )}>
                  {item.icon}
                </div>
                
                <h4 className="font-heading text-lg font-bold text-white mb-3 tracking-tight group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-sm text-stone-400 leading-relaxed font-sans font-light">
                  {item.desc}
                </p>

                {/* Bottom Highlight */}
                <div className={cn(
                  "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700",
                  item.color === 'amber' ? "via-amber-500/40" :
                  item.color === 'red' ? "via-red-500/40" :
                  item.color === 'orange' ? "via-orange-500/40" :
                  "via-rose-500/40"
                )} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
