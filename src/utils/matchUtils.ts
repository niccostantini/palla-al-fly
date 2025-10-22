import type { Match, Player, PlayerRole, RoleCapacity, MatchStatus } from '../types/database';

export const getRoleCapacities = (match: Match, players: Player[]): RoleCapacity[] => {
  const roles: PlayerRole[] = ['setter', 'oh', 'oph', 'mb', 'l'];
  
  return roles.map(role => {
    const required = match[`${role}_req` as keyof Match] as number;
    const current = players.filter(p => p.role === role).length;
    
    return {
      role,
      required,
      current,
    };
  });
};

export const getRoleLabel = (role: PlayerRole): string => {
  const labels: Record<PlayerRole, string> = {
    setter: 'Setter (S)',
    oh: 'Outside Hitter (OH)',
    oph: 'Opposite Hitter (OpH)',
    mb: 'Middle Blocker (MB)',
    l: 'Libero (L)',
  };
  return labels[role];
};

export const isRoleOverbooked = (role: PlayerRole, match: Match, players: Player[]): boolean => {
  const required = match[`${role}_req` as keyof Match] as number;
  const current = players.filter(p => p.role === role).length;
  return current > required;
};

export const isPlayerOverbooked = (player: Player, match: Match, players: Player[]): boolean => {
  return isRoleOverbooked(player.role, match, players);
};

export const hasOverbooking = (match: Match, players: Player[]): boolean => {
  const roles: PlayerRole[] = ['setter', 'oh', 'oph', 'mb', 'l'];
  return roles.some(role => isRoleOverbooked(role, match, players));
};

export const calculateMatchStatus = (match: Match, players: Player[]): MatchStatus => {
  if (match.status === 'cancelled') return 'cancelled';
  
  const capacities = getRoleCapacities(match, players);
  const allFull = capacities.every(cap => cap.current >= cap.required);
  
  return allFull ? 'full' : 'open';
};

export const getMatchStatusBadges = (match: Match, players: Player[]): string[] => {
  const badges: string[] = [];
  
  if (match.status === 'cancelled') {
    badges.push('cancelled');
  } else if (match.status === 'full' || calculateMatchStatus(match, players) === 'full') {
    badges.push('full');
    if (hasOverbooking(match, players)) {
      badges.push('overbooking');
    }
  } else {
    badges.push('open');
  }
  
  return badges;
};
