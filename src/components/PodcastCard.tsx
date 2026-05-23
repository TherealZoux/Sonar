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
  className?: string;
  price?: number;
}

export default function PodcastCard({
  title = "The Comedy Hour",
  author = "Podcast Host",
  category = "Comedy",
  imageUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop",
  id = 0,
  className = '',
  price = 0
}: PodcastCardProps) {

  const navigateTo = useNavigate()

  
  return (
    <div
      className={`shrink-0 w-[130px] md:w-[185px] flex flex-col gap-3 group cursor-pointer snap-start ${className} relative`}
      onClick={() => navigateTo(`/podcast/${id}`)}
    >
      <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-sm">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 truncate">
          {author}
        </p>

        <div className="flex items-center justify-between mt-1.5 gap-1.5 overflow-hidden">
          <span className="px-2 py-0.5 md:px-3 md:py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-[9px] md:text-xs font-medium rounded-full whitespace-nowrap shrink-0">
            {category.slice(0, 10)}
          </span>

          <span className="text-[10px] md:text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0">
              <Badge className="text-[9px] md:text-xs py-0 px-1.5 md:px-2.5">{price + '$' || "free"}</Badge>
          </span>
        </div>
      </div>
    </div>);
}
