import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

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
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <Loader2 className="w-16 h-16 text-red-500 animate-spin relative" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Win Win</h2>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
