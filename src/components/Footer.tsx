import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  FlaskConical, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Send, 
  Heart,
  Globe
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveTab, setIsStaffOpsOpen } = useLab();

  return (
    <footer style={{ background: 'var(--slate-900)', color: 'var(--slate-300)', paddingTop: '3.5rem', paddingBottom: '2.5rem', marginTop: 'auto' }}>
      <div className="app-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Col 1: Brand & Credentials */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <FlaskConical size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                  {language === 'hi' ? 'रिद्धि सिद्धि जांच लैब' : 'Riddhi Sidhi Janch Lab'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-300)' }}>
                  Ara, Bhojpur (Bihar)
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--slate-400)', marginBottom: '1.25rem' }}>
              {language === 'hi' 
                ? 'आरा का अग्रणी डिजिटल पैथोलॉजी एवं डॉक्टर कंसीयज केंद्र। एनएबीएल-मानक 5-पार्ट ऑटोमेटेड मशीनें एवं त्वरित होम कलेक्शन।'
                : 'Ara\'s leading digital diagnostic facility & doctor concierge center. High accuracy, automated testing, and WhatsApp delivery.'}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: 'var(--primary-300)' }}>
              <ShieldCheck size={14} />
              <span>ISO 9001:2015 & NABL Compliant Facility</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              {language === 'hi' ? 'महत्वपूर्ण सेवाएं' : 'Quick Portals'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <button 
                  onClick={() => { setActiveTab('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--slate-300)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  🧪 {language === 'hi' ? 'जांच सूची (500+ Tests)' : 'Browse 500+ Diagnostic Tests'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--slate-300)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  🔍 {language === 'hi' ? 'रिपोर्ट ट्रैक करें (Live Tracking)' : 'Track & Verify Report Status'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--slate-300)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  👨‍⚕️ {language === 'hi' ? 'आरा डॉक्टर कंसीयज (नंबर लगवाएं)' : 'Ara Doctor Appointment Concierge'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsStaffOpsOpen(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-300)', cursor: 'pointer', textAlign: 'left', padding: 0, fontWeight: 600 }}
                >
                  📊 {language === 'hi' ? 'स्टाफ ऑपरेशन शीट (Google Sheet Sync)' : 'Staff Operations Console (v1)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ara Central Location & Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              {language === 'hi' ? 'हमारा पता एवं संपर्क (Ara)' : 'Ara Central Facility'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--primary-400)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>
                  <strong>Riddhi Sidhi Janch Lab</strong><br />
                  Opposite Sadar Hospital Main Gate, Hospital Road, Ara, Bhojpur, Bihar - 802301
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--primary-400)" />
                <span>Open Everyday: 06:30 AM – 08:30 PM</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--primary-400)" />
                <span>Phone / WhatsApp: +91 98350 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div style={{ borderTop: '1px solid var(--slate-800)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--slate-500)', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            © 2026 Riddhi Sidhi Janch Lab (रिद्धि सिद्धि जांच लैब). All rights reserved. Ara, Bihar.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Powered by</span>
            <strong style={{ color: 'var(--slate-300)' }}>Ashok Kumar — ai-workflows.cloud</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
