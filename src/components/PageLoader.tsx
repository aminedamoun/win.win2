import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const minLoadTime = 1000;
    const startTime = Date.now();

    const handleLoad = () => {
      const loadTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - loadTime);

      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-red-500/30 rounded-full blur-3xl animate-pulse scale-150" />
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse scale-125" />
          <img
            src="/logo2.png"
            alt="Win Win Logo"
            className="w-24 h-24 object-contain relative animate-pulse"
            style={{ animationDuration: '2s' }}
          />
        </div>
        <p className="text-gray-400 mt-6 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
