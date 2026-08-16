import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { 
  FlaskConical, 
  UploadCloud, 
  Search, 
  Stethoscope, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Send, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    language, 
    setIsSymptomModalOpen, 
    setIsPrescriptionModalOpen, 
    setActiveTab, 
    getBookingById, 
    setActiveVerificationBooking 
  } = useLab();

  const [heroTab, setHeroTab] = useState<'book' | 'upload' | 'track' | 'doctor'>('book');
  const [trackSearchId, setTrackSearchId] = useState('');
  const [trackError, setTrackError] = useState('');

  const handleHeroTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackSearchId.trim()) {
      setTrackError(language === 'hi' ? 'कृपया बुकिंग आईडी दर्ज करें' : 'Please enter a Booking ID');
      return;
    }
    const booking = getBookingById(trackSearchId.trim());
    if (booking) {
      setTrackError('');
      setActiveTab('tracker');
    } else {
      setTrackError(language === 'hi' ? 'बुकिंग नहीं मिली। कृपया आईडी जांचें।' : 'Booking not found. Please verify ID.');
    }
  };

  return (
    <section className="hero-section" id="home">
      <div className="app-container">
        <div className="hero-grid">
          {/* Left Column: Clinical Value Proposition */}
          <div>
            {/* Trust Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e0f2fe', color: '#0369a1', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              <ShieldCheck size={16} />
              <span>{language === 'hi' ? 'सदर अस्पताल आरा के सामने • 100% सटीक जांच' : 'Opp. Sadar Hospital, Ara • Certified Precision'}</span>
            </div>

            <h1 className="hero-headline">
              {language === 'hi' ? (
                <>आरा में सबसे सटीक जांच और <span style={{ color: 'var(--primary-600)' }}>सबसे तेज़ रिपोर्ट</span> सीधे व्हाट्सएप पर</>
              ) : (
                <>Ara's Most Trusted Lab: <span style={{ color: 'var(--primary-600)' }}>Accurate Reports</span> on WhatsApp</>
              )}
            </h1>

            <p className="hero-subhead">
              {language === 'hi' ? (
                'घर बैठे 60 मिनट में सैंपल कलेक्शन, एनएबीएल-मानक 5-पार्ट ऑटोमेटेड मशीनें, और आरा के किसी भी प्रसिद्ध डॉक्टर का नंबर लगवाने की सुविधा।'
              ) : (
                'Doorstep sample collection in 60 minutes across Ara, NABL-calibrated fully automated analyzers, and offline doctor appointment concierge.'
              )}
            </p>

            {/* Quick Feature Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={20} color="var(--primary-600)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{language === 'hi' ? '60 मिनट' : '60 Mins'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'घर पर कलेक्शन' : 'Doorstep Pickup'}</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Send size={20} color="var(--whatsapp)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'पीडीएफ रिपोर्ट' : 'Instant PDF'}</div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Stethoscope size={20} color="var(--amber-600)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{language === 'hi' ? 'डॉक्टर टोकन' : 'Doctor Slot'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'कंसीयज सेवा' : 'Line-Free'}</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button 
                onClick={() => setIsSymptomModalOpen(true)}
                className="btn btn-primary btn-lg"
              >
                <Sparkles size={20} />
                <span>{language === 'hi' ? 'लक्षण अनुसार जांच चुनें' : 'Describe Symptoms / Check'}</span>
              </button>

              <button 
                onClick={() => setActiveTab('catalogue')}
                className="btn btn-secondary btn-lg"
              >
                <FlaskConical size={20} />
                <span>{language === 'hi' ? 'सभी 500+ जांच देखें' : 'Browse All Tests'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Action Hub Card */}
          <div className="hero-card-hub">
            <div className="hub-tabs">
              <button 
                onClick={() => setHeroTab('book')} 
                className={`hub-tab-btn ${heroTab === 'book' ? 'active' : ''}`}
              >
                <FlaskConical size={18} />
                <span>{language === 'hi' ? 'जांच बुक' : 'Book Test'}</span>
              </button>
              <button 
                onClick={() => setHeroTab('upload')} 
                className={`hub-tab-btn ${heroTab === 'upload' ? 'active' : ''}`}
              >
                <UploadCloud size={18} />
                <span>{language === 'hi' ? 'पर्चा भेजें' : 'Parcha'}</span>
              </button>
              <button 
                onClick={() => setHeroTab('track')} 
                className={`hub-tab-btn ${heroTab === 'track' ? 'active' : ''}`}
              >
                <Search size={18} />
                <span>{language === 'hi' ? 'ट्रैक रिपोर्ट' : 'Track'}</span>
              </button>
              <button 
                onClick={() => setHeroTab('doctor')} 
                className={`hub-tab-btn ${heroTab === 'doctor' ? 'active' : ''}`}
              >
                <Stethoscope size={18} />
                <span>{language === 'hi' ? 'डॉक्टर' : 'Doctor'}</span>
              </button>
            </div>

            {/* Tab 1: Book Test Quick Action */}
            {heroTab === 'book' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  {language === 'hi' ? 'लोकप्रिय स्वास्थ्य पैकेज व टेस्ट' : 'Popular Tests & Packages in Ara'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'घर से ब्लड सैंपल देने के लिए टेस्ट चुनें:' : 'Select tests for doorstep collection:'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div 
                    onClick={() => setActiveTab('catalogue')} 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>CBC + Widal (Fever Profile)</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'बुखार एवं टाइफाइड' : 'Viral & Typhoid screen'}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-700)' }}>₹430 <span style={{ textDecoration: 'line-through', color: 'var(--slate-400)', fontSize: '0.8rem' }}>₹680</span></div>
                  </div>

                  <div 
                    onClick={() => setActiveTab('catalogue')} 
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sampoorna Swasthya Kavach</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'फुल बॉडी (68 पैरामीटर)' : 'Full Body 68 Tests'}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-700)' }}>₹1,199 <span style={{ textDecoration: 'line-through', color: 'var(--slate-400)', fontSize: '0.8rem' }}>₹3,200</span></div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('catalogue')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <span>{language === 'hi' ? 'सभी टेस्ट देखें व बुक करें' : 'Browse All & Book'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Tab 2: Upload Prescription / Parcha */}
            {heroTab === 'upload' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  {language === 'hi' ? 'डॉक्टर का पर्चा (Prescription) भेजें' : 'Send Doctor\'s Prescription'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'टाइप करने की जरूरत नहीं! पर्चे की फोटो व्हाट्सएप पर भेजें, हमारी लैब टीम टेस्ट और रेट बता देगी।' : 'No typing needed. Send a photo of your prescription on WhatsApp and our lab team will schedule it.'}
                </p>

                <button 
                  onClick={() => setIsPrescriptionModalOpen(true)}
                  className="btn btn-whatsapp"
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                >
                  <Send size={18} />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर पर्चा भेजें (1-Tap)' : 'Send via WhatsApp (1-Tap)'}</span>
                </button>

                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textAlign: 'center' }}>
                  ⚡ {language === 'hi' ? '15 मिनट के अंदर हमारी आरा टीम से कॉल/मैसेज आएगा' : 'Our Ara team responds within 15 minutes'}
                </div>
              </div>
            )}

            {/* Tab 3: Track Report */}
            {heroTab === 'track' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  {language === 'hi' ? 'जांच रिपोर्ट का स्टेटस ट्रैक करें' : 'Track Sample & Report Status'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'अपनी बुकिंग आईडी (उदा: RSL-2026-48291) दर्ज करें:' : 'Enter your Booking ID (e.g. RSL-2026-48291):'}
                </p>

                <form onSubmit={handleHeroTrack}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="e.g. RSL-2026-48291 or RSL-2026-1002"
                      value={trackSearchId}
                      onChange={(e) => setTrackSearchId(e.target.value)}
                      className={`form-input ${trackError ? 'error' : ''}`}
                    />
                    {trackError && <div className="error-text">{trackError}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Search size={18} />
                    <span>{language === 'hi' ? 'स्टेटस देखें' : 'Check Report Status'}</span>
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Doctor Concierge */}
            {heroTab === 'doctor' && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
                  {language === 'hi' ? 'आरा डॉक्टर अपॉइंटमेंट कंसीयज' : 'Ara Doctor Appointment Concierge'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'क्लिनिक में घंटों लाइन में खड़े होने से मुक्ति! हमारी टीम आपके लिए डॉक्टर का नंबर लगवाएगी।' : 'Skip long clinic queues! Our team secures your appointment serial token on your behalf.'}
                </p>

                <button 
                  onClick={() => setActiveTab('doctors')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  <Stethoscope size={18} />
                  <span>{language === 'hi' ? 'आरा के डॉक्टर खोजें व नंबर लगवाएं' : 'Find Ara Doctors & Request Token'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
