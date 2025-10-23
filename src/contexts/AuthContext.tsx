import React, { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { authService } from '../services/auth.service';
import { adminsService } from '../services/admins.service';
import { CircularLoader } from '../components/ui/CircularLoader';
import { AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('[AuthProvider] Initializing');
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthProvider] useEffect triggered - checking session');
    // Check active session
    authService.getSession().then(({ session }) => {
      console.log('[AuthProvider] Initial session:', { user: session?.user?.email });
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user?.email) {
        checkAdminStatus(session.user.email);
      } else {
        console.log('[AuthProvider] No session, setting loading to false');
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('[AuthContext] Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user?.email) {
          await checkAdminStatus(session.user.email);
        } else {
          setIsAdmin(false);
        }
        console.log('[AuthContext] Setting loading to false');
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAdminStatus = async (email: string) => {
    console.log('[AuthContext] Checking admin status for:', email);
    try {
      const { isAdmin: adminStatus } = await adminsService.isAdmin(email);
      console.log('[AuthContext] Admin status:', adminStatus);
      setIsAdmin(adminStatus);
    } catch (err) {
      console.error('[AuthContext] Error checking admin status:', err);
      setIsAdmin(false);
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await authService.signInWithGoogle();
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    console.log('[AuthContext] signInWithEmail called');
    const { error } = await authService.signInWithEmail(email, password);
    console.log('[AuthContext] signInWithEmail response:', { error });
    if (error) throw error;
    console.log('[AuthContext] signInWithEmail success');
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await authService.signUpWithEmail(email, password);
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      const { error } = await authService.signOut();
      // Ignore "Auth session missing" errors - user is already signed out
      if (error && !error.message?.includes('session missing')) {
        throw error;
      }
    } catch (err) {
      // If session is already gone, just clear the local state
      console.log('[AuthContext] Sign out error (likely already signed out):', err);
      setSession(null);
      setUser(null);
      setIsAdmin(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <CircularLoader size={80} />
        <div className="text-gray-600 dark:text-gray-400">Caricamento...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

