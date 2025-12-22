import { useEffect, useState } from 'react';
import { Clock, Calendar, ArrowLeft, Share2, AlertCircle } from 'lucide-react';
import { useRouter } from '../utils/router';
import { supabase } from '../utils/supabase';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  author: string;
  read_time: number;
  published_at: string;
  created_at: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function InsightDetail() {
  const { navigate, currentPath } = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const slug = currentPath.split('/').pop();
    if (slug) {
      fetchArticle(slug);
    }
  }, [currentPath]);

  const fetchArticle = async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data: articleData, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!articleData) {
        setError('Article not found');
        return;
      }

      setArticle(articleData);

      const { data: relatedData } = await supabase
        .from('articles')
        .select('*')
        .neq('id', articleData.id)
        .order('created_at', { ascending: false })
        .limit(3);

      setRelatedArticles(relatedData || []);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Unable to load article from database.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h1 className="text-4xl font-bold mb-4">
            {error === 'Article not found' ? 'Article Not Found' : 'Unable to Load Article'}
          </h1>
          <p className="text-gray-400 mb-8">
            {error === 'Article not found'
              ? "The article you're looking for doesn't exist or hasn't been published yet."
              : 'There was an error loading the article.'}
          </p>
          <button
            onClick={() => navigate('/insights')}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <button
          onClick={() => navigate('/insights')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Insights
        </button>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full mb-6">
              Insights
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {article.read_time} min read
              </span>
              <span className="text-gray-500">•</span>
              <span>{article.author}</span>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>

          {article.featured_image_url && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
          )}

          <div className="glass-card p-8 md:p-12 mb-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
                {article.excerpt}
              </p>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8">
                Related <span className="text-red-500">Articles</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <div
                    key={related.slug}
                    onClick={() => navigate(`/insights/${related.slug}`)}
                    className="glass-card glass-card-hover cursor-pointer group"
                  >
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-500/10 to-neutral-900 rounded-t-lg">
                      {related.featured_image_url ? (
                        <img
                          src={related.featured_image_url}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-4xl font-bold text-red-500/20">WW</div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{related.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
