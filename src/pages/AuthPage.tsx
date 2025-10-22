import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const AuthPage: React.FC = () => {
  console.log('[AuthPage] Component rendering');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, user } = useAuth();
  console.log('[AuthPage] Auth state:', { user: user?.email });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError(t('auth.fillAllFields'));
      return false;
    }
    if (password.length < 8) {
      setError(t('auth.passwordMinLength'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('[AuthPage] Form submitted');
    
    if (!validateForm()) {
      console.log('[AuthPage] Validation failed');
      return;
    }

    console.log('[AuthPage] Setting loading to true');
    setLoading(true);
    try {
      if (isLogin) {
        console.log('[AuthPage] Attempting signInWithEmail');
        await signInWithEmail(email, password);
        console.log('[AuthPage] signInWithEmail completed');
      } else {
        console.log('[AuthPage] Attempting signUpWithEmail');
        await signUpWithEmail(email, password);
        console.log('[AuthPage] signUpWithEmail completed');
      }
      console.log('[AuthPage] Navigating to /');
      navigate('/');
    } catch (err: unknown) {
      console.error('[AuthPage] Error during auth:', err);
      setError(err instanceof Error ? err.message : t('auth.authFailed'));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t('auth.googleSignInFailed'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-200 dark:border-gray-700 max-w-md w-full p-6">
        <h1 className="text-2xl font-display font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isLogin ? t('auth.login') : t('auth.register')}
        </h1>

        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-2xl font-medium transition-all ${
              isLogin
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setIsLogin(true)}
          >
            {t('auth.login')}
          </button>
          <button
            className={`flex-1 py-2 rounded-2xl font-medium transition-all ${
              !isLogin
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setIsLogin(false)}
          >
            {t('auth.register')}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.emailPlaceholder')}
            required
          />

          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.passwordMin')}
            required
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? t('auth.processing') : isLogin ? t('auth.login') : t('auth.register')}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t('auth.orContinueWith')}</span>
          </div>
        </div>

        <Button
          variant="secondary"
          fullWidth
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t('auth.signInWithGoogle')}
          </div>
        </Button>
      </div>
    </div>
  );
};
