import { TrendingUp, Users, Award, MapPin, Target, Briefcase, ArrowRight, Smartphone, Download, Phone, UserCheck, GraduationCap, LineChart, Settings, Building2, HelpCircle, ChevronDown, BookOpen, ShoppingBag, Megaphone } from 'lucide-react';
import { useRouter } from '../utils/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollIndicator from '../components/ScrollIndicator';
import ArticleCard from '../components/ArticleCard';
import SEOContent from '../components/SEOContent';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabase';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string;
  author: string;
  read_time: number;
  published_at: string;
}

export default function Home() {
  const { navigate } = useRouter();
  const { t, i18n } = useTranslation();
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const heroImageUrl = 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/winwin.webp?auto=compress&cs=tinysrgb&w=1920';
  const heroMobileImageUrl = 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/winwin.webp?auto=compress&cs=tinysrgb&w=1920';
  const aboutSectionImageUrl = 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920';
  const joinTeamImageUrl = 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920';
  const benefitsImageUrl = 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/image-gen%20(9).png?auto=compress&cs=tinysrgb&w=800';
  const partnerLogo1 = 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/optispin-logo.png?auto=format&w=200&q=80';
  const partnerLogo2 = 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/Group-6636-1.png?auto=format&w=200&q=80';

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setRecentArticles(data || []);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchRecentArticles();
  }, []);


  const benefits = [
    {
      icon: Users,
      title: t('home.benefits.items.training.title'),
      description: t('home.benefits.items.training.description'),
    },
    {
      icon: TrendingUp,
      title: t('home.benefits.items.career.title'),
      description: t('home.benefits.items.career.description'),
    },
    {
      icon: Award,
      title: t('home.benefits.items.earning.title'),
      description: t('home.benefits.items.earning.description'),
    },
    {
      icon: Briefcase,
      title: t('home.benefits.items.tools.title'),
      description: t('home.benefits.items.tools.description'),
    },
    {
      icon: MapPin,
      title: t('home.benefits.items.locations.title'),
      description: t('home.benefits.items.locations.description'),
    },
    {
      icon: Target,
      title: t('home.benefits.items.performance.title'),
      description: t('home.benefits.items.performance.description'),
    },
  ];

  const stats = [
    { value: 60000, label: t('home.about.stats.deals'), suffix: '' },
    { value: 3, label: t('home.about.stats.locations'), suffix: '' },
    { value: 24, label: t('home.about.stats.team'), suffix: '' },
    { value: 12, label: t('home.about.stats.experience'), suffix: '' },
  ];

  const coreServices = [
    {
      icon: ShoppingBag,
      title: t('home.services.core.promotions.title'),
      description: t('home.services.core.promotions.description'),
    },
    {
      icon: Megaphone,
      title: t('home.services.market.promotional.title'),
      description: t('home.services.market.promotional.description'),
    },
    {
      icon: Phone,
      title: t('home.services.core.callCenter.title'),
      description: t('home.services.core.callCenter.description'),
    },
    {
      icon: Building2,
      title: t('home.services.core.b2b.title'),
      description: t('home.services.core.b2b.description'),
    },
  ];

  const supportServices = [
    {
      icon: GraduationCap,
      title: t('home.services.support.training.title'),
      description: t('home.services.support.training.description'),
    },
    {
      icon: Users,
      title: t('home.services.support.teamDevelopment.title'),
      description: t('home.services.support.teamDevelopment.description'),
    },
    {
      icon: LineChart,
      title: t('home.services.support.leadership.title'),
      description: t('home.services.support.leadership.description'),
    },
    {
      icon: Settings,
      title: t('home.services.support.crm.title'),
      description: t('home.services.support.crm.description'),
    },
  ];

  const marketFocus = [
    {
      icon: UserCheck,
      title: t('home.services.market.b2c.title'),
      description: t('home.services.market.b2c.description'),
    },
    {
      icon: Building2,
      title: t('home.services.market.b2b.title'),
      description: t('home.services.market.b2b.description'),
    },
  ];

  const faqs = [
    {
      question: t('home.faq.items.experience.q'),
      answer: t('home.faq.items.experience.a'),
    },
    {
      question: t('home.faq.items.type.q'),
      answer: t('home.faq.items.type.a'),
    },
    {
      question: t('home.faq.items.employment.q'),
      answer: t('home.faq.items.employment.a'),
    },
    {
      question: t('home.faq.items.hours.q'),
      answer: t('home.faq.items.hours.a'),
    },
    {
      question: t('home.faq.items.payment.q'),
      answer: t('home.faq.items.payment.a'),
    },
    {
      question: t('home.faq.items.advancement.q'),
      answer: t('home.faq.items.advancement.a'),
    },
    {
      question: t('home.faq.items.training.q'),
      answer: t('home.faq.items.training.a'),
    },
    {
      question: t('home.faq.items.locations.q'),
      answer: t('home.faq.items.locations.a'),
    },
    {
      question: t('home.faq.items.remote.q'),
      answer: t('home.faq.items.remote.a'),
    },
    {
      question: t('home.faq.items.selection.q'),
      answer: t('home.faq.items.selection.a'),
    },
    {
      question: t('home.faq.items.profile.q'),
      answer: t('home.faq.items.profile.a'),
    },
    {
      question: t('home.faq.items.different.q'),
      answer: t('home.faq.items.different.a'),
    },
  ];

  const seoTitle = t('seo.home.metaTitle');

  const seoDescription = i18n.language === 'sl'
    ? 'Win Win je vodilna agencija za zaposlovanje, specializirana za prodajna delovna mesta, telefonsko prodajo, call center in telekomunikacije po Sloveniji. Pridružite se uspešnemu timu prodajnikov.'
    : 'Win Win is a leading employment agency specializing in sales jobs, call center positions, and telecommunications across Slovenia. Join our successful sales team.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical="https://www.win-win.si"
      />
      <ScrollIndicator sectionCount={9} />
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black">
        {/* Mobile: Overlay Layout */}
        <div className="lg:hidden">
          <div className="relative h-[45vh] overflow-hidden">
            <img
              src={heroMobileImageUrl}
              alt="Win Win Sales Team"
              className="w-full h-full object-cover"
              fetchPriority="high"
              width="800"
              height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 -mt-16 relative z-10 pb-12">
            <div className="glass-card p-6 sm:p-8 backdrop-blur-xl bg-black/40 border-white/20">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in-up leading-tight text-center">
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.title') }} />
                <br />
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.subtitle') }} />
              </h1>
              <p className="text-base sm:text-lg text-gray-200 mb-6 animate-fade-in-up leading-relaxed text-center" style={{ animationDelay: '0.2s' }}>
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.description') }} />
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => navigate('/apply')}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-red-600/50 flex items-center justify-center group"
                >
                  {t('home.hero.joinTeam')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 font-semibold"
                >
                  {t('home.hero.viewPositions')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Background Image with Right-Aligned Content */}
        <div className="hidden lg:block relative h-[85vh]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={heroImageUrl}
              alt="Win Win Sales Team"
              className="w-full h-full object-cover"
              fetchPriority="high"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-end">
            <div className="px-16 xl:px-24 max-w-3xl">
              <h1 className="text-5xl xl:text-6xl font-bold mb-6 animate-fade-in-up leading-tight">
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.title') }} />
                <br />
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.subtitle') }} />
              </h1>
              <p className="text-xl xl:text-2xl text-gray-200 mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                <span dangerouslySetInnerHTML={{ __html: t('home.hero.description') }} />
              </p>
              <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => navigate('/apply')}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 flex items-center group"
                >
                  {t('home.hero.joinTeam')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-lg font-semibold"
                >
                  {t('home.hero.viewPositions')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {t('home.partners.title')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-w-4xl mx-auto">
            <div className="group transition-all duration-300 flex items-center justify-center">
              <img
                src={partnerLogo1}
                alt="Optispin"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                width="200"
                height="64"
              />
            </div>

            <div className="group transition-all duration-300 flex items-center justify-center">
              <img
                src={partnerLogo2}
                alt="Temach"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-300"
                loading="lazy"
                width="200"
                height="64"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span dangerouslySetInnerHTML={{ __html: t('home.about.title') }} />
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                <span dangerouslySetInnerHTML={{ __html: t('home.about.description') }} />
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 text-center glass-card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-2xl" />
              <img
                src={aboutSectionImageUrl}
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl border border-white/20"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="absolute inset-0 radial-glow" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span dangerouslySetInnerHTML={{ __html: t('home.services.title') }} />
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              <span dangerouslySetInnerHTML={{ __html: t('home.services.description') }} />
            </p>
          </div>

          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-gray-500 rounded-full" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  <span dangerouslySetInnerHTML={{ __html: t('home.services.b2cField') }} />
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreServices.map((service, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-6 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-500/20 transition-colors">
                      <service.icon className="text-gray-400" size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-gray-500 rounded-full" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  <span dangerouslySetInnerHTML={{ __html: t('home.services.internalSupport') }} />
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportServices.map((service, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-6 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-500/20 transition-colors">
                      <service.icon className="text-gray-400" size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-gray-500 rounded-full" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  <span dangerouslySetInnerHTML={{ __html: t('home.services.marketFocus') }} />
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {marketFocus.map((service, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-8 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 bg-gray-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-500/20 transition-colors">
                      <service.icon className="text-gray-400" size={28} />
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
        <div className="absolute top-0 right-0 w-1/3 h-full radial-glow opacity-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span dangerouslySetInnerHTML={{ __html: t('home.benefits.title') }} />
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              <span dangerouslySetInnerHTML={{ __html: t('home.benefits.description') }} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover p-8 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gray-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-500/20 transition-colors">
                  <benefit.icon className="text-gray-400" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className={`relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black transition-all duration-1000 ${
          visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[55vh] overflow-hidden">
          <img
            src={joinTeamImageUrl}
            alt="Team success"
            className="w-full h-full object-cover"
            loading="lazy"
            width="1920"
            height="800"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 lg:-mt-20 relative z-10 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 sm:p-10 lg:p-12 backdrop-blur-xl bg-black/40 border-white/20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">
                <span dangerouslySetInnerHTML={{ __html: t('home.joinSection.title') }} />
              </h2>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed text-center max-w-3xl mx-auto">
                <span dangerouslySetInnerHTML={{ __html: t('home.joinSection.description') }} />
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/apply')}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 flex items-center justify-center group"
                >
                  {t('home.joinSection.startJourney')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-lg font-semibold"
                >
                  {t('home.joinSection.learnMore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
        <div className="absolute inset-0 radial-glow opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-white/5 rounded-2xl blur-2xl" />
                <img
                  src={benefitsImageUrl}
                  alt="Professional office environment"
                  className="relative rounded-2xl shadow-2xl border border-white/20"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span dangerouslySetInnerHTML={{ __html: t('home.cta.title') }} />
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: t('home.cta.description') }} />
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/jobs')}
                    className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 flex items-center justify-center group"
                  >
                    {t('home.cta.explore')}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="px-8 py-4 border-2 border-white/20 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-all duration-200 text-lg font-semibold"
                  >
                    {t('home.cta.learnMore')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[5] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 radial-glow opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span dangerouslySetInnerHTML={{ __html: t('home.process.title') }} />
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              <span dangerouslySetInnerHTML={{ __html: t('home.process.description') }} />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: t('home.process.steps.apply.title'), desc: t('home.process.steps.apply.desc') },
                { step: '02', title: t('home.process.steps.interview.title'), desc: t('home.process.steps.interview.desc') },
                { step: '03', title: t('home.process.steps.selection.title'), desc: t('home.process.steps.selection.desc') },
                { step: '04', title: t('home.process.steps.start.title'), desc: t('home.process.steps.start.desc') },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="glass-card glass-card-hover p-6 text-center h-full flex flex-col justify-center">
                    <div className="text-5xl font-bold text-gray-500/20 mb-2">{item.step}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-gray-500/30" size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12">
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 inline-flex items-center group"
              >
                {t('home.process.startApplication')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[6] = el)}
        className={`relative py-16 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <Smartphone className="w-16 h-16 text-gray-400" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                    <span dangerouslySetInnerHTML={{ __html: t('home.app.title') }} />
                  </h2>
                  <p className="text-gray-300 mb-6">
                    <span dangerouslySetInnerHTML={{ __html: t('home.app.description') }} />
                  </p>
                  <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold inline-flex items-center gap-2">
                    <Download size={20} />
                    {t('home.app.comingSoon')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[7] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="absolute inset-0 radial-glow opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500/10 rounded-full mb-4">
                <HelpCircle className="text-gray-400" size={32} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span dangerouslySetInnerHTML={{ __html: t('home.faq.title') }} />
              </h2>
              <p className="text-lg text-gray-300">
                <span dangerouslySetInnerHTML={{ __html: t('home.faq.description') }} />
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card overflow-hidden transition-all duration-300 hover:border-white/30"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                  >
                    <span className="text-lg font-semibold pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-0">
                      <div className="text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-6">{t('home.faq.stillQuestions')}</p>
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 inline-flex items-center group"
              >
                {t('home.faq.getInTouch')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[8] = el)}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black" />
        <div className="absolute inset-0 radial-glow opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-500/10 rounded-full border border-gray-500/20">
              <BookOpen className="text-gray-400" size={20} />
              <span className="text-gray-300 font-semibold">{t('home.blog.subtitle')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span dangerouslySetInnerHTML={{ __html: t('home.blog.title') }} />
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              <span dangerouslySetInnerHTML={{ __html: t('home.blog.description') }} />
            </p>
          </div>

          {loadingArticles ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
          ) : recentArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recentArticles.map((article) => (
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
              <div className="text-center">
                <button
                  onClick={() => navigate('/insights')}
                  className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-lg font-semibold inline-flex items-center group"
                >
                  {t('home.blog.viewAll')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">{t('home.blog.noArticles')}</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SEOContent
            title={t('seo.home.title')}
            content={t('seo.home.content')}
          />
        </div>
      </section>
    </div>
  );
}
