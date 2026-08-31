import React, { useState, useEffect, useRef } from 'react';
import { useLab } from '../context/LabContext';
import { ARA_DOCTORS } from '../data/doctors';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Sparkles, 
  Timer,
  MessageSquare,
  QrCode
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: Array<{ label: string; action: () => void; isPrimary?: boolean; isUpi?: boolean }>;
  slipPhoto?: boolean;
}

export const WhatsAppBotModal: React.FC = () => {
  const { 
    isWhatsAppBotOpen, 
    setIsWhatsAppBotOpen, 
    openPaymentModal, 
    language 
  } = useLab();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [bookingState, setBookingState] = useState<{
    step: 'GREETING' | 'DOCTOR_SELECT' | 'PATIENT_NAME' | 'PHONE' | 'PAYMENT' | 'COMPLETED';
    doctor?: string;
    clinic?: string;
    patientName?: string;
    phone?: string;
  }>({ step: 'GREETING' });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isWhatsAppBotOpen && messages.length === 0) {
      // Initial Bot greeting
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'नमस्ते! मैं DoctorSathi Ara का AI बुकिंग बॉट हूँ। 🤖\n\nआरा के किसी भी प्रसिद्ध डॉक्टर का नंबर (पर्चा) सुबह 6:00 AM लाइन लगवाने के लिए मैं आपकी तुरंत मदद कर सकता हूँ।\n\nसुविधा शुल्क: सिर्फ ₹39 (100% ऑटो-रिफंड गारंटी के साथ)।\n\nआप किस डॉक्टर का नंबर लगवाना चाहते हैं?',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          options: [
            {
              label: '👩‍⚕️ Dr. Sangeeta Gupta (स्त्री रोग)',
              action: () => selectDoctor('Dr. Sangeeta Gupta', 'R.L. Memorial Hospital, Katira More')
            },
            {
              label: '👨‍⚕️ Dr. Vikas Singh (हड्डी रोग)',
              action: () => selectDoctor('Dr. Vikas Singh', 'Aastha Hospital, Pakari Road')
            },
            {
              label: '👨‍⚕️ Dr. R.K. Singh (वरिष्ठ फिजिशियन)',
              action: () => selectDoctor('Dr. R.K. Singh', 'Dharhara Clinic, Ara')
            },
            {
              label: '📋 अन्य डॉक्टर का नाम बताएं',
              action: () => promptCustomDoctor()
            }
          ]
        }
      ]);
    }
  }, [isWhatsAppBotOpen, messages.length]);

  if (!isWhatsAppBotOpen) return null;

  const selectDoctor = (docName: string, clinic: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: `मुझे ${docName} (${clinic}) का नंबर लगवाना है।`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setBookingState(prev => ({ ...prev, step: 'PATIENT_NAME', doctor: docName, clinic }));
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `बिल्कुल! ${docName} के लिए कल सुबह 6:00 AM हमारी टीम लाइन में लगेगी।\n\nकृपया मरीज का पूरा नाम और उम्र बताएं (उदा: रमेश शर्मा, 45 वर्ष)।`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 600);
  };

  const promptCustomDoctor = () => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: 'मैं डॉक्टर का नाम टाइप करना चाहता हूँ।',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'कृपया डॉक्टर का नाम व क्लिनिक का इलाका नीचे लिखकर भेजें (उदा: Dr. Sunil Kumar, Sadar Hospital Road)।',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
      setBookingState(prev => ({ ...prev, step: 'DOCTOR_SELECT' }));
    }, 500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      if (bookingState.step === 'DOCTOR_SELECT' || !bookingState.doctor) {
        setBookingState(prev => ({ ...prev, doctor: userText, clinic: 'Ara Clinic', step: 'PATIENT_NAME' }));
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: `धन्यवाद! डॉक्टर: "${userText}" नोट कर लिया गया है।\n\nकृपया मरीज का पूरा नाम व उम्र बताएं।`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else if (bookingState.step === 'PATIENT_NAME') {
        setBookingState(prev => ({ ...prev, patientName: userText, step: 'PHONE' }));
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: `मरीज "${userText}" दर्ज हो गया।\n\nकृपया 10-अंकों का व्हाट्सएप मोबाइल नंबर दर्ज करें जिसपर पर्चा फोटो व सीरियल नंबर भेजा जाएगा।`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else if (bookingState.step === 'PHONE') {
        const phone = userText.replace(/\D/g, '');
        setBookingState(prev => ({ ...prev, phone: phone || '7999614511', step: 'PAYMENT' }));
        
        const docName = bookingState.doctor || 'Dr. Sangeeta Gupta';
        const pName = bookingState.patientName || 'Patient';

        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: `🎉 *टोकन बुकिंग विवरण:*\n• डॉक्टर: ${docName}\n• मरीज: ${pName}\n• मोबाइल: ${phone || userText}\n• सुविधा शुल्क: ₹39 (Fixed)\n\n⚡ *तुरंत ₹39 का भुगतान करें:*`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            options: [
              {
                label: '⚡ Pay ₹39 via UPI (PhonePe / GPay / QR)',
                isUpi: true,
                action: () => {
                  setIsWhatsAppBotOpen(false);
                  openPaymentModal({
                    patientName: pName,
                    whatsappPhone: phone || '7999614511',
                    patientAge: 40,
                    patientGender: 'Male',
                    doctorName: docName,
                    doctorSpecialization: 'Specialist Consultation',
                    clinicName: bookingState.clinic || 'Ara Clinic',
                    locality: 'Ara, Bihar',
                    preferredDate: new Date().toISOString().split('T')[0],
                    preferredSlot: 'Morning Line (06:00 AM Queue)',
                    tokenBookingFee: 39
                  });
                }
              },
              {
                label: '💬 Official WhatsApp पर चैट जारी रखें (+91 79996 14511)',
                action: () => {
                  const url = `https://wa.me/917999614511?text=${encodeURIComponent(`Hello DoctorSathi Ara! 👋\nMujhe doctor ${docName} ka number lagwana hai for ${pName} (${phone || userText}).\nToken Fee ₹39 UPI se pay karne ka link bhejein.`)}`;
                  window.open(url, '_blank');
                }
              }
            ]
          }
        ]);
      }
    }, 700);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsWhatsAppBotOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '480px', height: '85vh', maxHeight: '680px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', background: '#0b141a', borderRadius: 'var(--radius-xl)' }} onClick={e => e.stopPropagation()}>
        
        {/* WhatsApp Style Green Header */}
        <div style={{ background: '#075e54', color: '#fff', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>DoctorSathi AI Bot</span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#dcfce7' }}>
                Online • Ara Doctor Token & UPI Assistant
              </div>
            </div>
          </div>

          <button onClick={() => setIsWhatsAppBotOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#0b141a', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Security & Refund Badge */}
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', padding: '0.5rem 0.75rem', textAlign: 'center', fontSize: '0.75rem', color: '#86efac' }}>
            🔒 End-to-End Automated • ₹39 100% Auto-Refund Guarantee
          </div>

          {messages.map(msg => (
            <div 
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div 
                style={{
                  background: msg.sender === 'user' ? '#005c4b' : '#202c33',
                  color: '#e9edef',
                  padding: '0.65rem 0.85rem',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontSize: '0.875rem',
                  lineHeight: 1.45,
                  whiteSpace: 'pre-wrap',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                {msg.text}
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textAlign: 'right', marginTop: '0.25rem' }}>
                  {msg.time}
                </div>
              </div>

              {/* Action Option Buttons */}
              {msg.options && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={opt.action}
                      style={{
                        background: opt.isUpi ? '#16a34a' : '#111b21',
                        color: opt.isUpi ? '#ffffff' : '#4ade80',
                        border: opt.isUpi ? '1px solid #22c55e' : '1px solid #2a3942',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.55rem 0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{ background: '#202c33', padding: '0.65rem 0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input 
            type="text"
            placeholder="Type message in Hindi or English..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            style={{
              flex: 1,
              background: '#2a3942',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              color: '#fff',
              padding: '0.6rem 1rem',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#00a884',
              color: '#fff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
