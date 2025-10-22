import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Palla al Fly. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
