export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  details?: string;
  image?: string;
  imageCaption?: string;
}

export interface Movement {
  id: string;
  name: string;
  figure?: string;
  period: string;
  contributions: string[];
  limitations: string[];
  imageUrl?: string;
}

export interface PlatformItem {
  id: string;
  title: string;
  icon: string;
  content: string;
  details: string[];
}

export interface ComparisonRow {
  criteria: string;
  before: string;
  after: string;
}

export interface Figure {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NavItem {
  id: string;
  label: string;
}
