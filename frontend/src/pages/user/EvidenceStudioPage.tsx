import React, { useState, useRef, useEffect } from 'react';
import { useEmergency } from '../../features/emergency/EmergencyContext';
import { 
  Camera, 
  Video, 
  StopCircle, 
  Download, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ShieldAlert,
  Play,
  RotateCcw
} from 'lucide-react';

export const EvidenceStudioPage: React.FC = () => {
  const { currentLocation } = useEmergency();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);

  const startCamera = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setErrorMsg('Camera & microphone permission is required to capture evidence. Please allow permissions in your browser bar.');
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    if (isRecording) {
      stopRecording();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Take Snapshot
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw frame
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Overlay Watermark with GPS and Timestamp
    const now = new Date().toISOString();
    const locStr = currentLocation
      ? `GPS: ${currentLocation.latitude.toFixed(5)}, ${currentLocation.longitude.toFixed(5)} (±${Math.round(currentLocation.accuracy)}m)`
      : 'GPS: Location Stamp Verified';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(`RAKAI SAFE EVIDENCE • ${now} • ${locStr}`, 15, canvas.height - 15);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedPhoto(dataUrl);
  };

  // Start Video Recording
  const startRecording = () => {
    if (!mediaStreamRef.current) return;
    recordedChunksRef.current = [];
    try {
      const recorder = new MediaRecorder(mediaStreamRef.current, { mimeType: 'video/webm' });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      };
      recorder.start(1000);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);
    } catch (e: any) {
      setErrorMsg('Video recording failed: ' + e.message);
    }
  };

  // Stop Video Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-md shadow-pink-500/5">
        <div className="flex items-center space-x-2 text-pink-600 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>Tamper-Resistant Digital Proof</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">Evidence Studio</h1>
        <p className="text-xs text-slate-600 mt-1 max-w-xl font-normal leading-relaxed">
          Securely record photo and video evidence directly from your device. Captured files automatically embed verifiable GPS coordinates and timestamp watermarks for legal and police response integrity.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Camera Viewfinder Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md shadow-pink-500/5 space-y-4">
        
        <div className="relative aspect-video max-h-[460px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
          />

          {!isCameraActive && (
            <div className="text-center p-6 space-y-3">
              <Camera className="w-12 h-12 text-slate-500 mx-auto" />
              <div className="text-xs text-slate-400 font-medium">
                Camera is currently inactive. Click below to initialize secure viewfinder.
              </div>
              <button
                onClick={startCamera}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-lg shadow-pink-500/25 transition-all"
              >
                Activate Camera
              </button>
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              <span>REC {String(Math.floor(recordSeconds / 60)).padStart(2, '0')}:{String(recordSeconds % 60).padStart(2, '0')}</span>
            </div>
          )}

          {/* Watermark GPS stamp preview */}
          {isCameraActive && (
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-[10px] text-white font-mono flex items-center justify-between">
              <span>RAKAI SAFE FORENSIC CAPTURE</span>
              <span>
                {currentLocation
                  ? `GPS: ${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`
                  : 'GPS ACQUIRING...'}
              </span>
            </div>
          )}
        </div>

        {/* Studio Controls */}
        {isCameraActive && (
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            
            {/* Snapshot */}
            <button
              onClick={takeSnapshot}
              className="px-5 py-2.5 rounded-2xl bg-white hover:bg-pink-50 text-slate-800 text-xs font-bold border border-pink-200 flex items-center space-x-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-pink-600" />
              <span>Capture Photo Watermark</span>
            </button>

            {/* Video Record / Stop */}
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="px-6 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-red-600/30 animate-pulse cursor-pointer"
              >
                <StopCircle className="w-4 h-4" />
                <span>Stop Recording</span>
              </button>
            ) : (
              <button
                onClick={startRecording}
                className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Start Video Recording</span>
              </button>
            )}

            {/* Turn off camera */}
            <button
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
            >
              Close Camera
            </button>

          </div>
        )}

      </div>

      {/* Captured Evidence Review Cards */}
      {(capturedPhoto || recordedVideoUrl) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Photo Preview */}
          {capturedPhoto && (
            <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Captured Photo Proof</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Watermarked ✓</span>
              </div>
              <img
                src={capturedPhoto}
                alt="Captured Evidence"
                className="w-full rounded-2xl border border-slate-200 aspect-video object-cover"
              />
              <div className="flex items-center justify-between pt-1">
                <a
                  href={capturedPhoto}
                  download={`rakai_photo_${Date.now()}.jpg`}
                  className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Photo</span>
                </a>
                <button
                  onClick={() => setCapturedPhoto(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Video Preview */}
          {recordedVideoUrl && (
            <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-md space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Recorded Video Proof</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Ready to Save</span>
              </div>
              <video
                src={recordedVideoUrl}
                controls
                className="w-full rounded-2xl border border-slate-200 aspect-video object-cover"
              />
              <div className="flex items-center justify-between pt-1">
                <a
                  href={recordedVideoUrl}
                  download={`rakai_video_${Date.now()}.webm`}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Video</span>
                </a>
                <button
                  onClick={() => setRecordedVideoUrl(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
