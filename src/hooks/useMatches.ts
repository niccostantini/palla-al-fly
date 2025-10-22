import { useState, useEffect } from 'react';
import type { Match } from '../types/database';
import { matchesService } from '../services/matches.service';

export const useMatches = () => {
  console.log('[useMatches] Hook initialized');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      console.log('[useMatches] Starting fetch');
      setLoading(true);
      const { data, error } = await matchesService.getAllMatches();
      console.log('[useMatches] Fetch result:', { dataLength: data?.length, error });
      if (error) throw error;
      setMatches(data || []);
      console.log('[useMatches] Matches set:', data?.length);
    } catch (err: unknown) {
      console.error('[useMatches] Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      console.log('[useMatches] Setting loading to false');
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('[useMatches] useEffect triggered');
    fetchMatches();
  }, []);

  return {
    matches,
    loading,
    error,
    refetch: fetchMatches,
  };
};
