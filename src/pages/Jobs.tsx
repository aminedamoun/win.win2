import { MapPin, Briefcase, ArrowRight, DollarSign } from 'lucide-react';
import { useRouter } from '../utils/router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollIndicator from '../components/ScrollIndicator';
import SEOContent from '../components/SEOContent';
import SEO from '../components/SEO';
import { supabase } from '../utils/supabase';
import { Job } from '../types';

export default function Jobs() {
  const { navigate } = useRouter();
  const { t, i18n } = useTranslation();
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [i18n.language]);

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

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      const currentLang = i18n.language;
      const formattedJobs: Job[] = (data || []).map(job => {
        const title = currentLang === 'sl'
          ? (job.title_sl || job.title)
          : (job.title_en || job.title);
        const shortDescription = currentLang === 'sl'
          ? (job.short_description_sl || job.short_description)
          : (job.short_description_en || job.short_description);

        return {
          id: job.id,
          title,
          type: job.type,
          location: job.location,
          shortDescription,
          salaryRange: job.salary_range,
        };
      });

      setJobs(formattedJobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getJobIcon = (type: string) => {
    return <Briefcase className="text-gray-400" size={24} />;
  };

  const seoTitle = i18n.language === 'sl'
    ? 'Prosta delovna mesta | Win Win - Prodajne kariere v Sloveniji'
    : 'Job Openings | Win Win - Sales Careers in Slovenia';

  const seoDescription = i18n.language === 'sl'
    ? 'Odkrijte prosta delovna mesta pri Win Win. Iščemo prodajnike, svetovalce za stranke in call center agente. Pridružite se našemu dinamičnemu timu in začnite svojo prodajno kariero danes.'
    : 'Discover job openings at Win Win. We are looking for sales representatives, customer advisors and call center agents. Join our dynamic team and start your sales career today.';

  return (
    <div className="min-h-screen bg-black pt-20">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical="https://www.win-win.si/jobs"
      />
      <ScrollIndicator sectionCount={2} />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-black to-black" />
        <div className="absolute inset-0 radial-gradient" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in-up">
              {t('jobs.title')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('jobs.description')}
            </p>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`py-20 bg-gradient-to-b from-black to-neutral-950 transition-all duration-1000 ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">{t('jobs.noJobs')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="glass-card glass-card-hover p-8 group cursor-pointer"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-500/20 transition-colors">
                          {getJobIcon(job.type)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2 transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-gray-400" />
                              <span>{job.location}</span>
                            </div>
                            {job.salaryRange && (
                              <div className="flex items-center gap-2">
                                <DollarSign size={16} className="text-gray-400" />
                                <span>{job.salaryRange}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {job.shortDescription}
                      </p>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium group-hover:shadow-lg group-hover:shadow-red-600/30 self-start md:self-center">
                      {t('jobs.viewDetails')}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`py-20 transition-all duration-1000 ${
          visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {t('jobs.noPosition')}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {t('jobs.noPositionDesc')}
              </p>
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 inline-flex items-center group"
              >
                {t('jobs.submitGeneral')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SEOContent
            title={t('seo.jobs.title')}
            content={t('seo.jobs.content')}
          />
        </div>
      </section>
    </div>
  );
}
