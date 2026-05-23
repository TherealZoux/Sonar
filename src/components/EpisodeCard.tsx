import { Play } from 'lucide-react'
import { usePlayerStore } from '../stores/usePlayerStore';

export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string | null;
  duration: string;
  publishedDate: string;
  episodeImage: string;
  author: string|undefined;
}

interface EpisodeCardProps {
  episode: Episode;
  author: string|undefined;
}

export default function EpisodeCard({ episode, author }: EpisodeCardProps) {
  const formattedDate = new Date(episode.publishedDate).toLocaleDateString()

  const playEpisode = usePlayerStore((state) => state.playEpisode)
  return (
    <article className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-5 items-start">

      <img
        src={episode.episodeImage}
        alt={episode.title}
        loading="lazy"
        decoding="async"
        className="w-24 h-24 rounded-md object-cover shadow-sm shrink-0"
      />

      <div className="flex-1 flex flex-row gap-2 justify-between min-w-0 ">
       <div>
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate">
            {episode.title}
          </h3>
          {episode.duration && (
            <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
              {episode.duration}
            </span>
          )}
        </div>

        <span className="text-xs text-gray-500">
          {formattedDate}
        </span>

        <div
          className="text-gray-600 text-sm line-clamp-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: episode.description || '' }}
        />
       </div>

        {episode.audioUrl && (
          <div className='bg-[var(--color-sidebar-accent-foreground)] w-fit p-5 rounded-full text-white cursor-pointer h-fit'
          onClick={() => playEpisode({ ...episode, author: author })}           >
            <Play />
          </div>
        )}
      </div>
    </article>
  );
}
