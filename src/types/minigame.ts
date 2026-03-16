export type ScreenType = 'start' | 'intro' | 'chapter_select' | 'gameplay' | 'ending';
export type MissionType = 'decision' | 'timeline' | 'decoder' | 'puzzle' | 'connector';

export interface ArchiveItem {
  id: string;
  category: 'document' | 'person' | 'event';
  title: string;
  description: string;
  unlocked: boolean;
  image?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface ConnectorNode {
  id: string;
  type: 'straight' | 'elbow' | 'tee' | 'cross';
  rotation: number; // 0, 90, 180, 270
  isSource?: boolean;
  isTarget?: boolean;
  label?: string; // e.g. "Hương Cảng", "Hà Nội"
}

export interface TimelineEvent {
  id: string;
  label: string;
  expectedOrder: number;
}

export interface DecoderItem {
  id: string;
  encrypted: string;
  decrypted: string;
  clue: string;
}

export interface DecisionQuestion {
  id: string;
  prompt: string;
  options: DecisionOption[];
}

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  instructions: string;
  content?: string;
  options?: DecisionOption[]; // Legacy single question
  questions?: DecisionQuestion[]; // Bank of questions
  timelineEvents?: TimelineEvent[]; // For Timeline
  decoderItems?: DecoderItem[]; // For Decoder
  puzzleImage?: string; // For Puzzle
  connectorNodes?: ConnectorNode[]; // For Connector
  gridSize?: number; // For Connector
  targetItem?: string; // e.g. "Toàn quyền Đông Dương" for decoder target
  rewardScore: number;
  unlockId?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  period: string;
  description: string;
  missions: Mission[];
}

export interface GameState {
  currentScreen: ScreenType;
  currentChapterId: string | null;
  currentMissionIndex: number;
  totalScore: number;
  unlockedArchives: string[];
  completedChapters: string[];
  chapterPlayCounts: Record<string, number>;
}
