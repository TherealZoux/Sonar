import { SearchComponent } from "@/components/SearchCoponent"
import { useSearchStore } from '@/stores/useSearchStore';
import PodcastCard from "@/components/PodcastCard";
import { useNavigate } from "react-router-dom";


export default function Search() {
  const results = useSearchStore((state: any) => state.results);

  const navigateTo = useNavigate()
  const  categorys = [
    { id: "1304", name: "Education", color: "bg-emerald-600", image: "https://picsum.photos/300/200?random=11" },
    { id: "1310", name: "Books & Novels", color: "bg-purple-600", image: "https://picsum.photos/300/200?random=12" },
    { id: "1315", name: "Health & Fitness", color: "bg-pink-600", image: "https://picsum.photos/300/200?random=13" },
    { id: "1324", name: "Society & Culture", color: "bg-blue-600", image: "https://picsum.photos/300/200?random=14" },
    { id: "1309", name: "Comedy", color: "bg-amber-600", image: "https://picsum.photos/300/200?random=15" },
    { id: "1321", name: "Business & Technology", color: "bg-indigo-600", image: "https://picsum.photos/300/200?random=16" },
  ];



  return (
    <>
      <section className="mt-8">
        <SearchComponent />
        <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">تصفح الأقسام</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categorys.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo(`/category/${cat.id}`)}
              className={`relative h-40 ${cat.color} rounded-xl overflow-hidden cursor-pointer shadow-lg hover:scale-105 transition-transform duration-300 group`}
            >
              <span className="absolute top-4 right-4 text-xl font-black text-white z-10 drop-shadow">
                {cat.name}
              </span>
              
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute -bottom-2 -left-6 w-28 h-28 object-cover rounded-md rotate-[25deg] shadow-md group-hover:rotate-[15deg] transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      </section>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-10 mt-12">
        {
          results.map((item: any) => (
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
              price={item.collectionPrice}
              episodes={item?.trackCount}
              className="flex-1 max-w-fit"
            />


          ))
        }
      </div>
    </>
  )
}
