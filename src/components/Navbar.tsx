import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  Stethoscope,
  Globe, 
  PhoneCall, 
  ShieldCheck, 
  FileText, 
  Activity,
  ClipboardList,
  Sparkles,
  MessageSquare,
  Search,
  Timer
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    activeTab, 
    setActiveTab, 
    setIsStaffOpsOpen,
    setIsWhatsAppBotOpen
  } = useLab();

  return (
    <header className="header-glass">
      <div className="app-container">
        <div className="nav-wrapper">
          {/* Brand Logo */}
          <a href="#home" onClick={() => setActiveTab('home')} className="brand-logo">
            <div className="brand-icon">
              <Stethoscope size={24} />
            </div>
            <div className="brand-titles">
              <div className="brand-name" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>DoctorSathi</span>
                <span style={{ 
                  fontSize: '0.6875rem', 
                  fontWeight: 800, 
                  background: 'var(--primary-100)', 
                  color: 'var(--primary-800)', 
                  padding: '0.15rem 0.5rem', 
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.04em'
                }}>
                  ARA
                </span>
              </div>
              <div className="brand-tagline">
                {language === 'hi' ? 'डॉक्टर का नंबर (पर्चा) अब घर बैठे • ₹39' : 'Skip Clinic Queues • Ara Doctor Tokens'}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                >
                  <Activity size={17} />
                  <span>{language === 'hi' ? 'होम' : 'Home'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`}
                >
                  <Stethoscope size={17} />
                  <span>{language === 'hi' ? 'डॉक्टर सूची' : 'Find Doctors'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className={`nav-link ${activeTab === 'tracker' ? 'active' : ''}`}
                >
                  <Timer size={17} />
                  <span>{language === 'hi' ? 'टोकन ट्रैक' : 'Track Slip'}</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Staff Operations Console Shortcut */}
            <button 
              onClick={() => setIsStaffOpsOpen(true)}
              className="btn btn-sm btn-secondary"
              title="Ground Staff Queue Console"
            >
              <ClipboardList size={16} />
              <span style={{ fontSize: '0.8rem' }}>{language === 'hi' ? 'स्टाफ' : 'Staff'}</span>
            </button>

            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="btn btn-sm btn-secondary"
              title="Toggle Language"
            >
              <Globe size={16} />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* WhatsApp AI Bot Button */}
            <button 
              onClick={() => setIsWhatsAppBotOpen(true)}
              className="btn btn-sm btn-whatsapp"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800 }}
              title="Interactive AI WhatsApp Bot"
            >
              <MessageSquare size={16} />
              <span>{language === 'hi' ? '🤖 WhatsApp बॉट (₹39)' : '🤖 AI WhatsApp Bot'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
