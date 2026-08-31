import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { DoctorConciergeRequest, ConciergeStatus } from '../types';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Timer,
  MessageSquare
} from 'lucide-react';

export const ReportTracker: React.FC = () => {
  const { 
    doctorRequests,
    language 
  } = useLab();

  const [searchInput, setSearchInput] = useState('');
  const [selectedDocRequest, setSelectedDocRequest] = useState<DoctorConciergeRequest | null>(() => {
    return doctorRequests.length > 0 ? doctorRequests[0] : null;
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchInput.trim();
    if (!query) {
      setErrorMessage(language === 'hi' ? 'कृपया टोकन आईडी या 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter Token ID or 10-digit mobile number.');
      return;
    }

    const cleanPhone = query.replace(/\D/g, '').slice(-10);
    const foundDoc = doctorRequests.find(r => 
      r.requestId.toUpperCase() === query.toUpperCase() || 
      r.whatsappPhone.replace(/\D/g, '').slice(-10) === cleanPhone
    );

    if (foundDoc) {
      setSelectedDocRequest(foundDoc);
      return;
    }

    setErrorMessage(
      language === 'hi'
        ? `आईडी या नंबर "${query}" के साथ कोई टोकन रिकॉर्ड नहीं मिला। कृपया अपना व्हाट्सएप चेक करें।`
        : `No active token records found for "${query}". Please check your WhatsApp confirmation.`
    );
  };

  const docTokenSteps: Array<{ key: ConciergeStatus; labelEn: string; labelHi: string; descEn: string; descHi: string }> = [
    { 
      key: 'REQUESTED', 
      labelEn: 'Token Request Received', 
      labelHi: 'अनुरोध दर्ज हुआ', 
      descEn: 'Logged in queue for tomorrow morning', 
      descHi: 'आपका अनुरोध दर्ज, सुबह की लाइन में लगेगा' 
    },
    { 
      key: 'LINE_QUEUED', 
      labelEn: 'Runner in Clinic Line (6:00 AM)', 
      labelHi: 'रनर क्लिनिक काउंटर पर', 
      descEn: 'DoctorSathi runner standing in compounder queue', 
      descHi: 'हमारा फील्ड साथी डॉक्टर के क्लिनिक काउंटर पर लाइन में है' 
    },
    { 
      key: 'TOKEN_CONFIRMED', 
      labelEn: 'Token Secured & Photographed', 
      labelHi: 'टोकन व पर्चा पक्का मिला', 
      descEn: 'Official clinic serial number allotted & slip photographed', 
      descHi: 'डॉक्टर का आधिकारिक टोकन नंबर मिला, पर्चा फोटो तैयार' 
    },
    { 
      key: 'COMPLETED', 
      labelEn: 'WhatsApp Delivered', 
      labelHi: 'व्हाट्सएप पर भेजा गया', 
      descEn: 'Token photo sent to your WhatsApp', 
      descHi: 'टोकन पर्चा फोटो मरीज के व्हाट्सएप पर भेजा गया' 
    }
  ];

  const getDocStepIndex = (status: ConciergeStatus) => {
    if (status === 'REQUESTED') return 0;
    if (status === 'LINE_QUEUED') return 1;
    if (status === 'TOKEN_CONFIRMED') return 2;
    if (status === 'COMPLETED') return 3;
    return 0;
  };

  return (
    <section className="app-container" id="tracker" style={{ padding: '3rem 1.25rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          <Timer size={16} />
          <span>{language === 'hi' ? 'लाइव डॉक्टर टोकन ट्रैकर' : 'Live Doctor Token Tracker'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          {language === 'hi' ? 'अपने डॉक्टर पर्चे / टोकन का स्टेटस देखें' : 'Track Your Doctor Token & Queue Status'}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--slate-600)' }}>
          {language === 'hi' 
            ? 'अपनी टोकन आईडी (उदा: DOC-ARA-2026-891) या मोबाइल नंबर से लाइव स्थिति देखें।'
            : 'Enter your Token Request ID or Mobile number to check real-time progress.'}
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto 2rem auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <form onSubmit={handleSearch}>
          <label className="form-label" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
            {language === 'hi' ? 'टोकन आईडी या 10-अंकों का मोबाइल नंबर:' : 'Enter Token Request ID or Mobile:'}
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className={`form-input ${errorMessage ? 'error' : ''}`}
              placeholder="e.g. DOC-ARA-2026-891 or 9835011223"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0, minWidth: '130px', fontWeight: 800 }}>
              <Search size={18} />
              <span>{language === 'hi' ? 'ट्रैक करें' : 'Track'}</span>
            </button>
          </div>
          {errorMessage && (
            <div className="error-text" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={14} />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
            {language === 'hi' ? 'डेमो टोकन:' : 'Demo Records:'}
          </span>
          {doctorRequests.map(r => (
            <button
              key={r.requestId}
              onClick={() => { setSelectedDocRequest(r); setSearchInput(r.requestId); setErrorMessage(''); }}
              className={`btn btn-sm ${selectedDocRequest?.requestId === r.requestId ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', minHeight: '28px' }}
            >
              {r.requestId} ({r.confirmedTokenNumber || r.status})
            </button>
          ))}
        </div>
      </div>

      {selectedDocRequest && (
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  {selectedDocRequest.requestId}
                </span>
                <span className="badge badge-amber" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  {selectedDocRequest.status}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--slate-900)', fontWeight: 700 }}>
                👨‍⚕️ {selectedDocRequest.doctorName} — {selectedDocRequest.clinicName}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginTop: '0.2rem' }}>
                👤 <strong>मरीज:</strong> {selectedDocRequest.patientName} ({selectedDocRequest.patientAge} Y / {selectedDocRequest.patientGender}) • 📱 {selectedDocRequest.whatsappPhone}
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius-lg)', padding: '0.75rem 1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                {language === 'hi' ? 'सीरियल नंबर (Token)' : 'Confirmed Token'}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>
                {selectedDocRequest.confirmedTokenNumber || 'In Queue'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
                {selectedDocRequest.confirmedTime || selectedDocRequest.preferredSlot}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1.25rem' }}>
              {language === 'hi' ? 'लाइव टोकन प्रगति (Queue Milestones)' : 'Token Queue Progress'}
            </h3>

            <div className="stepper-container">
              {docTokenSteps.map((step, idx) => {
                const currentIdx = getDocStepIndex(selectedDocRequest.status);
                const isCompleted = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div 
                    key={step.key} 
                    className={`stepper-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <div className="stepper-node">
                      {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <div className="stepper-content">
                      <div className="stepper-title">
                        {language === 'hi' ? step.labelHi : step.labelEn}
                      </div>
                      <div className="stepper-desc">
                        {language === 'hi' ? step.descHi : step.descEn}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              💬 {language === 'hi' ? 'टोकन slip फोटो या किसी सवाल के लिए हमारी टीम से व्हाट्सएप पर संपर्क करें:' : 'For token slip photo or inquiries, message our team on WhatsApp:'}
            </div>
            <a 
              href={`https://wa.me/917999614511?text=Hello%20DoctorSathi%2C%20mera%20Token%20ID%20${selectedDocRequest.requestId}%20hai.%20Kripya%20update%20dein.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ fontWeight: 700 }}
            >
              <MessageSquare size={16} />
              <span>{language === 'hi' ? 'व्हाट्सएप सपोर्ट' : 'WhatsApp Support'}</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
