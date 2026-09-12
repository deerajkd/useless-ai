export type UselessModeId =
  | 'random'
  | 'overthinking'
  | 'sarcasm'
  | 'obvious'
  | 'wrong'
  | 'motivational'
  | 'philosophical'
  | 'dramatic'
  | 'robot'
  | 'extreme';

export interface UselessModeConfig {
  id: UselessModeId;
  name: string;
  badge: string;
  description: string;
  iconName: string;
  samplePrompt: string;
  sampleResponse: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  score?: number;
  scoreLabel?: string;
  mode?: UselessModeId;
  isEasterEgg?: boolean;
  isError?: boolean;
  parentQuestion?: string;
}

export type PointlessActionType =
  | 'make_more_useless'
  | 'overthink'
  | 'make_worse'
  | 'regenerate'
  | 'delete_nothing'
  | 'emergency';

export interface UselessSessionStats {
  questionsAsked: number;
  usefulAnswers: number;
  uselessAnswers: number;
  timeWastedSeconds: number;
  brainCellsLostPercent: number;
  productivityPercent: number;
}

export interface HistoryItem {
  id: string;
  question: string;
  response: string;
  score: number;
  scoreLabel: string;
  category: string;
  mode: UselessModeId;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    points: number;
  }[];
}

export interface SpecialEventAlert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'notice' | 'congrats' | 'emergency';
}
