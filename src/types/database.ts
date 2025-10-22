export type MatchStatus = 'open' | 'full' | 'cancelled';
export type PlayerRole = 'setter' | 'oh' | 'oph' | 'mb' | 'l';

export interface Venue {
  id: string;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  title: string;
  date: string;
  time: string;
  venue_id: string;
  venue?: Venue;
  status: MatchStatus;
  setter_req: number;
  oh_req: number;
  oph_req: number;
  mb_req: number;
  l_req: number;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  match_id: string;
  name: string;
  role: PlayerRole;
  phone_number?: string;
  created_by: string;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  created_at: string;
}

export interface RoleCapacity {
  role: PlayerRole;
  required: number;
  current: number;
}
