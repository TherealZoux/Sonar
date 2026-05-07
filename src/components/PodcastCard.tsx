import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge"


interface PodcastCardProps {
  title?: string;
  author?: string;
  category?: string;
  episodes?: number;
  imageUrl?: string;
  feedUrl?: string;
  id?: number;
  className?:string;
}

export default function PodcastCard({
  title = "The Comedy Hour",
  author = "Podcast Host", 
  category = "Comedy",
  episodes,
  imageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" ,
  feedUrl= '',
  id = 0,
  className = ''
}: PodcastCardProps) {
  
  const navigateTo = useNavigate()
  console.log(feedUrl);
  

  return (
    <div className={`min-w-[185px] flex flex-col gap-3 group cursor-pointer ${className}`} 
     onClick={()=> navigateTo(`/podcast/${id}`)}>
      {/* Image Container */}
      <div className="w-full h-[180px] aspect-[4/5] overflow-hidden rounded-2xl m-auto">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full `:width: , transition-transform duration-300 group-hover:scale-105 object-cover"
        />
      </div>

      {/* Text Details */}
      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
          {title.slice(0,10)}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {author}
        </p>

        {/* Footer (Badge & Episodes) */}
        <div className="flex items-center justify-between mt-1">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-medium rounded-full">
            {category.slice(0,8)}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">

            {episodes ? `${episodes} eps` : <Badge>Top Show </Badge>}
          </span>
        </div>
      </div>
    </div>
  );
}
