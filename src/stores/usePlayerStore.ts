import { create } from 'zustand';

export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: string; // "00:37:17"
  publishedDate: string;
  episodeImage: string;
}

interface PlayerState {
  currentEpisode: Episode | null;
  playing: boolean;
  playEpisode: (episode: Episode) => void;
  setPlaying: (playing: boolean | ((prev: boolean) => boolean)) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentEpisode: null,
  playing: false,
  
  playEpisode: (episode) => set({ currentEpisode: episode, playing: true }),
  
  setPlaying: (playing) => set((state) => ({
    playing: typeof playing === 'function' ? playing(state.playing) : playing
  })),
}));
