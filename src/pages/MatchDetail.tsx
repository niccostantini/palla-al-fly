import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { matchesService } from '../services/matches.service';
import { playersService } from '../services/players.service';
import type { Match, Player, PlayerRole } from '../types/database';
import { Badge } from '../components/ui/Badge';
import { RoleBadge } from '../components/ui/RoleBadge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { PlayerSignupForm } from '../components/PlayerSignupForm';
import {
  getRoleCapacities,
  isPlayerOverbooked,
  getMatchStatusBadges,
  calculateMatchStatus,
} from '../utils/matchUtils';

export const MatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [match, setMatch] = useState<Match | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMatchData();
    }
  }, [id]);

  const fetchMatchData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const [matchRes, playersRes] = await Promise.all([
        matchesService.getMatchById(id),
        playersService.getPlayersByMatchId(id),
      ]);

      if (matchRes.error) throw matchRes.error;
      if (playersRes.error) throw playersRes.error;

      setMatch(matchRes.data);
      setPlayers(playersRes.data || []);
      
      // Update match status dynamically
      if (matchRes.data && playersRes.data) {
        const newStatus = calculateMatchStatus(matchRes.data, playersRes.data);
        if (newStatus !== matchRes.data.status) {
          await matchesService.updateMatchStatus(id, newStatus);
          setMatch({ ...matchRes.data, status: newStatus });
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePlayer = async (playerId: string) => {
    try {
      await playersService.removePlayer(playerId);
      fetchMatchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDeleteMatch = async () => {
    if (!id) return;
    
    try {
      await matchesService.deleteMatch(id);
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const canRemovePlayer = (player: Player) => {
    return isAdmin || player.created_by === user?.email;
  };

  const getPlayersByRole = (role: PlayerRole) => {
    return players.filter((p) => p.role === role);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-600 dark:text-gray-400">{t('matches.loadingMatch')}</div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl">
          {error || t('matches.matchNotFound')}
        </div>
      </div>
    );
  }

  const badges = getMatchStatusBadges(match, players);
  const capacities = getRoleCapacities(match, players);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Match Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <h1 className="text-2xl font-display font-bold break-words flex-1 text-gray-900 dark:text-white">{match.title}</h1>
            <div className="flex gap-2 flex-wrap">
              {badges.map((badge) => (
                <Badge key={badge} variant={badge as 'open' | 'full' | 'overbooking' | 'cancelled'}>
                  {t(`status.${badge}`)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>{t('matches.date')}:</strong> <span className="tabular">{formatDate(match.date)}</span></p>
            <p><strong>{t('matches.time')}:</strong> <span className="tabular">{formatTime(match.time)}</span></p>
            {!user && (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
                {t('matches.loginToSeeDetails')}
              </p>
            )}
            {user && match.venue && (
              <>
                <p><strong>{t('matches.venue')}:</strong> {match.venue.name}</p>
                <p className="text-sm break-all text-gray-600 dark:text-gray-400">{match.venue.address}</p>
              </>
            )}
            {user && match.notes && (
              <p className="mt-4"><strong>{t('matches.notes')}:</strong> {match.notes}</p>
            )}
          </div>

          {isAdmin && (
            <div className="mt-6">
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
              >
                {t('matches.deleteMatch')}
              </Button>
            </div>
          )}
        </div>

        {/* Roster by Role */}
        {user && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-display font-semibold mb-4 text-gray-900 dark:text-white">{t('roster.title')}</h2>
          
          <div className="space-y-6">
            {capacities.map((capacity) => {
              const rolePlayers = getPlayersByRole(capacity.role);
              const isOverbooked = capacity.current > capacity.required;

              return (
                <div key={capacity.role} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <RoleBadge role={capacity.role}>{t(`roles.${capacity.role}`)}</RoleBadge>
                    <span className={`text-sm tabular ${
                      isOverbooked ? 'text-accent-rose font-semibold' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {capacity.current} / {capacity.required}
                    </span>
                  </div>

                  {rolePlayers.length > 0 ? (
                    <ul className="space-y-2">
                      {rolePlayers.map((player) => {
                        const isOverbook = isPlayerOverbooked(player, match, players);
                        
                        return (
                          <li
                            key={player.id}
                            className="flex items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <span className={`break-all text-gray-900 dark:text-gray-100 ${isOverbook ? 'italic' : ''}`}>
                                {player.name}
                              </span>
                              {isOverbook && (
                                <Badge variant="overbooking" className="ml-2">
                                  {t('roster.overbooked')}
                                </Badge>
                              )}
                              {player.phone_number && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                                  {player.phone_number}
                                </p>
                              )}
                            </div>
                            
                            {canRemovePlayer(player) && (
                              <Button
                                variant="danger"
                                onClick={() => handleRemovePlayer(player.id)}
                                className="text-xs sm:text-sm px-2 py-1"
                              >
                                {t('roster.remove')}
                              </Button>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{t('roster.noPlayers')}</p>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        )}

        {/* Signup Form */}
        {user && match.status !== 'cancelled' && (
          <PlayerSignupForm matchId={match.id} onSuccess={fetchMatchData} />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={t('matches.confirmDelete')}
        actions={
          <>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              {t('matches.cancel')}
            </Button>
            <Button variant="danger" onClick={handleDeleteMatch}>
              {t('matches.delete')}
            </Button>
          </>
        }
      >
        <p>{t('matches.deleteConfirmMessage')}</p>
      </Modal>
    </div>
  );
};
