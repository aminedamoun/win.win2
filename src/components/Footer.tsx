import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useRouter } from '../utils/router';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { navigate } = useRouter();
  const { t } = useTranslation();

  const footerLinks = {
    [t('footer.company')]: [
      { label: t('footer.links.aboutUs'), path: '/about' },
      { label: t('footer.links.careers'), path: '/jobs' },
      { label: t('footer.links.contact'), path: '/apply' },
    ],
    [t('footer.legal')]: [
      { label: t('footer.links.privacy'), path: '/privacy' },
      { label: t('footer.links.cookies'), path: '/cookies' },
      { label: t('footer.links.terms'), path: '/terms' },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-black to-neutral-950 border-t border-red-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="/logo2.png" alt="Win Win" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-red-500" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone size={16} className="flex-shrink-0 text-red-500" />
                <span>+386 31 678 732</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail size={16} className="flex-shrink-0 text-red-500" />
                <span>office@win-win.si</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-900/20 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Win Win d.o.o. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
