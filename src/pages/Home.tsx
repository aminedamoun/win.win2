import { TrendingUp, Users, Award, MapPin, Target, Briefcase, ArrowRight, CheckCircle2, Smartphone, Download, Phone, Wifi, MessageSquare, UserCheck, GraduationCap, LineChart, Settings, Building2, Home as HomeIcon, HelpCircle, ChevronDown, BookOpen } from 'lucide-react';
import { useRouter } from '../utils/router';
import { useEffect, useRef, useState } from 'react';
import ScrollIndicator from '../components/ScrollIndicator';
import ArticleCard from '../components/ArticleCard';
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
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [heroImageUrl, setHeroImageUrl] = useState('https://6949b72b30e1aa8ca4b7eef2.imgix.net/winwin.webp?auto=compress&cs=tinysrgb&w=1920');
  const [aboutSectionImageUrl, setAboutSectionImageUrl] = useState('https://6949b72b30e1aa8ca4b7eef2.imgix.net/image-gen%20(7).png?auto=compress&cs=tinysrgb&w=1920');
  const [joinTeamImageUrl, setJoinTeamImageUrl] = useState('https://6949b72b30e1aa8ca4b7eef2.imgix.net/image-gen%20(7).png?auto=compress&cs=tinysrgb&w=1920');
  const [whyChooseImageUrl, setWhyChooseImageUrl] = useState('https://6949b72b30e1aa8ca4b7eef2.imgix.net/image-gen%20(7).png?auto=compress&cs=tinysrgb&w=800');
  const [benefitsImageUrl, setBenefitsImageUrl] = useState('https://6949b72b30e1aa8ca4b7eef2.imgix.net/image-gen%20(9).png?auto=compress&cs=tinysrgb&w=800');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch all images from database
        const { data: images } = await supabase
          .from('website_images')
          .select('url, usage_location')
          .in('usage_location', ['home-hero', 'home-about', 'home-join-team', 'home-why-choose', 'home-benefits']);

        if (images) {
          images.forEach(img => {
            if (img.usage_location === 'home-hero') {
              setHeroImageUrl(img.url);
            } else if (img.usage_location === 'home-about') {
              setAboutSectionImageUrl(img.url);
            } else if (img.usage_location === 'home-join-team') {
              setJoinTeamImageUrl(img.url);
            } else if (img.usage_location === 'home-why-choose') {
              setWhyChooseImageUrl(img.url);
            } else if (img.usage_location === 'home-benefits') {
              setBenefitsImageUrl(img.url);
            }
          });
        }
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

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
      title: 'Monthly Training & Mentoring',
      description: 'Continuous coaching and skill development from experienced sales professionals',
    },
    {
      icon: TrendingUp,
      title: 'Clear Career Paths',
      description: 'Structured progression from Sales Advisor to Team Leader and beyond',
    },
    {
      icon: Award,
      title: 'High Earning Potential',
      description: 'Competitive base salary plus performance-based commission structure',
    },
    {
      icon: Briefcase,
      title: 'Modern Tools & Scripts',
      description: 'Access to proven sales scripts, CRM systems, and qualified leads',
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Offices in Trzin and Kranj with nationwide field operations',
    },
    {
      icon: Target,
      title: 'Performance-Driven',
      description: 'Clear KPIs and transparent metrics to track your success',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Clients' },
    { value: '50+', label: 'Team Members' },
    { value: '3', label: 'Office Locations' },
    { value: '10+', label: 'Years Experience' },
  ];

  const coreServices = [
    {
      icon: HomeIcon,
      title: 'B2C Field Sales',
      description: 'Door-to-door sales with direct customer visits, on-site presentations, and in-person contract signing across Slovenia.',
    },
    {
      icon: Phone,
      title: 'Call Center Sales',
      description: 'Outbound telemarketing with structured scripts, KPI-driven performance, and CRM-based customer management.',
    },
    {
      icon: Wifi,
      title: 'Telecommunications Sales',
      description: 'Internet, TV, mobile contracts, and bundled solutions with contract upgrades and renewals.',
    },
    {
      icon: MessageSquare,
      title: 'Direct Marketing',
      description: 'Performance-based acquisition with long-term customer relationships and ethical, transparent selling.',
    },
  ];

  const supportServices = [
    {
      icon: GraduationCap,
      title: 'Sales Training & Coaching',
      description: 'Monthly programs, mentoring, role-play simulations, and skill development workshops.',
    },
    {
      icon: Users,
      title: 'Team Development',
      description: '14-day onboarding, selection programs, performance improvement, and career path planning.',
    },
    {
      icon: LineChart,
      title: 'Leadership & Management',
      description: 'KPI tracking, performance monitoring, process optimization, and coaching for team leaders.',
    },
    {
      icon: Settings,
      title: 'CRM & Process Optimization',
      description: 'Modern CRM systems, script optimization, lead management, and structured daily targets.',
    },
  ];

  const marketFocus = [
    {
      icon: UserCheck,
      title: 'B2C Market Specialization',
      description: 'Primary focus on residential customers, households, and individual end users.',
    },
    {
      icon: Building2,
      title: 'B2B Sales Support',
      description: 'Secondary focus on business telecom solutions and ICT-related offers.',
    },
  ];

  const faqs = [
    {
      question: 'Do I need previous sales experience?',
      answer: 'No. Previous sales experience is an advantage, but it is not mandatory. We provide structured onboarding, scripts, and continuous coaching. What matters most is motivation, discipline, and the willingness to learn.',
    },
    {
      question: 'What type of sales will I be doing?',
      answer: 'You will work in B2C sales, either door-to-door field sales or call center sales. You will sell telecommunications services, including Internet, TV, and Mobile contracts for end customers.',
    },
    {
      question: 'Is this a full-time position or freelance work?',
      answer: 'Both options are possible. Depending on your profile and agreement, you can work as a full-time employee or as a freelancer (s.p. / company collaboration).',
    },
    {
      question: 'What are the working hours?',
      answer: 'Working hours are structured and clearly defined. Field and call center schedules are organized to support productivity and work-life balance. Specific schedules are discussed during the interview.',
    },
    {
      question: 'How does payment work?',
      answer: 'You receive a base salary or hourly rate plus performance-based commission. Your earnings depend directly on your results. High performers can achieve above-average monthly income.',
    },
    {
      question: 'How quickly can I advance within the company?',
      answer: 'Career progression is performance-based. Successful Sales Advisors can advance to Senior Sales Advisor, Sales Team Leader, or Sales Manager. We actively promote from within.',
    },
    {
      question: 'Do you provide training and support?',
      answer: 'Yes. You receive structured onboarding, sales scripts and CRM tools, monthly coaching and mentoring, and regular sales training and feedback sessions. You are never left alone.',
    },
    {
      question: 'Where are your offices located?',
      answer: 'We operate from offices in Trzin and Kranj. Field sales cover all of Slovenia.',
    },
    {
      question: 'Is remote work possible?',
      answer: 'For experienced candidates and leadership positions, remote or hybrid work may be possible. This is evaluated individually.',
    },
    {
      question: 'What is the selection process?',
      answer: 'The process includes: online application, personal interview & sales simulation, 14-day selection and onboarding program, and contract signing and long-term cooperation.',
    },
    {
      question: 'What kind of people are you looking for?',
      answer: 'We are looking for people who are competitive by nature, goal-oriented, positive and disciplined, motivated to grow professionally and financially, and ready to take responsibility for their success.',
    },
    {
      question: 'What makes Win Win different from other sales companies?',
      answer: 'We combine clear structure, honest communication, strong coaching culture, long-term career opportunities, and a results-driven but supportive environment. At Win Win, success is not luck — it is a system.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-950 to-black">
      <ScrollIndicator sectionCount={9} />
      <section className="relative min-h-screen flex items-center justify-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/90" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div></div>

            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up leading-tight">
                Build Your Career with{' '}
                <span className="gradient-text">Win Win</span>
                <br />
                <span className="text-red-500">Sales Team</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 mb-8 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                We are a performance-driven sales company specializing in B2C field sales, call center sales, and telecommunications solutions across Slovenia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => navigate('/apply')}
                  className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center group"
                >
                  Join the Team
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-lg font-semibold backdrop-blur-sm"
                >
                  View Open Positions
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-red-500/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-red-500 rounded-full mt-2 animate-pulse" />
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Who We <span className="text-red-500">Are</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Win Win d.o.o. is a team of experienced sales professionals specializing in direct marketing and long-term customer relationships. We operate from multiple locations across Slovenia and build an environment where effort, discipline, and persistence are rewarded.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 text-center glass-card-hover"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-3xl font-bold text-red-500 mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-2xl" />
              <img
                src={aboutSectionImageUrl}
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl border border-red-500/20"
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
              Our <span className="text-red-500">Services</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Comprehensive sales solutions and support systems that drive results
            </p>
          </div>

          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-red-500 rounded-full" />
                <h3 className="text-2xl sm:text-3xl font-bold text-red-500">Core Services</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreServices.map((service, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-6 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                      <service.icon className="text-red-500" size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-red-500 rounded-full" />
                <h3 className="text-2xl sm:text-3xl font-bold text-red-500">Internal Support Services</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportServices.map((service, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-6 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                      <service.icon className="text-red-500" size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-red-500 rounded-full" />
                <h3 className="text-2xl sm:text-3xl font-bold text-red-500">Market Focus</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {marketFocus.map((service, index) => (
                  <div
                    key={index}
                    className="glass-card glass-card-hover p-8 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                      <service.icon className="text-red-500" size={28} />
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
              Why Choose <span className="text-red-500">Win Win</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We provide everything you need to build a successful career in sales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover p-8 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <benefit.icon className="text-red-500" size={28} />
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
        className={`relative py-24 overflow-hidden transition-all duration-1000 ${
          visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0">
          <img
            src={joinTeamImageUrl}
            alt="Team success"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Join Slovenia's Leading <span className="text-red-500">Sales Team</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're building the most effective and respected sales organization in Slovenia. Our team members benefit from industry-leading training, competitive compensation, and a culture that celebrates success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-200 text-lg font-semibold"
              >
                Learn More
              </button>
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
                <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-2xl" />
                <img
                  src={benefitsImageUrl}
                  alt="Professional office environment"
                  className="relative rounded-2xl shadow-2xl border border-red-500/20"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Ready to Start Your <span className="text-red-500">Sales Career?</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Join a team of dedicated professionals who are committed to excellence, growth, and results. We're looking for motivated individuals ready to take their career to the next level.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/jobs')}
                    className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center group"
                  >
                    Explore Opportunities
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className="px-8 py-4 border-2 border-white/20 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-all duration-200 text-lg font-semibold"
                  >
                    Learn More About Us
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
              Our <span className="text-red-500">Process</span>
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              A simple, transparent path to joining our team
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Apply Online', desc: 'Submit your application through our portal' },
                { step: '02', title: 'Interview', desc: 'Meet with our team and discuss opportunities' },
                { step: '03', title: 'Selection Program', desc: '14-day training and evaluation period' },
                { step: '04', title: 'Start Working', desc: 'Sign contract and begin your career' },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="glass-card glass-card-hover p-6 text-center h-full flex flex-col justify-center">
                    <div className="text-5xl font-bold text-red-500/20 mb-2">{item.step}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-red-500/30" size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12">
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 inline-flex items-center group"
              >
                Start Your Application
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
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-red-950/20 to-neutral-950" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <Smartphone className="w-16 h-16 text-red-500" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                    Apply On The <span className="text-red-500">Go</span>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Track your application, get instant updates, and stay connected with our mobile app
                  </p>
                  <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold inline-flex items-center gap-2">
                    <Download size={20} />
                    Coming Soon
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
                <HelpCircle className="text-red-500" size={32} />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Frequently Asked <span className="text-red-500">Questions</span>
              </h2>
              <p className="text-lg text-gray-300">
                Everything you need to know about joining Win Win
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card overflow-hidden transition-all duration-300 hover:border-red-500/30"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                  >
                    <span className="text-lg font-semibold pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`flex-shrink-0 text-red-500 transition-transform duration-300 ${
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
              <p className="text-gray-400 mb-6">Still have questions?</p>
              <button
                onClick={() => navigate('/apply')}
                className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 inline-flex items-center group"
              >
                Get in Touch
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20">
              <BookOpen className="text-red-500" size={20} />
              <span className="text-red-500 font-semibold">Latest Insights</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              From Our <span className="text-red-500">Blog</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Sales strategies, career advice, and stories from the Win Win team
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
                  View All Articles
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No articles available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
