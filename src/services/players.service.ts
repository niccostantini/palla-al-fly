import { supabase } from '../lib/supabase';
import type { Player, PlayerRole } from '../types/database';

export const playersService = {
  async getPlayersByMatchId(matchId: string) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: true });
    
    return { data: data as Player[], error };
  },

  async addPlayer(playerData: {
    match_id: string;
    name: string;
    role: PlayerRole;
    phone_number?: string;
    created_by: string;
  }) {
    const { data, error } = await supabase
      .from('players')
      .insert(playerData)
      .select()
      .single();
    
    return { data: data as Player, error };
  },

  async removePlayer(id: string) {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);
    
    return { error };
  },

  async getPlayerById(id: string) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data: data as Player, error };
  },
};
