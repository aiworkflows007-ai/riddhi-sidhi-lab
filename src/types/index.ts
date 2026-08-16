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
  | 'REQUESTED'
  | 'LINE_QUEUED'
  | 'TOKEN_CONFIRMED'
  | 'COMPLETED'
  | 'UNAVAILABLE';

export interface DiagnosticTest {
  id: string;
  name: string;
  nameHi: string;
  category: 'fever' | 'diabetes' | 'thyroid' | 'full_body' | 'heart' | 'liver_kidney' | 'vitamins' | 'women' | 'routine';
  mrp: number;
  price: number;
  discountPercent: number;
  fastingHours: number; // 0 if no fasting
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
  assignedRunner?: string;
  confirmedTokenNumber?: string;
  confirmedTime?: string;
}
