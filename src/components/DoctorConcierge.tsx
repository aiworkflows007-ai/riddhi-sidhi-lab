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
  ShieldCheck,
  Timer,
  BadgePercent,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Flame
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
    { id: 'all', nameEn: 'All Specialties', nameHi: 'सभी विशेषज्ञ' },
    { id: 'gynae', nameEn: 'Gynecology (महिला रोग)', nameHi: 'स्त्री एवं प्रसूति रोग' },
    { id: 'ortho', nameEn: 'Orthopedics (हड्डी रोग)', nameHi: 'हड्डी, जोड़ व नस' },
    { id: 'physician', nameEn: 'Physician (फिजिशियन)', nameHi: 'वरिष्ठ फिजिशियन व शुगर' },
    { id: 'pediatric', nameEn: 'Child Specialist (शिशु रोग)', nameHi: 'शिशु एवं बाल रोग' },
    { id: 'surgeon', nameEn: 'Surgeon (सर्जन)', nameHi: 'सर्जरी व दूरबीन ऑपरेशन' },
    { id: 'cardio', nameEn: 'Cardiology (हृदय रोग)', nameHi: 'हृदय एवं बीपी रोग' },
    { id: 'skin', nameEn: 'Dermatology (चर्म रोग)', nameHi: 'चर्म व त्वचा रोग' },
    { id: 'ent', nameEn: 'ENT (कान नाक गला)', nameHi: 'कान, नाक व गला' }
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
      (selectedSpecialty === 'gynae' && (doc.specialization.toLowerCase().includes('gynaecol') || doc.specialization.toLowerCase().includes('women'))) ||
      (selectedSpecialty === 'ortho' && doc.specialization.toLowerCase().includes('orthopaed')) ||
      (selectedSpecialty === 'physician' && doc.specialization.toLowerCase().includes('physician')) ||
      (selectedSpecialty === 'surgeon' && doc.specialization.toLowerCase().includes('surgeon')) ||
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

  const handleWhatsAppInstantBooking = (doctor: DoctorProfile) => {
    const text = encodeURIComponent(
      `Hello DoctorSathi Ara! 👋\n\nMujhe doctor ka appointment token (number) lagwana hai:\n` +
      `👨‍⚕️ *Doctor:* ${doctor.name} (${doctor.specialization})\n` +
      `🏥 *Clinic:* ${doctor.clinicName}, ${doctor.locality}\n` +
      `⏰ *Queue Timing:* ${doctor.queueOpeningTime || 'Morning Line'}\n` +
      `💰 *Doctor Fee:* ₹${doctor.consultationFee} | *Token Fee:* ₹${doctor.tokenBookingFee || 39}\n\n` +
      `Kripya mera parcha lagwane ki process confirm karein.`
    );
    window.open(`https://wa.me/917999614511?text=${text}`, '_blank');
  };

  const handleWhatsAppConfirmation = () => {
    if (!conciergeSuccess) return;
    const message = encodeURIComponent(
      `🏥 *डॉक्टर अपॉइंटमेंट टोकन अनुरोध — DoctorSathi Ara*\n` +
      `📋 *टोकन अनुरोध आईडी:* ${conciergeSuccess.id}\n` +
      `👨‍⚕️ *डॉक्टर:* ${conciergeSuccess.doctor}\n` +
      `👤 *मरीज:* ${patientName} (${patientAge} वर्ष / ${patientGender})\n` +
      `📱 *मोबाइल:* ${whatsappPhone}\n` +
      `📅 *तारीख:* ${preferredDate} (${preferredSlot})\n` +
      (symptomsNote ? `📝 *समस्या:* ${symptomsNote}\n\n` : '\n') +
      `DoctorSathi टीम सुबह 6:00 AM क्लिनिक पर नंबर लगवाकर पर्चे का फोटो व सीरियल नंबर भेजेगी।`
    );
    window.open(`https://wa.me/917999614511?text=${message}`, '_blank');
  };

  const closeConciergeModal = () => {
    setActiveModalDoctor(null);
    setIsCustomModalOpen(false);
    setConciergeSuccess(null);
  };

  return (
    <section className="app-container" id="doctors" style={{ padding: '3rem 1.25rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.4rem 0.95rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Stethoscope size={16} />
          <span>{language === 'hi' ? 'आरा डॉक्टर टोकन सेवा • लाइन लगाने की चिंता खत्म' : 'Ara Doctor Token Service • Zero Line Hassle'}</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          {language === 'hi' ? 'आरा के प्रसिद्ध डॉक्टरों का नंबर लगवाएं' : 'Book Clinic Number / Tokens in Ara'}
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
          {language === 'hi' 
            ? 'सदर अस्पताल रोड, पकड़ी रोड, कतीरा मोड़, धरहरा, व रमना रोड के किसी भी स्पेशलिस्ट का नंबर (पर्चा) हमारी टीम सुबह 6 बजे लगवाएगी।'
            : 'Get appointment tokens at clinics across Sadar Hospital, Pakari Road, Katira More, and Dharhara. Our field runners secure your serial early morning.'}
        </p>
      </div>

      {/* 3-Step Process Bento Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
            1
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--slate-900)', marginBottom: '0.2rem' }}>
              {language === 'hi' ? 'डॉक्टर चुनें व टोकन बुक करें' : 'Select Doctor & Book'}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
              {language === 'hi' ? 'वेबसाइट या व्हाट्सएप पर डॉक्टर का नाम बताएं। सुविधा शुल्क सिर्फ ₹39।' : 'Pick your doctor on web or WhatsApp. Service fee only ₹39.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', color: '#92400e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
            2
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--slate-900)', marginBottom: '0.2rem' }}>
              {language === 'hi' ? 'हमारी टीम 6:00 AM लाइन में लगेगी' : 'Team Queues at 6:00 AM'}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
              {language === 'hi' ? 'हमारे आरा रनर क्लिनिक काउंटर पर जाकर आपका आधिकारिक पर्चा/टोकन कटाएंगे।' : 'Our local runner stands in compounder queue and secures the serial slip.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>
            3
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--slate-900)', marginBottom: '0.2rem' }}>
              {language === 'hi' ? 'पर्चा फोटो व समय व्हाट्सएप पर' : 'Token Photo & Time on WhatsApp'}
            </div>
            <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
              {language === 'hi' ? 'सीरियल नंबर (उदा: #14) व क्लिनिक पहुंचने का सटीक समय आपको भेजा जाएगा।' : 'Receive token photo and exact clinic visit timing without waiting.'}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Specialty Filter */}
      <div style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} color="var(--slate-400)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder={language === 'hi' ? 'डॉक्टर का नाम, विशेषज्ञता या क्लिनिक खोजें (उदा: Dr. Sangeeta, हड्डी रोग, Dharhara, Pakari)...' : 'Search doctor name, specialty, or clinic in Ara...'}
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
            <span>{language === 'hi' ? 'अन्य डॉक्टर का नंबर लगवाएं' : 'Custom Doctor Request'}</span>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredDoctors.map(doctor => (
          <div 
            key={doctor.id}
            style={{
              background: '#fff',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div>
              {/* Specialty & Rating Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-teal" style={{ fontWeight: 700, fontSize: '0.785rem' }}>
                  {language === 'hi' ? doctor.specializationHi : doctor.specialization}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-700)', background: '#fffbeb', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-full)' }}>
                  <Star size={14} fill="var(--amber-500)" color="var(--amber-500)" />
                  <span>{doctor.rating} ({doctor.reviewsCount})</span>
                </div>
              </div>

              {/* Doctor Name & Experience */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                {doctor.name}
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--slate-500)', marginBottom: '0.85rem' }}>
                {doctor.degrees} • {doctor.experienceYears}+ {language === 'hi' ? 'वर्षों का अनुभव' : 'Yrs Exp'}
              </div>

              {/* Location & Timings */}
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <MapPin size={16} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>{doctor.clinicName}:</strong> {doctor.locality}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={16} color="var(--slate-400)" style={{ flexShrink: 0 }} />
                  <span>{doctor.timings}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b45309', fontWeight: 600, fontSize: '0.8rem' }}>
                  <Timer size={16} color="#d97706" style={{ flexShrink: 0 }} />
                  <span>{doctor.queueOpeningTime || 'सुबह 6:30 AM लाइन शुरू'}</span>
                </div>
              </div>
            </div>

            {/* Fee & Action Buttons */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderTop: '1px solid var(--slate-200)', paddingTop: '0.85rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'डॉक्टर परामर्श फीस:' : 'Doctor OPD Fee:'}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--slate-900)' }}>₹{doctor.consultationFee}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>{language === 'hi' ? 'टोकन बुकिंग चार्ज:' : 'Token Charge:'}</div>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--primary-700)' }}>₹{doctor.tokenBookingFee || 39}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleWhatsAppInstantBooking(doctor)}
                  className="btn btn-whatsapp btn-sm"
                  style={{ width: '100%', fontWeight: 700 }}
                  title="Instant WhatsApp Token"
                >
                  <MessageSquare size={16} />
                  <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
                </button>

                <button 
                  onClick={() => setActiveModalDoctor(doctor)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', fontWeight: 700 }}
                >
                  <UserCheck size={16} />
                  <span>{language === 'hi' ? 'फॉर्म भरें' : 'Book Slot'}</span>
                </button>
              </div>
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
                  {language === 'hi' ? 'डॉक्टर का नंबर (टोकन) लगवाएं' : 'Book Doctor Appointment Token'}
                </h2>
                <div style={{ fontSize: '0.825rem', color: 'var(--primary-700)', fontWeight: 700, marginTop: '0.2rem' }}>
                  {activeModalDoctor ? `${activeModalDoctor.name} • ${activeModalDoctor.clinicName}` : 'Custom Ara Doctor Token Request'}
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
                  {language === 'hi' ? 'अनुरोध प्राप्त हुआ!' : 'Token Request Queued!'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {language === 'hi'
                    ? `हमारी आरा फील्ड टीम ${conciergeSuccess.doctor} के क्लिनिक पर सुबह 6:00 AM लाइन में लगकर आपका टोकन सुरक्षित करेगी और पर्चे का फोटो आपके व्हाट्सएप पर भेजेगी।`
                    : `Our Ara ground staff will secure your token slip at ${conciergeSuccess.doctor}'s clinic at 6:00 AM and WhatsApp you the photo.`}
                </p>

                <button 
                  onClick={handleWhatsAppConfirmation}
                  className="btn btn-whatsapp btn-lg"
                  style={{ width: '100%', marginBottom: '0.75rem' }}
                >
                  <Send size={18} />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर टोकन स्टेटस देखें' : 'Confirm on WhatsApp'}</span>
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
                        placeholder="e.g. Hospital Road / Pakari"
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

                <div style={{ background: '#f0fdfa', border: '1px solid var(--primary-200)', padding: '0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.825rem', color: 'var(--primary-900)', marginBottom: '1.25rem' }}>
                  ⚡ <strong>{language === 'hi' ? 'टोकन बुकिंग फीस: ₹39 मात्र' : 'Convenience Fee: ₹39 only'}</strong><br/>
                  {language === 'hi' 
                    ? 'डॉक्टर की मूल फीस (OPD Fee) आप क्लिनिक पहुंचकर सीधे डॉक्टर के काउंटर पर देंगे।'
                    : 'The doctor\'s direct OPD fee will be paid directly at the clinic counter during consultation.'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={closeConciergeModal} className="btn btn-secondary">
                    {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg">
                    <UserCheck size={18} />
                    <span>{language === 'hi' ? 'टोकन का अनुरोध भेजें (₹39)' : 'Submit Token Request (₹39)'}</span>
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
