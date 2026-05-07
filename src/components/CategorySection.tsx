import PodcastCard from "./PodcastCard"
import SkeletonCard from "./SkeletonCard";


interface Props {
  podcasts: any;
  title: string;
  loading: boolean;
}
export default function CategorySection({ podcasts, title, loading }: Props) {


  return (
    <section className="flex flex-col max-w-[100%] h-[28rem] bg-white items-baseline shadow-[0px_7px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-3xl gap-4 p-8 ">
      <h1 className="text-[26px] font-[700] text-[var(--color-sidebar-accent-foreground)]">{title}</h1>
      <div className="flex gap-4 overflow-hidden w-full h-full overflow-x-scroll py-4">
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
                id={podcast?.collectionId?? podcast.id}
                feedUrl={podcast?.feedUrl}
                episodes={podcast?.trackCount}
              />
            ))
          ) : (
            // Use spread to "fill" the array so map actually runs
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          )
        }      </div>
    </section>

  )
}
