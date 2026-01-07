import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/95 backdrop-blur-lg border-t border-red-900/20 animate-fade-in-up">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="text-red-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-1">Cookie Notice</h3>
              <p className="text-gray-300 text-sm">
                We use cookies to improve your experience. By using our website, you agree to our use of cookies.{' '}
                <button className="text-red-400 hover:text-red-300 hover:underline" aria-label="Learn more about cookies">Learn more</button>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={declineCookies}
              className="px-6 py-3 border-2 border-white/30 text-white rounded-lg hover:border-red-500 hover:bg-red-500/10 transition-all duration-200 text-sm font-semibold"
              aria-label="Decline cookies"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-semibold shadow-lg"
              aria-label="Accept cookies"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
