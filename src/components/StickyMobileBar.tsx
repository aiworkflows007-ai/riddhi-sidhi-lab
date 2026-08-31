import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  Home, 
  Stethoscope, 
  MessageSquare,
  Timer
} from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const { 
    language, 
    activeTab, 
    setActiveTab 
  } = useLab();

  return (
    <div className="mobile-sticky-bar" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '0.4rem 0.25rem', gap: '0.2rem' }}>
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
          fontSize: '0.72rem',
          fontWeight: activeTab === 'home' ? 800 : 500
        }}
      >
        <Home size={18} />
        <span>{language === 'hi' ? 'होम' : 'Home'}</span>
      </button>

      {/* Tab 2: Doctors (Primary) */}
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
          fontSize: '0.72rem',
          fontWeight: activeTab === 'doctors' ? 800 : 600
        }}
      >
        <Stethoscope size={18} />
        <span>{language === 'hi' ? 'डॉक्टर' : 'Doctors'}</span>
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
          fontSize: '0.72rem',
          fontWeight: activeTab === 'tracker' ? 800 : 500
        }}
      >
        <Timer size={18} />
        <span>{language === 'hi' ? 'ट्रैक' : 'Track'}</span>
      </button>

      {/* Tab 4: WhatsApp Direct */}
      <a 
        href="https://wa.me/919835012345?text=Hello%20DoctorSathi%20Ara%2C%20mujhe%20doctor%20ka%20number%20lagwana%20hai"
        target="_blank"
        rel="noopener noreferrer"
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
          fontSize: '0.72rem',
          fontWeight: 800,
          textDecoration: 'none'
        }}
      >
        <MessageSquare size={18} />
        <span>{language === 'hi' ? 'व्हाट्सएप (₹39)' : 'WhatsApp'}</span>
      </a>
    </div>
  );
};
