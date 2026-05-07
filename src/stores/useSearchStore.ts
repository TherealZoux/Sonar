import { create } from 'zustand';

interface SearchState {
  results: any[];
  searchTerm: string;
  isLoading: boolean;
  setResults: (data: any[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchTerm: (term: string) => void;
}


export const useSearchStore = create<SearchState>((set) => ({
  results: [],
  searchTerm:'',
  isLoading: false,
  setResults: (data) => set({ results: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchTerm: (term) => set({searchTerm: term})
}));
