import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const { user, isAdmin, signOut } = useAuth();
  console.log('[Header] User state:', { user: user?.email, isAdmin });
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg transition-colors">
      <div className="container mx-auto px-3 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Link to="/" className="text-xl font-display font-bold hover:text-accent-aqua transition-colors">
            {t('header.title')}
          </Link>
          
          <nav className="flex items-center gap-2 flex-wrap ml-auto">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs sm:text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle language"
            >
              {i18n.language === 'it' ? '🇬🇧 EN' : '🇮🇹 IT'}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="px-2 py-1 text-xs sm:text-sm hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {user ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => navigate('/create-match')}
                  className="text-xs sm:text-sm px-3 py-1"
                >
                  {t('header.createMatch')}
                </Button>
                {isAdmin && (
                  <Button
                    variant="primary"
                    onClick={() => navigate('/venues')}
                    className="text-xs sm:text-sm px-3 py-1"
                  >
                    {t('header.venues')}
                  </Button>
                )}
                <span className="text-xs sm:text-sm text-blue-100 dark:text-gray-300 truncate max-w-[40vw] sm:max-w-none">
                  {user.email}
                </span>
                <Button
                  variant="secondary"
                  onClick={handleSignOut}
                  className="text-xs sm:text-sm px-3 py-1"
                >
                  {t('header.logout')}
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="secondary" className="text-xs sm:text-sm px-3 py-1">
                  {t('header.login')}
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
