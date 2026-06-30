import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { api } from './api';

export default function App() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Restore user session if already authenticated
    const cachedUser = localStorage.getItem('devforge_profile');
    if (cachedUser) {
      try {
        setProfile(JSON.parse(cachedUser));
      } catch (err) {
        console.error('Failed to parse cached session:', err);
      }
    }
  }, []);

  const handleAnalyze = async (payload: {
    githubUsername: string;
    fullName: string;
    email: string;
    phone: string;
    linkedinUrl?: string;
    theme: string;
  }) => {
    try {
      setLoading(true);
      setError('');
      
      const res = await api.analyze.trigger(payload);
      if (res.success && res.profile) {
        setProfile(res.profile);
        localStorage.setItem('devforge_profile', JSON.stringify(res.profile));
      } else {
        setError(res.message || 'Deep analysis failed. Please verify your credentials.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(
        err.response?.data?.message || 
        'An error occurred connecting to our intelligence engines. Verify your network or input criteria.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setProfile(null);
    localStorage.removeItem('devforge_profile');
  };

  const handleUpdateProfile = (updatedProfile: any) => {
    setProfile(updatedProfile);
    localStorage.setItem('devforge_profile', JSON.stringify(updatedProfile));
  };

  return (
    <>
      {profile ? (
        <Dashboard 
          profile={profile} 
          onLogout={handleLogout} 
          onUpdateProfile={handleUpdateProfile} 
        />
      ) : (
        <LandingPage 
          onAnalyze={handleAnalyze} 
          loading={loading} 
          error={error} 
        />
      )}
    </>
  );
}
