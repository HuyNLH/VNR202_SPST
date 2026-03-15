'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Database, 
  Activity, 
  Sparkles,
  Zap,
  ShieldCheck,
  MessageSquare,
  Search,
  Mic,
  ArrowRight,
  ClipboardCheck,
  Layout,
  UserCheck,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AI_TOOLS = [
  {
    icon: MessageSquare,
    name: "ChatGPT",
    role: "Hỗ trợ lên ý tưởng cấu trúc nội dung, biên soạn văn bản và xây dựng kịch bản thuyết minh.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    icon: Search,
    name: "Google Gemini",
    role: "Dùng để đối chiếu thông tin, thiết kế logo và gợi ý từ khóa tìm kiếm hình ảnh tư liệu.",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    icon: Mic,
    name: "VBee",
    role: "Tạo giọng đọc AI cho phần thuyết minh.",
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  }
];

const WORKFLOW = [
  { step: "1", title: "Định hướng nội dung", desc: "Xác định các mốc lịch sử quan trọng và cấu trúc cốt lõi." },
  { step: "2", title: "Phát triển kịch bản", desc: "Sử dụng AI để soạn thảo và tinh chỉnh văn bản thuyết minh." },
  { step: "3", title: "Hỗ trợ thiết kế", desc: "Gợi ý concept giao diện, logo và hình ảnh tư liệu." },
  { step: "4", title: "Tạo Audio", desc: "Chuyển đổi văn bản thành giọng đọc truyền cảm qua VBee." }
];

const PROMPTS = [
  "Yêu cầu AI đề xuất bố cục nội dung cho website và trình bày tiến trình lịch sử.",
  "Biên soạn, chỉnh sửa và rút gọn nội dung thuyết minh bảo đảm trọng tâm.",
  "Gợi ý concept logo, prompt tạo hình và từ khóa tìm kiếm hình ảnh tư liệu.",
  "Hỗ trợ lên ý tưởng giao diện website hiện đại, phù hợp nội dung lịch sử.",
  "Tạo giọng đọc thử nghiệm để lựa chọn tông giọng và cách truyền tải phù hợp."
];

const RESULTS = [
  { title: "Dàn ý & Cấu trúc", desc: "Website được phân chia rõ ràng theo từng mốc lịch sử." },
  { title: "Văn bản & Script", desc: "Nhiều phiên bản thuyết minh ngắn gọn, phù hợp giao diện." },
  { title: "Concept & Logo", desc: "Các bản phác thảo và prompt tạo hình nhận diện hình ảnh." },
  { title: "UI/UX Layout", desc: "Bố cục Header, Timeline và định hướng trải nghiệm người dùng." }
];

const HUMAN_WORK = [
  { title: "Xác định chủ đề", desc: "Lựa chọn và định hướng triển khai phù hợp yêu cầu môn học." },
  { title: "Đối chiếu lịch sử", desc: "Kiểm tra thông tin dựa trên giáo trình để bảo đảm độ chính xác." },
  { title: "Biên tập sáng tạo", desc: "Loại bỏ nội dung không phù hợp và thống nhất cách diễn đạt." },
  { title: "Lập trình & Hoàn thiện", desc: "Trực tiếp xây dựng website, tối ưu màu sắc và trải nghiệm." }
];

export default function AIStatsPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-white selection:bg-amber-500/30 font-sans selection:text-amber-200 flex flex-col items-center">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-48 md:pt-60 pb-24 relative z-10 flex flex-col items-center gap-24">
        
        {/* Header Section */}
        <section className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-600/20 border border-amber-500/30 flex items-center justify-center p-0.5 mb-8 shadow-2xl"
          >
            <div className="w-full h-full bg-stone-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-xl">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight leading-tight"
          >
            Báo cáo Ứng dụng <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 text-glow-gold">Trí tuệ Nhân tạo</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-stone-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed text-center"
          >
            Tổng quan về quy trình, công cụ và sự kết hợp giữa sức mạnh AI với sự sáng tạo của con người trong dự án Lịch sử Đảng.
          </motion.p>
        </section>

        {/* AI Tools Section */}
        <section className="w-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Cpu className="w-5 h-5 text-amber-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">Công cụ AI đã sử dụng</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AI_TOOLS.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] relative group hover:bg-white/[0.04] transition-all"
              >
                <div className={cn("inline-flex p-3 rounded-2xl mb-6", tool.bg)}>
                  <tool.icon className={cn("w-6 h-6", tool.color)} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{tool.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">{tool.role}</p>
                
                <div className="absolute top-4 right-8 text-white/5 font-heading text-6xl font-black group-hover:text-white/10 transition-colors pointer-events-none">
                  0{idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="w-full max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">Quy trình làm việc</h2>
            <p className="text-stone-500 text-sm uppercase tracking-[0.2em]">4 bước tối ưu hoá bởi AI & Nhóm</p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {WORKFLOW.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center mb-6 shadow-xl relative">
                    <span className="text-amber-400 font-bold font-mono">{item.step}</span>
                    <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-md animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-stone-400 text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Prompts Section */}
          <section className="glass-card p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01]">
            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
              <FileText className="w-6 h-6 text-amber-400" />
              Các câu lệnh chính
            </h3>
            <ul className="space-y-6">
              {PROMPTS.map((prompt, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-500/50 mt-1.5 shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-stone-300 text-sm leading-relaxed font-light">{prompt}</p>
                </motion.li>
              ))}
            </ul>
            <div className="mt-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-stone-400 text-xs italic leading-relaxed">
              Nhóm luôn thực hiện theo quy trình: Đặt yêu cầu → Cải thiện prompt → Nhận kết quả → Chọn lọc/Đối chiếu → Hoàn thiện.
            </div>
          </section>

          {/* Results Section */}
          <section className="space-y-6">
            <h3 className="text-2xl font-heading font-bold mb-2 flex items-center gap-3 px-2">
              <Zap className="w-6 h-6 text-amber-400" />
              Kết quả AI sinh ra
            </h3>
            <p className="text-stone-500 text-sm px-2 mb-8">Các bản nháp và định hướng quan trọng</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESULTS.map((res, idx) => (
                <motion.div
                  key={res.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-amber-500/20 transition-colors"
                >
                  <h4 className="font-bold text-white text-sm mb-2">{res.title}</h4>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">{res.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-400 leading-relaxed italic">
                Sản phẩm AI chỉ đóng vai trò hỗ trợ tăng tốc, không được sử dụng nguyên trạng cho toàn bộ website.
              </p>
            </div>
          </section>
        </div>

        {/* Human Effort Section */}
        <section className="w-full max-w-6xl p-1 md:p-[1px] rounded-[3rem] bg-gradient-to-br from-amber-500/20 via-white/5 to-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none" />
          <div className="bg-stone-950 rounded-[2.9rem] p-8 md:p-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">Thực hiện bởi Nhóm</h2>
                  <p className="text-stone-400 font-light text-lg">Những giá trị cốt lõi tạo nên sự khác biệt.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {HUMAN_WORK.map((work, idx) => (
                    <motion.div
                      key={work.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-4 h-4 text-amber-500" />
                        <h4 className="font-bold text-white">{work.title}</h4>
                      </div>
                      <p className="text-stone-400 text-sm font-light leading-relaxed pl-7">{work.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-1/3 aspect-square relative flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-amber-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border border-white/5 rounded-full"
                />
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-amber-400/10 to-transparent backdrop-blur-3xl flex flex-col items-center justify-center text-center p-6 border border-white/5">
                  <Activity className="w-10 h-10 text-amber-400 mb-4 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-1">Human Intelligence</span>
                  <span className="text-xl font-heading font-bold text-white">Linh hồn của Dự án</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
