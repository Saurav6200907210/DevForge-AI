import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import PremiumPortfolio from './PremiumPortfolio';
import { Terminal } from 'lucide-react';

export default function PublicPortfolio() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        if (!username) return;
        const res = await api.portfolios.getPublic(username);
        if (res.success && res.profile) {
          setProfile(res.profile);
        } else {
          setError('Portfolio not found');
        }
      } catch (err: any) {
        console.error('Failed to fetch portfolio', err);
        setError('Portfolio not found or error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FAFAF8] text-[#1F3A5F]">
        <div className="flex flex-col items-center space-y-4">
          <Terminal className="h-10 w-10 animate-bounce text-[#1F6F5F]" />
          <h2 className="text-lg font-bold">Loading Portfolio...</h2>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FAFAF8] text-[#1F3A5F]">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
          <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
            <span className="text-2xl font-bold">404</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1F3A5F]">Portfolio Not Found</h2>
          <p className="text-slate-500 text-sm max-w-sm">
            We couldn't find a portfolio for <strong>{username}</strong>. They might not have generated one yet, or the link is incorrect.
          </p>
          <Link to="/" className="mt-4 px-6 py-2.5 bg-[#1F6F5F] hover:bg-[#155A4B] text-white rounded-xl font-bold transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // We use the new PremiumPortfolio for the public link view
  return (
    <div className="w-full bg-[#0A0A0A] overflow-hidden">
      <PremiumPortfolio profile={profile} />
    </div>
  );
}
