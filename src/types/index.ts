export type FulfillmentType = 'HOME_COLLECTION' | 'LAB_VISIT';

export type ReportStatus = 
  | 'BOOKED'
  | 'PHLEBOTOMIST_ASSIGNED'
  | 'SAMPLE_COLLECTED'
  | 'IN_TESTING'
  | 'REPORT_READY'
  | 'SENT_VIA_WHATSAPP';

export type PaymentStatus = 'PAID' | 'PAY_ON_COLLECTION' | 'SIMULATED_SUCCESS';

export type ConciergeStatus = 
  | 'PAYMENT_PENDING'
  | 'REQUESTED'
  | 'LINE_QUEUED'
  | 'TOKEN_CONFIRMED'
  | 'UNAVAILABLE_REFUNDED';

export type PaymentMethod = 'UPI_GPAY' | 'UPI_PHONEPE' | 'UPI_PAYTM' | 'UPI_QR' | 'RAZORPAY' | 'WHATSAPP_UPI';

export interface DiagnosticTest {
  id: string;
  name: string;
  nameHi: string;
  category: string;
  mrp: number;
  price: number;
  discountPercent: number;
  fastingHours: number;
  fastingNoteEn: string;
  fastingNoteHi: string;
  turnaroundTime: string;
  turnaroundTimeHi: string;
  sampleType: string;
  sampleTypeHi: string;
  parametersCount: number;
  parametersList: string[];
  descriptionEn: string;
  descriptionHi: string;
  popular?: boolean;
}

export interface SymptomCluster {
  id: string;
  nameEn: string;
  nameHi: string;
  iconName: string;
  descriptionEn: string;
  descriptionHi: string;
  suggestedTestIds: string[];
  packageTitleEn: string;
  packageTitleHi: string;
}

export interface TestBooking {
  bookingId: string;
  createdAt: string;
  patient: PatientDetails;
  fulfillmentType: FulfillmentType;
  preferredDate: string;
  preferredSlot: string;
  selectedTests: DiagnosticTest[];
  totalMrp: number;
  discountAmount: number;
  homeCollectionFee: number;
  finalPayable: number;
  paymentStatus: PaymentStatus;
  paymentRefId?: string;
  reportStatus: ReportStatus;
  phlebotomistName?: string;
  phlebotomistPhone?: string;
  statusHistory: Array<{
    status: ReportStatus;
    timestamp: string;
    note: string;
  }>;
}

export interface DoctorProfile {
  id: string;
  name: string;
  degrees: string;
  specialization: string;
  specializationHi: string;
  experienceYears: number;
  clinicName: string;
  locality: string;
  consultationFee: number;
  tokenBookingFee?: number; // convenience fee charged by DoctorSathi, default 39
  queueOpeningTime?: string; // e.g. "06:30 AM"
  availabilityStatus?: 'AVAILABLE_TODAY' | 'BOOKING_TOMORROW' | 'FAST_FILLING';
  timings: string;
  closedOn: string;
  phoneContact?: string;
  rating: number;
  reviewsCount: number;
}

export interface PatientDetails {
  fullName: string;
  whatsappPhone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address?: string;
  landmark?: string;
  locality?: string;
  pincode?: string;
}

export interface DoctorConciergeRequest {
  requestId: string;
  createdAt: string;
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
  status: ConciergeStatus;
  tokenBookingFee: number; // e.g. 39
  
  // Payment Details
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  paymentMethod: PaymentMethod;
  paymentUtr?: string;
  paidAt?: string;

  // Slip Release Details
  assignedRunner?: string;
  confirmedTokenNumber?: string; // e.g. "Serial #14"
  confirmedTime?: string; // e.g. "10:30 AM"
  slipReleasedAt?: string;
  slipNotes?: string;

  // Auto-Refund Details (if not confirmed)
  refundStatus?: 'NOT_APPLICABLE' | 'AUTO_REFUNDED';
  refundAmount?: number;
  refundUtr?: string;
  refundedAt?: string;
  refundReason?: string;
}
