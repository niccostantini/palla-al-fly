import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { venuesService } from '../services/venues.service';
import type { Venue } from '../types/database';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { CircularLoader } from '../components/ui/CircularLoader';

export const VenuesPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [formData, setFormData] = useState({ name: '', address: '' });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchVenues();
  }, [isAdmin, navigate]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const { data, error } = await venuesService.getAllVenues();
      if (error) throw error;
      setVenues(data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (venue?: Venue) => {
    if (venue) {
      setEditingVenue(venue);
      setFormData({ name: venue.name, address: venue.address });
    } else {
      setEditingVenue(null);
      setFormData({ name: '', address: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVenue(null);
    setFormData({ name: '', address: '' });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.address.trim()) {
      setError(t('venues.nameAddressRequired'));
      return;
    }

    try {
      if (editingVenue) {
        await venuesService.updateVenue(editingVenue.id, formData);
      } else {
        await venuesService.createVenue(formData);
      }
      handleCloseModal();
      fetchVenues();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this venue?')) return;

    try {
      await venuesService.deleteVenue(id);
      fetchVenues();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <CircularLoader size={80} />
        <div className="text-gray-600 dark:text-gray-400">{t('venues.loadingVenues')}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Venues</h1>
          <Button onClick={() => handleOpenModal()}>
            Add Venue
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {venues.length === 0 ? (
          <Card>
            <p className="text-gray-600 text-center">No venues yet. Add your first venue!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {venues.map((venue) => (
              <Card key={venue.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold break-words">{venue.name}</h2>
                    <p className="text-gray-600 text-sm break-all">{venue.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleOpenModal(venue)}
                      className="text-sm px-3 py-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(venue.id)}
                      className="text-sm px-3 py-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingVenue ? 'Edit Venue' : 'Add Venue'}
          actions={
            <>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingVenue ? 'Update' : 'Create'}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Input
              label="Venue Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Palestra Comunale"
              required
            />
            <Input
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. Via Roma 123, Milano"
              required
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};
