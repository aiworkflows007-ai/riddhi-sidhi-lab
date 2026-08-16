import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  FlaskConical, 
  ShoppingCart, 
  Globe, 
  PhoneCall, 
  ShieldCheck, 
  FileText, 
  Stethoscope, 
  Activity,
  ClipboardList
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    cart, 
    setIsBookingModalOpen, 
    activeTab, 
    setActiveTab, 
    setIsStaffOpsOpen 
  } = useLab();

  return (
    <header className="header-glass">
      <div className="app-container">
        <div className="nav-wrapper">
          {/* Brand Logo */}
          <a href="#home" onClick={() => setActiveTab('home')} className="brand-logo">
            <div className="brand-icon">
              <FlaskConical size={24} />
            </div>
            <div className="brand-titles">
              <div className="brand-name">
                {language === 'hi' ? 'रिद्धि सिद्धि जांच लैब' : 'Riddhi Sidhi Janch Lab'}
              </div>
              <div className="brand-tagline">
                {language === 'hi' ? 'सदर अस्पताल रोड, आरा • शुद्धता एवं विश्वास' : 'Hospital Road, Ara • Diagnostic Precision'}
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
                  onClick={() => setActiveTab('catalogue')} 
                  className={`nav-link ${activeTab === 'catalogue' ? 'active' : ''}`}
                >
                  <FlaskConical size={18} />
                  {language === 'hi' ? 'जांच सूची (Tests)' : 'All Tests'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('tracker')} 
                  className={`nav-link ${activeTab === 'tracker' ? 'active' : ''}`}
                >
                  <FileText size={18} />
                  {language === 'hi' ? 'रिपोर्ट ट्रैक करें' : 'Track Report'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('doctors')} 
                  className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`}
                >
                  <Stethoscope size={18} />
                  {language === 'hi' ? 'डॉक्टर कंसीयज' : 'Ara Doctors'}
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
              title="Lab Operations / Google Sheet Ops"
            >
              <ClipboardList size={16} />
              <span style={{ fontSize: '0.8rem' }}>{language === 'hi' ? 'स्टाफ शीट' : 'Lab Ops'}</span>
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

            {/* Direct Phone Helpline */}
            <a 
              href="tel:+919835012345" 
              className="btn btn-sm btn-secondary"
              style={{ display: 'none', md: 'inline-flex' } as React.CSSProperties}
            >
              <PhoneCall size={16} />
              <span>06182-XXXXXX</span>
            </a>

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ position: 'relative' }}
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
