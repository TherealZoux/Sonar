import PodcastCard from "./PodcastCard"
import SkeletonCard from "./SkeletonCard";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useRandomPodcasts, useTopCharts } from "@/hooks/usePodcasts.ts";


interface Props {
  category: string;
  title: string;
  isCharts: boolean;
}
export default function CategorySection({ category, title, isCharts}: Props) {

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile()
  
  const { podcasts, loading  } = isCharts? useTopCharts(): useRandomPodcasts(category, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <section className="flex flex-col max-w-[100%] h-fit bg-white items-baseline shadow-[0px_7px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-3xl gap-4 p-8 ">
      <div className="flex justify-between w-full">
        <h1 className="text-[26px] font-[700] text-[var(--color-sidebar-accent-foreground)]">{title}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-hidden w-full h-full overflow-x-scroll py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" ref={scrollContainerRef}>
        {
          !loading ? (
            podcasts.map((podcast: any) => (
              <PodcastCard
                key={podcast?.collectionId ?? podcast.id}
                title={podcast?.collectionName ?? podcast.name}
                author={podcast?.artistName ?? podcast.author}
                imageUrl={
                  podcast?.artworkUrl600 ??
                  podcast?.artworkUrl100?.replace(/\d+x\d+/, '600x600')
                }
                category={
                  (typeof podcast?.genres?.[0] === 'string'
                    ? podcast.genres[0]
                    : podcast?.genres?.[0]?.name) ?? 'tech'
                }
                id={podcast?.collectionId ?? podcast.id}
                feedUrl={podcast?.feedUrl}
                episodes={podcast?.trackCount}
                price={podcast?.collectionPrice}
              />
            ))
          ) : (
            // Use spread to "fill" the array so map actually runs
            [...Array(isMobile? 2:6)].map((_, i) => <SkeletonCard key={i} />)
          )
        }      </div>
    </section>

  )
}
