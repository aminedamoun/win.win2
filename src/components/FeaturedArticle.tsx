import { Clock, Calendar, ArrowRight, Star } from 'lucide-react';
import { useRouter } from '../utils/router';

interface FeaturedArticleProps {
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

export default function FeaturedArticle({
  slug,
  title,
  excerpt,
  category,
  categorySlug,
  featuredImageUrl,
  readTime,
  publishedAt,
  author,
}: FeaturedArticleProps) {
  const { navigate } = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article
      onClick={() => navigate(`/insights/${slug}`)}
      className="glass-card group cursor-pointer overflow-hidden hover:border-red-500/50 transition-all duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative h-64 lg:h-full overflow-hidden bg-gradient-to-br from-red-500/20 to-neutral-900">
          {featuredImageUrl ? (
            <img
              src={featuredImageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-8xl font-bold text-red-500/20">WW</div>
            </div>
          )}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <Star className="text-red-500 fill-red-500" size={20} />
            <span className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
              Featured
            </span>
          </div>
        </div>

        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-red-500/10 text-red-500 text-sm font-semibold rounded-full border border-red-500/20">
              {category}
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-red-500 transition-colors">
            {title}
          </h2>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {readTime} min read
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDate(publishedAt)}
            </span>
          </div>

          <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold group w-fit">
            Read Article
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
