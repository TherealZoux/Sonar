import CategorySection from "@/components/CategorySection";
import { usePodcastStore } from "@/stores/usePodcastStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const podcastStore: any = usePodcastStore()
  const topCharts = podcastStore.topCharts
  const [activeIndex, setActiveIndex] = useState(0);
  const activePodcast = topCharts[activeIndex];
  const navigateTo = useNavigate()

  useEffect(() => {
    if (topCharts.length === 0) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topCharts.length);
    }, 5000)

    return () => clearInterval(timer);
  }, [topCharts.length]);

  useEffect(() => {
    if (activePodcast) {
      console.log(activePodcast);

    }
  }, [activePodcast]);


  return (
    <>

    <div className="relative w-full max-h-[42rem] min-h-[35rem] mb-8 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-[#181818]" dir="rtl">
  
  <img 
    src={activePodcast?.artworkUrl100?.replace(/100x100/, '1080x1080')} 
    className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm scale-105" 
    alt=""
  />

  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/70 to-transparent md:bg-gradient-to-l md:from-black/90 md:via-black/50 md:to-transparent" />

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full w-full p-8 md:p-12 gap-8">
    
    <div className="flex-1 text-right flex flex-col justify-center order-2 md:order-1 w-full">
      {activePodcast?.genres?.[0]?.name && (
        <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit mb-4">
          {activePodcast.genres[0].name}
        </span>
      )}
      
      <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight drop-shadow-md">
        {activePodcast?.name}
      </h1>
      <p className="text-lg md:text-xl text-gray-300 font-medium mb-6 drop-shadow">
        {activePodcast?.artistName}
      </p>

      <div className="flex gap-4 mt-2">
        <button className="bg-white text-black text-sm md:text-base font-bold px-6 py-3 rounded-xl hover:bg-gray-200 transition shadow-lg" 
        
      onClick={() => navigateTo(`/podcast/${activePodcast.id}`)}
>
           Show
        </button>
        <a 
          href={activePodcast?.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white/10 text-white text-sm md:text-base font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition backdrop-blur-sm"
        >
           Apple Podcasts Page
        </a>
      </div>
    </div>

    <div className="flex-shrink-0 order-1 md:order-2 w-48 h-48 sm:w-64 sm:h-64 md:w-[26rem] md:h-[26rem] shadow-2xl rounded-2xl overflow-hidden border border-white/10">
      <img 
        src={activePodcast?.artworkUrl100?.replace(/100x100/, '400x400')} 
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
        loading="lazy"
        decoding="async"
        alt={activePodcast?.name}
      />
    </div>

  </div>
</div>

      { /*top 10 podcasts ion egypt */}
      <section className="flex flex-col gap-8 mb-8">
        <CategorySection category="top" isCharts title="Top 10 in Egypt" />
        <CategorySection category="tech" isCharts={false} title=" tech" />
        <CategorySection category="Business" isCharts={false} title=" Business" />
        <CategorySection category="comedy" isCharts={false} title=" Comedy" />
      </section>
    </>
  )
}
