import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { 
  X, 
  UploadCloud, 
  Send, 
  CheckCircle2, 
  Camera, 
  Phone, 
  FileText,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const UploadPrescriptionModal: React.FC = () => {
  const { isPrescriptionModalOpen, setIsPrescriptionModalOpen, language } = useLab();
  const [patientName, setPatientName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isPrescriptionModalOpen) return null;

  const handleWhatsAppDirect = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = whatsappPhone || 'Patient';
    const name = patientName || 'Patient';
    const addr = address ? ` | Address: ${address}, Ara` : '';
    const message = encodeURIComponent(
      `नमस्ते DoctorSathi Ara 🙏\n` +
      `मुझे डॉक्टर के पर्चे के अनुसार टोकन / टेस्ट बुक करना है।\n` +
      `👤 नाम: ${name}\n` +
      `📱 फोन: ${phone}${addr}\n` +
      `कृपया पर्चा देखकर आगे की प्रक्रिया बताएं।`
    );

    // Open WhatsApp URL
    window.open(`https://wa.me/919835012345?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPrescriptionModalOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '540px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '0.4rem', borderRadius: 'var(--radius-md)' }}>
              <Camera size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {language === 'hi' ? 'डॉक्टर का पर्चा भेजें' : 'Upload Doctor\'s Prescription'}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                {language === 'hi' ? 'फोटो भेजें, हमारी लैब टीम टेस्ट शेड्यूल कर देगी' : 'Send prescription photo via WhatsApp'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => { setIsPrescriptionModalOpen(false); setSubmitted(false); }}
            className="btn btn-secondary btn-icon-only"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              {language === 'hi' ? 'व्हाट्सएप चैट खुल गई है!' : 'WhatsApp Chat Opened!'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.5rem' }}>
              {language === 'hi' 
                ? 'कृपया अपने व्हाट्सएप में पर्चे की फोटो अटैच करके भेजें। हमारी आरा टीम 15 मिनट में जवाब देगी।'
                : 'Please attach and send the photo of your prescription in WhatsApp. Our Ara team will respond shortly.'}
            </p>
            <button 
              onClick={() => { setIsPrescriptionModalOpen(false); setSubmitted(false); }}
              className="btn btn-primary"
            >
              {language === 'hi' ? 'ठीक है (Done)' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppDirect}>
            {/* Value Proposition Box */}
            <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary-800)', marginBottom: '0.35rem' }}>
                <Clock size={16} />
                <span>{language === 'hi' ? 'आरा में 15 मिनट के अंदर त्वरित पुष्टि' : 'Quick response within 15 minutes in Ara'}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                {language === 'hi' 
                  ? 'पर्चे पर लिखे कठिन मेडिकल नाम टाइप करने की जरूरत नहीं। फोटो भेजें, हम सब संभाल लेंगे।'
                  : 'No need to type complex medicine or test names. Send photo and our certified pathologists will review.'}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">{language === 'hi' ? 'मरीज का नाम (Patient Name):' : 'Patient Name:'}</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Ramesh Kumar"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{language === 'hi' ? 'व्हाट्सएप मोबाइल नंबर (WhatsApp Phone):' : 'WhatsApp Phone Number:'}</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="10-digit mobile (e.g. 9835012345)"
                value={whatsappPhone}
                onChange={e => setWhatsappPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{language === 'hi' ? 'आरा में आपका पता / इलाका (Locality in Ara):' : 'Ara Address / Area (Optional):'}</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Near Sadar Hospital, Nawada, Katira"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', minHeight: '48px' }}>
              <Send size={18} />
              <span>{language === 'hi' ? 'व्हाट्सएप पर फोटो भेजें (Open WhatsApp)' : 'Open WhatsApp & Send Photo'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
