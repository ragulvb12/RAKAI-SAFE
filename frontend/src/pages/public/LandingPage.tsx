import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/authentication/AuthContext';
import {
  Shield,
  MapPin,
  Radio,
  Building2,
  PhoneCall,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Eye,
  Languages,
  Compass,
  Heart,
  Lock,
  ArrowRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, setLanguage, t } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] via-[#FAF8FB] to-[#FFFFFF] text-slate-900 flex flex-col selection:bg-pink-500 selection:text-white">

      {/* Top Navbar */}
      <header className="w-full border-b border-pink-100/90 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 p-0.5 shadow-md shadow-pink-500/20 flex items-center justify-center">
              <img src="/assets/images/aran_logo.png" alt="Rakai Safe" className="w-full h-full object-contain rounded-lg p-1" onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }} />
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-slate-900">
                RAKAI <span className="text-pink-600">SAFE</span>
              </span>
              <span className="block text-[10px] text-pink-600 font-bold tracking-widest uppercase -mt-1">
                Women Safety Shield
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100/80 text-slate-700 text-xs font-bold flex items-center space-x-1.5 border border-pink-200/90 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-pink-600" />
              <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
            <NavLink
              to="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-pink-500/25 transition-all hover:scale-105"
            >
              Portal Access
            </NavLink>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Soft Pink Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-pink-200/50 via-rose-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200/90 text-pink-700 text-xs font-bold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Next-Generation Women Safety • Rapid Dispatch • Route Lighting Intel</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl leading-tight text-slate-900">
          Protection That Never Sleeps.{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500">
            Rapid Response.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
          Rakai Safe unites citizens, local police authorities, and verified safe haven infrastructure into a single live-coordinated network. Powered by real-time GPS dispatch, dual-tone deterrence alarms, and street-by-street lighting safety scores.
        </p>

        {/* Big Quick SOS Launch Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <NavLink
            to="/login?quick=user"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 text-white font-black text-base shadow-xl shadow-pink-500/30 flex items-center justify-center space-x-3 transition-all hover:scale-105"
          >
            <Shield className="w-5 h-5 text-white" />
            <span>ENTER CITIZEN SAFETY APP</span>
            <ChevronRight className="w-4 h-4" />
          </NavLink>

          <NavLink
            to="/login?quick=police"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-pink-50/60 text-slate-700 hover:text-slate-900 font-bold text-sm border border-slate-200 shadow-sm flex items-center justify-center space-x-2 transition-colors"
          >
            <Radio className="w-4 h-4 text-blue-600" />
            <span>Police Authority Console</span>
          </NavLink>
        </div>

        {/* Quick Demo Credentials Card */}


      </section>

      {/* 3 Portals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-200/80">
            Dedicated Workflows
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Three Specialized Operational Portals
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            Tailored interfaces engineered with strict server-side role validation, clean ergonomics, and specific workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: User */}
          <div className="p-7 rounded-3xl bg-white border border-pink-100/90 shadow-lg shadow-pink-500/5 hover:border-pink-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 mb-5 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Citizen Safety Portal</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Rapid SOS with unmissable instant disable, silent distress mode, live GPS broadcasting, 24/7 verified police & hospital map, walking route streetlight analysis, camera video recorder, and 20 bilingual safety guides.
              </p>
            </div>
            <NavLink
              to="/login?quick=user"
              className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-pink-600 hover:text-pink-700"
            >
              <span>Launch Citizen App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

          {/* Card 2: Police */}
          <div className="p-7 rounded-3xl bg-white border border-blue-100/90 shadow-lg shadow-blue-500/5 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Police Authority Console</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Jurisdiction-restricted emergency triage queue, live coordinate updates, patrol unit assignment, tactical response status workflow (Acknowledged → Dispatched → On Scene → Resolved), and timestamped audit logging.
              </p>
            </div>
            <NavLink
              to="/login?quick=police"
              className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              <span>Launch Authority Dispatch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

          {/* Card 3: Admin */}
          <div className="p-7 rounded-3xl bg-white border border-purple-100/90 shadow-lg shadow-purple-500/5 hover:border-purple-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-5 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Admin & Infrastructure Console</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                System health metrics & charts, officer provisioning, verification of police stations, hospitals, safe havens, and streetlights, multi-channel SMS delivery receipt logs, and security audit records.
              </p>
            </div>
            <NavLink
              to="/login?quick=admin"
              className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-purple-600 hover:text-purple-700"
            >
              <span>Launch Admin Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-pink-100 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-600 font-medium">© 2026 RAKAI SAFE. All rights reserved. Enterprise Women Protection System.</div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-600 font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              <span>FastAPI Backend Online</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-700 font-bold">Emergency Dial: 112 / 1091 / 181</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
