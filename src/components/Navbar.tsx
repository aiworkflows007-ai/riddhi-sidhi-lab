import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  Stethoscope,
  FlaskConical, 
  ShoppingCart, 
  Globe, 
  PhoneCall, 
  ShieldCheck, 
  FileText, 
  Activity,
  ClipboardList,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    cart, 
    setIsBookingModalOpen, 
    activeTab, 
    setActiveTab, 
    setIsStaffOpsOpen,
    setIsPrescriptionModalOpen
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
                <span>{language === 'hi' ? 'DoctorSathi' : 'DoctorSathi'}</span>
                <span style={{ 
                  fontSize: '0.6875rem', 
                  fontWeight: 700, 
                  background: 'var(--primary-100)', 
                  color: 'var(--primary-800)', 
                  padding: '0.15rem 0.45rem', 
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.02em'
                }}>
                  ARA
                </span>
              </div>
              <div className="brand-tagline">
                {language === 'hi' ? 'डॉक्टर का नंबर अब घर बैठे • लाइन से मुक्ति' : 'Skip Clinic Lines • Doctor Token & Lab'}
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <button 
                  onClick={() => setActiveTab('home')} 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                >
                  <Activity size={18} />
                  {language === 'hi' ? 'होम' : 'Home'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('doctors')} 
                  className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`}
                >
                  <Stethoscope size={18} />
                  {language === 'hi' ? 'डॉक्टर नंबर (Tokens)' : 'Doctor Tokens'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('tracker')} 
                  className={`nav-link ${activeTab === 'tracker' ? 'active' : ''}`}
                >
                  <FileText size={18} />
                  {language === 'hi' ? 'टोकन स्थिति (Track)' : 'Track Token'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('catalogue')} 
                  className={`nav-link ${activeTab === 'catalogue' ? 'active' : ''}`}
                >
                  <FlaskConical size={18} />
                  {language === 'hi' ? 'लैब टेस्ट (Diagnostics)' : 'Lab Tests'}
                </button>
              </li>
            </ul>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* WhatsApp Quick Link */}
            <a 
              href="https://wa.me/919835012345?text=Hello%20DoctorSathi%20Ara%2C%20mujhe%20doctor%20ka%20number%20lagwana%20hai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-whatsapp"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              title="Book via WhatsApp"
            >
              <MessageSquare size={16} />
              <span>{language === 'hi' ? 'व्हाट्सएप बुकिंग' : 'WhatsApp'}</span>
            </a>

            {/* Staff Operations Console Shortcut */}
            <button 
              onClick={() => setIsStaffOpsOpen(true)}
              className="btn btn-sm btn-secondary"
              title="Lab & Token Operations Console"
            >
              <ClipboardList size={16} />
              <span style={{ fontSize: '0.8rem' }}>{language === 'hi' ? 'स्टाफ' : 'Staff Ops'}</span>
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

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ position: 'relative' }}
              title="Diagnostic Cart"
            >
              <ShoppingCart size={18} />
              <span>{language === 'hi' ? 'कार्ट' : 'Cart'}</span>
              {cart.length > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'var(--amber-500)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                >
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
