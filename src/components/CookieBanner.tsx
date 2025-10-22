import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-sm">
            <p>
              Questo sito utilizza cookie tecnici per migliorare l'esperienza di navigazione.{' '}
              <Link to="/cookie-policy" className="underline hover:text-gray-300">
                Scopri di più
              </Link>
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="secondary"
              onClick={handleDecline}
              className="text-sm px-4 py-2"
            >
              Rifiuta
            </Button>
            <Button
              variant="primary"
              onClick={handleAccept}
              className="text-sm px-4 py-2"
            >
              Accetta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
