import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/authentication/AuthContext';
import { 
  Building2, 
  Users, 
  MapPin, 
  BellRing, 
  FileText, 
  Activity, 
  LogOut, 
  ExternalLink,
  ShieldCheck 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, language, setLanguage } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FB] text-slate-900">
      
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-purple-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Admin Status */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-600/20 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-wider text-slate-900">
                  RAKAI SAFE ADMIN CONSOLE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-widest">
                  ROOT
                </span>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                SYSTEM VERIFICATION & AUDIT CONTROL
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            
            <NavLink
              to="/police"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 shadow-sm"
            >
              <span>Police View</span>
              <ExternalLink className="w-3 h-3" />
            </NavLink>

            <NavLink
              to="/app"
              className="px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <span>Citizen App</span>
              <ExternalLink className="w-3 h-3" />
            </NavLink>

            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm"
            >
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>

            {/* Admin Profile Pill & Logout */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="flex items-center space-x-2.5 bg-slate-50 py-1 px-2.5 rounded-2xl border border-slate-200/80">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  {(user?.name || 'A')[0].toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                    {user?.name || 'Administrator'}
                  </span>
                  <span className="text-[10px] text-purple-600 font-semibold tracking-wide">
                    SUPERADMIN
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

    </div>
  );
};
