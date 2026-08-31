import React, { createContext, useContext, useState, useEffect } from 'react';
import { DoctorConciergeRequest, ConciergeStatus } from '../types';

export interface PaymentBookingData {
  patientName: string;
  whatsappPhone: string;
  patientAge: number;
  patientGender: string;
  doctorName: string;
  doctorSpecialization: string;
  clinicName: string;
  locality: string;
  preferredDate: string;
  preferredSlot: string;
  symptomsNote?: string;
  tokenBookingFee?: number;
}

interface LabContextType {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'hi') => void;

  // Doctor Concierge Store
  doctorRequests: DoctorConciergeRequest[];
  createDoctorRequest: (requestData: Omit<DoctorConciergeRequest, 'requestId' | 'createdAt' | 'status'>) => DoctorConciergeRequest;
  updateDoctorRequestStatus: (requestId: string, status: ConciergeStatus, tokenNo?: string, confirmedTime?: string) => void;
  releaseTokenSlip: (requestId: string, tokenNo: string, confirmedTime: string, notes?: string) => void;
  autoRefundToken: (requestId: string, reason: string) => void;

  // Payment Modal
  isPaymentModalOpen: boolean;
  paymentModalData: PaymentBookingData | null;
  openPaymentModal: (data: PaymentBookingData) => void;
  closePaymentModal: () => void;

  // WhatsApp Bot Modal
  isWhatsAppBotOpen: boolean;
  setIsWhatsAppBotOpen: (open: boolean) => void;

  // Staff Ops Drawer
  isStaffOpsOpen: boolean;
  setIsStaffOpsOpen: (open: boolean) => void;

  // Navigation
  activeTab: 'home' | 'doctors' | 'tracker';
  setActiveTab: (tab: 'home' | 'doctors' | 'tracker') => void;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

const DOC_REQUESTS_STORAGE_KEY = 'rsjl_doc_requests_store_v2';
const LANG_STORAGE_KEY = 'rsjl_lang_preference';

export const LabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem(LANG_STORAGE_KEY) as 'en' | 'hi') || 'en';
  });

  const [doctorRequests, setDoctorRequests] = useState<DoctorConciergeRequest[]>(() => {
    try {
      const saved = localStorage.getItem(DOC_REQUESTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        {
          requestId: 'DOC-ARA-2026-891',
          createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          patientName: 'Sunil Tiwari',
          whatsappPhone: '9835011223',
          patientAge: 46,
          patientGender: 'Male',
          doctorName: 'Dr. Sangeeta Gupta',
          doctorSpecialization: 'Gynaecologist & Infertility Specialist',
          clinicName: 'R.L. Memorial Hospital',
          locality: 'Ramna Road, Near Katira More, Ara',
          preferredDate: '2026-09-01',
          preferredSlot: 'Morning (10:00 AM - 01:00 PM)',
          symptomsNote: 'Follow-up consultation request',
          status: 'TOKEN_CONFIRMED',
          tokenBookingFee: 39,
          paymentStatus: 'PAID',
          paymentMethod: 'UPI_PHONEPE',
          paymentUtr: 'UPI-49281920-8912',
          paidAt: '08:30 AM, 31-Aug',
          assignedRunner: 'Raju (Ara Field Runner)',
          confirmedTokenNumber: 'Serial #14',
          confirmedTime: '10:30 AM, Today',
          slipReleasedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
          refundStatus: 'NOT_APPLICABLE'
        },
        {
          requestId: 'DOC-ARA-2026-732',
          createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
          patientName: 'Anil Kumar Rai',
          whatsappPhone: '7999614511',
          patientAge: 52,
          patientGender: 'Male',
          doctorName: 'Dr. Vikas Singh',
          doctorSpecialization: 'Orthopaedic Surgeon',
          clinicName: 'Aastha Hospital',
          locality: 'Pakari Road, Ara',
          preferredDate: '2026-09-01',
          preferredSlot: 'Evening (05:00 PM - 08:00 PM)',
          status: 'LINE_QUEUED',
          tokenBookingFee: 39,
          paymentStatus: 'PAID',
          paymentMethod: 'UPI_GPAY',
          paymentUtr: 'UPI-38910281-7321',
          paidAt: '06:15 AM, 31-Aug',
          assignedRunner: 'Raju (Ara Field Runner)',
          refundStatus: 'NOT_APPLICABLE'
        },
        {
          requestId: 'DOC-ARA-2026-614',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          patientName: 'Pooja Kumari',
          whatsappPhone: '9431029381',
          patientAge: 29,
          patientGender: 'Female',
          doctorName: 'Dr. R.K. Singh',
          doctorSpecialization: 'Senior Physician & Diabetologist',
          clinicName: 'Dharhara Clinic',
          locality: 'Dharhara / Maula Bagh, Ara',
          preferredDate: '2026-08-30',
          preferredSlot: 'Morning OPD',
          status: 'UNAVAILABLE_REFUNDED',
          tokenBookingFee: 39,
          paymentStatus: 'REFUNDED',
          paymentMethod: 'UPI_PAYTM',
          paymentUtr: 'UPI-10928371-6140',
          paidAt: 'Yesterday, 06:10 AM',
          refundStatus: 'AUTO_REFUNDED',
          refundAmount: 39,
          refundUtr: 'REF-UPI-2026-98124',
          refundedAt: 'Yesterday, 07:15 AM',
          refundReason: 'Doctor emergency surgery schedule / Clinic token quota full'
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals & Navigation
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentModalData, setPaymentModalData] = useState<PaymentBookingData | null>(null);
  const [isWhatsAppBotOpen, setIsWhatsAppBotOpen] = useState(false);
  const [isStaffOpsOpen, setIsStaffOpsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'doctors' | 'tracker'>('home');

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(DOC_REQUESTS_STORAGE_KEY, JSON.stringify(doctorRequests));
  }, [doctorRequests]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'hi' : 'en');
  };

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
  };

  const openPaymentModal = (data: PaymentBookingData) => {
    setPaymentModalData(data);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setPaymentModalData(null);
  };

  const createDoctorRequest = (requestData: Omit<DoctorConciergeRequest, 'requestId' | 'createdAt' | 'status'>): DoctorConciergeRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const requestId = `DOC-ARA-2026-${randomSuffix}`;
    const newRequest: DoctorConciergeRequest = {
      ...requestData,
      requestId,
      createdAt: new Date().toISOString(),
      status: 'REQUESTED'
    };

    setDoctorRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const updateDoctorRequestStatus = (requestId: string, status: ConciergeStatus, tokenNo?: string, confirmedTime?: string) => {
    setDoctorRequests(prev => prev.map(req => {
      if (req.requestId !== requestId) return req;
      return {
        ...req,
        status,
        confirmedTokenNumber: tokenNo || req.confirmedTokenNumber,
        confirmedTime: confirmedTime || req.confirmedTime,
        assignedRunner: req.assignedRunner || 'Raju (Ara Field Runner)'
      };
    }));
  };

  const releaseTokenSlip = (requestId: string, tokenNo: string, confirmedTime: string, notes?: string) => {
    setDoctorRequests(prev => prev.map(req => {
      if (req.requestId !== requestId) return req;
      return {
        ...req,
        status: 'TOKEN_CONFIRMED',
        confirmedTokenNumber: tokenNo,
        confirmedTime: confirmedTime,
        slipReleasedAt: new Date().toISOString(),
        slipNotes: notes || 'Official Doctor Token / Parcha Slip secured from clinic counter.'
      };
    }));
  };

  const autoRefundToken = (requestId: string, reason: string) => {
    const refundUtr = `REF-UPI-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setDoctorRequests(prev => prev.map(req => {
      if (req.requestId !== requestId) return req;
      return {
        ...req,
        status: 'UNAVAILABLE_REFUNDED',
        paymentStatus: 'REFUNDED',
        refundStatus: 'AUTO_REFUNDED',
        refundAmount: req.tokenBookingFee || 39,
        refundUtr: refundUtr,
        refundedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
        refundReason: reason || 'Doctor unavailable / Clinic queue quota full'
      };
    }));
  };

  return (
    <LabContext.Provider value={{
      language,
      toggleLanguage,
      setLanguage,
      doctorRequests,
      createDoctorRequest,
      updateDoctorRequestStatus,
      releaseTokenSlip,
      autoRefundToken,
      isPaymentModalOpen,
      paymentModalData,
      openPaymentModal,
      closePaymentModal,
      isWhatsAppBotOpen,
      setIsWhatsAppBotOpen,
      isStaffOpsOpen,
      setIsStaffOpsOpen,
      activeTab,
      setActiveTab
    }}>
      {children}
    </LabContext.Provider>
  );
};

export const useLab = () => {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error('useLab must be used within a LabProvider');
  }
  return context;
};
