import { supabase } from '../lib/supabase';
import type { Match, MatchStatus } from '../types/database';

export const matchesService = {
  async getAllMatches() {
    console.log('[matchesService] getAllMatches called');
    try {
      const { data, error } = await Promise.race([
        supabase
          .from('matches')
          .select('*, venue:venues(*)')
          .order('date', { ascending: true })
          .order('time', { ascending: true }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Matches fetch timeout')), 10000)
        )
      ]);
      console.log('[matchesService] getAllMatches result:', { dataLength: data?.length, error });
      return { data: data as Match[], error };
    } catch (err) {
      console.error('[matchesService] getAllMatches error:', err);
      return { data: [], error: err };
    }
  },

  async getMatchById(id: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('*, venue:venues(*)')
      .eq('id', id)
      .single();
    
    return { data: data as Match, error };
  },

  async createMatch(matchData: {
    title: string;
    date: string;
    time: string;
    venue_id: string;
    created_by: string;
    status?: MatchStatus;
    setter_req?: number;
    oh_req?: number;
    oph_req?: number;
    mb_req?: number;
    l_req?: number;
    notes?: string;
  }) {
    const { data, error } = await supabase
      .from('matches')
      .insert({
        ...matchData,
        status: matchData.status || 'open',
      })
      .select('*, venue:venues(*)')
      .single();
    
    return { data: data as Match, error };
  },

  async updateMatch(id: string, updates: Partial<Match>) {
    const { data, error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id)
      .select('*, venue:venues(*)')
      .single();
    
    return { data: data as Match, error };
  },

  async deleteMatch(id: string) {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);
    
    return { error };
  },

  async updateMatchStatus(id: string, status: MatchStatus) {
    return this.updateMatch(id, { status });
  },

  async getUserMatchQuota(userEmail: string) {
    try {
      const { data, error } = await supabase
        .rpc('count_user_matches_last_7_days', { user_email: userEmail });
      
      if (error) {
        console.error('[matchesService] getUserMatchQuota error:', error);
        return { count: 0, error };
      }
      
      return { count: data as number, error: null };
    } catch (err) {
      console.error('[matchesService] getUserMatchQuota exception:', err);
      return { count: 0, error: err };
    }
  },
};
