import { useEffect, useState } from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../utils/supabase';
import FeaturedArticle from '../components/FeaturedArticle';
import ArticleCard from '../components/ArticleCard';
import ScrollIndicator from '../components/ScrollIndicator';

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

export default function Insights() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroImageUrl, setHeroImageUrl] = useState('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920');

  useEffect(() => {
    fetchData();
    fetchHeroImage();
  }, [i18n.language]);

  const fetchHeroImage = async () => {
    try {
      const { data } = await supabase
        .from('website_images')
        .select('url')
        .eq('usage_location', 'insights-hero')
        .maybeSingle();

      if (data && data.url) {
        setHeroImageUrl(data.url);
      }
    } catch (err) {
      console.error('Error fetching hero image:', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const currentLang = i18n.language;
      const translatedArticles = (data || []).map(article => ({
        ...article,
        title: currentLang === 'sl'
          ? (article.title_sl || article.title)
          : (article.title_en || article.title),
        excerpt: currentLang === 'sl'
          ? (article.excerpt_sl || article.excerpt)
          : (article.excerpt_en || article.excerpt),
        content: currentLang === 'sl'
          ? (article.content_sl || article.content)
          : (article.content_en || article.content),
      }));

      setArticles(translatedArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(t('insights.error.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      <ScrollIndicator sectionCount={3} />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20">
              <Lightbulb className="text-red-500" size={20} />
              <span className="text-red-500 font-semibold">{t('insights.subtitle')}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('insights.title')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
              {t('insights.description')}
            </p>
          </div>
        </div>
      </section>

      {error && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="glass-card p-8 max-w-2xl mx-auto text-center">
              <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
              <h2 className="text-2xl font-bold mb-2">{t('insights.error.title')}</h2>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={fetchData}
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold"
              >
                {t('insights.error.retry')}
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && featuredArticle && (
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FeaturedArticle
              slug={featuredArticle.slug}
              title={featuredArticle.title}
              excerpt={featuredArticle.excerpt}
              category="Insights"
              categorySlug="insights"
              featuredImageUrl={featuredArticle.featured_image_url}
              readTime={featuredArticle.read_time}
              publishedAt={featuredArticle.published_at}
              author={featuredArticle.author}
            />
          </div>
        </section>
      )}

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="absolute inset-0 radial-glow opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span dangerouslySetInnerHTML={{ __html: t('insights.latest') }} />
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                <p className="text-gray-400">{t('insights.loadingText')}</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">{t('insights.error.loadFailed')}</p>
            </div>
          ) : regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category="Insights"
                  categorySlug="insights"
                  featuredImageUrl={article.featured_image_url}
                  readTime={article.read_time}
                  publishedAt={article.published_at}
                  author={article.author}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {t('insights.noArticles')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
