import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { TestBooking, ReportStatus } from '../types';
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
  FlaskConical
} from 'lucide-react';

export const ReportTracker: React.FC = () => {
  const { 
    bookings, 
    getBookingById, 
    getBookingsByPhone, 
    setActiveVerificationBooking, 
    language 
  } = useLab();

  const [searchInput, setSearchInput] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<TestBooking | null>(() => {
    return bookings.length > 0 ? bookings[0] : null;
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchInput.trim();
    if (!query) {
      setErrorMessage(language === 'hi' ? 'कृपया बुकिंग आईडी या मोबाइल नंबर दर्ज करें।' : 'Please enter a Booking ID or 10-digit mobile.');
      return;
    }

    // Try finding by Booking ID
    const byId = getBookingById(query);
    if (byId) {
      setSelectedBooking(byId);
      return;
    }

    // Try finding by Phone
    const byPhone = getBookingsByPhone(query);
    if (byPhone.length > 0) {
      setSelectedBooking(byPhone[0]);
      return;
    }

    setErrorMessage(
      language === 'hi'
        ? `आईडी "${query}" के साथ कोई रिकॉर्ड नहीं मिला। कृपया अपनी रसीद या व्हाट्सएप चेक करें।`
        : `No active records found for "${query}". Please check your WhatsApp confirmation.`
    );
  };

  const statusSteps: Array<{ key: ReportStatus; labelEn: string; labelHi: string; descEn: string; descHi: string }> = [
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

  const getStatusIndex = (status: ReportStatus) => {
    return statusSteps.findIndex(s => s.key === status);
  };

  const currentStatusIdx = selectedBooking ? getStatusIndex(selectedBooking.reportStatus) : -1;

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
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#dcfce7', color: '#15803d', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <ShieldCheck size={16} />
          <span>{language === 'hi' ? 'लाइव सैंपल ट्रैकिंग एवं डिजिटल सत्यापन' : 'Live Sample Tracking & Anti-Tamper Verification'}</span>
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          {language === 'hi' ? 'रिपोर्ट ट्रैक एवं सत्यापन करें' : 'Track Sample & Verify Report'}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--slate-600)' }}>
          {language === 'hi' 
            ? 'अपनी बुकिंग आईडी (उदा: RSL-2026-48291) या मोबाइल नंबर से अपनी जांच की लाइव स्थिति देखें।'
            : 'Enter your Booking ID or registered mobile to see real-time milestone progress.'}
        </p>
      </div>

      {/* Lookup Card */}
      <div style={{ maxWidth: '640px', margin: '0 auto 2rem auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <form onSubmit={handleSearch}>
          <label className="form-label">
            {language === 'hi' ? 'बुकिंग आईडी या 10-अंकों का मोबाइल नंबर दर्ज करें:' : 'Enter Booking ID or 10-Digit Mobile:'}
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className={`form-input ${errorMessage ? 'error' : ''}`}
              placeholder="e.g. RSL-2026-48291 or 9835012345"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0, minWidth: '130px' }}>
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

        {/* Quick Demo Selector Chips */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
            {language === 'hi' ? 'डेमो टेस्ट ट्रैकिंग:' : 'Quick Demo Records:'}
          </span>
          {bookings.map(b => (
            <button
              key={b.bookingId}
              onClick={() => { setSelectedBooking(b); setSearchInput(b.bookingId); setErrorMessage(''); }}
              className={`btn btn-sm ${selectedBooking?.bookingId === b.bookingId ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', minHeight: '28px' }}
            >
              {b.bookingId} ({b.reportStatus})
            </button>
          ))}
        </div>
      </div>

      {/* Live Tracking Result View */}
      {selectedBooking && (
        <div style={{ maxWidth: '840px', margin: '0 auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
          {/* Order Header Summary */}
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

            {/* Verification Button */}
            <button 
              onClick={() => setActiveVerificationBooking(selectedBooking)}
              className="btn btn-outline-teal btn-sm"
            >
              <QrCode size={16} />
              <span>{language === 'hi' ? 'डिजिटल प्रमाण पत्र देखें' : 'View Authenticity Seal'}</span>
            </button>
          </div>

          {/* 5-Stage Stepper Timeline */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '1.25rem' }}>
              {language === 'hi' ? 'लाइव प्रगति टाइमलाइन (Milestone Progress)' : 'Live Milestone Progress'}
            </h3>

            <div className="stepper-container">
              {statusSteps.map((step, idx) => {
                const isCompleted = idx < currentStatusIdx || (currentStatusIdx === statusSteps.length - 1);
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

          {/* Phlebotomist / Collector Info Card if applicable */}
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
