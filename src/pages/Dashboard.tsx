import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMatches } from '../hooks/useMatches';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import type { Match } from '../types/database';

export const Dashboard: React.FC = () => {
  console.log('[Dashboard] Component rendering');
  const { matches, loading, error } = useMatches();
  const { user } = useAuth();
  console.log('[Dashboard] Auth state:', { user: user?.email, loading });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('it-IT', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const getBadgeVariant = (status: Match['status']) => {
    const variants = {
      open: 'open' as const,
      full: 'full' as const,
      cancelled: 'cancelled' as const,
    };
    return variants[status];
  };

  if (loading) {
    console.log('[Dashboard] Showing loading state');
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-600 dark:text-gray-400">{t('common.loading')}</div>
      </div>
    );
  }

  if (error) {
    console.error('[Dashboard] Error state:', error);
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-red-600 dark:text-red-400">{t('common.error')}: {error}</div>
      </div>
    );
  }

  console.log('[Dashboard] Rendering matches:', matches.length);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-display font-bold mb-6 text-gray-900 dark:text-white">{t('matches.title')}</h1>
      
      {matches.length === 0 ? (
        <Card>
          <p className="text-gray-600 dark:text-gray-400 text-center">{t('matches.noMatches')}</p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <Card
              key={match.id}
              onClick={() => navigate(`/match/${match.id}`)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h2 className="text-lg font-display font-semibold break-words flex-1 text-gray-900 dark:text-white">
                    {match.title}
                  </h2>
                  <Badge variant={getBadgeVariant(match.status)}>
                    {t(`status.${match.status}`)}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="break-all tabular">{formatDate(match.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="tabular">{formatTime(match.time)}</span>
                  </div>
                  
                  {!user && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">
                      {t('matches.loginToSeeDetails')}
                    </div>
                  )}
                  
                  {user && match.venue && (
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="font-medium break-words">{match.venue.name}</p>
                        <p className="text-xs break-all">{match.venue.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
