import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Send, 
  Heart,
  Globe,
  MessageSquare,
  FlaskConical,
  Timer
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveTab, setIsStaffOpsOpen } = useLab();

  return (
    <footer style={{ background: 'var(--slate-900)', color: 'var(--slate-300)', paddingTop: '3.5rem', paddingBottom: '2.5rem', marginTop: 'auto' }}>
      <div className="app-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          {/* Col 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Stethoscope size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.01em' }}>
                  {language === 'hi' ? 'DoctorSathi Ara' : 'DoctorSathi Ara'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-300)', fontWeight: 600 }}>
                  {language === 'hi' ? 'डॉक्टर साथी • भोजपुर, बिहार' : 'Doctor Token & Health Concierge'}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--slate-400)', marginBottom: '1.25rem' }}>
              {language === 'hi' 
                ? 'आरा शहर का विश्वसनीय डॉक्टर टोकन व हेल्थकेयर प्लेटफॉर्म। गांव व कस्बों से आने वाले मरीजों के लिए सुबह 6:00 AM डॉक्टर का नंबर लगवाने की सुविधा सिर्फ ₹39 में।'
                : 'Ara\'s trusted doctor token booking & healthcare concierge. Skip early morning 5:00 AM compounder queues across Ara clinics for only ₹39.'}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', color: 'var(--primary-300)' }}>
              <ShieldCheck size={14} />
              <span>100% Verified Local Ara Clinic Runners</span>
            </div>
          </div>

          {/* Col 2: Quick Portals */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              {language === 'hi' ? 'महत्वपूर्ण सेवाएं' : 'Quick Portals'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <button 
                  onClick={() => { setActiveTab('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--slate-300)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  👨‍⚕️ {language === 'hi' ? 'डॉक्टर नंबर लगवाएं (Doctor Tokens)' : 'Book Doctor Tokens (All Ara Clinics)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{ background: 'none', border: 'none', color: 'var(--slate-300)', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  ⏱️ {language === 'hi' ? 'टोकन स्थिति ट्रैक करें (Live Status)' : 'Track Doctor Token & Slip Status'}
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/919835012345?text=Hello%20DoctorSathi%20Ara%2C%20mujhe%20doctor%20ka%20number%20lagwana%20hai"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--whatsapp)', textDecoration: 'none', fontWeight: 700 }}
                >
                  💬 {language === 'hi' ? 'व्हाट्सएप डायरेक्ट बुकिंग (₹39)' : 'Instant WhatsApp Token Booking'}
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsStaffOpsOpen(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-300)', cursor: 'pointer', textAlign: 'left', padding: 0, fontWeight: 600 }}
                >
                  📊 {language === 'hi' ? 'स्टाफ ऑपरेशन कंसोल (Staff Ops)' : 'Staff Operations Console (v1)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ara Central Location & Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
              {language === 'hi' ? 'हमारा पता एवं हेल्पलाइन (Ara)' : 'Ara Contact & Helpline'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--primary-400)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>
                  <strong>DoctorSathi Ara Central Hub</strong><br />
                  Hospital Road, Opp. Sadar Hospital, Ara, Bhojpur, Bihar - 802301
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Timer size={16} color="var(--primary-400)" />
                <span>Line Runners Active: 05:30 AM – 08:30 PM Everyday</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} color="var(--whatsapp)" />
                <span>WhatsApp Helpline: +91 98350 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div style={{ borderTop: '1px solid var(--slate-800)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--slate-500)', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            © 2026 DoctorSathi Ara (डॉक्टर साथी). All rights reserved. Ara, Bihar.
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
