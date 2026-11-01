import React, { useState, useEffect } from 'react';
import { incidentsService } from '../../services/api';
import { EmergencyIncident, IncidentStatus } from '../../types';
import { useAuth } from '../../features/authentication/AuthContext';
import { GoogleIncidentMap } from '../../components/map/GoogleIncidentMap';
import { 
  Radio, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Send, 
  Filter, 
  RefreshCw, 
  AlertOctagon, 
  Phone, 
  FileText,
  UserCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const PoliceDashboard: React.FC = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState<EmergencyIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ACTIVE');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>(user?.jurisdiction || 'Central Zone');
  const [selectedIncident, setSelectedIncident] = useState<EmergencyIncident | null>(null);
  const [responderNotes, setResponderNotes] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchIncidents = async () => {
    try {
      const data = await incidentsService.getAll({
        status: statusFilter === 'ALL' ? undefined : statusFilter,
        jurisdiction: jurisdictionFilter === 'ALL' ? undefined : jurisdictionFilter,
      });
      setIncidents(data);
      if (selectedIncident) {
        const updated = data.find((i) => i.id === selectedIncident.id);
        if (updated) setSelectedIncident(updated);
      }
    } catch (e) {
      console.warn('Failed to fetch police incident queue:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    // Auto-refresh every 6 seconds for live triage
    const interval = setInterval(fetchIncidents, 6000);
    return () => clearInterval(interval);
  }, [statusFilter, jurisdictionFilter]);

  const handleStatusChange = async (incidentId: string, nextStatus: IncidentStatus) => {
    setUpdatingId(incidentId);
    try {
      await incidentsService.updateStatus(incidentId, {
        status: nextStatus,
        responder_notes: responderNotes.trim() ? responderNotes : undefined,
      });
      setResponderNotes('');
      await fetchIncidents();
    } catch (e) {
      console.warn('Failed to update status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-red-50 text-red-700 border-red-200 animate-pulse';
      case 'ACKNOWLEDGED':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'DISPATCHED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ON_SCENE':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'RESOLVED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Triage Filter Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-blue-100 shadow-md shadow-blue-500/5">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Live Law Enforcement Dispatch Queue</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Emergency Incident Triage</h1>
          <p className="text-xs text-slate-500 mt-1">
            Jurisdiction: <strong className="text-blue-700 font-bold">{jurisdictionFilter}</strong> • Officer: {user?.name} (Badge: {user?.badge_number || 'TN-POL-7821'})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-200 shadow-sm">
            {['ACTIVE', 'ACKNOWLEDGED', 'DISPATCHED', 'RESOLVED', 'ALL'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={fetchIncidents}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm transition-colors cursor-pointer"
            title="Refresh Queue"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Incident Cards + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Incident List */}
        <div className="lg:col-span-2 space-y-3.5">
          {loading ? (
            <div className="text-center py-16 text-slate-500 text-sm">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              Loading authorized jurisdiction queue...
            </div>
          ) : incidents.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">Queue Clear</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No emergency incidents matching status "{statusFilter}" currently in {jurisdictionFilter}. Live listener active.
              </p>
            </div>
          ) : (
            incidents.map((incident) => {
              const isSelected = selectedIncident?.id === incident.id;
              return (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20'
                      : incident.status === 'ACTIVE'
                      ? 'border-red-200 hover:border-red-400 shadow-md shadow-red-500/5'
                      : 'border-slate-200 hover:border-blue-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-wider ${getStatusBadge(incident.status)}`}>
                        {incident.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        #{incident.id.slice(0, 8)}
                      </span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold uppercase">
                        MODE: {incident.mode}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(incident.created_at).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {incident.user?.name || 'Protected Citizen'}
                      </h3>
                      <div className="text-xs text-slate-600 font-mono mt-0.5 font-medium">
                        Phone: {incident.user?.phone || 'Emergency Direct Link'}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-pink-600" />
                        <span>
                          Lat: {incident.current_latitude.toFixed(4)}, Lng: {incident.current_longitude.toFixed(4)} (±{Math.round(incident.accuracy_meters)}m)
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-blue-600 font-bold flex items-center space-x-1">
                        <span>Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {incident.responder_notes && (
                    <div className="mt-3.5 p-3 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-slate-700">
                      <strong>Patrol Note:</strong> {incident.responder_notes}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Selected Incident Tactical Detail Drawer */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-blue-100 shadow-xl shadow-blue-500/5 space-y-5 h-fit lg:sticky lg:top-24">
          {selectedIncident ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    Incident Case File
                  </span>
                  <h3 className="text-base font-black text-slate-900">
                    {selectedIncident.user?.name || 'Citizen Case'}
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border tracking-wider ${getStatusBadge(selectedIncident.status)}`}>
                  {selectedIncident.status}
                </span>
              </div>

              {/* Citizen Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="text-slate-500 font-medium">Contact Number:</div>
                <div className="font-mono font-bold text-slate-900 flex items-center justify-between">
                  <span>{selectedIncident.user?.phone || 'Hidden / Emergency Alert'}</span>
                  {selectedIncident.user?.phone && (
                    <a
                      href={`tel:${selectedIncident.user.phone}`}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold"
                    >
                      Call Citizen
                    </a>
                  )}
                </div>
                <div className="text-slate-500 font-medium pt-1">Jurisdiction:</div>
                <div className="text-blue-700 font-bold">{selectedIncident.jurisdiction || 'Central Zone'}</div>
              </div>

              {/* Google Maps Incident Tactical View */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>Live Google Maps Tactical View</span>
                  </span>
                  <span className="text-[10px] text-pink-600 font-semibold">Platform GIS</span>
                </div>
                <GoogleIncidentMap
                  lat={selectedIncident.current_latitude}
                  lng={selectedIncident.current_longitude}
                  title={`SOS Distress: ${selectedIncident.user?.name || 'Citizen'}`}
                  height="210px"
                />
              </div>

              {/* Live Coordinates Link */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1.5">
                <div className="font-bold text-blue-800 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>GPS Incident Coordinates</span>
                </div>
                <div className="text-slate-700 font-mono font-medium">
                  {selectedIncident.current_latitude.toFixed(5)}° N, {selectedIncident.current_longitude.toFixed(5)}° E
                </div>
                <a
                  href={`https://www.google.com/maps?q=${selectedIncident.current_latitude},${selectedIncident.current_longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] text-blue-700 font-bold hover:underline pt-1"
                >
                  <span>Open in Navigation GPS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Tactical Status Transition Actions */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  Update Patrol Status Workflow:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    disabled={updatingId === selectedIncident.id}
                    onClick={() => handleStatusChange(selectedIncident.id, 'ACKNOWLEDGED')}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 cursor-pointer"
                  >
                    Acknowledge
                  </button>
                  <button
                    disabled={updatingId === selectedIncident.id}
                    onClick={() => handleStatusChange(selectedIncident.id, 'DISPATCHED')}
                    className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 cursor-pointer"
                  >
                    Dispatch Unit
                  </button>
                  <button
                    disabled={updatingId === selectedIncident.id}
                    onClick={() => handleStatusChange(selectedIncident.id, 'ON_SCENE')}
                    className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 cursor-pointer"
                  >
                    Patrol On Scene
                  </button>
                  <button
                    disabled={updatingId === selectedIncident.id}
                    onClick={() => handleStatusChange(selectedIncident.id, 'RESOLVED')}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-pointer"
                  >
                    Resolve Incident
                  </button>
                </div>
              </div>

              {/* Responder Log Notes Input */}
              <div className="space-y-1.5 pt-2">
                <label className="block text-xs font-bold text-slate-800">
                  Add Tactical Response Log:
                </label>
                <textarea
                  rows={2}
                  value={responderNotes}
                  onChange={(e) => setResponderNotes(e.target.value)}
                  placeholder="e.g. Patrol Unit 4 en route via Main St..."
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-xs font-medium">
              Select an incident from the queue to view response dossier and patrol actions.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
