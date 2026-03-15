import { ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-32 h-32 shrink-0 aspect-square flex items-center justify-center rounded-full overflow-hidden border-2 border-white/10 shadow-2xl bg-stone-950/50">
                <img 
                  src="/images/logo.jpg" 
                  alt="Logo Đảng" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                Lịch sử <span className="text-amber-400">Đảng</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-8 font-sans font-light">
              Hành trình di sản và những dấu mốc vĩ đại của Đảng Cộng sản Việt Nam. Một không gian số giáo dục nhằm lan tỏa giá trị lịch sử dân tộc.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Tài liệu tham khảo</h4>
            <ul className="space-y-4 text-sm font-sans font-light">
              <li>
                <a href="https://tulieuvankien.dangcongsan.vn/tu-lieu-van-kien-dang/van-kien-dang-toan-tap" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Văn kiện Đảng toàn tập</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://tulieuvankien.dangcongsan.vn/tu-lieu-van-kien-dang/lich-su-dang" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lịch sử Đảng Cộng sản VN</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="https://baotanglichsu.vn/vi" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Bảo tàng Lịch sử Quốc gia</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal/Info */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Thông tin dự án</h4>
            <div className="glass-card rounded-2xl p-6 border-white/5 bg-white/[0.02]">
              <div className="flex items-start gap-4 mb-4">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-stone-400 leading-relaxed font-sans font-light italic">
                  Nội dung được biên soạn phục vụ mục đích học tập và tìm hiểu kiến thức lịch sử. Dự án giáo dục phi thương mại.
                </p>
              </div>
              <p className="text-[10px] text-stone-600 font-medium">
                Sử dụng công nghệ: Next.js, Framer Motion, Lucide Icons.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center">
          <p className="text-[11px] text-stone-600 font-medium">
            © {currentYear} Lịch sử Đảng Việt Nam. Developed with passion for History.
          </p>
        </div>
      </div>
    </footer>
  );
}
