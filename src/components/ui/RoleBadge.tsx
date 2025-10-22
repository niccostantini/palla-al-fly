import React from 'react';
import type { PlayerRole } from '../../types/database';

interface RoleBadgeProps {
  role: PlayerRole;
  children: React.ReactNode;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, children, className = '' }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border';
  
  const roleColors = {
    setter: 'bg-role-setter/10 text-[#3D1A99] border-role-setter/30 dark:bg-role-setter/20 dark:text-[#8B7BE8] dark:border-role-setter/50',
    oh: 'bg-role-oh/10 text-[#025B66] border-role-oh/30 dark:bg-role-oh/20 dark:text-role-oh dark:border-role-oh/50',
    oph: 'bg-role-oph/10 text-[#7A0E3A] border-role-oph/30 dark:bg-role-oph/20 dark:text-role-oph dark:border-role-oph/50',
    mb: 'bg-role-mb/10 text-[#3D4F05] border-role-mb/30 dark:bg-role-mb/20 dark:text-role-mb dark:border-role-mb/50',
    l: 'bg-role-l/10 text-[#854D0E] border-role-l/30 dark:bg-role-l/20 dark:text-role-l dark:border-role-l/50',
  };

  return (
    <span className={`${baseClasses} ${roleColors[role]} ${className}`}>
      {children}
    </span>
  );
};
