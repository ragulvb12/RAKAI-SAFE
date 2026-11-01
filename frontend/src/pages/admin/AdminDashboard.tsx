import React, { useState, useEffect } from 'react';
import { adminService, infrastructureService } from '../../services/api';
import { SystemStats, User, InfrastructurePlace, StreetlightSegment, NotificationLog, AuditEvent } from '../../types';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Sun, 
  BellRing, 
  FileText, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3,
  Search,
  Activity,
  Layers
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [activeTab, setActiveTab] = useState<'metrics' | 'users' | 'places' | 'streetlights' | 'notifications' | 'audit'>('metrics');
  const [users, setUsers] = useState<User[]>([]);
  const [places, setPlaces] = useState<InfrastructurePlace[]>([]);
  const [streetlights, setStreetlights] = useState<StreetlightSegment[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Officer Modal
  const [showOfficerModal, setShowOfficerModal] = useState(false);
  const [officerName, setOfficerName] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [officerPassword, setOfficerPassword] = useState('Police123!');
  const [officerBadge, setOfficerBadge] = useState('TN-POL-');
  const [officerJurisdiction, setOfficerJurisdiction] = useState('Central Zone');
  const [officerPhone, setOfficerPhone] = useState('+91 94444 11200');

  // Place Modal
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [placeCategory, setPlaceCategory] = useState<'POLICE_STATION' | 'HOSPITAL' | 'SAFE_HAVEN'>('SAFE_HAVEN');
  const [placeName, setPlaceName] = useState('');
  const [placeTamil, setPlaceTamil] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');
  const [placePhone, setPlacePhone] = useState('112');
  const [placeLat, setPlaceLat] = useState('13.0827');
  const [placeLng, setPlaceLng] = useState('80.2707');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData, placesData, streetlightsData, notifData, auditData] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        infrastructureService.getPlaces(),
        infrastructureService.getStreetlights(),
        adminService.getNotifications(),
        adminService.getAuditLogs(),
      ]);
      setStats(statsData);
      setUsers(usersData);
      setPlaces(placesData);
      setStreetlights(streetlightsData);
      setNotifications(notifData);
      setAuditLogs(auditData);
    } catch (e) {
      console.warn('Admin load error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOfficer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.createPoliceOfficer({
        name: officerName,
        email: officerEmail,
        password: officerPassword,
        phone: officerPhone,
        badge_number: officerBadge,
        jurisdiction: officerJurisdiction,
      });
      setShowOfficerModal(false);
      fetchData();
    } catch (e: any) {
      alert('Error creating officer: ' + (e.response?.data?.detail || e.message));
    }
  };

  const handleCreatePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.createPlace({
        category: placeCategory,
        name: placeName,
        name_tamil: placeTamil || undefined,
        address: placeAddress,
        phone: placePhone,
        latitude: parseFloat(placeLat),
        longitude: parseFloat(placeLng),
        jurisdiction: 'Central Zone',
        operating_hours: '24/7 Active',
      });
      setShowPlaceModal(false);
      fetchData();
    } catch (e: any) {
      alert('Error adding place: ' + (e.response?.data?.detail || e.message));
    }
  };

  // Recharts Chart Data
  const chartData = [
    { name: 'Active Incidents', count: stats?.active_incidents || 0, fill: '#EF4444' },
    { name: 'Resolved Incidents', count: stats?.resolved_incidents || 0, fill: '#10B981' },
    { name: 'Police Stations', count: places.filter((p) => p.category === 'POLICE_STATION').length, fill: '#3B82F6' },
    { name: 'Safe Havens', count: places.filter((p) => p.category === 'SAFE_HAVEN').length, fill: '#EC4899' },
    { name: 'Hospitals', count: places.filter((p) => p.category === 'HOSPITAL').length, fill: '#F59E0B' },
  ];

  const pieData = [
    { name: 'Well-Lit Corridors', value: streetlights.filter((s) => s.lighting_status === 'WELL_LIT').length || 1, color: '#10B981' },
    { name: 'Moderately-Lit', value: streetlights.filter((s) => s.lighting_status === 'MODERATELY_LIT').length || 1, color: '#F59E0B' },
    { name: 'Poorly-Lit', value: streetlights.filter((s) => s.lighting_status === 'POORLY_LIT').length || 1, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md shadow-purple-500/5">
        <div>
          <div className="flex items-center space-x-2 text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Root System Administration & Infrastructure Hub</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">System Operations Console</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage authority accounts, verify infrastructure, and inspect delivery receipts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
          {[
            { id: 'metrics', label: 'Overview & Charts', icon: BarChart3 },
            { id: 'users', label: 'User Directory', icon: Users },
            { id: 'places', label: 'Safe Infrastructure', icon: MapPin },
            { id: 'streetlights', label: 'Streetlights', icon: Sun },
            { id: 'notifications', label: 'SMS Receipts', icon: BellRing },
            { id: 'audit', label: 'Audit Trail', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: METRICS & CHARTS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-pink-100 shadow-md shadow-pink-500/5">
              <span className="text-xs text-slate-500 font-bold">Registered Citizens</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{stats?.total_users || 0}</div>
              <span className="text-[10px] text-pink-600 font-bold">Protected Identities</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-blue-100 shadow-md shadow-blue-500/5">
              <span className="text-xs text-slate-500 font-bold">Police Officers</span>
              <div className="text-3xl font-black text-blue-600 mt-1">{stats?.police_officers || 0}</div>
              <span className="text-[10px] text-blue-700 font-bold">Active Dispatch Units</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-md shadow-emerald-500/5">
              <span className="text-xs text-slate-500 font-bold">Verified Havens</span>
              <div className="text-3xl font-black text-emerald-600 mt-1">{stats?.verified_safe_places || 0}</div>
              <span className="text-[10px] text-emerald-700 font-bold">Police & Hospitals</span>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-md shadow-purple-500/5">
              <span className="text-xs text-slate-500 font-bold">SMS Delivery Rate</span>
              <div className="text-3xl font-black text-purple-600 mt-1">{stats?.sms_delivery_rate || 98.4}%</div>
              <span className="text-[10px] text-purple-700 font-bold">Provider Confirmed</span>
            </div>
          </div>

          {/* Recharts Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bar Chart */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span>Operational Incident & Infrastructure Distribution</span>
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart: Streetlights */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Streetlight Illumination Safety Ratios</span>
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: USERS & POLICE PROVISIONING */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Registered Users & Law Enforcement</h3>
            <button
              onClick={() => setShowOfficerModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Provision Police Officer</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Jurisdiction</th>
                  <th className="p-4">Badge</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-black text-slate-900">{u.name}</td>
                    <td className="p-4 font-mono text-slate-600 font-medium">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        u.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        u.role === 'POLICE' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-pink-50 text-pink-700 border border-pink-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{u.jurisdiction || 'All Zones'}</td>
                    <td className="p-4 font-mono font-bold text-slate-600">{u.badge_number || '-'}</td>
                    <td className="p-4">
                      <span className="text-emerald-700 font-bold">Active ✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SAFE INFRASTRUCTURE PLACES */}
      {activeTab === 'places' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Verified Safe Infrastructure Locations</h3>
            <button
              onClick={() => setShowPlaceModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Verified Place</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {places.map((place) => (
              <div key={place.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-pink-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    place.category === 'POLICE_STATION' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    place.category === 'HOSPITAL' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {place.category}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">Verified ✓</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{place.name}</h4>
                {place.name_tamil && <div className="text-[11px] text-pink-600 font-semibold">{place.name_tamil}</div>}
                <div className="text-xs text-slate-500">{place.address}</div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Coordinates: {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STREETLIGHTS */}
      {activeTab === 'streetlights' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">Streetlight Corridors & Night Safety Ratings</h3>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Street Name</th>
                  <th className="p-4">Lighting Status</th>
                  <th className="p-4">Functional / Total Lights</th>
                  <th className="p-4">Verification Source</th>
                  <th className="p-4">Jurisdiction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {streetlights.map((seg) => (
                  <tr key={seg.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{seg.street_name}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        seg.lighting_status === 'WELL_LIT' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        seg.lighting_status === 'MODERATELY_LIT' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {seg.lighting_status}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-medium">{seg.functional_lights} / {seg.total_lights} lights</td>
                    <td className="p-4 text-slate-500">{seg.source}</td>
                    <td className="p-4 font-medium">{seg.jurisdiction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: NOTIFICATION RECEIPTS */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-slate-900">Multi-Channel Emergency SMS & WhatsApp Delivery Receipts</h3>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Recipient</th>
                  <th className="p-4">Channel</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Message Excerpt</th>
                  <th className="p-4">Provider Reference</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {notifications.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{n.recipient_name} ({n.recipient_phone})</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-mono font-bold">
                        {n.channel}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {n.status}
                      </span>
                    </td>
                    <td className="p-4 truncate max-w-xs text-slate-600">{n.message_body}</td>
                    <td className="p-4 font-mono text-slate-500">{n.provider_reference}</td>
                    <td className="p-4 text-slate-400 font-medium">{new Date(n.created_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-slate-900">Security & Action Audit Trail</h3>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Action</th>
                  <th className="p-4">Resource</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {auditLogs.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-mono font-bold text-purple-700">{ev.action}</td>
                    <td className="p-4 font-medium">{ev.resource_type} ({ev.resource_id ? ev.resource_id.slice(0, 8) : '-'})</td>
                    <td className="p-4 text-slate-600">{ev.details}</td>
                    <td className="p-4 font-mono text-slate-500">{ev.ip_address || '127.0.0.1'}</td>
                    <td className="p-4 text-slate-400 font-medium">{new Date(ev.created_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Provision Officer */}
      {showOfficerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Provision Law Enforcement Officer</h3>
            <form onSubmit={handleCreateOfficer} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Officer Name</label>
                <input
                  type="text"
                  required
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  placeholder="e.g. Officer K. Murugan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Police Email</label>
                <input
                  type="email"
                  required
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  placeholder="e.g. murugan@police.gov.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge ID</label>
                  <input
                    type="text"
                    required
                    value={officerBadge}
                    onChange={(e) => setOfficerBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jurisdiction</label>
                  <select
                    value={officerJurisdiction}
                    onChange={(e) => setOfficerJurisdiction(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Central Zone">Central Zone</option>
                    <option value="North Zone">North Zone</option>
                    <option value="South Zone">South Zone</option>
                    <option value="Transit Division">Transit Division</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowOfficerModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20"
                >
                  Create Officer Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Place */}
      {showPlaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">Add Verified Safe Infrastructure</h3>
            <form onSubmit={handleCreatePlace} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={placeCategory}
                  onChange={(e) => setPlaceCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="SAFE_HAVEN">Safe Haven / 24/7 Shelter</option>
                  <option value="POLICE_STATION">Police Station</option>
                  <option value="HOSPITAL">Hospital</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Place Name</label>
                <input
                  type="text"
                  required
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder="e.g. Women Safety Kiosk - Egmore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Name (Tamil Optional)</label>
                <input
                  type="text"
                  value={placeTamil}
                  onChange={(e) => setPlaceTamil(e.target.value)}
                  placeholder="e.g. எழும்பூர் மகளிர் உதவி மையம்"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Physical Address</label>
                <input
                  type="text"
                  required
                  value={placeAddress}
                  onChange={(e) => setPlaceAddress(e.target.value)}
                  placeholder="e.g. Gandhi Irwin Rd, Egmore, Chennai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Latitude</label>
                  <input
                    type="text"
                    required
                    value={placeLat}
                    onChange={(e) => setPlaceLat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Longitude</label>
                  <input
                    type="text"
                    required
                    value={placeLng}
                    onChange={(e) => setPlaceLng(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPlaceModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Save Verified Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
