import { useState, useEffect } from 'react';

interface Podcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  artworkUrl600: string;
  primaryGenreName: string;
  feedUrl: string;
  loading: boolean;
  genres: [];
}

export const useRandomPodcasts = (term: string = 'podcast', limit: number = 10) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/itunes-api/search?term=${term}&entity=podcast&limit=${limit}?&country=EG`
        );
        if (!response.ok) throw new Error('Failed to fetch podcasts');

        const data = await response.json();
        setPodcasts(data.results);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return { podcasts, loading, error };
};
export const useTopCharts = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);

        const targetUrl = '/apple-api/api/v2/eg/podcasts/top/10/podcasts.json';

        const response = await fetch(targetUrl);

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        setPodcasts(data.feed.results); //
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  return { podcasts, loading, error };

};

export function usePodcast(id: number) {
  const [podcast, setPodcast] = useState<Podcast>()
  const [podcastLoader, setPodcastLoader] = useState<boolean>()
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id || isNaN(id)) return;
    const fetchPodcast = async () => {
      try {
        setPodcastLoader(true)
        const response = await fetch(`/itunes-api/lookup?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        setPodcast(data.results[0])
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchPodcast()
  }, [id])
  return { podcast, podcastLoader, error }
}


export function useSearch(term: string) {
  const [result, setResult] = useState<any>()
  const [searchLoader, setSearchLoader] = useState<boolean>()
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!term || term.length === 0) return;
    const fetchPodcast = async () => {
      try {
        setSearchLoader(true)
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=podcast&entity=podcast`)
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const data = await response.json();
        setResult(data.results)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchPodcast()
  }, [term])
  return { result, searchLoader, error }

}
