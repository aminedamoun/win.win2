import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionCount: number;
}

export default function ScrollIndicator({ sectionCount }: ScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dots = Array.from({ length: sectionCount }, (_, i) => ({
    position: (i / (sectionCount - 1)) * 100,
    index: i,
  }));

  return (
    <div className="hidden lg:block fixed right-12 top-0 h-screen z-50 pointer-events-none">
      <div className="relative h-full w-px flex items-center justify-center py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <div className="relative h-full w-px bg-white/10">
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-gray-200 shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />

          {dots.map((dot) => (
            <div
              key={dot.index}
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
              style={{ top: `${dot.position}%` }}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  scrollProgress >= dot.position
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-100'
                    : 'bg-white/30 scale-75'
                }`}
              />
              {scrollProgress >= dot.position && (
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-white animate-ping opacity-75" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
