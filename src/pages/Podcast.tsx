import { useParams } from 'react-router-dom';
import { usePodcast } from "@/hooks/usePodcasts";
import { usePodcastFeed } from '@/hooks/usePodcastFeed';
import EpisodeCard from '@/components/EpisodeCard';
import PodcastHeader from '@/components/PodcastHeader';
import { useLocation } from 'react-router-dom';
import FollowShareComponent from '@/components/FollowShareComponent';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";  


export default function Podcast() {
  const { id } = useParams<{ id: string }>();
  const { podcast } = usePodcast(Number(id));
  const { data, loading } = usePodcastFeed(podcast?.feedUrl);
  const location = useLocation();
  const [episodes, setEpisodes] = useState([])
  
  useEffect(()=>{
    setEpisodes(data?.episodes?.slice(0,10))
  }, [data?.episodes])
  return (
    <div className="flex flex-col gap-8 pb-10">
      <PodcastHeader path={location.pathname} name={data?.showTitle} />

      <section className="bg-white p-4 rounded-md shadow-md flex gap-6 items-start flex-wrap w-full">
       
          <>
            <div className="shrink-0">
              <img
                src={data?.showImage || podcast?.artworkUrl600}
                alt="podcast cover"
                loading="lazy"
                decoding="async"
                className="w-[20rem] rounded-md shadow-md object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {podcast?.genres?.map((gen: string, index: number) => (
                  <span
                    className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium rounded-full"
                    key={index}
                  >
                    {gen.slice(0, 8)}
                  </span>
                ))}
              </div>

              <h1 className="text-[32px] font-['Playfair_Display']">
                {data?.showTitle}
              </h1>

              <p>
                <span className="text-[#6F6F6F]">Hosted by: </span>
                {podcast?.artistName}
              </p>

              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data?.showDescription || "" }}
              />
            </div>
          </>
      </section>

      {!loading && data?.episodes  && (
        <section className='flex flex-row '>
          <section className="flex flex-col gap-4 min-w-[70%]!">
            <h2 className="text-2xl font-semibold mb-2">Episodes ({data.episodes.length})</h2>

            <div className="flex flex-col gap-4">
              {episodes?.map((ep: any) => (
                <EpisodeCard key={ep.id} episode={ep} author={podcast?.artistName} />
              ))}
            </div>
            <Button onClick={()=> setEpisodes(data?.episodes.slice(0,episodes.length+10) ) }>load more</Button>
          </section>
          <section>
            <FollowShareComponent />
          </section>
        </section>
      )}
    </div>
  );
}
