import { useState, useEffect } from 'react';
import { XMLParser } from 'fast-xml-parser';

export function usePodcastFeed(feedUrl: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!feedUrl) return;

    let isMounted = true;

    const fetchAndParseFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        // dev mode proxy
        // const proxyUrl = `/api/rss?url=${encodeURIComponent(feedUrl)}`;
        // production mode proxy
        const proxyUrl = `/.netlify/functions/rss?url=${encodeURIComponent(feedUrl)}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Failed to fetch RSS feed");

        const xmlText = await response.text();

        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: "@_"
        });
        const jsonObj = parser.parse(xmlText);
        const channel = jsonObj.rss.channel;
        const rawEpisodes = Array.isArray(channel.item) ? channel.item : [channel.item];
        const formattedData = {
          showTitle: channel.title,
          showDescription: channel.description,
          showImage: channel.image?.url || "",
          episodes: rawEpisodes.map((ep: any, index: any) => ({
            id: ep.guid?.["#text"] || ep.guid || index,
            title: ep.title,
            description: ep.description || ep["itunes:summary"] || "No description",
            audioUrl: ep.enclosure?.["@_url"] || null, // The actual MP3 link
            duration: ep["itunes:duration"] || "00:00",
            publishedDate: ep.pubDate,
            episodeImage: ep["itunes:image"]?.["@_href"] || channel.image?.url || ""
          }))
        };

        if (isMounted) setData(formattedData);

      } catch (err: any) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAndParseFeed();

    return () => { isMounted = false; };
  }, [feedUrl]);

  return { data, loading, error };
}
