import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../../utils/audio';
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  User, 
  Clock, 
  ShieldCheck, 
  Volume2, 
  Mic, 
  MicOff,
  Sparkles
} from 'lucide-react';

export const FakeCallPage: React.FC = () => {
  const [callerName, setCallerName] = useState('Dad (Home)');
  const [delaySeconds, setDelaySeconds] = useState(5);
  const [callState, setCallState] = useState<'IDLE' | 'WAITING' | 'RINGING' | 'CONNECTED'>('IDLE');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const countdownTimerRef = useRef<number | null>(null);
  const durationTimerRef = useRef<number | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Trigger Fake Call
  const scheduleFakeCall = (delay: number) => {
    setCallState('WAITING');
    setDelaySeconds(delay);

    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    if (delay === 0) {
      startRinging();
      return;
    }

    let remaining = delay;
    countdownTimerRef.current = window.setInterval(() => {
      remaining -= 1;
      setDelaySeconds(remaining);
      if (remaining <= 0) {
        clearInterval(countdownTimerRef.current!);
        countdownTimerRef.current = null;
        startRinging();
      }
    }, 1000);
  };

  const cancelWaiting = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setCallState('IDLE');
  };

  const startRinging = () => {
    setCallState('RINGING');
    soundEngine.playRingtone();
  };

  const acceptCall = () => {
    soundEngine.stopRingtone();
    setCallState('CONNECTED');
    setCallDuration(0);

    durationTimerRef.current = window.setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    // Speak realistic excuse phrase via SpeechSynthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const script = `Hello? Where are you right now? I am waiting in the car right outside at the signal. Hurry up, I can see the building entrance.`;
      const utterance = new SpeechSynthesisUtterance(script);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const endCall = () => {
    soundEngine.stopRingtone();
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallState('IDLE');
    setCallDuration(0);
  };

  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
      
      {/* Configuration Header */}
      {callState === 'IDLE' && (
        <>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-md shadow-pink-500/5">
            <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Discreet Safety Excuse Tool</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Fake Call Simulator</h1>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Trigger a realistic incoming phone call to excuse yourself from uncomfortable, suspicious, or dangerous situations without causing immediate confrontation.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-md shadow-pink-500/5 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2.5">
                Preset Caller Persona
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Dad (Home)', 'Mom', 'Inspector Kumar (Police)', 'Cab Driver Outside'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setCallerName(name)}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      callerName === name
                        ? 'bg-pink-50 text-pink-700 border-pink-300 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Custom Caller Name or Number
              </label>
              <input
                type="text"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                placeholder="e.g. Inspector Sharma"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2.5">
                Timer Delay
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { sec: 0, label: 'Instant' },
                  { sec: 5, label: '5 Sec' },
                  { sec: 15, label: '15 Sec' },
                  { sec: 30, label: '30 Sec' },
                ].map((item) => (
                  <button
                    key={item.sec}
                    type="button"
                    onClick={() => scheduleFakeCall(item.sec)}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all text-center flex flex-col items-center justify-center space-y-1 cursor-pointer"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Waiting Countdown State */}
      {callState === 'WAITING' && (
        <div className="bg-white p-10 rounded-3xl border border-pink-100 shadow-xl shadow-pink-500/5 text-center space-y-4 animate-fadeIn">
          <Clock className="w-12 h-12 text-emerald-500 mx-auto animate-spin" />
          <h2 className="text-xl font-bold text-slate-900">Call Scheduled</h2>
          <p className="text-xs text-slate-600">
            Incoming call from <strong className="text-pink-600">{callerName}</strong> in:
          </p>
          <div className="text-5xl font-black font-mono text-emerald-600">{delaySeconds}s</div>
          <button
            onClick={cancelWaiting}
            className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 cursor-pointer"
          >
            Cancel Call
          </button>
        </div>
      )}

      {/* Realistic Fullscreen Mobile Call Simulator (Ringing Screen) */}
      {callState === 'RINGING' && (
        <div className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col items-center justify-between py-16 px-6 text-white animate-fadeIn">
          <div className="flex flex-col items-center space-y-3 mt-10">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-2xl">
              <User className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">{callerName}</h2>
            <span className="text-sm text-slate-400 animate-pulse font-medium">Incoming Call...</span>
          </div>

          <div className="w-full max-w-xs flex items-center justify-around mb-12">
            {/* Decline */}
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={endCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl shadow-red-600/50 active:scale-95 transition-all cursor-pointer"
              >
                <PhoneOff className="w-7 h-7" />
              </button>
              <span className="text-xs text-slate-400 font-semibold">Decline</span>
            </div>

            {/* Accept */}
            <div className="flex flex-col items-center space-y-2">
              <button
                onClick={acceptCall}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/50 active:scale-95 transition-all animate-bounce cursor-pointer"
              >
                <Phone className="w-7 h-7" />
              </button>
              <span className="text-xs text-slate-400 font-semibold">Answer</span>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Connected In-Call Screen */}
      {callState === 'CONNECTED' && (
        <div className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col items-center justify-between py-16 px-6 text-white animate-fadeIn">
          <div className="flex flex-col items-center space-y-3 mt-10">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center shadow-2xl">
              <User className="w-12 h-12 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">{callerName}</h2>
            <span className="text-base font-mono text-emerald-400">
              {String(Math.floor(callDuration / 60)).padStart(2, '0')}:{String(callDuration % 60).padStart(2, '0')}
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-xs text-slate-200 max-w-sm text-center leading-relaxed">
            <p className="italic text-emerald-300 font-medium mb-1">
              "Hey, where are you right now? I'm waiting in the car right outside at the signal. Hurry up..."
            </p>
            <span className="text-[10px] text-slate-400">Audio voice escort active • Speak freely</span>
          </div>

          <div className="w-full max-w-xs flex items-center justify-around mb-12">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full border transition-all cursor-pointer ${
                isMuted ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            <button
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl shadow-red-600/50 active:scale-95 transition-all cursor-pointer"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
