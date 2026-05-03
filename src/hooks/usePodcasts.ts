import { useState, useEffect } from 'react';

interface Podcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  primaryGenreName: string;
}

export const useRandomPodcasts = (term: string = 'podcast', limit: number = 10) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [randomLoading, setRandomLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setRandomLoading(true);
        const response = await fetch(
          `https://itunes.apple.com/search?term=${term}&entity=podcast&limit=${limit}`
        );

        if (!response.ok) throw new Error('Failed to fetch podcasts');

        const data = await response.json();
        setPodcasts(data.results);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setRandomLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return { podcasts, randomLoading, error };
};
export const useTopCharts = () => {
  const [charts, setCharts] = useState<any[]>([]);
  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setChartLoading(true);
        
        const targetUrl = '/apple-api/api/v2/eg/podcasts/top/10/podcasts.json';

        const response = await fetch(targetUrl);
        
        if (!response.ok) {
           throw new Error(`Error ${response.status}`);
        }
        
        const data = await response.json(); 
        setCharts(data.feed.results); //
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setChartLoading(false);
      }
    };

    fetchCharts();
  }, []); 

  return { charts, chartLoading, error };
};
