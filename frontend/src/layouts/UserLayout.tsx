import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/authentication/AuthContext';
import { useEmergency } from '../features/emergency/EmergencyContext';
import { EmergencyDisableBar } from '../components/EmergencyDisableBar';
import { 
  Shield, 
  MapPin, 
  Users, 
  Camera, 
  PhoneCall, 
  BookOpen, 
  Languages, 
  LogOut, 
  Building2,
  ShieldAlert
} from 'lucide-react';

export const UserLayout: React.FC = () => {
  const { user, logout, language, setLanguage, t } = useAuth();
  const { isSOSActive, disableEmergency } = useEmergency();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/app', label: t.nav.home, icon: Shield, id: 'nav-home' },
    { to: '/app/map', label: t.nav.map, icon: MapPin, id: 'nav-map' },
    { to: '/app/contacts', label: t.nav.contacts, icon: Users, id: 'nav-contacts' },
    { to: '/app/evidence', label: t.nav.evidence, icon: Camera, id: 'nav-evidence' },
    { to: '/app/fake-call', label: t.nav.fakeCall, icon: PhoneCall, id: 'nav-fake-call' },
    { to: '/app/guide', label: t.nav.guide, icon: BookOpen, id: 'nav-guide' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FB] text-slate-800 pb-20 md:pb-0">
      
      {/* Top Emergency Disable Banner (appears whenever SOS is active) */}
      <EmergencyDisableBar />

      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-pink-100/90 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <NavLink to="/app" className="flex items-center space-x-3.5 group flex-shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 p-0.5 shadow-md shadow-pink-500/25 group-hover:scale-105 transition-all flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-1.5">
                <Shield className="w-5 h-5 text-pink-600" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
                  RAKAI <span className="text-pink-600">SAFE</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
                  SHIELD
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold tracking-wide">
                Women Safety & Dispatch Network
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links — Centered Floating Pill Bar */}
          <nav className="hidden lg:flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  id={item.id}
                  end={item.to === '/app'}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white text-pink-600 shadow-sm border border-pink-200/90'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Header Utilities */}
          <div className="flex items-center space-x-2.5 flex-shrink-0">
            
            {/* Direct Header Panic / Stop Button */}
            {isSOSActive ? (
              <button
                onClick={disableEmergency}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center space-x-1.5 shadow-md shadow-red-600/30 animate-pulse cursor-pointer transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>STOP SOS</span>
              </button>
            ) : (
              <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Active Shield</span>
              </div>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-pink-50 text-slate-700 text-xs font-bold flex items-center space-x-1.5 border border-slate-200 shadow-sm transition-colors"
              title="Switch Language / மொழியை மாற்ற"
            >
              <Languages className="w-3.5 h-3.5 text-pink-600" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Privileged Portals Switcher if logged in as Admin or Police */}
            {user?.role === 'ADMIN' && (
              <NavLink
                to="/admin"
                className="px-3 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold border border-purple-200 flex items-center space-x-1.5 transition-colors shadow-sm"
                title="Admin Console"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Admin Hub</span>
              </NavLink>
            )}
            {user?.role === 'POLICE' && (
              <NavLink
                to="/police"
                className="px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 flex items-center space-x-1.5 transition-colors shadow-sm"
                title="Police Dispatch Portal"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Police Console</span>
              </NavLink>
            )}

            {/* User Profile Pill & Logout */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="flex items-center space-x-2.5 bg-slate-50 py-1 px-2.5 rounded-2xl border border-slate-200/80">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  {(user?.name || 'C')[0].toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                    {user?.name || 'Citizen'}
                  </span>
                  <span className="text-[10px] text-pink-600 font-semibold tracking-wide">
                    {user?.phone || user?.role || 'PROTECTED'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title={t.nav.logout}
                className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-pink-100 backdrop-blur-lg px-2 py-1.5 shadow-lg"
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isHome = item.to === '/app';
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={isHome}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-semibold transition-all ${
                    isActive
                      ? 'text-pink-600 scale-105'
                      : 'text-slate-500 hover:text-slate-800'
                  }`
                }
              >
                {isHome && isSOSActive ? (
                  <div className="relative">
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <Icon className="w-5 h-5 text-red-500 animate-bounce" />
                  </div>
                ) : (
                  <Icon className="w-5 h-5 mb-0.5" />
                )}
                <span className="truncate max-w-[56px] text-center">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

    </div>
  );
};
