import { supabase } from '../lib/supabase';
import type { Admin } from '../types/database';

export const adminsService = {
  async getAllAdmins() {
    const { data, error } = await supabase
      .from('admins')
      .select('*');
    
    return { data: data as Admin[], error };
  },

  async isAdmin(email: string) {
    console.log('[adminsService] isAdmin called for:', email);
    try {
      const { data, error } = await Promise.race([
        supabase
          .from('admins')
          .select('email')
          .eq('email', email)
          .single(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Admin check timeout')), 5000)
        )
      ]);
      console.log('[adminsService] isAdmin result:', { data, error });
      return { isAdmin: !!data && !error, error };
    } catch (err) {
      console.error('[adminsService] isAdmin error:', err);
      return { isAdmin: false, error: err };
    }
  },
};
