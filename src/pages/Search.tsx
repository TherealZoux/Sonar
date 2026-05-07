import { SearchComponent } from "@/components/SearchCoponent"
import { useSearchStore } from '@/stores/useSearchStore';
import PodcastCard from "@/components/PodcastCard";
export default function Search() {
  const results = useSearchStore((state: any) => state.results);

  return (
    <>
      <section className="mt-8">
        <SearchComponent />
      </section>
      <div className="flex flex-wrap gap-10 mt-12">
        {
          results.map((item : any) => (
            <PodcastCard
              key={item?.collectionId ?? item?.id}
              title={item?.collectionName ?? item?.name}
              author={item?.artistName ?? item?.author}
              imageUrl={
                item?.artworkUrl600 ??
                item?.artworkUrl100?.replace(/\d+x\d+/, '600x600')
              }
              id={item?.collectionId ?? item?.id}
              feedUrl={item?.feedUrl}
              category={item?.primaryGenreName}

                episodes={item?.trackCount}
              className="flex-1 max-w-fit"
            />


          ))
        }
      </div>
    </>
  )
}
