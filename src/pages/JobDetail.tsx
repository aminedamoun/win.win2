import { MapPin, DollarSign, ArrowRight, CheckCircle2, Briefcase, Clock } from 'lucide-react';
import { useRouter } from '../utils/router';
import { jobs } from '../data/jobs';
import { useEffect, useRef, useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';

export default function JobDetail() {
  const { currentPath, navigate } = useRouter();
  const jobId = currentPath.split('/').pop();
  const job = jobs.find((j) => j.id === jobId);

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

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Position Not Found</h1>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            View All Positions
          </button>
        </div>
      </div>
    );
  }

  const isTeamLeader = job.id === 'sales-team-leader';

  const responsibilities = isTeamLeader
    ? [
        'Managing and leading a team of sales advisors',
        'Coaching and developing team members',
        'Tracking and analyzing team KPIs',
        'Optimizing sales processes and strategies',
        'Conducting team meetings and training sessions',
        'Reporting to management on team performance',
      ]
    : [
        'Phone and field communication with potential customers',
        'Presenting telecommunications and ICT solutions',
        'Preparing customized offers and closing deals',
        'Daily tracking of KPIs and sales metrics',
        'Participating in coaching and sales training sessions',
        'Building long-term customer relationships',
      ];

  const whatWeOffer = isTeamLeader
    ? [
        'Base salary: €2,000+ plus performance bonuses',
        'Leadership autonomy and decision-making power',
        'Stable long-term employment contract',
        'Comprehensive support and company structure',
        'Professional development opportunities',
        'Modern CRM and management tools',
      ]
    : [
        'Competitive base salary plus uncapped commission',
        'Qualified leads, proven scripts, and CRM access',
        'Structured onboarding and continuous training',
        'Long-term cooperation (employment or freelance options)',
        'Clear career progression to Team Leader role',
        'Flexibility in work arrangements (office, field, remote for seniors)',
        'Meaningful work helping customers save money',
      ];

  const requirements = isTeamLeader
    ? [
        'Previous sales or leadership experience',
        'Strong understanding of CRM systems and KPIs',
        'Excellent communication and motivation skills',
        'Performance-driven mindset',
        'Problem-solving abilities',
        'Team management experience',
      ]
    : [
        'Strong verbal and written communication skills',
        'High motivation and ambition to succeed',
        'Discipline, persistence, and responsibility',
        'Professional approach to customer interactions',
        'Sales mindset and goal-oriented attitude',
        'Willingness to learn and develop',
      ];

  const advantages = isTeamLeader
    ? [
        'Experience in telecommunications or insurance sales',
        'B2B and B2C market knowledge',
        'Coaching and mentoring certifications',
        'Advanced data analysis skills',
      ]
    : [
        'Previous experience in telecom or insurance sales',
        'Knowledge of B2C or B2B markets',
        'Valid driving license (Category B) for field sales',
        'Coaching or leadership aspirations',
      ];

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
              Back to All Positions
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
                      <span>Full-time</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                {job.shortDescription}
              </p>
            </div>

            <button
              onClick={() => navigate('/apply')}
              className="w-full md:w-auto px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center group mb-12 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Apply for This Position
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
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-6">Main Responsibilities</h2>
              <ul className="space-y-4">
                {responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
              <ul className="space-y-4">
                {whatWeOffer.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-6">What We Expect</h2>
              <ul className="space-y-4">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold mb-6">Advantages</h2>
              <ul className="space-y-4">
                {advantages.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
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
                Ready to <span className="text-red-500">Apply?</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Take the first step towards building your career with Win Win. Submit your application today and join our team of high-performing sales professionals.
              </p>
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 inline-flex items-center group"
              >
                Apply Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
