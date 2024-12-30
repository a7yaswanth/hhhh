import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useSupabaseAuth() {
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        login({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || '',
          profileUrl: session.user.user_metadata.profile_url,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        login({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || '',
          profileUrl: session.user.user_metadata.profile_url,
        });
      } else {
        logout();
      }
    });

    return () => subscription.unsubscribe();
  }, [login, logout]);

  const signUp = useCallback(async ({
    email,
    password,
    name,
    profileUrl,
  }: {
    email: string;
    password: string;
    name: string;
    profileUrl?: string;
  }) => {
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            profile_url: profileUrl,
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      // Wait a brief moment for the auth session to be established
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email,
            name,
            profile_url: profileUrl,
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new Error('Failed to create user profile');
      }

      // Log in the user immediately after successful signup
      login({
        id: authData.user.id,
        email: authData.user.email!,
        name,
        profileUrl,
      });

      navigate('/movies');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }, [login, navigate]);

  const signIn = useCallback(async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user data returned');

      login({
        id: data.user.id,
        email: data.user.email!,
        name: data.user.user_metadata.name || '',
        profileUrl: data.user.user_metadata.profile_url,
      });

      navigate('/movies');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }, [login, navigate]);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      logout();
      navigate('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
      logout();
      navigate('/signin');
    }
  }, [logout, navigate]);

  return {
    signUp,
    signIn,
    signOut,
  };
};