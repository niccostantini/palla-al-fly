import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { playersService } from '../services/players.service';
import type { PlayerRole } from '../types/database';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface PlayerSignupFormProps {
  matchId: string;
  onSuccess: () => void;
}

export const PlayerSignupForm: React.FC<PlayerSignupFormProps> = ({
  matchId,
  onSuccess,
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [role, setRole] = useState<PlayerRole>('oh');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles: PlayerRole[] = ['setter', 'oh', 'oph', 'mb', 'l'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(t('playerSignup.nameRequired'));
      return;
    }

    if (!user?.email) {
      setError(t('playerSignup.mustBeLoggedIn'));
      return;
    }

    try {
      setLoading(true);
      await playersService.addPlayer({
        match_id: matchId,
        name: name.trim(),
        role,
        phone_number: phoneNumber.trim() || undefined,
        created_by: user.email,
      });
      
      setName('');
      setPhoneNumber('');
      setRole('oh');
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('playerSignup.signupFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-4">
        <p className="text-yellow-800 dark:text-yellow-400 text-sm">
          {t('playerSignup.mustBeLoggedIn')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-4 shadow-card">
      <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white">{t('playerSignup.title')}</h3>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <Input
        label={t('playerSignup.playerName')}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('playerSignup.playerNamePlaceholder')}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('playerSignup.role')}
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as PlayerRole)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-brand-600/20 focus:border-brand-600 transition-all"
          required
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {t(`roles.${r}`)}
            </option>
          ))}
        </select>
      </div>

      <Input
        label={t('playerSignup.phoneNumber')}
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder={t('playerSignup.phoneNumberPlaceholder')}
      />

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? t('playerSignup.signingUp') : t('playerSignup.signUp')}
      </Button>
    </form>
  );
};
