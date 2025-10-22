import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4 border border-gray-200 dark:border-gray-700';
  const clickableClass = onClick ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : '';

  return (
    <div
      className={`${baseClasses} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
