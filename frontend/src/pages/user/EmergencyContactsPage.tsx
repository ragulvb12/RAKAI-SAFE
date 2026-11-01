import React, { useState, useEffect } from 'react';
import { contactsService } from '../../services/api';
import { EmergencyContact } from '../../types';
import { useAuth } from '../../features/authentication/AuthContext';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Trash2, 
  Edit2, 
  Check, 
  MessageSquare, 
  AlertCircle, 
  ShieldCheck,
  Star
} from 'lucide-react';

export const EmergencyContactsPage: React.FC = () => {
  const { t } = useAuth();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');
  const [priority, setPriority] = useState(1);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await contactsService.getAll();
      setContacts(data);
    } catch (e) {
      console.warn('Failed to load contacts:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openAddModal = () => {
    setEditingContact(null);
    setName('');
    setPhone('');
    setRelationship('Family');
    setPriority(contacts.length + 1);
    setNotifySms(true);
    setNotifyWhatsapp(true);
    setFormError(null);
    setShowModal(true);
  };

  const openEditModal = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
    setRelationship(contact.relationship);
    setPriority(contact.priority);
    setNotifySms(contact.notify_sms);
    setNotifyWhatsapp(contact.notify_whatsapp);
    setFormError(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError('Please enter both name and mobile number.');
      return;
    }

    setSaving(true);
    setFormError(null);
    try {
      if (editingContact) {
        await contactsService.update(editingContact.id, {
          name,
          phone,
          relationship,
          priority,
          notify_sms: notifySms,
          notify_whatsapp: notifyWhatsapp,
        });
      } else {
        await contactsService.create({
          name,
          phone,
          relationship,
          priority,
          notify_sms: notifySms,
          notify_whatsapp: notifyWhatsapp,
        });
      }
      setShowModal(false);
      fetchContacts();
    } catch (err: any) {
      setFormError(err.response?.data?.detail || 'Failed to save contact.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this trusted emergency contact?')) return;
    try {
      await contactsService.delete(id);
      fetchContacts();
    } catch (e) {
      console.warn('Delete failed:', e);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-md shadow-pink-500/5">
        <div>
          <div className="flex items-center space-x-2 text-pink-600 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Trusted Life Support Circle</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Emergency Contacts</h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl font-normal leading-relaxed">
            When you trigger Rakai SOS, these verified individuals receive immediate SMS and WhatsApp alerts containing your live GPS tracking coordinates.
          </p>
        </div>

        <button
          id="add-emergency-contact-btn"
          onClick={openAddModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-lg shadow-pink-500/20 flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Trusted Contact</span>
        </button>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-sm">
          <div className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          Loading your trusted safety circle...
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-pink-100 p-8 shadow-sm">
          <Users className="w-12 h-12 text-pink-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No Emergency Contacts Registered</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
            It is critical to add at least 2 family members or trusted guardians who can be notified immediately during a distress alert.
          </p>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-md shadow-pink-500/20"
          >
            Add Your First Contact
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="p-6 rounded-3xl bg-white border border-pink-100 shadow-md shadow-pink-500/5 hover:border-pink-200 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-pink-50 text-pink-700 border border-pink-200">
                    <Star className="w-3 h-3 fill-pink-500 text-pink-500" />
                    <span>PRIORITY #{contact.priority || idx + 1}</span>
                  </span>
                  <span className="text-xs text-slate-500 font-semibold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                    {contact.relationship}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-1">{contact.name}</h3>
                <div className="text-xs text-slate-600 font-mono mt-0.5 font-medium">{contact.phone}</div>

                <div className="mt-3.5 flex items-center space-x-2 text-[11px]">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${contact.notify_sms ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                    SMS {contact.notify_sms ? '✓' : '✗'}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${contact.notify_whatsapp ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                    WhatsApp {contact.notify_whatsapp ? '✓' : '✗'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-emerald-700 text-xs font-bold border border-slate-200 flex items-center space-x-1.5 transition-colors"
                    title="Direct Phone Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-emerald-700 text-xs font-bold border border-slate-200 flex items-center space-x-1.5 transition-colors"
                    title="WhatsApp Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </a>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(contact)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              {editingContact ? 'Edit Emergency Contact' : 'Add Trusted Contact'}
            </h3>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh (Brother)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Family">Family</option>
                    <option value="Parent">Parent</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Colleague">Colleague</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alert Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value={1}>1 (First Alert)</option>
                    <option value={2}>2 (Second)</option>
                    <option value={3}>3 (Third)</option>
                    <option value={4}>4 (Fourth)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifySms}
                    onChange={(e) => setNotifySms(e.target.checked)}
                    className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Send Urgent SMS Alerts with GPS Link</span>
                </label>
                <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWhatsapp}
                    onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                    className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                  />
                  <span>Send Urgent WhatsApp Message with GPS Link</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-pink-500/20 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingContact ? 'Update Contact' : 'Save Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
