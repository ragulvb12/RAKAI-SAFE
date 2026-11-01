import React from 'react';
import { useEmergency } from '../features/emergency/EmergencyContext';
import { useAuth } from '../features/authentication/AuthContext';
import { AlertTriangle, Volume2, VolumeX, ShieldAlert, PhoneCall } from 'lucide-react';

export const EmergencyDisableBar: React.FC = () => {
  const { isSOSActive, disableEmergency, toggleSiren, isSirenPlaying, activeIncident, mode } = useEmergency();
  const { t } = useAuth();

  if (!isSOSActive) return null;

  return (
    <aside 
      aria-label="Emergency Active Alert"
      className="sticky top-0 z-[9999] w-full bg-red-600/95 border-b-2 border-red-400 text-white shadow-2xl backdrop-blur-md px-3 py-2.5 sm:px-6 sm:py-3 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Live Alarm Banner */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
            </span>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 font-bold tracking-wider text-xs sm:text-sm uppercase">
                <ShieldAlert className="w-4 h-4 text-white animate-bounce" />
                <span>{t.sos.emergencyActive}</span>
              </div>
              <div className="text-[11px] text-red-100 font-mono">
                {activeIncident?.id ? `ID: ${activeIncident.id.slice(0, 12)}...` : 'DISPATCH BROADCASTING'} • MODE: {mode}
              </div>
            </div>
          </div>

          {/* Quick Siren Mute Toggle (especially on mobile) */}
          <button
            onClick={toggleSiren}
            title={isSirenPlaying ? "Mute Siren" : "Unmute Siren"}
            className="sm:hidden px-2.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-xs font-semibold flex items-center space-x-1 border border-red-400"
          >
            {isSirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSirenPlaying ? 'Mute' : 'Sound'}</span>
          </button>
        </div>

        {/* Right: Urgent Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end">
          
          {/* Desktop Siren Toggle */}
          <button
            onClick={toggleSiren}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-800/80 hover:bg-red-800 text-xs font-medium border border-red-400/50 transition-colors"
          >
            {isSirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSirenPlaying ? 'Mute Siren' : 'Sound Siren'}</span>
          </button>

          {/* Direct Emergency Call Button */}
          <a
            href="tel:112"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-xs font-semibold text-white border border-white/20 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call 112</span>
          </a>

          {/* THE PRIMARY UNMISSABLE DISABLE BUTTON */}
          <button
            id="emergency-disable-button"
            onClick={disableEmergency}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 sm:px-6 sm:py-2 bg-white text-red-700 hover:bg-red-50 active:scale-95 text-xs sm:text-sm font-black rounded-lg shadow-lg border-2 border-white transition-all uppercase tracking-wide cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />
            <span>{t.sos.disableEmergency}</span>
          </button>

        </div>

      </div>
    </aside>
  );
};
