'use client';

import * as motion from 'motion/react-client';
import SectionTitle from '@/components/ui/SectionTitle';
import { SECTION_IDS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const outcomes = [
  {
    icon: '📜',
    title: 'Chánh cương vắn tắt',
    desc: 'Xác định đường lối chiến lược: làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản.',
  },
  {
    icon: '📋',
    title: 'Sách lược vắn tắt',
    desc: 'Xác định sách lược của Đảng: lôi kéo đại bộ phận nhân dân, liên lạc với các phong trào cách mạng thế giới.',
  },
  {
    icon: '📝',
    title: 'Chương trình tóm tắt',
    desc: 'Đề ra các nhiệm vụ cụ thể trước mắt về chính trị, kinh tế, xã hội nhằm giải phóng dân tộc và cải thiện đời sống nhân dân.',
  },
  {
    icon: '⚖️',
    title: 'Điều lệ vắn tắt',
    desc: 'Quy định nguyên tắc tổ chức, kỷ luật và hoạt động của Đảng nhằm đảm bảo sự thống nhất và sức chiến đấu.',
  },
];

export default function PartyBirthSection() {
  return (
    <section id={SECTION_IDS.BIRTH} className="py-20 md:py-28 bg-gradient-to-br from-stone-900 via-red-950 to-stone-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
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
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/10 mb-12 max-w-3xl mx-auto"
        >
          <p className="text-stone-300 leading-relaxed text-center">
            Trước yêu cầu cấp bách phải thống nhất phong trào cộng sản,{' '}
            <strong className="text-amber-300">Nguyễn Ái Quốc</strong> đã chủ trì Hội nghị hợp nhất
            tại Cửu Long (Hương Cảng, Trung Quốc), thống nhất ba tổ chức cộng sản thành{' '}
            <strong className="text-white">Đảng Cộng sản Việt Nam</strong>. Hội nghị thông qua
            các văn kiện quan trọng, hình thành <strong className="text-amber-300">Cương lĩnh chính trị đầu tiên</strong> của Đảng.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {outcomes.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/10 hover:border-amber-400/30 transition-colors"
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h4 className="font-heading text-base font-semibold text-stone-100 mb-2">{item.title}</h4>
              <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
