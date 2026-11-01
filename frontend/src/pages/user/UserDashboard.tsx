import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEmergency } from '../../features/emergency/EmergencyContext';
import { useAuth } from '../../features/authentication/AuthContext';
import { emergencyService } from '../../services/api';
import {
  ShieldAlert,
  Shield,
  Volume2,
  VolumeX,
  Share2,
  PhoneCall,
  Camera,
  MapPin,
  Users,
  Hand,
  Check,
  AlertTriangle,
  Compass,
  Radio,
  Clock,
  ArrowRight,
  Send
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    isSOSActive,
    activeIncident,
    isCountdownActive,
    countdownSeconds,
    startSOSCountdown,
    triggerSOSNow,
    cancelCountdown,
    disableEmergency,
    isSirenPlaying,
    toggleSiren,
    currentLocation,
    requestCurrentLocation
  } = useEmergency();

  const { t, user } = useAuth();

  const [shareLoading, setShareLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShareLocation = async () => {
    setShareLoading(true);
    try {
      const loc = await requestCurrentLocation();
      const res = await emergencyService.createLocationShare({
        duration_minutes: 60,
        current_latitude: loc?.latitude || 13.0827,
        current_longitude: loc?.longitude || 80.2707,
      });
      const fullUrl = window.location.origin + res.share_url;
      setShareUrl(fullUrl);
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (e) {
      console.warn('Share error:', e);
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-6xl mx-auto">

      {/* Active Incident Warning / Terminate Header Card */}
      {isSOSActive && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl shadow-red-500/25 border-2 border-red-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-white text-red-700 uppercase tracking-wider">
                    ACTIVE INCIDENT DISPATCH
                  </span>
                  <span className="text-xs text-red-100 font-mono">
                    {activeIncident?.id ? `ID: ${activeIncident.id.slice(0, 16)}` : 'DISPATCH BROADCAST'}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black mt-1">
                  Emergency Distress Signal is Broadcasting
                </h2>
                <p className="text-xs text-red-100/90 font-medium">
                  Police control room and registered emergency contacts have received your GPS coordinates.
                </p>
              </div>
            </div>

            {/* Primary Stop Button directly on Dashboard */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button
                onClick={toggleSiren}
                className="px-4 py-2.5 rounded-xl bg-red-700/80 hover:bg-red-800 text-xs font-bold border border-red-300 flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {isSirenPlaying ? <VolumeX className="w-4 h-4 text-amber-200" /> : <Volume2 className="w-4 h-4 text-white" />}
                <span>{isSirenPlaying ? 'Mute Alarm' : 'Play Alarm'}</span>
              </button>

              <button
                id="main-dashboard-disable-sos"
                onClick={disableEmergency}
                className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 text-sm font-black shadow-lg border-2 border-white uppercase tracking-wider flex items-center justify-center space-x-2 active:scale-95 transition-all cursor-pointer"
              >
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>STOP EMERGENCY SOS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Panic Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-12 border border-pink-100/90 shadow-xl shadow-pink-500/5 text-center relative overflow-hidden">

        {/* Soft Pink Ambient Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${isSOSActive ? 'bg-red-200/50' : 'bg-gradient-to-tr from-pink-200/40 via-rose-100/30 to-transparent'
          }`} />

        <div className="max-w-xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200/90 text-xs font-bold text-pink-700 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>24/7 Citizen Shield • GPS Geofenced</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            {isSOSActive ? 'EMERGENCY IN PROGRESS' : t.sos.heroTitle}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {t.sos.heroSubtitle}
          </p>
        </div>

        {/* The Big SOS Button */}
        <div className="my-8 sm:my-12 flex flex-col items-center justify-center relative z-10">

          {isCountdownActive ? (
            /* 5-Second Countdown State with Cancel Button */
            <div className="flex flex-col items-center animate-fadeIn">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 border-4 border-amber-200 flex flex-col items-center justify-center shadow-2xl shadow-red-500/40 animate-pulse">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-100">
                  {t.sos.activatingIn}
                </span>
                <span className="text-6xl sm:text-7xl font-black text-white font-mono my-1">
                  {countdownSeconds}
                </span>
                <span className="text-[10px] text-amber-100 font-bold uppercase">
                  SECONDS
                </span>
              </div>

              <div className="mt-6 flex items-center space-x-3">
                <button
                  id="cancel-sos-countdown-btn"
                  onClick={cancelCountdown}
                  className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-md transition-all cursor-pointer"
                >
                  {t.sos.cancelCountdown}
                </button>
                <button
                  onClick={() => triggerSOSNow('SIREN')}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Dispatch Now
                </button>
              </div>
            </div>
          ) : isSOSActive ? (
            /* SOS Active State */
            <div className="flex flex-col items-center animate-fadeIn">
              <button
                id="active-sos-indicator-btn"
                onClick={disableEmergency}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-red-600 to-rose-600 border-4 border-white flex flex-col items-center justify-center shadow-2xl shadow-red-500/50 sos-btn-pulse cursor-pointer group active:scale-95 transition-transform"
                title="Click to Disable Emergency Alert"
              >
                <AlertTriangle className="w-12 h-12 text-white mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-lg sm:text-xl font-black text-white tracking-wider">
                  STOP SOS
                </span>
                <span className="text-[10px] text-red-100 font-bold tracking-widest uppercase mt-1">
                  TAP TO CANCEL
                </span>
              </button>

              <div className="mt-6">
                <button
                  onClick={disableEmergency}
                  className="px-8 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-lg shadow-red-600/30 border border-red-400 flex items-center space-x-2 cursor-pointer uppercase tracking-wider"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t.sos.disableEmergency}</span>
                </button>
              </div>

              {/* Twilio Emergency SMS Dispatch Tracker */}
              {activeIncident?.notifications && activeIncident.notifications.length > 0 && (
                <div className="mt-6 w-full max-w-xl bg-white p-5 rounded-3xl border border-pink-200 shadow-xl text-left">
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4 text-pink-600" />
                      <span className="text-xs font-black text-slate-900">
                        Emergency SMS Delivery Tracker
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                      Twilio Messages API
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeIncident.notifications.map((n) => (
                      <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900">{n.recipient_name}</div>
                          <div className="font-mono text-[11px] text-slate-500">{n.recipient_phone}</div>
                        </div>

                        <div className="text-right sm:max-w-xs">
                          <span className={`inline-block px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border ${n.status === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : n.status === 'SENT'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}>
                            {n.status}
                          </span>
                          {n.provider_reference && (
                            <div className="text-[9px] font-mono text-slate-400 mt-0.5 truncate">
                              Ref: {n.provider_reference}
                            </div>
                          )}
                          {n.provider_status_code && (
                            <div className="text-[9px] text-slate-600 font-mono mt-0.5 break-words">
                              {n.provider_status_code}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Normal Ready SOS Trigger State */
            <div className="flex flex-col items-center">
              <button
                id="sos-main-trigger-button"
                onClick={() => startSOSCountdown('SIREN')}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 border-4 border-pink-200/80 flex flex-col items-center justify-center shadow-2xl shadow-pink-500/35 sos-btn-pulse cursor-pointer active:scale-95 transition-all group"
              >
                <Shield className="w-14 h-14 text-white mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-2xl sm:text-3xl font-black text-white tracking-wider">
                  SOS
                </span>
                <span className="text-[10px] text-pink-100 font-black uppercase tracking-widest mt-0.5">
                  TAP FOR HELP
                </span>
              </button>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  id="silent-sos-trigger-btn"
                  onClick={() => triggerSOSNow('SILENT')}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-pink-50 text-slate-700 hover:text-slate-900 text-xs font-bold border border-pink-200 shadow-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Dispatches police coordinates without sounding deterrence siren"
                >
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span>{t.sos.silentSos}</span>
                </button>

                <button
                  onClick={() => triggerSOSNow('SIREN')}
                  className="px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 shadow-sm flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-pink-600" />
                  <span>Instant Loud Alarm</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Live GPS Coordinates Banner */}
        <div className="pt-5 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2 relative z-10">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-pink-600" />
            <span className="font-medium">
              {currentLocation
                ? `GPS: ${currentLocation.latitude.toFixed(4)}° N, ${currentLocation.longitude.toFixed(4)}° E (±${Math.round(currentLocation.accuracy)}m)`
                : 'Acquiring GPS location...'}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
            <span>Hotkeys: Press Spacebar 3x to toggle SOS</span>
          </div>
        </div>

      </div>

      {/* 1-Click Nearest Emergency Spots Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <NavLink
          id="dashboard-nearby-police-btn"
          to="/app/map?focus=police"
          className="p-4 rounded-3xl bg-white hover:bg-blue-50/60 border border-pink-100 hover:border-blue-200 shadow-md shadow-pink-500/5 transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              👮
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                {t.map.nearbyPolice || 'Nearby Police Station'}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                Instant GPS route & dispatch
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </NavLink>

        <NavLink
          id="dashboard-nearby-hospital-btn"
          to="/app/map?focus=hospital"
          className="p-4 rounded-3xl bg-white hover:bg-red-50/60 border border-pink-100 hover:border-red-200 shadow-md shadow-pink-500/5 transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform shrink-0">
              🏥
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 group-hover:text-red-700 transition-colors">
                {t.map.nearbyHospital || 'Nearby Hospital'}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                24/7 Trauma & Emergency
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </NavLink>

        <NavLink
          id="dashboard-safest-place-btn"
          to="/app/map?focus=safe_haven"
          className="p-4 rounded-3xl bg-white hover:bg-emerald-50/60 border border-pink-100 hover:border-emerald-200 shadow-md shadow-pink-500/5 transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              🛡️
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {t.map.safestPlace || 'Safest Place'}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                CCTV Monitored Haven & Transit
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
        </NavLink>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Action 1: Location Sharing */}
        <div className="p-6 rounded-3xl bg-white border border-pink-100/90 shadow-md shadow-pink-500/5 hover:border-pink-200 hover:shadow-lg transition-all flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3.5 border border-pink-100">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Live Location Sharing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create an expiring 60-minute encrypted web tracking link for friends & family.
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={handleShareLocation}
              disabled={shareLoading}
              className="w-full py-2.5 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              {shareLoading ? (
                <span>Generating Link...</span>
              ) : copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share My Location</span>
                </>
              )}
            </button>
            {shareUrl && (
              <div className="mt-2 text-[10px] text-slate-500 truncate font-mono">
                {shareUrl}
              </div>
            )}
          </div>
        </div>

        {/* Action 2: Fake Call Simulator */}
        <NavLink
          to="/app/fake-call"
          className="p-6 rounded-3xl bg-white border border-pink-100/90 shadow-md shadow-pink-500/5 hover:border-emerald-200 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5 border border-emerald-100 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
              Fake Call Escort
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trigger a realistic incoming phone call with caller audio to excuse yourself from unsafe situations.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Set Timer / Caller</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </NavLink>

        {/* Action 3: Camera Evidence Studio */}
        <NavLink
          to="/app/evidence"
          className="p-6 rounded-3xl bg-white border border-pink-100/90 shadow-md shadow-pink-500/5 hover:border-amber-200 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3.5 border border-amber-100 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition-colors">
              Evidence Studio
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Capture webcam photo proof and video recordings with location timestamps.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-700">
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </NavLink>

        {/* Action 4: Full Safety Map */}
        <NavLink
          to="/app/map"
          className="p-6 rounded-3xl bg-white border border-pink-100/90 shadow-md shadow-pink-500/5 hover:border-blue-200 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3.5 border border-blue-100 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
              Safety Map & Lights
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Full-screen map showing nearest 24/7 police stations, hospitals, and streetlight safety corridors.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>Open Interactive Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </NavLink>

      </div>

      {/* Secret Distress Hand Signals Card */}
      <div className="p-6 rounded-3xl bg-white border border-pink-100 shadow-md shadow-pink-500/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center shrink-0">
            <Hand className="w-6 h-6" />
          </div>
        </div>

        <NavLink
          to="/app/guide"
          className="px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-xs font-bold text-pink-700 border border-pink-200 transition-colors whitespace-nowrap"
        >
          View All 20 Safety Guides
        </NavLink>
      </div>

    </div>
  );
};
