// يمكنك نقل هذه الواجهة (Interface) إلى ملف الأنواع (types) الخاص بك
export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string | null;
  duration: string;
  publishedDate: string;
  episodeImage: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const formattedDate = new Date(episode.publishedDate).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex gap-5 items-start">
      
      <img 
        src={episode.episodeImage} 
        alt={episode.title} 
          loading="lazy"
          decoding="async"
        className="w-24 h-24 rounded-md object-cover shadow-sm shrink-0"
      />

      <div className="flex-1 flex flex-col gap-2 min-w-0">
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

        {episode.audioUrl && (
          <div className="mt-2">
            <audio controls preload="none" className="w-full h-9 outline-none">
              <source src={episode.audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        )}
      </div>
    </article>
  );}
