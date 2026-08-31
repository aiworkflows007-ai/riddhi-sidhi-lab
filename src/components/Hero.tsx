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
  Users, 
  MessageSquare, 
  BadgePercent, 
  Timer, 
  Check, 
  X as CloseIcon,
  Ticket,
  QrCode
} from 'lucide-react';
import { ARA_DOCTORS } from '../data/doctors';

export const Hero: React.FC = () => {
  const { language, setActiveTab } = useLab();

  const [selectedQuickDocId, setSelectedQuickDocId] = useState(ARA_DOCTORS[0].id);
  const [quickPatientName, setQuickPatientName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickDate, setQuickDate] = useState(() => new Date().toISOString().split('T')[0]);

  const selectedDoctor = ARA_DOCTORS.find(d => d.id === selectedQuickDocId) || ARA_DOCTORS[0];

  const handleQuickDoctorToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPatientName.trim() || !quickPhone.trim()) {
      alert(language === 'hi' ? 'कृपया मरीज का नाम और मोबाइल नंबर दर्ज करें' : 'Please enter patient name and phone');
      return;
    }

    const message = `Hello DoctorSathi Ara! 👋%0A%0AMujhe doctor ka number/token lagwana hai:%0A• Doctor: ${encodeURIComponent(selectedDoctor.name)} (${encodeURIComponent(selectedDoctor.specialization)})%0A• Clinic: ${encodeURIComponent(selectedDoctor.clinicName)}, ${encodeURIComponent(selectedDoctor.locality)}%0A• Patient: ${encodeURIComponent(quickPatientName)}%0A• Mobile: ${encodeURIComponent(quickPhone)}%0A• Date: ${encodeURIComponent(quickDate)}%0A• Token Fee: ₹${selectedDoctor.tokenBookingFee || 39}%0A%0AKripya subah 6 AM mera parcha lagwa kar slip bhejein.`;
    
    window.open(`https://wa.me/919835012345?text=${message}`, '_blank');
  };

  return (
    <section className="hero-section" id="home" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
      <div className="app-container">
        {/* Main Grid */}
        <div className="hero-grid" style={{ alignItems: 'center', gap: '2rem' }}>
          
          {/* Left Column: Punchy Visual Hero Content */}
          <div>
            {/* Live Status Badge */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              background: '#ecfdf5', 
              color: '#065f46', 
              border: '1px solid #a7f3d0',
              padding: '0.35rem 0.85rem', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.8125rem', 
              fontWeight: 800, 
              marginBottom: '1rem' 
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 0 2px rgba(16,185,129,0.3)' }}></span>
              <span>{language === 'hi' ? 'आरा डॉक्टर नंबर बुकिंग • ₹39 मात्र' : 'Ara Doctor Tokens • ₹39 Fixed'}</span>
            </div>

            {/* Big Punchy Headline */}
            <h1 className="hero-headline" style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', lineHeight: 1.15, fontWeight: 900, marginBottom: '0.85rem' }}>
              {language === 'hi' ? (
                <>आरा में डॉक्टर का नंबर <span style={{ color: 'var(--primary-600)' }}>घर बैठे लगवाएं</span></>
              ) : (
                <>Book <span style={{ color: 'var(--primary-600)' }}>Ara Doctor Tokens</span> from Home</>
              )}
            </h1>

            {/* Short Tagline */}
            <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {language === 'hi' ? (
                'सुबह 5 बजे लाइन में लगने की जरूरत नहीं। हमारा साथी क्लिनिक पर नंबर लगवाकर पर्चे का फोटो आपके व्हाट्सएप पर भेजेगा।'
              ) : (
                'Skip 5:00 AM clinic compounder queues. Our local team queues early morning, secures your token slip, and sends photo on WhatsApp.'
              )}
            </p>

            {/* Visual 3 Feature Pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--primary-600)', marginBottom: '0.2rem', display: 'flex', justifyContent: 'center' }}>
                  <Timer size={22} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>6:00 AM</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'लाइन में रनर' : 'Line Runner'}</div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--whatsapp)', marginBottom: '0.2rem', display: 'flex', justifyContent: 'center' }}>
                  <Send size={22} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>{language === 'hi' ? 'पर्चा फोटो' : 'Slip Photo'}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'व्हाट्सएप पर' : 'WhatsApp Slip'}</div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--slate-200)', padding: '0.75rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--amber-600)', marginBottom: '0.2rem', display: 'flex', justifyContent: 'center' }}>
                  <BadgePercent size={22} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>₹39</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'सुविधा शुल्क' : 'Flat Fee'}</div>
              </div>
            </div>

            {/* Visual Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button 
                onClick={() => { setActiveTab('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn btn-primary btn-lg"
                style={{ fontWeight: 800 }}
              >
                <Stethoscope size={20} />
                <span>{language === 'hi' ? 'डॉक्टर चुनें व नंबर लें' : 'Find Doctors & Book'}</span>
              </button>

              <a 
                href="https://wa.me/919835012345?text=Hello%20DoctorSathi%20Ara%2C%20mujhe%20doctor%20ka%20number%20lagwana%20hai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ fontWeight: 800 }}
              >
                <MessageSquare size={20} />
                <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp 1-Tap'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Interactive Doctor Booking Card + Live Ticket Mockup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Quick Booking Widget */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '1.5rem', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ticket size={18} />
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    {language === 'hi' ? 'तुरंत नंबर बुक करें' : 'Instant Token Form'}
                  </span>
                </div>

                <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)' }}>
                  ⚡ {language === 'hi' ? 'शुल्क: ₹39' : 'Fee: ₹39'}
                </span>
              </div>

              <form onSubmit={handleQuickDoctorToken} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Doctor Selection */}
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-700)', display: 'block', marginBottom: '0.25rem' }}>
                    {language === 'hi' ? 'डॉक्टर चुनें (Ara)' : 'Choose Doctor'}
                  </label>
                  <select 
                    value={selectedQuickDocId}
                    onChange={(e) => setSelectedQuickDocId(e.target.value)}
                    className="form-select"
                    style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem', fontWeight: 600 }}
                  >
                    {ARA_DOCTORS.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.specialization} ({doc.locality.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Patient Name & Mobile */}
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
                      {language === 'hi' ? 'व्हाट्सएप नंबर' : 'WhatsApp No.'}
                    </label>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem' }}
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-700)', display: 'block', marginBottom: '0.25rem' }}>
                    {language === 'hi' ? 'तारीख' : 'Appointment Date'}
                  </label>
                  <input 
                    type="date" 
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.875rem', padding: '0.55rem 0.75rem' }}
                  />
                </div>

                {/* Selected Doctor Summary Pill */}
                <div style={{ background: '#f8fafc', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '0.65rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{selectedDoctor.clinicName}</div>
                    <div style={{ color: '#b45309', fontSize: '0.75rem', fontWeight: 600 }}>⏰ {selectedDoctor.queueOpeningTime || '6:00 AM Line'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>OPD Fee</div>
                    <div style={{ fontWeight: 800, color: 'var(--primary-700)' }}>₹{selectedDoctor.consultationFee}</div>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-whatsapp btn-lg" 
                  style={{ width: '100%', fontWeight: 800, marginTop: '0.25rem' }}
                >
                  <Send size={18} />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर टोकन पक्का करें (₹39)' : 'Confirm Token on WhatsApp (₹39)'}</span>
                </button>
              </form>
            </div>

            {/* Visual Token Ticket Mockup Strip */}
            <div style={{ background: '#fffbeb', border: '1px dashed #f59e0b', borderRadius: 'var(--radius-lg)', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#d97706', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-md)', fontWeight: 900, fontSize: '0.85rem' }}>
                  #14
                </div>
                <div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#92400e' }}>
                    {language === 'hi' ? 'लाइव पर्चा फोटो गारंटी' : 'Verified Serial Ticket'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#b45309' }}>
                    {language === 'hi' ? 'सीरियल नंबर व क्लिनिक पहुंचने का समय' : 'Serial slip photo & arrival time'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a', fontWeight: 800, fontSize: '0.75rem' }}>
                <CheckCircle2 size={16} />
                <span>100% Verified</span>
              </div>
            </div>

          </div>
        </div>

        {/* Visual 2-Way Comparison: Bina DoctorSathi vs DoctorSathi */}
        <div style={{ marginTop: '3rem', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {language === 'hi' ? 'DoctorSathi क्यों चुनें? • फर्क खुद देखें' : 'Why DoctorSathi? • Compare the Experience'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {/* Old Way */}
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#991b1b', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                <CloseIcon size={18} />
                <span>{language === 'hi' ? 'पुराना तरीका (कष्ट व समय की बर्बादी)' : 'Old Way (4-Hour Rush & Lines)'}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#7f1d1d', padding: 0 }}>
                <li>❌ सुबह 4:30 बजे नींद खराब कर गांव से निकलना</li>
                <li>❌ अस्पताल रोड पर 3 घंटे खड़े होकर लाइन लगाना</li>
                <li>❌ लाइन में धक्का-मुक्की और टोकन खत्म होने का डर</li>
                <li>❌ दिन भर का काम छोड़ना और भारी थकान</li>
              </ul>
            </div>

            {/* DoctorSathi Way */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
                <Check size={18} />
                <span>{language === 'hi' ? 'DoctorSathi तरीका (आराम व निश्चितता)' : 'DoctorSathi Way (Zero Queue)'}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#14532d', padding: 0 }}>
                <li>✅ घर बैठे 1-क्लिक में डॉक्टर का नंबर बुक करें</li>
                <li>✅ हमारा स्थानीय साथी सुबह 6 बजे लाइन में लगकर पर्चा कटाएगा</li>
                <li>✅ टोकन फोटो (सीरियल नंबर #14) आपके व्हाट्सएप पर आएगी</li>
                <li>✅ अपने नंबर के सही समय पर क्लिनिक जाएं — सिर्फ ₹39 में</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
