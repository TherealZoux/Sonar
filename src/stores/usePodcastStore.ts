import { create } from 'zustand';




export const usePodcastStore = create((set) => ({
  podcasts : [],
  topCharts: [],
  
  setPodcasts: (data: any) => set({ podcasts: data}),
  setTopCharts: (data: any) => set({ topCharts: data}),
}));
