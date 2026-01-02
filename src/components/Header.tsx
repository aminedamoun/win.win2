import { useEffect, useState } from 'react';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { useRouter } from '../utils/router';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { supabase } from '../utils/supabase';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { navigate, currentPath } = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkAuth();
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    setIsAuthenticated(!!data.session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.aboutUs'), path: '/about' },
    { label: t('nav.careers'), path: '/jobs' },
    { label: t('nav.insights'), path: '/insights' },
    { label: t('nav.apply'), path: '/apply' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-lg shadow-lg border-b border-red-900/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img src="/logo2.png" alt="Win Win" className="h-10 w-auto" />
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  currentPath === item.path ? 'text-red-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-200 ${
                    currentPath === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <a
                  href="/admin.html"
                  className="px-5 py-2.5 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  Admin Panel
                </a>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm font-medium flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login.html"
                className="px-5 py-2.5 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm font-medium flex items-center gap-2"
              >
                <LogIn size={16} />
                Login
              </a>
            )}
            <button
              onClick={() => handleNavigation('/jobs')}
              className="px-5 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {t('nav.viewPositions')}
            </button>
            <button
              onClick={() => handleNavigation('/apply')}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-red-500/50"
            >
              {t('nav.joinTeam')}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-red-500 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-lg border-t border-red-900/20">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-left text-base font-medium transition-colors ${
                  currentPath === item.path ? 'text-red-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 space-y-3">
              <div className="flex justify-center pb-3">
                <LanguageSwitcher />
              </div>
              {isAuthenticated ? (
                <>
                  <a
                    href="/admin.html"
                    className="w-full px-5 py-2.5 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm font-medium block text-center"
                  >
                    Admin Panel
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-2.5 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login.html"
                  className="w-full px-5 py-2.5 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <LogIn size={16} />
                  Login
                </a>
              )}
              <button
                onClick={() => handleNavigation('/jobs')}
                className="w-full px-5 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                {t('nav.viewPositions')}
              </button>
              <button
                onClick={() => handleNavigation('/apply')}
                className="w-full px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-medium"
              >
                {t('nav.joinTeam')}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
