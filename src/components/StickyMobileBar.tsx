import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  Home, 
  FlaskConical, 
  Search, 
  Stethoscope, 
  Send, 
  ShoppingCart,
  PhoneCall
} from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const { 
    language, 
    cart, 
    activeTab, 
    setActiveTab, 
    setIsBookingModalOpen, 
    setIsPrescriptionModalOpen 
  } = useLab();

  return (
    <div className="mobile-sticky-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: '0.4rem 0.25rem', gap: '0.2rem' }}>
      {/* Tab 1: Home */}
      <button 
        onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="btn"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.15rem',
          padding: '0.25rem',
          minHeight: '44px',
          background: 'none',
          border: 'none',
          color: activeTab === 'home' ? 'var(--primary-700)' : 'var(--slate-500)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'home' ? 800 : 500
        }}
      >
        <Home size={18} />
        <span>{language === 'hi' ? 'होम' : 'Home'}</span>
      </button>

      {/* Tab 2: Tests */}
      <button 
        onClick={() => { setActiveTab('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="btn"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.15rem',
          padding: '0.25rem',
          minHeight: '44px',
          background: 'none',
          border: 'none',
          color: activeTab === 'catalogue' ? 'var(--primary-700)' : 'var(--slate-500)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'catalogue' ? 800 : 500
        }}
      >
        <FlaskConical size={18} />
        <span>{language === 'hi' ? 'जांच' : 'Tests'}</span>
      </button>

      {/* Tab 3: Track */}
      <button 
        onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="btn"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.15rem',
          padding: '0.25rem',
          minHeight: '44px',
          background: 'none',
          border: 'none',
          color: activeTab === 'tracker' ? 'var(--primary-700)' : 'var(--slate-500)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'tracker' ? 800 : 500
        }}
      >
        <Search size={18} />
        <span>{language === 'hi' ? 'ट्रैक' : 'Track'}</span>
      </button>

      {/* Tab 4: Doctors */}
      <button 
        onClick={() => { setActiveTab('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="btn"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.15rem',
          padding: '0.25rem',
          minHeight: '44px',
          background: 'none',
          border: 'none',
          color: activeTab === 'doctors' ? 'var(--primary-700)' : 'var(--slate-500)',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'doctors' ? 800 : 500
        }}
      >
        <Stethoscope size={18} />
        <span>{language === 'hi' ? 'डॉक्टर' : 'Doctors'}</span>
      </button>

      {/* Tab 5: WhatsApp Parcha */}
      <button 
        onClick={() => setIsPrescriptionModalOpen(true)}
        className="btn"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.15rem',
          padding: '0.25rem',
          minHeight: '44px',
          background: 'none',
          border: 'none',
          color: 'var(--whatsapp)',
          fontSize: '0.7rem',
          fontWeight: 700
        }}
      >
        <Send size={18} />
        <span>{language === 'hi' ? 'पर्चा' : 'Parcha'}</span>
      </button>
    </div>
  );
};
