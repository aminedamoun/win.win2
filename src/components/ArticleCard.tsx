import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useRouter } from '../utils/router';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImageUrl?: string;
  readTime: number;
  publishedAt: string;
  author: string;
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  categorySlug,
  featuredImageUrl,
  readTime,
  publishedAt,
  author,
}: ArticleCardProps) {
  const { navigate } = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <article
      onClick={() => navigate(`/insights/${slug}`)}
      className="glass-card glass-card-hover group cursor-pointer h-full flex flex-col overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-500/10 to-neutral-900">
        {featuredImageUrl ? (
          <img
            src={featuredImageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl font-bold text-red-500/20">WW</div>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-400 mb-4 flex-grow line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {readTime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(publishedAt)}
            </span>
          </div>
          <ArrowRight className="text-red-500 group-hover:translate-x-1 transition-transform" size={18} />
        </div>
      </div>
    </article>
  );
}
