import { supabase } from '../lib/supabase';
import type { Venue } from '../types/database';

export const venuesService = {
  async getAllVenues() {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .order('name', { ascending: true });
    
    return { data: data as Venue[], error };
  },

  async getVenueById(id: string) {
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data: data as Venue, error };
  },

  async createVenue(venueData: {
    name: string;
    address: string;
  }) {
    const { data, error } = await supabase
      .from('venues')
      .insert(venueData)
      .select()
      .single();
    
    return { data: data as Venue, error };
  },

  async updateVenue(id: string, updates: Partial<Venue>) {
    const { data, error } = await supabase
      .from('venues')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data: data as Venue, error };
  },

  async deleteVenue(id: string) {
    const { error } = await supabase
      .from('venues')
      .delete()
      .eq('id', id);
    
    return { error };
  },
};
