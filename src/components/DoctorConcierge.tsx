import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { ARA_DOCTORS } from '../data/doctors';
import { DoctorProfile } from '../types';
import { 
  Stethoscope, 
  Search, 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  Send, 
  X, 
  UserCheck,
  Star,
  Users,
  ShieldCheck
} from 'lucide-react';

export const DoctorConcierge: React.FC = () => {
  const { language, createDoctorRequest } = useLab();

  const [searchDoctor, setSearchDoctor] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [activeModalDoctor, setActiveModalDoctor] = useState<DoctorProfile | null>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // Form states for booking token
  const [patientName, setPatientName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [patientAge, setPatientAge] = useState('40');
  const [patientGender, setPatientGender] = useState('Male');
  const [preferredDate, setPreferredDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [preferredSlot, setPreferredSlot] = useState('Morning OPD (09:00 AM - 01:00 PM)');
  const [symptomsNote, setSymptomsNote] = useState('');
  const [customDoctorName, setCustomDoctorName] = useState('');
  const [customClinicArea, setCustomClinicArea] = useState('');
  const [conciergeSuccess, setConciergeSuccess] = useState<{ id: string; doctor: string } | null>(null);

  const specialties = [
    { id: 'all', nameEn: 'All Doctors', nameHi: 'सभी डॉक्टर' },
    { id: 'gynae', nameEn: 'Gynecology & Women', nameHi: 'स्त्री एवं प्रसूति रोग' },
    { id: 'ortho', nameEn: 'Orthopedics & Joint', nameHi: 'हड्डी एवं जोड़ रोग' },
    { id: 'physician', nameEn: 'General Physician', nameHi: 'सामान्य फिजिशियन' },
    { id: 'cardio', nameEn: 'Cardiology (Heart)', nameHi: 'हृदय रोग' },
    { id: 'pediatric', nameEn: 'Pediatrics (Child)', nameHi: 'शिशु एवं बाल रोग' },
    { id: 'skin', nameEn: 'Dermatology (Skin)', nameHi: 'चर्म एवं त्वचा रोग' },
    { id: 'ent', nameEn: 'ENT (Ear/Nose/Throat)', nameHi: 'कान, नाक व गला' }
  ];

  const filteredDoctors = ARA_DOCTORS.filter(doc => {
    const query = searchDoctor.toLowerCase().trim();
    const matchesSearch = 
      !query || 
      doc.name.toLowerCase().includes(query) ||
      doc.specialization.toLowerCase().includes(query) ||
      doc.specializationHi.includes(query) ||
      doc.clinicName.toLowerCase().includes(query) ||
      doc.locality.toLowerCase().includes(query);

    const matchesSpecialty = 
      selectedSpecialty === 'all' ||
      (selectedSpecialty === 'gynae' && doc.specialization.toLowerCase().includes('gynaecol')) ||
      (selectedSpecialty === 'ortho' && doc.specialization.toLowerCase().includes('orthopaed')) ||
      (selectedSpecialty === 'physician' && doc.specialization.toLowerCase().includes('physician')) ||
      (selectedSpecialty === 'cardio' && doc.specialization.toLowerCase().includes('cardiol')) ||
      (selectedSpecialty === 'pediatric' && doc.specialization.toLowerCase().includes('paediatric')) ||
      (selectedSpecialty === 'skin' && doc.specialization.toLowerCase().includes('dermatol')) ||
      (selectedSpecialty === 'ent' && doc.specialization.toLowerCase().includes('ent'));

    return matchesSearch && matchesSpecialty;
  });

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doctorName = activeModalDoctor ? activeModalDoctor.name : (customDoctorName || 'Ara Specialist');
    const doctorSpecialization = activeModalDoctor ? activeModalDoctor.specialization : 'Specialist Consultation';
    const clinicName = activeModalDoctor ? activeModalDoctor.clinicName : (customClinicArea || 'Ara Clinic');
    const locality = activeModalDoctor ? activeModalDoctor.locality : 'Ara, Bihar';

    const req = createDoctorRequest({
      patientName,
      whatsappPhone,
      patientAge: parseInt(patientAge) || 35,
      patientGender,
      doctorName,
      doctorSpecialization,
      clinicName,
      locality,
      preferredDate,
      preferredSlot,
      symptomsNote
    });

    setConciergeSuccess({ id: req.requestId, doctor: doctorName });
  };

  const handleWhatsAppConfirmation = () => {
    if (!conciergeSuccess) return;
    const message = encodeURIComponent(
      `🏥 *डॉक्टर अपॉइंटमेंट कंसीयज अनुरोध — रिद्धि सिद्धि सेवा*\n` +
      `📋 *अनुरोध आईडी:* ${conciergeSuccess.id}\n` +
      `👨‍⚕️ *डॉक्टर:* ${conciergeSuccess.doctor}\n` +
      `👤 *मरीज:* ${patientName} (${patientAge} Y / ${patientGender})\n` +
      `📱 *मोबाइल:* ${whatsappPhone}\n` +
      `📅 *तारीख:* ${preferredDate} (${preferredSlot})\n` +
      (symptomsNote ? `📝 *समस्या:* ${symptomsNote}\n\n` : '\n') +
      `रिद्धि सिद्धि टीम डॉक्टर के क्लिनिक में नंबर लगवाकर 30 मिनट में आपको टोकन नंबर भेजेगी।`
    );
    window.open(`https://wa.me/919835012345?text=${message}`, '_blank');
  };

  const closeConciergeModal = () => {
    setActiveModalDoctor(null);
    setIsCustomModalOpen(false);
    setConciergeSuccess(null);
  };

  return (
    <section className="app-container" id="doctors" style={{ padding: '3rem 1.25rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fef3c7', color: '#92400e', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Stethoscope size={16} />
          <span>{language === 'hi' ? 'आरा डॉक्टर कंसीयज • लाइन लगाने से मुक्ति' : 'Ara Doctor Concierge • Zero Physical Queue'}</span>
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          {language === 'hi' ? 'आरा के प्रसिद्ध डॉक्टरों का नंबर लगवाएं' : 'Book Appointments with Top Ara Doctors'}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--slate-600)' }}>
          {language === 'hi' 
            ? 'क्लिनिक में घंटों लाइन में खड़े रहने की जरूरत नहीं! रिद्धि सिद्धि की टीम आपके लिए टोकन नंबर सुरक्षित करेगी।'
            : 'Skip the 4-hour clinic queue. Our field team secures your OPD token and sends the confirmed receipt on WhatsApp.'}
        </p>
      </div>

      {/* Search & Specialty Filter */}
      <div style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} color="var(--slate-400)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder={language === 'hi' ? 'डॉक्टर का नाम, विशेषज्ञता या क्लिनिक खोजें (उदा: Dr. Sangeeta, Ortho, Ramna)...' : 'Search doctor name, specialty, or clinic in Ara...'}
              value={searchDoctor}
              onChange={e => setSearchDoctor(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.85rem' }}
            />
          </div>

          <button 
            onClick={() => setIsCustomModalOpen(true)}
            className="btn btn-outline-teal"
          >
            <Stethoscope size={18} />
            <span>{language === 'hi' ? 'अन्य डॉक्टर का नंबर लगवाएं' : 'Request Other Doctor'}</span>
          </button>
        </div>

        {/* Specialty Filter Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.35rem', scrollbarWidth: 'none' }}>
          {specialties.map(spec => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.id)}
              className={`chip-btn ${selectedSpecialty === spec.id ? 'active' : ''}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              <span>{language === 'hi' ? spec.nameHi : spec.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredDoctors.map(doctor => (
          <div 
            key={doctor.id}
            style={{
              background: '#fff',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span className="badge badge-teal">
                  {doctor.specialization}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-700)' }}>
                  <Star size={14} fill="var(--amber-500)" color="var(--amber-500)" />
                  <span>{doctor.rating} ({doctor.reviewsCount})</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.2rem' }}>
                {doctor.name}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '0.75rem' }}>
                {doctor.degrees} • {doctor.experienceYears}+ {language === 'hi' ? 'वर्षों का अनुभव' : 'Yrs Exp'}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <MapPin size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>{doctor.clinicName}:</strong> {doctor.locality}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={16} color="var(--slate-400)" style={{ flexShrink: 0 }} />
                  <span>{doctor.timings}</span>
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'परामर्श शुल्क (OPD Fee):' : 'Consultation Fee:'}</div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--slate-900)' }}>₹{doctor.consultationFee}</div>
              </div>

              <button 
                onClick={() => setActiveModalDoctor(doctor)}
                className="btn btn-primary"
              >
                <UserCheck size={18} />
                <span>{language === 'hi' ? 'नंबर लगवाएं (Book Slot)' : 'Request Token'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CONCIERGE MODAL */}
      {(activeModalDoctor || isCustomModalOpen) && (
        <div className="modal-overlay" onClick={closeConciergeModal}>
          <div className="modal-card" style={{ maxWidth: '580px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {language === 'hi' ? 'डॉक्टर अपॉइंटमेंट कंसीयज अनुरोध' : 'Doctor Appointment Concierge'}
                </h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                  {activeModalDoctor ? `${activeModalDoctor.name} (${activeModalDoctor.clinicName})` : 'Custom Ara Doctor Request'}
                </div>
              </div>
              <button onClick={closeConciergeModal} className="btn btn-secondary btn-icon-only">
                <X size={20} />
              </button>
            </div>

            {conciergeSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.4rem' }}>
                  {language === 'hi' ? 'अनुरोध प्राप्त हुआ!' : 'Request Queued for Ground Staff!'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.5rem' }}>
                  {language === 'hi'
                    ? `हमारी आरा फील्ड टीम ${conciergeSuccess.doctor} के क्लिनिक में आपका सीरियल टोकन बुक करके 30 मिनट में व्हाट्सएप पर रसीद भेजेगी।`
                    : `Our Ara team will secure your serial token at ${conciergeSuccess.doctor}'s clinic and WhatsApp you the confirmed receipt.`}
                </p>

                <button 
                  onClick={handleWhatsAppConfirmation}
                  className="btn btn-whatsapp btn-lg"
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                >
                  <Send size={18} />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर स्टेटस देखें' : 'Open WhatsApp Receipt'}</span>
                </button>

                <button onClick={closeConciergeModal} className="btn btn-secondary" style={{ width: '100%' }}>
                  {language === 'hi' ? 'पोर्टल पर लौटें' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleConciergeSubmit}>
                {isCustomModalOpen && !activeModalDoctor && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">{language === 'hi' ? 'डॉक्टर का नाम:' : 'Doctor Name:'} *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Dr. A. K. Sinha"
                        value={customDoctorName}
                        onChange={e => setCustomDoctorName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">{language === 'hi' ? 'क्लिनिक / इलाका (Ara):' : 'Clinic / Area:'} *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Hospital Road / Nawada"
                        value={customClinicArea}
                        onChange={e => setCustomClinicArea(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'मरीज का नाम:' : 'Patient Name:'} *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Sunil Tiwari"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'व्हाट्सएप फोन नंबर:' : 'WhatsApp Mobile:'} *</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="10-digit mobile"
                      value={whatsappPhone}
                      onChange={e => setWhatsappPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'उम्र:' : 'Age:'} *</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={patientAge}
                      onChange={e => setPatientAge(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{language === 'hi' ? 'पसंदीदा तारीख:' : 'Preferred Date:'} *</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'पसंदीदा शिफ्ट / समय:' : 'Preferred Session:'}</label>
                  <select 
                    className="form-select"
                    value={preferredSlot}
                    onChange={e => setPreferredSlot(e.target.value)}
                  >
                    <option value="Morning OPD (09:00 AM - 01:00 PM)">Morning OPD (09:00 AM - 01:00 PM)</option>
                    <option value="Evening OPD (05:00 PM - 08:00 PM)">Evening OPD (05:00 PM - 08:00 PM)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'बीमारी / लक्षण का संक्षिप्त विवरण (वैकल्पिक):' : 'Problem Brief (Optional):'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Joint pain with fever for 3 days"
                    value={symptomsNote}
                    onChange={e => setSymptomsNote(e.target.value)}
                  />
                </div>

                <div style={{ background: '#f0fdfa', border: '1px solid var(--primary-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--primary-900)', marginBottom: '1.25rem' }}>
                  ⚡ <strong>{language === 'hi' ? 'कंसीयज प्रक्रिया:' : 'How it works:'}</strong>{' '}
                  {language === 'hi' 
                    ? 'हमारी टीम क्लिनिक में जाकर टोकन नंबर हासिल करेगी और डॉक्टर के परामर्श शुल्क की रसीद आपके व्हाट्सएप पर भेजेगी।'
                    : 'Our field assistant visits the clinic, secures your physical serial token, and sends confirmation via WhatsApp.'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={closeConciergeModal} className="btn btn-secondary">
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <UserCheck size={18} />
                    <span>{language === 'hi' ? 'टोकन का अनुरोध भेजें' : 'Submit Token Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
