import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bước ngoặt 02/1930 – Sự ra đời của Đảng Cộng sản Việt Nam',
  description:
    'Trang web giáo dục về sự ra đời của Đảng Cộng sản Việt Nam và Cương lĩnh chính trị đầu tiên (02/1930). So sánh phong trào yêu nước trước và sau khi có Đảng.',
  keywords: [
    'Lịch sử Đảng',
    'Đảng Cộng sản Việt Nam',
    'Cương lĩnh chính trị đầu tiên',
    '3/2/1930',
    'Nguyễn Ái Quốc',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
