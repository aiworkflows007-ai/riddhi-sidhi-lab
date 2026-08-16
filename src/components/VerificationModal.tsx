import React, { useEffect, useState } from 'react';
import { useLab } from '../context/LabContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Lock, 
  Building2, 
  FileCheck,
  Printer
} from 'lucide-react';
import QRCode from 'qrcode';

export const VerificationModal: React.FC = () => {
  const { activeVerificationBooking, setActiveVerificationBooking, language } = useLab();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (activeVerificationBooking) {
      const verifyUrl = `https://riddhisidhilab.in/verify?id=${activeVerificationBooking.bookingId}&ts=${Date.now()}`;
      QRCode.toDataURL(verifyUrl, { width: 160, margin: 1 })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error(err));
    }
  }, [activeVerificationBooking]);

  if (!activeVerificationBooking) return null;

  const booking = activeVerificationBooking;

  // Mask patient name for privacy protection
  const maskName = (name: string) => {
    const parts = name.split(' ');
    return parts.map(p => p[0] + '*'.repeat(Math.max(1, p.length - 2)) + (p.length > 1 ? p[p.length - 1] : '')).join(' ');
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveVerificationBooking(null)}>
      <div className="modal-card" style={{ maxWidth: '580px', background: '#fff', border: '2px solid var(--primary-500)' }} onClick={e => e.stopPropagation()}>
        {/* Header with Certified Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--primary-100)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--emerald-50)', color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--slate-900)' }}>
                  RIDDHI SIDHI JANCH LAB
                </span>
                <span className="badge badge-emerald">VERIFIED</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary-800)', fontWeight: 600 }}>
                Digital Authenticity Verification Certificate • Ara, Bihar
              </div>
            </div>
          </div>

          <button onClick={() => setActiveVerificationBooking(null)} className="btn btn-secondary btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* Certificate Body */}
        <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Certificate / Booking ID:</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary-800)' }}>{booking.bookingId}</div>
            </div>
            {qrDataUrl && (
              <img src={qrDataUrl} alt="Verification QR Code" style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--slate-300)' }} />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', borderTop: '1px solid var(--slate-200)', paddingTop: '0.75rem' }}>
            <div>
              <span style={{ color: 'var(--slate-500)' }}>Patient:</span>{' '}
              <strong>{maskName(booking.patient.fullName)}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-500)' }}>Age/Gender:</span>{' '}
              <strong>{booking.patient.age} Y / {booking.patient.gender}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-500)' }}>Collection Date:</span>{' '}
              <strong>{booking.preferredDate}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--slate-500)' }}>Issued Status:</span>{' '}
              <strong style={{ color: 'var(--emerald-700)' }}>GENUINE & CERTIFIED</strong>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', borderTop: '1px solid var(--slate-200)', paddingTop: '0.75rem' }}>
            <span style={{ color: 'var(--slate-500)' }}>Tests Performed:</span>{' '}
            <strong>{booking.selectedTests.map(t => t.name).join(', ')}</strong>
          </div>
        </div>

        {/* Privacy Note */}
        <div style={{ background: '#f8fafc', border: '1px solid var(--slate-200)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Lock size={16} color="var(--primary-700)" style={{ flexShrink: 0 }} />
          <span>
            {language === 'hi'
              ? 'गोपनीयता नीति: व्यक्तिगत मेडिकल पैथोलॉजी मान सार्वजनिक सत्यापन पर छिपाए गए हैं।'
              : 'Data Privacy Guard: Numerical pathological findings are redacted on public web verification.'}
          </span>
        </div>

        {/* Pathologist Stamp Signoff */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-200)', paddingTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>Signing Authority:</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--slate-800)' }}>Dr. S. K. Verma, MD (Pathology)</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Reg No: 54982/BCMR • Ara Central Lab</div>
          </div>

          <button 
            onClick={() => window.print()}
            className="btn btn-secondary btn-sm"
          >
            <Printer size={16} />
            <span>{language === 'hi' ? 'प्रमाण पत्र प्रिंट करें' : 'Print Certificate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
