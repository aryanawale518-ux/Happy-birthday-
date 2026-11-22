export interface Memory {
  id: string;
  category: 'her_photos' | 'both_of_us' | 'school_days' | 'favorites';
  title: string;
  caption: string;
  photo_url: string;
  date_label?: string;
  order_index?: number;
  created_at?: string;
}

export interface JarNote {
  id: string;
  title: string;
  snippet: string;
  content: string;
  tag: string;
  emoji: string;
}

export type LayerNumber = 1 | 2 | 3 | 4 | 5;

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}
