import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../../features/authentication/AuthContext';
import { Shield, Lock, Mail, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-fill if query param present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quick = params.get('quick');
    if (quick === 'user') {
      setEmail('user@rakai.safe');
      setPassword('Password123!');
    } else if (quick === 'police') {
      setEmail('police@rakai.safe');
      setPassword('Police123!');
    } else if (quick === 'admin') {
      setEmail('admin@rakai.safe');
      setPassword('Admin123!');
    }
  }, [location.search]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'POLICE') navigate('/police');
      else navigate('/app');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === 'ADMIN') {
        navigate('/admin');
      } else if (loggedInUser.role === 'POLICE') {
        navigate('/police');
      } else {
        navigate('/app');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (role: 'user' | 'police' | 'admin') => {
    if (role === 'user') {
      setEmail('user@rakai.safe');
      setPassword('Password123!');
    } else if (role === 'police') {
      setEmail('police@rakai.safe');
      setPassword('Police123!');
    } else if (role === 'admin') {
      setEmail('admin@rakai.safe');
      setPassword('Admin123!');
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] via-[#FAF8FB] to-[#FFFFFF] text-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <NavLink to="/" className="inline-flex items-center space-x-3 mb-4 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-md shadow-pink-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Shield className="w-7 h-7 text-white" />
          </div>
        </NavLink>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Sign In to <span className="text-pink-600">RAKAI SAFE</span>
        </h2>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          Enter credentials or click a pre-seeded test role below
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5">
          
          {/* Quick Demo Autofill Bar */}
          <div className="mb-6 p-4 rounded-2xl bg-pink-50/70 border border-pink-200/80">
            <span className="text-[11px] font-bold text-pink-800 uppercase tracking-wider block mb-2.5">
              ⚡ Instant 1-Click Test Accounts:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('user')}
                className="px-2.5 py-2 rounded-xl bg-white hover:bg-pink-100/70 text-pink-700 border border-pink-300 text-xs font-bold transition-all shadow-sm text-center active:scale-95"
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('police')}
                className="px-2.5 py-2 rounded-xl bg-white hover:bg-blue-100/70 text-blue-700 border border-blue-300 text-xs font-bold transition-all shadow-sm text-center active:scale-95"
              >
                Police
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="px-2.5 py-2 rounded-xl bg-white hover:bg-purple-100/70 text-purple-700 border border-purple-300 text-xs font-bold transition-all shadow-sm text-center active:scale-95"
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@rakai.safe"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black text-sm shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <NavLink to="/register" className="font-bold text-pink-600 hover:text-pink-700">
              Register Citizen Profile
            </NavLink>
          </div>

        </div>
      </div>

    </div>
  );
};
