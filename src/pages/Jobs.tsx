import { MapPin, Briefcase, ArrowRight, DollarSign } from 'lucide-react';
import { useRouter } from '../utils/router';
import { jobs } from '../data/jobs';
import { useEffect, useRef, useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';

export default function Jobs() {
  const { navigate } = useRouter();
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const getJobIcon = (type: string) => {
    return <Briefcase className="text-gray-400" size={24} />;
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <ScrollIndicator sectionCount={2} />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-black to-black" />
        <div className="absolute inset-0 radial-gradient" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 animate-fade-in-up">
              Open Positions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join our team of high-performing sales professionals. We offer competitive compensation, comprehensive training, and clear career progression.
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

                    <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium group-hover:shadow-lg group-hover:shadow-red-500/30 self-start md:self-center">
                      View Details
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
                Don't See the Right Position?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We're always looking for talented sales professionals. Send us your application and we'll keep you in mind for future opportunities.
              </p>
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 inline-flex items-center group"
              >
                Submit General Application
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
