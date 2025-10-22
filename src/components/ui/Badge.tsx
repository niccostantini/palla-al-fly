import React from 'react';

interface BadgeProps {
  variant: 'open' | 'full' | 'cancelled' | 'overbooking';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border';
  
  const variantClasses = {
    open: 'bg-accent-aqua/10 text-[#025B66] border-accent-aqua/30 dark:bg-accent-aqua/20 dark:text-accent-aqua dark:border-accent-aqua/50',
    full: 'bg-brand-600 text-white border-brand-600 dark:bg-brand-600 dark:border-brand-600',
    cancelled: 'bg-danger-600/10 text-danger-600 border-danger-600/30 line-through dark:bg-danger-600/20 dark:text-red-400 dark:border-danger-600/50',
    overbooking: 'bg-accent-rose/10 text-[#7A0E3A] border-accent-rose/30 italic dark:bg-accent-rose/20 dark:text-accent-rose dark:border-accent-rose/50',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
