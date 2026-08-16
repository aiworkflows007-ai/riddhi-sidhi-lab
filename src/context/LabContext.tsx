import React, { createContext, useContext, useState, useEffect } from 'react';
import { DiagnosticTest, TestBooking, DoctorConciergeRequest, ReportStatus, ConciergeStatus } from '../types';
import { DIAGNOSTIC_TESTS } from '../data/tests';
import { INITIAL_DEMO_BOOKINGS } from '../data/localities';

interface LabContextType {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  
  // Cart
  cart: DiagnosticTest[];
  addToCart: (test: DiagnosticTest) => void;
  removeFromCart: (testId: string) => void;
  clearCart: () => void;
  isInCart: (testId: string) => boolean;
  cartTotalMrp: number;
  cartTotalPayable: number;
  cartDiscount: number;

  // Bookings Store (Simulating Google Sheet Store of Record)
  bookings: TestBooking[];
  createBooking: (bookingData: Omit<TestBooking, 'bookingId' | 'createdAt' | 'statusHistory' | 'reportStatus'>) => TestBooking;
  updateBookingStatus: (bookingId: string, newStatus: ReportStatus, note?: string) => void;
  getBookingById: (bookingId: string) => TestBooking | undefined;
  getBookingsByPhone: (phone: string) => TestBooking[];

  // Doctor Concierge Store
  doctorRequests: DoctorConciergeRequest[];
  createDoctorRequest: (requestData: Omit<DoctorConciergeRequest, 'requestId' | 'createdAt' | 'status'>) => DoctorConciergeRequest;
  updateDoctorRequestStatus: (requestId: string, status: ConciergeStatus, tokenNo?: string, confirmedTime?: string) => void;

  // Active Modals & Views
  isSymptomModalOpen: boolean;
  setIsSymptomModalOpen: (open: boolean) => void;
  isPrescriptionModalOpen: boolean;
  setIsPrescriptionModalOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isStaffOpsOpen: boolean;
  setIsStaffOpsOpen: (open: boolean) => void;
  selectedTestForDetail: DiagnosticTest | null;
  setSelectedTestForDetail: (test: DiagnosticTest | null) => void;
  activeVerificationBooking: TestBooking | null;
  setActiveVerificationBooking: (booking: TestBooking | null) => void;

  // Navigation
  activeTab: 'home' | 'catalogue' | 'tracker' | 'doctors';
  setActiveTab: (tab: 'home' | 'catalogue' | 'tracker' | 'doctors') => void;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

const BOOKINGS_STORAGE_KEY = 'rsjl_bookings_store_v1';
const DOC_REQUESTS_STORAGE_KEY = 'rsjl_doc_requests_store_v1';
const CART_STORAGE_KEY = 'rsjl_cart_store_v1';
const LANG_STORAGE_KEY = 'rsjl_lang_preference';

export const LabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem(LANG_STORAGE_KEY) as 'en' | 'hi') || 'en';
  });

  const [cart, setCart] = useState<DiagnosticTest[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState<TestBooking[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
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
          preferredDate: '2026-08-17',
          preferredSlot: 'Morning (10:00 AM - 01:00 PM)',
          symptomsNote: 'ANC Follow-up consultation request',
          status: 'TOKEN_CONFIRMED',
          assignedRunner: 'Raju (Ara Field Runner)',
          confirmedTokenNumber: 'Serial #14',
          confirmedTime: '11:15 AM, 17-Aug-2026'
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals & Navigation
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isStaffOpsOpen, setIsStaffOpsOpen] = useState(false);
  const [selectedTestForDetail, setSelectedTestForDetail] = useState<DiagnosticTest | null>(null);
  const [activeVerificationBooking, setActiveVerificationBooking] = useState<TestBooking | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'catalogue' | 'tracker' | 'doctors'>('home');

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(DOC_REQUESTS_STORAGE_KEY, JSON.stringify(doctorRequests));
  }, [doctorRequests]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'hi' : 'en');
  };

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
  };

  const addToCart = (test: DiagnosticTest) => {
    setCart(prev => {
      if (prev.some(item => item.id === test.id)) return prev;
      return [...prev, test];
    });
  };

  const removeFromCart = (testId: string) => {
    setCart(prev => prev.filter(item => item.id !== testId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (testId: string) => {
    return cart.some(item => item.id === testId);
  };

  const cartTotalMrp = cart.reduce((acc, item) => acc + item.mrp, 0);
  const cartTotalPayable = cart.reduce((acc, item) => acc + item.price, 0);
  const cartDiscount = cartTotalMrp - cartTotalPayable;

  const createBooking = (bookingData: Omit<TestBooking, 'bookingId' | 'createdAt' | 'statusHistory' | 'reportStatus'>): TestBooking => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `RSL-2026-${randomSuffix}`;
    const nowIso = new Date().toISOString();
    const timeFormatted = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newBooking: TestBooking = {
      ...bookingData,
      bookingId,
      createdAt: nowIso,
      reportStatus: 'BOOKED',
      statusHistory: [
        {
          status: 'BOOKED',
          timestamp: timeFormatted,
          note: 'Booking successfully confirmed via online portal.'
        }
      ]
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, newStatus: ReportStatus, note?: string) => {
    const timeFormatted = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setBookings(prev => prev.map(booking => {
      if (booking.bookingId !== bookingId) return booking;

      const defaultNotes: Record<ReportStatus, string> = {
        BOOKED: 'Booking confirmed.',
        PHLEBOTOMIST_ASSIGNED: 'Phlebotomist Manoj Kumar assigned for doorstep visit.',
        SAMPLE_COLLECTED: 'Sample successfully collected and logged in Ara central facility.',
        IN_TESTING: 'Automated 5-part hematology / biochemistry analyzer processing.',
        REPORT_READY: 'Report verified and signed by Consultant Pathologist.',
        SENT_VIA_WHATSAPP: 'Digitally signed PDF report delivered directly to registered WhatsApp number.'
      };

      const updatedHistory = [
        ...booking.statusHistory,
        {
          status: newStatus,
          timestamp: timeFormatted,
          note: note || defaultNotes[newStatus]
        }
      ];

      return {
        ...booking,
        reportStatus: newStatus,
        statusHistory: updatedHistory,
        phlebotomistName: newStatus === 'PHLEBOTOMIST_ASSIGNED' || newStatus === 'SAMPLE_COLLECTED' || newStatus === 'IN_TESTING' 
          ? (booking.phlebotomistName || 'Manoj Kumar (Certified DMLT)') 
          : booking.phlebotomistName,
        phlebotomistPhone: booking.phlebotomistPhone || '+91 99341 82910'
      };
    }));
  };

  const getBookingById = (bookingId: string): TestBooking | undefined => {
    const cleanId = bookingId.trim().toUpperCase();
    return bookings.find(b => b.bookingId.toUpperCase() === cleanId);
  };

  const getBookingsByPhone = (phone: string): TestBooking[] => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    return bookings.filter(b => b.patient.whatsappPhone.replace(/\D/g, '').slice(-10) === cleanPhone);
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

  return (
    <LabContext.Provider value={{
      language,
      toggleLanguage,
      setLanguage,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      cartTotalMrp,
      cartTotalPayable,
      cartDiscount,
      bookings,
      createBooking,
      updateBookingStatus,
      getBookingById,
      getBookingsByPhone,
      doctorRequests,
      createDoctorRequest,
      updateDoctorRequestStatus,
      isSymptomModalOpen,
      setIsSymptomModalOpen,
      isPrescriptionModalOpen,
      setIsPrescriptionModalOpen,
      isBookingModalOpen,
      setIsBookingModalOpen,
      isStaffOpsOpen,
      setIsStaffOpsOpen,
      selectedTestForDetail,
      setSelectedTestForDetail,
      activeVerificationBooking,
      setActiveVerificationBooking,
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
