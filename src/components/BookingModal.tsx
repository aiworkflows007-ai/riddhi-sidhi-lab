import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { ARA_LOCALITIES } from '../data/localities';
import { 
  X, 
  Trash2, 
  Plus, 
  MapPin, 
  Home, 
  Building2, 
  Calendar, 
  Clock, 
  CreditCard, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    cart, 
    removeFromCart, 
    clearCart, 
    cartTotalMrp, 
    cartTotalPayable, 
    cartDiscount,
    createBooking,
    language 
  } = useLab();

  const [step, setStep] = useState<'cart' | 'patient_info' | 'payment' | 'confirmation'>('cart');
  const [fulfillmentType, setFulfillmentType] = useState<'HOME_COLLECTION' | 'LAB_VISIT'>('HOME_COLLECTION');
  
  // Patient form fields
  const [patientName, setPatientName] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [age, setAge] = useState<string>('35');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [locality, setLocality] = useState(ARA_LOCALITIES[0].name);
  const [preferredDate, setPreferredDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [preferredSlot, setPreferredSlot] = useState('07:00 AM - 09:00 AM (Morning)');
  const [paymentMode, setPaymentMode] = useState<'PAY_ON_COLLECTION' | 'PAID'>('PAID');
  const [createdBookingId, setCreatedBookingId] = useState<string>('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  if (!isBookingModalOpen) return null;

  const homeCollectionFee = fulfillmentType === 'HOME_COLLECTION' ? (cartTotalPayable >= 500 ? 0 : 50) : 0;
  const finalTotal = cartTotalPayable + homeCollectionFee;

  const handleProceedToDetails = () => {
    if (cart.length === 0) return;
    setStep('patient_info');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setAddressError('');

    const cleanPhone = whatsappPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      setPhoneError(language === 'hi' ? 'कृपया 10 अंकों का मान्य भारतीय मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit Indian mobile number');
      return;
    }

    if (fulfillmentType === 'HOME_COLLECTION' && !address.trim()) {
      setAddressError(language === 'hi' ? 'कृपया घर का पता एवं गली/मकान नंबर दर्ज करें' : 'Please enter your street address and landmark in Ara');
      return;
    }

    setStep('payment');
  };

  const handleFinalSubmit = () => {
    const booking = createBooking({
      patient: {
        fullName: patientName,
        whatsappPhone,
        age: parseInt(age) || 30,
        gender,
        address: fulfillmentType === 'HOME_COLLECTION' ? address : undefined,
        landmark: fulfillmentType === 'HOME_COLLECTION' ? landmark : undefined,
        locality,
        pincode: '802301'
      },
      fulfillmentType,
      preferredDate,
      preferredSlot,
      selectedTests: cart,
      totalMrp: cartTotalMrp,
      discountAmount: cartDiscount,
      homeCollectionFee,
      finalPayable: finalTotal,
      paymentStatus: paymentMode,
      paymentRefId: paymentMode === 'PAID' ? `UPI-RSJL-${Math.floor(100000 + Math.random() * 900000)}` : undefined
    });

    setCreatedBookingId(booking.bookingId);
    setStep('confirmation');
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleWhatsAppShare = () => {
    const testNames = cart.map(t => t.name).join(', ') || 'Diagnostic Tests';
    const message = encodeURIComponent(
      `🔬 *रिद्धि सिद्धि जांच लैब — बुकिंग पुष्टि*\n` +
      `📋 *बुकिंग आईडी:* ${createdBookingId}\n` +
      `👤 *मरीज:* ${patientName} (${age} Y / ${gender})\n` +
      `🧪 *जांच:* ${testNames}\n` +
      `🏠 *प्रकार:* ${fulfillmentType === 'HOME_COLLECTION' ? `होम कलेक्शन (${address}, ${locality})` : 'सदर अस्पताल लैब विजिट'}\n` +
      `📅 *समय:* ${preferredDate} (${preferredSlot})\n` +
      `💰 *कुल देय राशि:* ₹${finalTotal} (${paymentMode === 'PAID' ? 'Online Paid' : 'Pay on Sample Pickup'})\n\n` +
      `📱 रिपोर्ट स्टेटस ट्रैक करने के लिए:\n` +
      `https://rsl.ai-workflows.cloud/#tracker`
    );

    window.open(`https://wa.me/919835012345?text=${message}`, '_blank');
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setStep('cart');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              {step === 'cart' && (language === 'hi' ? 'जांच कार्ट एवं समीक्षा' : 'Your Diagnostic Cart')}
              {step === 'patient_info' && (language === 'hi' ? 'मरीज व कलेक्शन विवरण' : 'Patient & Sample Details')}
              {step === 'payment' && (language === 'hi' ? 'भुगतान एवं पुष्टि' : 'Payment & Confirmation')}
              {step === 'confirmation' && (language === 'hi' ? 'बुकिंग सफलतापूर्वक दर्ज!' : 'Booking Confirmed!')}
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
              {language === 'hi' ? 'DoctorSathi Ara • डायग्नोस्टिक्स व ब्लड टेस्ट' : 'DoctorSathi Ara • Diagnostics & Lab Tests'}
            </div>
          </div>
          <button onClick={handleClose} className="btn btn-secondary btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: CART REVIEW */}
        {step === 'cart' && (
          <div>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--slate-100)', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                  <Home size={28} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '0.4rem' }}>
                  {language === 'hi' ? 'आपकी कार्ट खाली है' : 'Your cart is empty'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
                  {language === 'hi' ? 'कृपया जांच सूची या लक्षण सुझाव से टेस्ट चुनें।' : 'Please select tests from the catalogue or symptom checker.'}
                </p>
                <button onClick={handleClose} className="btn btn-primary">
                  {language === 'hi' ? 'जांच सूची देखें' : 'Browse Tests'}
                </button>
              </div>
            ) : (
              <div>
                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.25rem' }}>
                  {cart.map(item => (
                    <div 
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'var(--slate-50)',
                        border: '1px solid var(--slate-200)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
                          {language === 'hi' ? item.nameHi : item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                          🍽️ {language === 'hi' ? item.fastingNoteHi : item.fastingNoteEn}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)' }}>₹{item.price}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textDecoration: 'line-through' }}>₹{item.mrp}</div>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm btn-secondary btn-icon-only"
                          title="Remove"
                        >
                          <Trash2 size={16} color="var(--rose-600)" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fulfillment Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">{language === 'hi' ? 'सैंपल कलेक्शन का तरीका चुनें:' : 'Choose Collection Mode:'}</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('HOME_COLLECTION')}
                      className={`btn ${fulfillmentType === 'HOME_COLLECTION' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ height: 'auto', padding: '0.85rem', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                        <Home size={16} />
                        <span>{language === 'hi' ? 'घर पर जांच (Home Visit)' : 'Home Collection'}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '0.2rem' }}>
                        {cartTotalPayable >= 500 ? 'FREE Doorstep Pickup' : '+₹50 Collection Fee'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFulfillmentType('LAB_VISIT')}
                      className={`btn ${fulfillmentType === 'LAB_VISIT' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ height: 'auto', padding: '0.85rem', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                        <Building2 size={16} />
                        <span>{language === 'hi' ? 'सदर अस्पताल लैब आएं' : 'Visit Ara Lab'}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.85, marginTop: '0.2rem' }}>
                        ₹0 • Instant Priority Token
                      </div>
                    </button>
                  </div>
                </div>

                {/* Price Breakdown Summary */}
                <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--slate-600)' }}>
                    <span>{language === 'hi' ? 'कुल टेस्ट एमआरपी (Total MRP):' : 'Total MRP:'}</span>
                    <span style={{ textDecoration: 'line-through' }}>₹{cartTotalMrp}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--emerald-700)', fontWeight: 600 }}>
                    <span>{language === 'hi' ? 'लैब छूट (Total Discount):' : 'Lab Discount:'}</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--slate-600)' }}>
                    <span>{language === 'hi' ? 'होम कलेक्शन चार्ज:' : 'Home Collection:'}</span>
                    <span>{homeCollectionFee === 0 ? <strong style={{ color: 'var(--emerald-700)' }}>FREE</strong> : `₹${homeCollectionFee}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', borderTop: '1px dashed var(--slate-300)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                    <span>{language === 'hi' ? 'कुल देय राशि (Final Amount):' : 'Final Amount:'}</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={handleClose} className="btn btn-secondary">
                    {language === 'hi' ? 'और टेस्ट जोड़ें' : 'Add More Tests'}
                  </button>
                  <button onClick={handleProceedToDetails} className="btn btn-primary btn-lg">
                    <span>{language === 'hi' ? 'आगे बढ़ें (मरीज विवरण)' : 'Proceed to Details'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: PATIENT & COLLECTION DETAILS */}
        {step === 'patient_info' && (
          <form onSubmit={handleProceedToPayment}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'मरीज का पूरा नाम (Full Name):' : 'Patient Full Name:'} *</label>
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
                <label className="form-label">{language === 'hi' ? 'व्हाट्सएप फोन नंबर:' : 'WhatsApp Mobile:'} *</label>
                <input 
                  type="tel" 
                  className={`form-input ${phoneError ? 'error' : ''}`}
                  placeholder="10-digit mobile"
                  value={whatsappPhone}
                  onChange={e => setWhatsappPhone(e.target.value)}
                  required
                />
                {phoneError && <div className="error-text">{phoneError}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'उम्र (Age):' : 'Age:'} *</label>
                <input 
                  type="number" 
                  className="form-input" 
                  min="1" 
                  max="120"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'लिंग (Gender):' : 'Gender:'} *</label>
                <select 
                  className="form-select" 
                  value={gender} 
                  onChange={e => setGender(e.target.value as any)}
                >
                  <option value="Male">{language === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                  <option value="Female">{language === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                  <option value="Other">{language === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
              </div>
            </div>

            {/* Date and Slot */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'पसंदीदा तारीख (Date):' : 'Preferred Date:'}</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">{language === 'hi' ? 'समय स्लॉट (Time Slot):' : 'Time Slot:'}</label>
                <select 
                  className="form-select"
                  value={preferredSlot}
                  onChange={e => setPreferredSlot(e.target.value)}
                >
                  <option value="06:00 AM - 08:00 AM (Early Fasting)">06:00 AM - 08:00 AM (Early Fasting)</option>
                  <option value="08:00 AM - 10:00 AM (Morning Rush)">08:00 AM - 10:00 AM (Morning Rush)</option>
                  <option value="10:00 AM - 12:00 PM (Mid Morning)">10:00 AM - 12:00 PM (Mid Morning)</option>
                  <option value="04:00 PM - 07:00 PM (Evening)">04:00 PM - 07:00 PM (Evening)</option>
                </select>
              </div>
            </div>

            {/* Address fields if Home Collection */}
            {fulfillmentType === 'HOME_COLLECTION' && (
              <div style={{ background: '#f0fdfa', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary-800)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} />
                  <span>{language === 'hi' ? 'आरा में होम कलेक्शन का पता:' : 'Ara Doorstep Collection Address:'}</span>
                </div>

                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'इलाका / मोहल्ला (Locality in Ara):' : 'Locality in Ara:'}</label>
                  <select 
                    className="form-select"
                    value={locality}
                    onChange={e => setLocality(e.target.value)}
                  >
                    {ARA_LOCALITIES.map((loc, idx) => (
                      <option key={idx} value={loc.name}>
                        {language === 'hi' ? loc.nameHi : loc.name} (Pin: {loc.pincode})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{language === 'hi' ? 'मकान नं / गली / लैंडमार्क:' : 'House No, Gali, Landmark:'} *</label>
                  <input 
                    type="text" 
                    className={`form-input ${addressError ? 'error' : ''}`}
                    placeholder="e.g. House #14, Near Shiv Mandir / Nawada Chowk"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                  />
                  {addressError && <div className="error-text">{addressError}</div>}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <button type="button" onClick={() => setStep('cart')} className="btn btn-secondary">
                {language === 'hi' ? 'वापस जाएं' : 'Back to Cart'}
              </button>
              <button type="submit" className="btn btn-primary btn-lg">
                <span>{language === 'hi' ? 'भुगतान विकल्प चुनें' : 'Proceed to Payment'}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PAYMENT SIMULATION */}
        {step === 'payment' && (
          <div>
            <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                <span>{language === 'hi' ? 'मरीज:' : 'Patient:'}</span>
                <strong>{patientName} ({gender}, {age} Yrs)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                <span>{language === 'hi' ? 'प्रकार:' : 'Type:'}</span>
                <span>{fulfillmentType === 'HOME_COLLECTION' ? `Home Collection (${locality})` : 'Lab Visit (Hospital Road, Ara)'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-700)', borderTop: '1px solid var(--slate-200)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <span>{language === 'hi' ? 'कुल देय राशि:' : 'Amount to Pay:'}</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <label className="form-label">{language === 'hi' ? 'भुगतान का माध्यम चुनें:' : 'Select Payment Method:'}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div 
                onClick={() => setPaymentMode('PAID')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  border: `2px solid ${paymentMode === 'PAID' ? 'var(--primary-600)' : 'var(--slate-200)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: paymentMode === 'PAID' ? 'var(--primary-50)' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <CreditCard size={20} color="var(--primary-600)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {language === 'hi' ? 'ऑनलाइन भुगतान (UPI / PhonePe / GPay / Card)' : 'Online Payment (UPI / PhonePe / GPay)'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    Instant confirmation & priority queue token
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setPaymentMode('PAY_ON_COLLECTION')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  border: `2px solid ${paymentMode === 'PAY_ON_COLLECTION' ? 'var(--primary-600)' : 'var(--slate-200)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: paymentMode === 'PAY_ON_COLLECTION' ? 'var(--primary-50)' : '#fff',
                  cursor: 'pointer'
                }}
              >
                <Building2 size={20} color="var(--amber-600)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {language === 'hi' ? 'सैंपल देते समय भुगतान (Cash / UPI on Pickup)' : 'Pay on Sample Collection (Cash / UPI)'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    Pay our phlebotomist after blood sample collection
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setStep('patient_info')} className="btn btn-secondary">
                {language === 'hi' ? 'वापस' : 'Back'}
              </button>
              <button onClick={handleFinalSubmit} className="btn btn-primary btn-lg">
                <CheckCircle2 size={18} />
                <span>{language === 'hi' ? 'बुकिंग कन्फर्म करें' : 'Confirm & Generate Booking'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & WHATSAPP RECEIPT */}
        {step === 'confirmation' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <CheckCircle2 size={38} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              {language === 'hi' ? 'जांच बुकिंग सफलतापूर्वक दर्ज!' : 'Test Booking Confirmed!'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
              {language === 'hi' 
                ? 'आपकी बुकिंग DoctorSathi Ara के सिस्टम में दर्ज हो चुकी है।'
                : 'Your booking has been received by DoctorSathi Ara.'}
            </p>

            {/* Booking Card */}
            <div style={{ background: 'var(--slate-50)', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>Booking ID:</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-700)' }}>{createdBookingId}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div><strong>Patient:</strong> {patientName} ({gender}, {age} Yrs)</div>
                <div><strong>Mobile:</strong> {whatsappPhone}</div>
                <div><strong>Type:</strong> {fulfillmentType === 'HOME_COLLECTION' ? `Home Collection (${locality})` : 'Lab Visit'}</div>
                <div><strong>Date & Slot:</strong> {preferredDate} ({preferredSlot})</div>
                <div><strong>Amount Paid:</strong> ₹{finalTotal} ({paymentMode})</div>
              </div>
            </div>

            {/* WhatsApp Confirmation Trigger */}
            <button 
              onClick={handleWhatsAppShare}
              className="btn btn-whatsapp btn-lg"
              style={{ width: '100%', marginBottom: '0.75rem' }}
            >
              <Send size={20} />
              <span>{language === 'hi' ? 'व्हाट्सएप रसीद प्राप्त करें (Get WhatsApp Confirmation)' : 'Get WhatsApp Confirmation Receipt'}</span>
            </button>

            <button onClick={handleClose} className="btn btn-secondary" style={{ width: '100%' }}>
              {language === 'hi' ? 'पोर्टल पर वापस जाएं' : 'Back to Portal'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
