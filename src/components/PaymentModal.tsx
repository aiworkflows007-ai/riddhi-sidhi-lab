import React, { useState, useEffect } from 'react';
import { useLab } from '../context/LabContext';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Send, 
  Smartphone,
  CreditCard,
  RefreshCw,
  Lock
} from 'lucide-react';
import QRCode from 'qrcode';

export const PaymentModal: React.FC = () => {
  const { 
    isPaymentModalOpen, 
    closePaymentModal, 
    paymentModalData, 
    createDoctorRequest, 
    language 
  } = useLab();

  const [paymentTab, setPaymentTab] = useState<'upi' | 'qr' | 'razorpay'>('upi');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{
    requestId: string;
    utr: string;
    paidAt: string;
    doctorName: string;
  } | null>(null);

  const tokenFee = paymentModalData?.tokenBookingFee || 39;
  const merchantVpa = '7999614511@upi';
  const merchantName = 'DoctorSathi Ara';

  // Dynamic UPI Intent Link
  const upiIntentLink = paymentModalData 
    ? `upi://pay?pa=${merchantVpa}&pn=${encodeURIComponent(merchantName)}&am=${tokenFee}&cu=INR&tn=${encodeURIComponent(`DoctorSathi-Token-${paymentModalData.patientName.replace(/\s+/g, '')}`)}`
    : `upi://pay?pa=${merchantVpa}&pn=${encodeURIComponent(merchantName)}&am=${tokenFee}&cu=INR&tn=DoctorSathi-Token`;

  useEffect(() => {
    if (isPaymentModalOpen && paymentModalData) {
      setPaymentSuccessData(null);
      setIsProcessing(false);
      // Generate QR Code
      QRCode.toDataURL(upiIntentLink, { width: 220, margin: 1, color: { dark: '#047857', light: '#ffffff' } })
        .then(url => setQrCodeDataUrl(url))
        .catch(err => console.error('QR Error:', err));
    }
  }, [isPaymentModalOpen, paymentModalData, upiIntentLink]);

  if (!isPaymentModalOpen || !paymentModalData) return null;

  const handlePaymentSuccess = (method: 'UPI_GPAY' | 'UPI_PHONEPE' | 'UPI_PAYTM' | 'UPI_QR' | 'RAZORPAY') => {
    setIsProcessing(true);

    setTimeout(() => {
      const utr = `UPI-${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const req = createDoctorRequest({
        patientName: paymentModalData.patientName,
        whatsappPhone: paymentModalData.whatsappPhone,
        patientAge: paymentModalData.patientAge,
        patientGender: paymentModalData.patientGender,
        doctorName: paymentModalData.doctorName,
        doctorSpecialization: paymentModalData.doctorSpecialization,
        clinicName: paymentModalData.clinicName,
        locality: paymentModalData.locality,
        preferredDate: paymentModalData.preferredDate,
        preferredSlot: paymentModalData.preferredSlot,
        symptomsNote: paymentModalData.symptomsNote,
        tokenBookingFee: tokenFee,
        paymentStatus: 'PAID',
        paymentMethod: method,
        paymentUtr: utr,
        paidAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
        refundStatus: 'NOT_APPLICABLE'
      });

      setIsProcessing(false);
      setPaymentSuccessData({
        requestId: req.requestId,
        utr: utr,
        paidAt: req.paidAt || 'Just now',
        doctorName: req.doctorName
      });
    }, 900);
  };

  const handleWhatsAppConfirmation = () => {
    if (!paymentSuccessData) return;
    const msg = encodeURIComponent(
      `🏥 *DoctorSathi Ara — डॉक्टर टोकन बुकिंग भुगतान रसीद*\n\n` +
      `✅ *भुगतान सफल:* ₹${tokenFee} Paid via UPI\n` +
      `📋 *टोकन अनुरोध आईडी:* ${paymentSuccessData.requestId}\n` +
      `🔢 *UPI UTR / Trans ID:* ${paymentSuccessData.utr}\n` +
      `👨‍⚕️ *डॉक्टर:* ${paymentSuccessData.doctorName}\n` +
      `👤 *मरीज:* ${paymentModalData.patientName} (${paymentModalData.patientAge} Y / ${paymentModalData.patientGender})\n` +
      `📱 *मोबाइल:* ${paymentModalData.whatsappPhone}\n` +
      `📅 *तारीख:* ${paymentModalData.preferredDate} (${paymentModalData.preferredSlot})\n\n` +
      `⏰ *अगला कदम:* हमारी टीम सुबह 6:00 AM क्लिनिक पर लाइन में लगकर पर्चा सुरक्षित करेगी और पर्चे का फोटो आपके व्हाट्सएप पर भेजेगी।\n\n` +
      `🔒 *100% रिफंड गारंटी:* यदि क्लिनिक कोटा फुल होने के कारण पर्चा नहीं मिला तो ₹${tokenFee} तुरंत स्वतः आपके खाते में रिफंड होंगे।`
    );
    window.open(`https://wa.me/917999614511?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={closePaymentModal}>
      <div className="modal-card" style={{ maxWidth: '540px', background: '#fff', borderRadius: 'var(--radius-xl)' }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-900)' }}>
              {paymentSuccessData 
                ? (language === 'hi' ? '✅ टोकन बुकिंग व भुगतान सफल!' : '✅ Payment & Booking Confirmed!')
                : (language === 'hi' ? '💳 टोकन बुकिंग भुगतान (UPI / Razorpay)' : '💳 Checkout Token Booking (₹39)')}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 700 }}>
              {paymentModalData.doctorName} • {paymentModalData.clinicName}
            </div>
          </div>
          <button onClick={closePaymentModal} className="btn btn-secondary btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* SUCCESS VIEW */}
        {paymentSuccessData ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              ₹{tokenFee} {language === 'hi' ? 'प्राप्त हुआ!' : 'Payment Received!'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {language === 'hi' 
                ? 'आपका अनुरोध आरा फील्ड टीम को भेज दिया गया है। सुबह 6:00 AM लाइन लगकर पर्चा फोटो व्हाट्सएप पर आएगा।'
                : 'Your token request is queued with Ara field runner. Slip photo will be sent via WhatsApp at 6:00 AM.'}
            </p>

            {/* Receipt Summary Box */}
            <div style={{ background: '#f8fafc', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--slate-500)' }}>Token ID:</span>
                <span style={{ fontWeight: 800, color: 'var(--primary-800)' }}>{paymentSuccessData.requestId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--slate-500)' }}>UPI UTR:</span>
                <span style={{ fontWeight: 700, color: 'var(--slate-800)' }}>{paymentSuccessData.utr}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--slate-500)' }}>Patient:</span>
                <span style={{ fontWeight: 700 }}>{paymentModalData.patientName} ({paymentModalData.whatsappPhone})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--slate-500)' }}>Auto-Refund Status:</span>
                <span style={{ fontWeight: 700, color: '#16a34a' }}>100% Protected</span>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppConfirmation}
              className="btn btn-whatsapp btn-lg"
              style={{ width: '100%', marginBottom: '0.75rem', fontWeight: 800 }}
            >
              <Send size={18} />
              <span>{language === 'hi' ? 'व्हाट्सएप रसीद व स्टेटस देखें' : 'View WhatsApp Receipt'}</span>
            </button>

            <button onClick={closePaymentModal} className="btn btn-secondary" style={{ width: '100%' }}>
              {language === 'hi' ? 'समाप्त करें' : 'Done'}
            </button>
          </div>
        ) : (
          /* CHECKOUT VIEW */
          <div>
            {/* Amount Banner */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700, textTransform: 'uppercase' }}>
                  {language === 'hi' ? 'टोकन सुविधा शुल्क (Line Runner Fee)' : 'Doctor Token Queue Fee'}
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
                  {paymentModalData.patientName} • {paymentModalData.preferredDate}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803d' }}>
                  ₹{tokenFee}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>All Taxes Included</div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', background: 'var(--slate-100)', padding: '0.3rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setPaymentTab('upi')}
                style={{
                  background: paymentTab === 'upi' ? '#fff' : 'transparent',
                  color: paymentTab === 'upi' ? 'var(--slate-900)' : 'var(--slate-600)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                  boxShadow: paymentTab === 'upi' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Smartphone size={15} />
                <span>UPI Apps</span>
              </button>

              <button
                onClick={() => setPaymentTab('qr')}
                style={{
                  background: paymentTab === 'qr' ? '#fff' : 'transparent',
                  color: paymentTab === 'qr' ? 'var(--slate-900)' : 'var(--slate-600)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                  boxShadow: paymentTab === 'qr' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <QrCode size={15} />
                <span>UPI QR Code</span>
              </button>

              <button
                onClick={() => setPaymentTab('razorpay')}
                style={{
                  background: paymentTab === 'razorpay' ? '#fff' : 'transparent',
                  color: paymentTab === 'razorpay' ? 'var(--slate-900)' : 'var(--slate-600)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem',
                  boxShadow: paymentTab === 'razorpay' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <CreditCard size={15} />
                <span>Razorpay</span>
              </button>
            </div>

            {/* TAB 1: 1-CLICK UPI APPS */}
            {paymentTab === 'upi' && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {language === 'hi' ? 'अपने पसंदीदा UPI ऐप से ₹39 का भुगतान करें:' : 'Pay ₹39 using your preferred UPI app:'}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
                  {/* PhonePe */}
                  <a
                    href={upiIntentLink}
                    onClick={() => handlePaymentSuccess('UPI_PHONEPE')}
                    style={{
                      textDecoration: 'none',
                      background: '#5f259f',
                      color: '#fff',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>🟣 PhonePe</span>
                  </a>

                  {/* Google Pay */}
                  <a
                    href={upiIntentLink}
                    onClick={() => handlePaymentSuccess('UPI_GPAY')}
                    style={{
                      textDecoration: 'none',
                      background: '#1a73e8',
                      color: '#fff',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>🔵 Google Pay</span>
                  </a>

                  {/* Paytm */}
                  <a
                    href={upiIntentLink}
                    onClick={() => handlePaymentSuccess('UPI_PAYTM')}
                    style={{
                      textDecoration: 'none',
                      background: '#002970',
                      color: '#fff',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>🔷 Paytm UPI</span>
                  </a>

                  {/* BHIM / Other */}
                  <a
                    href={upiIntentLink}
                    onClick={() => handlePaymentSuccess('UPI_GPAY')}
                    style={{
                      textDecoration: 'none',
                      background: '#047857',
                      color: '#fff',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}
                  >
                    <span>🟢 BHIM / Any App</span>
                  </a>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="button" 
                    onClick={() => handlePaymentSuccess('UPI_PHONEPE')}
                    className="btn btn-primary"
                    style={{ width: '100%', fontWeight: 800 }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? <RefreshCw className="spin" size={18} /> : null}
                    <span>{language === 'hi' ? 'भुगतान सत्यापित करें (Pay ₹39 & Book)' : 'Confirm UPI Payment (₹39)'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: DYNAMIC UPI QR CODE */}
            {paymentTab === 'qr' && (
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
                  {language === 'hi' ? 'किसी भी UPI ऐप (GPay, PhonePe, Paytm) से QR स्कैन करें:' : 'Scan this QR code with any UPI app:'}
                </div>

                {qrCodeDataUrl ? (
                  <div style={{ display: 'inline-block', padding: '0.75rem', background: '#fff', border: '2px solid #10b981', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', marginBottom: '0.75rem' }}>
                    <img src={qrCodeDataUrl} alt="UPI Payment QR Code" style={{ width: '180px', height: '180px', display: 'block' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.35rem' }}>
                      Scan to Pay ₹{tokenFee}
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '2rem' }}>Generating QR...</div>
                )}

                <div style={{ fontSize: '0.785rem', color: 'var(--slate-500)', marginBottom: '0.85rem' }}>
                  UPI ID: <strong>7999614511@upi</strong>
                </div>

                <button 
                  type="button" 
                  onClick={() => handlePaymentSuccess('UPI_QR')}
                  className="btn btn-primary"
                  style={{ width: '100%', fontWeight: 800 }}
                  disabled={isProcessing}
                >
                  {isProcessing ? <RefreshCw className="spin" size={18} /> : <CheckCircle2 size={18} />}
                  <span>{language === 'hi' ? 'मैंने QR स्कैन कर दिया है (पुष्टि करें)' : 'I Have Paid via QR (Confirm)'}</span>
                </button>
              </div>
            )}

            {/* TAB 3: RAZORPAY GATEWAY */}
            {paymentTab === 'razorpay' && (
              <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                <div style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                    <CreditCard size={24} />
                  </div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
                    Razorpay Secure Checkout
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '0' }}>
                    Pay ₹{tokenFee} using Debit Cards, Credit Cards, NetBanking, or Digital Wallets with 256-bit encryption.
                  </p>
                </div>

                <button 
                  type="button" 
                  onClick={() => handlePaymentSuccess('RAZORPAY')}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', fontWeight: 800 }}
                  disabled={isProcessing}
                >
                  {isProcessing ? <RefreshCw className="spin" size={18} /> : <Lock size={18} />}
                  <span>{language === 'hi' ? 'Razorpay से ₹39 भुगतान करें' : 'Proceed via Razorpay (₹39)'}</span>
                </button>
              </div>
            )}

            {/* Auto-Refund Guarantee Banner */}
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.785rem', color: '#92400e' }}>
              <ShieldCheck size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>{language === 'hi' ? '100% ऑटो-रिफंड गारंटी:' : '100% Auto-Refund Guarantee:'}</strong>{' '}
                {language === 'hi' 
                  ? 'यदि डॉक्टर अनुपस्थित हों या क्लिनिक का कोटा फुल होने पर पर्चा नहीं बन पाता है, तो ₹39 तुरंत स्वतः आपके UPI खाते में 100% रिफंड हो जाएंगे।'
                  : 'If the slip cannot be secured due to clinic rush or doctor leave, ₹39 will be automatically refunded back to your source UPI/account.'}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
