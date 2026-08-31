import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { 
  Stethoscope, 
  Search, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Send, 
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FlaskConical,
  UploadCloud,
  Users,
  MessageSquare,
  BadgePercent,
  Timer
} from 'lucide-react';
import { ARA_DOCTORS } from '../data/doctors';

export const Hero: React.FC = () => {
  const { 
    language, 
    setIsSymptomModalOpen, 
    setIsPrescriptionModalOpen, 
    setActiveTab, 
    getBookingById,
    doctorRequests,
    setActiveVerificationBooking 
  } = useLab();

  const [heroTab, setHeroTab] = useState<'doctor_token' | 'whatsapp' | 'track' | 'lab'>('doctor_token');
  const [selectedQuickDocId, setSelectedQuickDocId] = useState(ARA_DOCTORS[0].id);
  const [quickPatientName, setQuickPatientName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickDate, setQuickDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [quickSuccess, setQuickSuccess] = useState<string | null>(null);

  const [trackSearchId, setTrackSearchId] = useState('');
  const [trackError, setTrackError] = useState('');

  const selectedDoctor = ARA_DOCTORS.find(d => d.id === selectedQuickDocId) || ARA_DOCTORS[0];

  const handleQuickDoctorToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPatientName.trim() || !quickPhone.trim()) {
      alert(language === 'hi' ? 'कृपया मरीज का नाम और मोबाइल नंबर दर्ज करें' : 'Please enter patient name and phone');
      return;
    }

    const message = `Hello DoctorSathi Ara,%0A%0AMujhe doctor ka number lagwana hai:%0A• Doctor: ${encodeURIComponent(selectedDoctor.name)} (${encodeURIComponent(selectedDoctor.specialization)})%0A• Clinic: ${encodeURIComponent(selectedDoctor.clinicName)}, ${encodeURIComponent(selectedDoctor.locality)}%0A• Patient: ${encodeURIComponent(quickPatientName)}%0A• Phone: ${encodeURIComponent(quickPhone)}%0A• Date: ${encodeURIComponent(quickDate)}%0A• Token Fee: ₹${selectedDoctor.tokenBookingFee || 39}%0A%0AKripya mera parcha/number lagwa kar token slip bhejein.`;
    
    window.open(`https://wa.me/919835012345?text=${message}`, '_blank');
    setQuickSuccess(selectedDoctor.name);
  };

  const handleHeroTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackSearchId.trim()) {
      setTrackError(language === 'hi' ? 'कृपया टोकन या बुकिंग आईडी दर्ज करें' : 'Please enter Token or Booking ID');
      return;
    }
    setActiveTab('tracker');
  };

  return (
    <section className="hero-section" id="home">
      <div className="app-container">
        <div className="hero-grid">
          {/* Left Column: Doctor Token Value Proposition */}
          <div>
            {/* Trust Badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: '#ecfdf5', 
              color: '#065f46', 
              border: '1px solid #a7f3d0',
              padding: '0.4rem 0.95rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.8125rem', 
              fontWeight: 700, 
              marginBottom: '1.25rem' 
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              <span>{language === 'hi' ? 'आरा का #1 डॉक्टर टोकन व पर्चा बुकिंग पोर्टल' : 'Ara\'s #1 Doctor Queue & Token Service'}</span>
            </div>

            <h1 className="hero-headline" style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)', lineHeight: 1.18 }}>
              {language === 'hi' ? (
                <>आरा में डॉक्टर का नंबर (पर्चा) अब <span style={{ color: 'var(--primary-600)' }}>घर बैठे लगवाएं</span> — सिर्फ ₹39 में</>
              ) : (
                <>Skip Early Morning Clinic Queues: <span style={{ color: 'var(--primary-600)' }}>Ara Doctor Tokens</span> from Home</>
              )}
            </h1>

            <p className="hero-subhead" style={{ fontSize: '1.05rem', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {language === 'hi' ? (
                'ना सुबह 5 बजे गांव से आरा आने की टेंशन, ना कंपाउंडर की 3 घंटे लंबी लाइन में लगना। हमारी आरा टीम सुबह 6 बजे आपके लिए डॉक्टर का नंबर लगवाएगी और पर्चे का फोटो व सही समय व्हाट्सएप पर भेजेगी।'
              ) : (
                'No 5:00 AM rush from villages or standing in 3-hour compounder lines. DoctorSathi secures your official clinic token slip in Ara, sends photos on WhatsApp, and gives exact arrival time.'
              )}
            </p>

            {/* Bento Quick Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: 'var(--shadow-sm)' }}>
                <Timer size={22} color="var(--primary-600)" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>{language === 'hi' ? 'सुबह 6:00 AM' : '6:00 AM'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'कंपाउंडर लाइन रनर' : 'Clinic Line Queue'}</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: 'var(--shadow-sm)' }}>
                <Send size={22} color="var(--whatsapp)" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>{language === 'hi' ? 'पर्चा फोटो' : 'Slip Photo'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'व्हाट्सएप पर' : 'On WhatsApp'}</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: 'var(--shadow-sm)' }}>
                <BadgePercent size={22} color="var(--amber-600)" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>{language === 'hi' ? 'मात्र ₹39' : 'Only ₹39'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'सुविधा शुल्क' : 'Service Charge'}</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button 
                onClick={() => setActiveTab('doctors')}
                className="btn btn-primary btn-lg"
              >
                <Stethoscope size={20} />
                <span>{language === 'hi' ? 'आरा के सभी डॉक्टर देखें व नंबर लें' : 'Find Ara Doctors & Book Token'}</span>
              </button>

              <a 
                href="https://wa.me/919835012345?text=Hello%20DoctorSathi%20Ara%2C%20mujhe%20doctor%20ka%20number%20lagwana%20hai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageSquare size={20} />
                <span>{language === 'hi' ? 'व्हाट्सएप पर डायरेक्ट बात करें' : 'WhatsApp Instant Bot'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Bento Quick-Action Hub */}
          <div className="hero-card-hub" style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '1.75rem', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="hub-tabs" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.35rem', marginBottom: '1.5rem', background: 'var(--slate-100)', padding: '0.35rem', borderRadius: 'var(--radius-md)' }}>
              <button 
                onClick={() => setHeroTab('doctor_token')} 
                className={`hub-tab-btn ${heroTab === 'doctor_token' ? 'active' : ''}`}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.2rem' }}
              >
                <Stethoscope size={16} />
                <span>{language === 'hi' ? 'डॉक्टर टोकन' : 'Doctor'}</span>
              </button>
              <button 
                onClick={() => setHeroTab('whatsapp')} 
                className={`hub-tab-btn ${heroTab === 'whatsapp' ? 'active' : ''}`}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.2rem' }}
              >
                <MessageSquare size={16} />
                <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </button>
              <button 
                onClick={() => setHeroTab('track')} 
                className={`hub-tab-btn ${heroTab === 'track' ? 'active' : ''}`}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.2rem' }}
              >
                <Search size={16} />
                <span>{language === 'hi' ? 'टोकन ट्रैक' : 'Track'}</span>
              </button>
              <button 
                onClick={() => setHeroTab('lab')} 
                className={`hub-tab-btn ${heroTab === 'lab' ? 'active' : ''}`}
                style={{ fontSize: '0.8rem', padding: '0.5rem 0.2rem' }}
              >
                <FlaskConical size={16} />
                <span>{language === 'hi' ? 'लैब टेस्ट' : 'Lab'}</span>
              </button>
            </div>

            {/* Tab 1: Instant Doctor Token Quick Form */}
            {heroTab === 'doctor_token' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    {language === 'hi' ? 'डॉक्टर का नंबर लगवाएं' : 'Book Clinic Token'}
                  </h3>
                  <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                    {language === 'hi' ? 'शुल्क: ₹39 मात्र' : 'Fee: ₹39'}
                  </span>
                </div>

                <form onSubmit={handleQuickDoctorToken} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-700)', display: 'block', marginBottom: '0.25rem' }}>
                      {language === 'hi' ? 'आरा के डॉक्टर चुनें' : 'Select Doctor'}
                    </label>
                    <select 
                      value={selectedQuickDocId}
                      onChange={(e) => setSelectedQuickDocId(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem' }}
                    >
                      {ARA_DOCTORS.map(doc => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {language === 'hi' ? doc.specializationHi : doc.specialization} ({doc.locality.split(',')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-700)', display: 'block', marginBottom: '0.25rem' }}>
                        {language === 'hi' ? 'मरीज का नाम' : 'Patient Name'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={language === 'hi' ? 'उदा: सुरेश सिंह' : 'e.g. Ramesh Kumar'}
                        value={quickPatientName}
                        onChange={(e) => setQuickPatientName(e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-700)', display: 'block', marginBottom: '0.25rem' }}>
                        {language === 'hi' ? 'मोबाइल नंबर' : 'Phone'}
                      </label>
                      <input 
                        type="tel" 
                        placeholder="10-digit phone"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-700)', display: 'block', marginBottom: '0.25rem' }}>
                      {language === 'hi' ? 'तारीख' : 'Consultation Date'}
                    </label>
                    <input 
                      type="date" 
                      value={quickDate}
                      onChange={(e) => setQuickDate(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem' }}
                    />
                  </div>

                  {/* Doctor Info Snippet */}
                  <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '0.6rem 0.85rem', fontSize: '0.785rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                      <span>🏥 {selectedDoctor.clinicName}</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary-700)' }}>डॉक्टर फीस: ₹{selectedDoctor.consultationFee}</span>
                    </div>
                    <div style={{ color: 'var(--amber-700)', fontWeight: 600, marginTop: '0.2rem' }}>
                      ⏰ {selectedDoctor.queueOpeningTime || 'सुबह 6:30 AM लाइन शुरू'}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', fontWeight: 700 }}>
                    <Send size={18} />
                    <span>{language === 'hi' ? 'व्हाट्सएप पर टोकन पक्का करें (₹39)' : 'Confirm Token on WhatsApp (₹39)'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: WhatsApp Quick Message Bot */}
            {heroTab === 'whatsapp' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                  {language === 'hi' ? '1-क्लिक व्हाट्सएप असिस्टेंट' : '1-Click WhatsApp Assistant'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'फॉर्म भरने का मन नहीं? सीधे हमारे व्हाट्सएप पर डॉक्टर का नाम या पुराना पर्चा भेजें:' : 'Prefer messaging directly? Send the doctor name or past prescription on WhatsApp:'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <a 
                    href="https://wa.me/919835012345?text=Hello%20DoctorSathi%2C%20mujhe%20Dr.%20Vikas%20Singh%20ka%20number%20lagwana%20hai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#166534', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <span>💬 "Dr. Vikas Singh ka number lagwana hai"</span>
                    <ArrowRight size={16} />
                  </a>

                  <a 
                    href="https://wa.me/919835012345?text=Hello%20DoctorSathi%2C%20mujhe%20Dr.%20Sangeeta%20Gupta%20(Mahila%20Rog)%20ka%20token%20chahiye"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#166534', fontSize: '0.85rem', fontWeight: 600 }}
                  >
                    <span>💬 "Dr. Sangeeta Gupta (महिला रोग) token"</span>
                    <ArrowRight size={16} />
                  </a>
                </div>

                <a 
                  href="https://wa.me/919835012345?text=Hello%20DoctorSathi%20Ara%2C%20mujhe%20doctor%20ka%20number%20lagwana%20hai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp" 
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={18} />
                  <span>{language === 'hi' ? 'व्हाट्सएप चैट खोलें' : 'Open WhatsApp Chat'}</span>
                </a>
              </div>
            )}

            {/* Tab 3: Track Token */}
            {heroTab === 'track' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                  {language === 'hi' ? 'टोकन व पर्चा स्टेटस ट्रैक करें' : 'Track Doctor Token Status'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'अपनी टोकन आईडी (उदा: DOC-ARA-2026-891) या मोबाइल नंबर दर्ज करें:' : 'Enter Token Request ID or Mobile Number:'}
                </p>

                <form onSubmit={handleHeroTrack}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="e.g. DOC-ARA-2026-891 or 9835011223"
                      value={trackSearchId}
                      onChange={(e) => setTrackSearchId(e.target.value)}
                      className={`form-input ${trackError ? 'error' : ''}`}
                    />
                    {trackError && <div className="error-text">{trackError}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Search size={18} />
                    <span>{language === 'hi' ? 'लाइव स्टेटस देखें' : 'Track Live Status'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Lab Tests */}
            {heroTab === 'lab' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                  {language === 'hi' ? 'घर बैठे ब्लड टेस्ट व जांच' : 'Doorstep Blood Tests'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? '60 मिनट में घर से सैंपल कलेक्शन, 100% सटीक जांच और व्हाट्सएप पर रिपोर्ट:' : '60-min home blood collection in Ara with instant WhatsApp PDF reports:'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <div 
                    onClick={() => setActiveTab('catalogue')} 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>CBC + Widal (बुखार जांच)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Fast 90-min report</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-700)' }}>₹430</div>
                  </div>
                  <div 
                    onClick={() => setActiveTab('catalogue')} 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.85rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Full Body Checkup (68 Tests)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Sugar, Liver, Kidney, Lipid</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-700)' }}>₹1,199</div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('catalogue')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <FlaskConical size={18} />
                  <span>{language === 'hi' ? 'सभी 500+ टेस्ट देखें' : 'View All Diagnostic Tests'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
