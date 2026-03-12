import { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Trang chủ' },
  { id: 'problem', label: 'Bối cảnh' },
  { id: 'movements', label: 'Phong trào' },
  { id: 'timeline', label: 'Dòng thời gian' },
  { id: 'birth', label: 'Thành lập Đảng' },
  { id: 'platform', label: 'Cương lĩnh' },
  { id: 'comparison', label: 'So sánh' },
  { id: 'quiz', label: 'Trắc nghiệm' },
  { id: 'conclusion', label: 'Kết luận' },
];

export const SECTION_IDS = {
  HERO: 'hero',
  PROBLEM: 'problem',
  MOVEMENTS: 'movements',
  TIMELINE: 'timeline',
  BIRTH: 'birth',
  PLATFORM: 'platform',
  COMPARISON: 'comparison',
  QUIZ: 'quiz',
  CONCLUSION: 'conclusion',
} as const;
