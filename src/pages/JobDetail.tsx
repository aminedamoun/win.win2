import { MapPin, DollarSign, ArrowRight, CheckCircle2, Briefcase, Clock } from 'lucide-react';
import { useRouter } from '../utils/router';
import { useEffect, useRef, useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';
import { supabase } from '../utils/supabase';
import { Job } from '../types';
import { useTranslation } from 'react-i18next';

export default function JobDetail() {
  const { currentPath, navigate } = useRouter();
  const { t, i18n } = useTranslation();
  const jobId = currentPath.split('/').pop();
  const [job, setJob] = useState<Job | null>(null);
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId, i18n.language]);

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

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setJobData(data);

        const currentLang = i18n.language;
        const title = currentLang === 'sl'
          ? (data.title_sl || data.title)
          : (data.title_en || data.title);
        const shortDescription = currentLang === 'sl'
          ? (data.short_description_sl || data.short_description)
          : (data.short_description_en || data.short_description);

        setJob({
          id: data.id,
          title,
          type: data.type,
          location: data.location,
          shortDescription,
          salaryRange: data.salary_range,
        });
      }
    } catch (err) {
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Position Not Found</h1>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            View All Positions
          </button>
        </div>
      </div>
    );
  }

  const currentLang = i18n.language;
  const responsibilities = jobData
    ? (currentLang === 'sl'
        ? (jobData.responsibilities_sl || jobData.responsibilities || [])
        : (jobData.responsibilities_en || jobData.responsibilities || []))
    : [];

  const whatWeOffer = jobData
    ? (currentLang === 'sl'
        ? (jobData.benefits_sl || jobData.benefits || [])
        : (jobData.benefits_en || jobData.benefits || []))
    : [];

  const requirements = jobData
    ? (currentLang === 'sl'
        ? (jobData.requirements_sl || jobData.requirements || [])
        : (jobData.requirements_en || jobData.requirements || []))
    : [];

  const fullDescription = jobData
    ? (currentLang === 'sl'
        ? (jobData.full_description_sl || jobData.full_description)
        : (jobData.full_description_en || jobData.full_description))
    : null;

  return (
    <div className="min-h-screen bg-black pt-20">
      <ScrollIndicator sectionCount={3} />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />
        <div className="absolute inset-0 radial-gradient" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/jobs')}
              className="text-gray-400 hover:text-red-500 transition-colors mb-6 flex items-center gap-2"
            >
              <ArrowRight size={20} className="rotate-180" />
              {t('jobs.backToAll')}
            </button>

            <div className="glass-card p-8 mb-8 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="text-red-500" size={32} />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-red-500" />
                      <span>{job.location}</span>
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={18} className="text-red-500" />
                        <span>{job.salaryRange}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-red-500" />
                      <span>{t('jobs.fullTime')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {fullDescription && (
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: fullDescription }} />
                </div>
              )}

              {!fullDescription && (
                <p className="text-lg text-gray-300 leading-relaxed">
                  {job.shortDescription}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate('/apply')}
              className="w-full md:w-auto px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 flex items-center justify-center group mb-12 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {t('jobs.applyForPosition')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`py-12 bg-gradient-to-b from-black to-neutral-950 transition-all duration-1000 ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {responsibilities.length > 0 && (
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">{t('jobs.responsibilities')}</h2>
                <ul className="space-y-4">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {whatWeOffer.length > 0 && (
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">{t('jobs.whatWeOffer')}</h2>
                <ul className="space-y-4">
                  {whatWeOffer.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requirements.length > 0 && (
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">{t('jobs.requirements')}</h2>
                <ul className="space-y-4">
                  {requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
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
                {t('jobs.readyToApply')} <span className="text-red-500">{t('jobs.apply')}</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {t('jobs.applyDescription')}
              </p>
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 inline-flex items-center group"
              >
                {t('jobs.applyNow')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
