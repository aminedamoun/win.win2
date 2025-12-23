import { Target, Heart, Shield, TrendingUp, Users, Award, MessageCircle, Handshake } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import FAQ from '../components/FAQ';
import { supabase } from '../utils/supabase';

export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heroImageUrl, setHeroImageUrl] = useState('https://6949b72b30e1aa8ca4b7eef2.imgix.net/slomap.png?auto=compress&cs=tinysrgb&w=1920');

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const { data } = await supabase
          .from('website_images')
          .select('url')
          .eq('usage_location', 'about-hero')
          .maybeSingle();

        if (data && data.url) {
          setHeroImageUrl(data.url);
        }
      } catch (err) {
        console.error('Error fetching hero image:', err);
      }
    };

    fetchHeroImage();
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

  const values = [
    {
      icon: Shield,
      title: 'Integrity & Honesty',
      description: 'We build trust through transparent communication and ethical business practices',
      image: 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/winwin.webp',
    },
    {
      icon: Handshake,
      title: 'Reliability',
      description: 'Our clients and team members can count on us to deliver on our commitments',
      image: 'https://6949b72b30e1aa8ca4b7eef2.imgix.net/slomap.png',
    },
    {
      icon: MessageCircle,
      title: 'Professional Communication',
      description: 'Clear, respectful, and effective communication in every interaction',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: TrendingUp,
      title: 'Performance & Growth',
      description: 'Continuous improvement and measurable results drive our success',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Heart,
      title: 'Team Support',
      description: 'We succeed together through collaboration and mutual support',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do',
      image: 'https://images.pexels.com/photos/5849585/pexels-photo-5849585.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const culture = [
    'Results-driven mindset with clear KPIs',
    'Team collaboration and knowledge sharing',
    'Continuous learning and skill development',
    'Coaching and mentoring programs',
    'Recognition and rewards for excellence',
    'Work-life balance and flexibility',
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black">
        <div className="relative h-[40vh] sm:h-[50vh] lg:h-[55vh] overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 lg:-mt-20 relative z-10 pb-8 sm:pb-12 lg:pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-6 sm:p-10 lg:p-12 backdrop-blur-xl bg-black/40 border-red-500/20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in-up text-center">
                About <span className="text-red-500">Win Win</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed animate-fade-in-up text-center max-w-4xl mx-auto" style={{ animationDelay: '0.2s' }}>
                We are a team that lives sales. Win Win d.o.o. was built on the belief that sales can be done differently — honestly, ethically, and with a long-term mindset.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className={`py-6 sm:py-12 lg:py-20 bg-gradient-to-b from-black via-red-950/10 to-black transition-all duration-1000 ${
          visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="glass-card p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Target className="text-red-500" size={28} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become the most effective and respected sales company in Slovenia, known for our integrity, results, and commitment to both clients and team members.
              </p>
            </div>

            <div className="glass-card p-6 sm:p-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="text-red-500" size={28} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To deliver more value to customers than they expect, through trust, structure, and top-level sales expertise. We build long-term relationships that benefit everyone involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`py-6 sm:py-12 lg:py-20 bg-black transition-all duration-1000 ${
          visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
              Our Core <span className="text-red-500">Values</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do and define who we are as a company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card glass-card-hover overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <value.icon className="text-white" size={24} />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`py-6 sm:py-12 lg:py-20 bg-gradient-to-b from-black via-red-950/10 to-black transition-all duration-1000 ${
          visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
                Company <span className="text-red-500">Culture</span>
              </h2>
              <p className="text-lg text-gray-300">
                We've built an environment where talented professionals can thrive
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {culture.map((item, index) => (
                <div
                  key={index}
                  className="glass-card p-4 sm:p-6 flex items-start space-x-3 sm:space-x-4 glass-card-hover"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className={`py-6 sm:py-12 lg:py-20 bg-black transition-all duration-1000 ${
          visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
                Our <span className="text-red-500">Team</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                We operate from multiple locations across Slovenia with a growing team of dedicated sales professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="glass-card p-6 sm:p-8 text-center">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">50+</h3>
                <p className="text-gray-400">Active Team Members</p>
              </div>

              <div className="glass-card p-6 sm:p-8 text-center">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Field + Call Center</h3>
                <p className="text-gray-400">Hybrid Operations</p>
              </div>

              <div className="glass-card p-6 sm:p-8 text-center">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Multiple Locations</h3>
                <p className="text-gray-400">Trzin, Kranj & Field</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className={`py-6 sm:py-12 lg:py-20 bg-gradient-to-b from-black via-red-950/10 to-black transition-all duration-1000 ${
          visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>
    </div>
  );
}
