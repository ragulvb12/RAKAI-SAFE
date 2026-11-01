import React, { useState } from 'react';
import { useAuth } from '../../features/authentication/AuthContext';
import { SAFETY_SITUATIONS, SafetySituation } from '../../features/i18n/translations';
import { 
  BookOpen, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle,
  HeartPulse,
  Car,
  Footprints,
  Eye,
  Home,
  Hand
} from 'lucide-react';

export const SafetyGuidePage: React.FC = () => {
  const { language } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('being-followed');

  const categories = ['All', 'Immediate Danger', 'Travel & Transit', 'Harassment', 'Medical & Crisis'];

  const filteredSituations = SAFETY_SITUATIONS.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = item.title.toLowerCase().includes(q) || item.steps.some((s) => s.toLowerCase().includes(q));
      const matchTa = item.title_ta.toLowerCase().includes(q) || item.steps_ta.some((s) => s.toLowerCase().includes(q));
      return matchEn || matchTa;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-md shadow-pink-500/5">
        <div className="flex items-center space-x-2 text-pink-600 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Bilingual Emergency Playbooks</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">
          {language === 'en' ? '20 Essential Safety Guides' : '20 முக்கிய பாதுகாப்பு வழிகாட்டிகள்'}
        </h1>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {language === 'en'
            ? 'Actionable, step-by-step tactics designed by safety experts for real-world threatening situations. Available in English & தமிழ்.'
            : 'நிஜ வாழ்க்கை ஆபத்துகளில் உங்களைப் பாதுகாத்துக் கொள்ள நிபுணர்களால் உருவாக்கப்பட்ட அவசர வழிகாட்டுதல்கள்.'}
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'Search situations or keywords...' : 'பாதுகாப்பு வழிகாட்டிகளைத் தேடுக...'}
            className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-white border border-pink-100 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20'
                  : 'bg-white hover:bg-pink-50 text-slate-600 border border-pink-100 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Cards */}
      <div className="space-y-3.5">
        {filteredSituations.map((sit) => {
          const isExpanded = expandedId === sit.id;
          const title = language === 'en' ? sit.title : sit.title_ta;
          const steps = language === 'en' ? sit.steps : sit.steps_ta;

          return (
            <div
              key={sit.id}
              className="bg-white rounded-3xl border border-pink-100/90 shadow-sm hover:border-pink-200 hover:shadow-md transition-all overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : sit.id)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-pink-50/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-pink-50 border border-pink-200 text-pink-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {sit.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{title}</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="hidden sm:inline-flex items-center space-x-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{sit.helpline}</span>
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-pink-100 bg-pink-50/40 space-y-4 animate-fadeIn">
                  <div className="text-xs font-black uppercase tracking-wider text-pink-700">
                    {language === 'en' ? 'Immediate Recommended Action Steps:' : 'உடனடி நடவடிக்கை படிகள்:'}
                  </div>
                  <ul className="space-y-3">
                    {steps.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs text-slate-800 leading-relaxed font-medium">
                        <span className="w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5 shadow-sm">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 border-t border-pink-200/60 gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Emergency Helpline:</span>
                      <a
                        href={`tel:${sit.helpline.split('/')[0].trim()}`}
                        className="font-bold text-emerald-700 hover:underline flex items-center space-x-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{sit.helpline}</span>
                      </a>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Rakai Safe Verified Safety Protocol
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
