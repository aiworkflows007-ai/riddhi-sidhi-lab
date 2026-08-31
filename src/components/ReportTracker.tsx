import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { TestBooking, ReportStatus, DoctorConciergeRequest, ConciergeStatus } from '../types';
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Send, 
  ShieldCheck, 
  Phone, 
  User, 
  MapPin, 
  QrCode,
  AlertCircle,
  FlaskConical,
  Stethoscope,
  Timer,
  MessageSquare
} from 'lucide-react';

export const ReportTracker: React.FC = () => {
  const { 
    bookings, 
    getBookingById, 
    getBookingsByPhone, 
    doctorRequests,
    setActiveVerificationBooking, 
    language 
  } = useLab();

  const [activeTrackingMode, setActiveTrackingMode] = useState<'tokens' | 'lab'>('tokens');
  const [searchInput, setSearchInput] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<TestBooking | null>(() => {
    return bookings.length > 0 ? bookings[0] : null;
  });
  const [selectedDocRequest, setSelectedDocRequest] = useState<DoctorConciergeRequest | null>(() => {
    return doctorRequests.length > 0 ? doctorRequests[0] : null;
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchInput.trim();
    if (!query) {
      setErrorMessage(language === 'hi' ? 'कृपया आईडी या 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter an ID or mobile number.');
      return;
    }

    if (activeTrackingMode === 'tokens') {
      const cleanPhone = query.replace(/\D/g, '').slice(-10);
      const foundDoc = doctorRequests.find(r => 
        r.requestId.toUpperCase() === query.toUpperCase() || 
        r.whatsappPhone.replace(/\D/g, '').slice(-10) === cleanPhone
      );
      if (foundDoc) {
        setSelectedDocRequest(foundDoc);
        return;
      }
    } else {
      const byId = getBookingById(query);
      if (byId) {
        setSelectedBooking(byId);
        return;
      }
      const byPhone = getBookingsByPhone(query);
      if (byPhone.length > 0) {
        setSelectedBooking(byPhone[0]);
        return;
      }
    }

    setErrorMessage(
      language === 'hi'
        ? `आईडी या नंबर "${query}" के साथ कोई रिकॉर्ड नहीं मिला। कृपया जांचें।`
        : `No records found for "${query}". Please check your WhatsApp confirmation.`
    );
  };

  const docTokenSteps: Array<{ key: ConciergeStatus; labelEn: string; labelHi: string; descEn: string; descHi: string }> = [
    { 
      key: 'REQUESTED', 
      labelEn: 'Token Request Received', 
      labelHi: 'अनुरोध प्राप्त', 
      descEn: 'Request logged for tomorrow morning clinic queue', 
      descHi: 'आपका अनुरोध दर्ज, सुबह की लाइन में लगेगा' 
    },
    { 
      key: 'LINE_QUEUED', 
      labelEn: 'Runner at Clinic Line (6:00 AM)', 
      labelHi: 'रनर क्लिनिक लाइन में', 
      descEn: 'DoctorSathi ground staff standing in compounder queue', 
      descHi: 'हमारा फील्ड साथी डॉक्टर के क्लिनिक काउंटर पर लाइन में है' 
    },
    { 
      key: 'TOKEN_CONFIRMED', 
      labelEn: 'Token Secured & Slip Photographed', 
      labelHi: 'टोकन व पर्चा पक्का', 
      descEn: 'Official clinic serial number allotted & slip photographed', 
      descHi: 'डॉक्टर का आधिकारिक टोकन नंबर मिला, पर्चा फोटो तैयार' 
    },
    { 
      key: 'COMPLETED', 
      labelEn: 'WhatsApp Delivered (Visit Time Alert)', 
      labelHi: 'व्हाट्सएप पर पर्चा भेजा गया', 
      descEn: 'Token photo sent with estimated clinic arrival timing', 
      descHi: 'टोकन पर्चा फोटो व सही समय मरीज के व्हाट्सएप पर भेजा गया' 
    }
  ];

  const getDocStepIndex = (status: ConciergeStatus) => {
    if (status === 'REQUESTED') return 0;
    if (status === 'LINE_QUEUED') return 1;
    if (status === 'TOKEN_CONFIRMED') return 2;
    if (status === 'COMPLETED') return 3;
    return 0;
  };

  const labSteps: Array<{ key: ReportStatus; labelEn: string; labelHi: string; descEn: string; descHi: string }> = [
    { 
      key: 'BOOKED', 
      labelEn: 'Booking Confirmed', 
      labelHi: 'बुकिंग दर्ज', 
      descEn: 'Order received and logged in lab queue', 
      descHi: 'जांच ऑर्डर सिस्टम में दर्ज कर लिया गया है' 
    },
    { 
      key: 'PHLEBOTOMIST_ASSIGNED', 
      labelEn: 'Phlebotomist Assigned', 
      labelHi: 'टेक्नीशियन रवाना', 
      descEn: 'Collector dispatched with sanitized vacutainers', 
      descHi: 'अधिकृत लैब टेक्नीशियन आपके पते के लिए रवाना' 
    },
    { 
      key: 'SAMPLE_COLLECTED', 
      labelEn: 'Sample in Central Lab', 
      labelHi: 'सैंपल लैब पहुंचा', 
      descEn: 'Barcoded tubes received at Ara processing center', 
      descHi: 'बारकोड सैंपल सुरक्षित रूप से केंद्रीय लैब पहुंच चुका है' 
    },
    { 
      key: 'IN_TESTING', 
      labelEn: 'In Automated Testing', 
      labelHi: 'ऑटोमेटेड जांच जारी', 
      descEn: 'Processing on 5-part hematology / biochemistry analyzer', 
      descHi: '5-पार्ट ऑटोमेटेड एनालाइजर पर जांच प्रक्रिया जारी है' 
    },
    { 
      key: 'REPORT_READY', 
      labelEn: 'Doctor Verified', 
      labelHi: 'डॉक्टर सत्यापित', 
      descEn: 'Report certified and signed by MD Pathologist', 
      descHi: 'कंसल्टेंट पैथोलॉजिस्ट द्वारा रिपोर्ट प्रमाणित' 
    },
    { 
      key: 'SENT_VIA_WHATSAPP', 
      labelEn: 'Delivered on WhatsApp', 
      labelHi: 'व्हाट्सएप पर भेजी गई', 
      descEn: 'Signed PDF dispatched to registered WhatsApp', 
      descHi: 'हस्ताक्षरित डिजिटल रिपोर्ट व्हाट्सएप पर प्रेषित' 
    }
  ];

  const getLabStepIndex = (status: ReportStatus) => {
    return labSteps.findIndex(s => s.key === status);
  };

  const handleWhatsAppPdfRequest = () => {
    if (!selectedBooking) return;
    const message = encodeURIComponent(
      `नमस्ते रिद्धि सिद्धि जांच लैब (Ara) 🙏\n` +
      `कृपया मेरी जांच रिपोर्ट पीडीएफ व्हाट्सएप पर भेजें।\n` +
      `📋 बुकिंग आईडी: ${selectedBooking.bookingId}\n` +
      `👤 मरीज: ${selectedBooking.patient.fullName}\n` +
      `📱 मोबाइल: ${selectedBooking.patient.whatsappPhone}`
    );
    window.open(`https://wa.me/919835012345?text=${message}`, '_blank');
  };

  return (
    <section className="app-container" id="tracker" style={{ padding: '3rem 1.25rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Timer size={16} />
          <span>{language === 'hi' ? 'लाइव स्टेटस व टोकन ट्रैकर' : 'Live Status & Token Tracker'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          {language === 'hi' ? 'डॉक्टर टोकन या जांच रिपोर्ट ट्रैक करें' : 'Track Doctor Token & Lab Report Status'}
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)' }}>
          {language === 'hi' 
            ? 'अपनी टोकन आईडी (उदा: DOC-ARA-2026-891) या मोबाइल नंबर से लाइव स्थिति देखें।'
            : 'Enter your Token Request ID or Mobile number to check real-time progress.'}
        </p>
      </div>

      <div style={{ maxWidth: '420px', margin: '0 auto 2rem auto', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--slate-200)', padding: '0.35rem', borderRadius: 'var(--radius-full)' }}>
        <button 
          onClick={() => { setActiveTrackingMode('tokens'); setErrorMessage(''); }}
          style={{
            background: activeTrackingMode === 'tokens' ? '#fff' : 'transparent',
            color: activeTrackingMode === 'tokens' ? 'var(--slate-900)' : 'var(--slate-600)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1rem',
            fontWeight: 800,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            boxShadow: activeTrackingMode === 'tokens' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Stethoscope size={16} />
          <span>{language === 'hi' ? 'डॉक्टर टोकन' : 'Doctor Tokens'}</span>
        </button>

        <button 
          onClick={() => { setActiveTrackingMode('lab'); setErrorMessage(''); }}
          style={{
            background: activeTrackingMode === 'lab' ? '#fff' : 'transparent',
            color: activeTrackingMode === 'lab' ? 'var(--slate-900)' : 'var(--slate-600)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1rem',
            fontWeight: 800,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            boxShadow: activeTrackingMode === 'lab' ? 'var(--shadow-sm)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <FlaskConical size={16} />
          <span>{language === 'hi' ? 'लैब रिपोर्ट' : 'Lab Reports'}</span>
        </button>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto 2rem auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <form onSubmit={handleSearch}>
          <label className="form-label" style={{ fontWeight: 700, fontSize: '0.875rem' }}>
            {activeTrackingMode === 'tokens'
              ? (language === 'hi' ? 'टोकन आईडी या 10-अंकों का मोबाइल नंबर:' : 'Enter Token Request ID or Mobile:')
              : (language === 'hi' ? 'बुकिंग आईडी या 10-अंकों का मोबाइल नंबर:' : 'Enter Lab Booking ID or Mobile:')
            }
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className={`form-input ${errorMessage ? 'error' : ''}`}
              placeholder={activeTrackingMode === 'tokens' ? 'e.g. DOC-ARA-2026-891 or 9835011223' : 'e.g. RSL-2026-48291 or 9835012345'}
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0, minWidth: '130px', fontWeight: 700 }}>
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
            {language === 'hi' ? 'डेमो रिकॉर्ड्स:' : 'Demo Records:'}
          </span>
          {activeTrackingMode === 'tokens' ? (
            doctorRequests.map(r => (
              <button
                key={r.requestId}
                onClick={() => { setSelectedDocRequest(r); setSearchInput(r.requestId); setErrorMessage(''); }}
                className={`btn btn-sm ${selectedDocRequest?.requestId === r.requestId ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', minHeight: '28px' }}
              >
                {r.requestId} ({r.confirmedTokenNumber || r.status})
              </button>
            ))
          ) : (
            bookings.map(b => (
              <button
                key={b.bookingId}
                onClick={() => { setSelectedBooking(b); setSearchInput(b.bookingId); setErrorMessage(''); }}
                className={`btn btn-sm ${selectedBooking?.bookingId === b.bookingId ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', minHeight: '28px' }}
              >
                {b.bookingId} ({b.reportStatus})
              </button>
            ))
          )}
        </div>
      </div>

      {activeTrackingMode === 'tokens' && selectedDocRequest && (
        <div style={{ maxWidth: '840px', margin: '0 auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  {selectedDocRequest.requestId}
                </span>
                <span className="badge badge-amber" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                  {selectedDocRequest.status}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--slate-900)', fontWeight: 700 }}>
                👨‍⚕️ {selectedDocRequest.doctorName} — {selectedDocRequest.clinicName} ({selectedDocRequest.locality})
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
                {selectedDocRequest.confirmedTokenNumber || 'Pending'}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
                {selectedDocRequest.confirmedTime || selectedDocRequest.preferredSlot}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1.25rem' }}>
              {language === 'hi' ? 'टोकन प्रगति टाइमलाइन (Queue Milestones)' : 'Token Queue Progress'}
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
              href={`https://wa.me/919835012345?text=Hello%20DoctorSathi%2C%20mera%20Token%20ID%20${selectedDocRequest.requestId}%20hai.%20Kripya%20update%20dein.`}
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

      {activeTrackingMode === 'lab' && selectedBooking && (
        <div style={{ maxWidth: '840px', margin: '0 auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  {selectedBooking.bookingId}
                </span>
                <span className={`badge ${selectedBooking.reportStatus === 'SENT_VIA_WHATSAPP' ? 'badge-emerald' : 'badge-amber'}`}>
                  {selectedBooking.reportStatus.replace('_', ' ')}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
                <strong>Patient:</strong> {selectedBooking.patient.fullName} ({selectedBooking.patient.gender}, {selectedBooking.patient.age} Yrs) • 📱 {selectedBooking.patient.whatsappPhone}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                <strong>Mode:</strong> {selectedBooking.fulfillmentType === 'HOME_COLLECTION' ? `Home Collection (${selectedBooking.patient.locality})` : 'Lab Walk-in'} • <strong>Date:</strong> {selectedBooking.preferredDate}
              </div>
            </div>

            <button 
              onClick={() => setActiveVerificationBooking(selectedBooking)}
              className="btn btn-outline-teal btn-sm"
            >
              <QrCode size={16} />
              <span>{language === 'hi' ? 'डिजिटल प्रमाण पत्र देखें' : 'View Authenticity Seal'}</span>
            </button>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '1.25rem' }}>
              {language === 'hi' ? 'लाइव प्रगति टाइमलाइन (Milestone Progress)' : 'Live Milestone Progress'}
            </h3>

            <div className="stepper-container">
              {labSteps.map((step, idx) => {
                const currentStatusIdx = getLabStepIndex(selectedBooking.reportStatus);
                const isCompleted = idx < currentStatusIdx || (currentStatusIdx === labSteps.length - 1);
                const isCurrent = idx === currentStatusIdx;
                const historyItem = selectedBooking.statusHistory.find(h => h.status === step.key);

                return (
                  <div 
                    key={step.key} 
                    className={`stepper-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <div className="stepper-node">
                      {isCompleted ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <div className="stepper-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="stepper-title">
                          {language === 'hi' ? step.labelHi : step.labelEn}
                        </div>
                        {historyItem && (
                          <div className="stepper-time">
                            ⏱️ {historyItem.timestamp}
                          </div>
                        )}
                      </div>
                      <div className="stepper-desc">
                        {historyItem?.note || (language === 'hi' ? step.descHi : step.descEn)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedBooking.phlebotomistName && (
            <div style={{ background: '#f0fdfa', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--slate-900)' }}>
                    {selectedBooking.phlebotomistName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-800)' }}>
                    🛵 {language === 'hi' ? 'अधिकृत लैब टेक्नीशियन (वेन-फाइंडर किट युक्त)' : 'Certified Phlebotomist (Ara Central Lab)'}
                  </div>
                </div>
              </div>

              <a 
                href={`tel:${selectedBooking.phlebotomistPhone || '+919934182910'}`} 
                className="btn btn-secondary btn-sm"
              >
                <Phone size={14} color="var(--primary-700)" />
                <span>{language === 'hi' ? 'टेक्नीशियन को कॉल करें' : 'Call Collector'}</span>
              </a>
            </div>
          )}

          {/* Action CTAs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-600)' }}>
              🧪 {selectedBooking.selectedTests.map(t => t.name).join(', ')}
            </div>

            <button 
              onClick={handleWhatsAppPdfRequest}
              className="btn btn-whatsapp"
            >
              <Send size={18} />
              <span>{language === 'hi' ? 'व्हाट्सएप पर रिपोर्ट मंगवाएं' : 'Get Report on WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
