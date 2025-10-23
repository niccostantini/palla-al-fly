import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { matchesService } from '../services/matches.service';
import { venuesService } from '../services/venues.service';
import type { Venue } from '../types/database';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { CircularLoader } from '../components/ui/CircularLoader';

export const CreateMatchPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [matchQuota, setMatchQuota] = useState<number | null>(null);
  const [loadingQuota, setLoadingQuota] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    venue_id: '',
    setter_req: 2,
    oh_req: 4,
    oph_req: 2,
    mb_req: 2,
    l_req: 2,
    notes: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchVenues();
    fetchUserQuota();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, isAdmin]);

  const fetchUserQuota = async () => {
    if (!user?.email || isAdmin) {
      setLoadingQuota(false);
      return;
    }
    
    try {
      setLoadingQuota(true);
      const { count, error } = await matchesService.getUserMatchQuota(user.email);
      if (error) {
        console.error('Error fetching quota:', error);
        setMatchQuota(0);
      } else {
        setMatchQuota(count);
      }
    } catch (err) {
      console.error('Exception fetching quota:', err);
      setMatchQuota(0);
    } finally {
      setLoadingQuota(false);
    }
  };

  const fetchVenues = async () => {
    try {
      const { data, error } = await venuesService.getAllVenues();
      if (error) throw error;
      setVenues(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.date || !formData.time || !formData.venue_id) {
      setError(t('createMatch.fillRequired'));
      return;
    }

    if (!user?.email) {
      setError('User email not found');
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await matchesService.createMatch({
        ...formData,
        title: formData.title.trim(),
        notes: formData.notes.trim() || undefined,
        created_by: user.email,
      });
      
      if (error) {
        // Check if error is due to quota limit
        const errorMessage = error.message || '';
        if (errorMessage.toLowerCase().includes('quota') || 
            errorMessage.toLowerCase().includes('limit') ||
            errorMessage.toLowerCase().includes('policy')) {
          setError(t('createMatch.quotaReached'));
        } else {
          throw error;
        }
      } else if (data) {
        // Update quota after successful creation
        if (!isAdmin) {
          fetchUserQuota();
        }
        navigate(`/match/${data.id}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('createMatch.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  const quotaReached = !isAdmin && matchQuota !== null && matchQuota >= 3;
  const isSubmitDisabled = loading || venues.length === 0 || quotaReached;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('createMatch.title')}</h1>

        {/* Quota Indicator */}
        {!isAdmin && (
          <div className={`mb-4 px-4 py-3 rounded-md border ${
            loadingQuota ? 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600' :
            quotaReached ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' :
            'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
          }`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className={`text-sm font-medium ${
                loadingQuota ? 'text-gray-700 dark:text-gray-300' :
                quotaReached ? 'text-red-700 dark:text-red-300' :
                'text-blue-700 dark:text-blue-300'
              }`}>
                {loadingQuota ? t('createMatch.loadingQuota') : t('createMatch.quota', { count: matchQuota ?? 0 })}
              </p>
            </div>
            {quotaReached && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                {t('createMatch.quotaReached')}
              </p>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="mb-4 px-4 py-3 rounded-md border bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700">
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              {t('createMatch.quotaExempt')}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
          <Input
            label="Match Title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Sunday Volleyball Session"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />

            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue *
            </label>
            <select
              value={formData.venue_id}
              onChange={(e) => setFormData({ ...formData, venue_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a venue...</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
            {venues.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No venues available. Please create a venue first.
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Role Capacities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Setter (S)"
                type="number"
                min="0"
                value={formData.setter_req}
                onChange={(e) => setFormData({ ...formData, setter_req: parseInt(e.target.value) || 0 })}
                required
              />

              <Input
                label="Outside Hitter (OH)"
                type="number"
                min="0"
                value={formData.oh_req}
                onChange={(e) => setFormData({ ...formData, oh_req: parseInt(e.target.value) || 0 })}
                required
              />

              <Input
                label="Opposite Hitter (OpH)"
                type="number"
                min="0"
                value={formData.oph_req}
                onChange={(e) => setFormData({ ...formData, oph_req: parseInt(e.target.value) || 0 })}
                required
              />

              <Input
                label="Middle Blocker (MB)"
                type="number"
                min="0"
                value={formData.mb_req}
                onChange={(e) => setFormData({ ...formData, mb_req: parseInt(e.target.value) || 0 })}
                required
              />

              <Input
                label="Libero (L)"
                type="number"
                min="0"
                value={formData.l_req}
                onChange={(e) => setFormData({ ...formData, l_req: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Additional information about the match..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="flex-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <CircularLoader size={20} strokeWidth={3} />
                  {t('createMatch.creating')}
                </span>
              ) : (
                t('createMatch.createMatch')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
