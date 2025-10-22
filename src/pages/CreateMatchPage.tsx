import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { matchesService } from '../services/matches.service';
import { venuesService } from '../services/venues.service';
import type { Venue } from '../types/database';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const CreateMatchPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchVenues();
  }, [user, isAdmin, navigate]);

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
      
      if (error) throw error;
      if (data) {
        navigate(`/match/${data.id}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('createMatch.createFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Match</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
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
              disabled={loading || venues.length === 0}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Match'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
