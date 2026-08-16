export interface AraLocality {
  name: string;
  nameHi: string;
  pincode: string;
  landmark: string;
}

export const ARA_LOCALITIES: AraLocality[] = [
  { name: 'Hospital Road / Sadar Hospital Area', nameHi: 'सदर अस्पताल रोड / हॉस्पिटल रोड', pincode: '802301', landmark: 'Opp. Sadar Hospital Gate' },
  { name: 'Nawada / Hari Jee Ka Hata', nameHi: 'नवादा / हरी जी का हाता', pincode: '802301', landmark: 'Near Nawada Thana' },
  { name: 'Ramna Road / Katira More', nameHi: 'रमना रोड / कतीरा मोड़', pincode: '802301', landmark: 'Near RL Memorial Hospital' },
  { name: 'Judge Court Road / Circuit House', nameHi: 'जज कोर्ट रोड / सर्किट हाउस', pincode: '802301', landmark: 'Near Civil Court' },
  { name: 'Station Road / Railway Station Area', nameHi: 'स्टेशन रोड / रेलवे स्टेशन', pincode: '802301', landmark: 'Near Ara Junction' },
  { name: 'Shivganj / Shaheed Bhawan', nameHi: 'शिवगंज / शहीद भवन', pincode: '802301', landmark: 'Shivganj Chowk' },
  { name: 'Pakari / Anand Nagar', nameHi: 'पकड़ी / आनंद नगर', pincode: '802301', landmark: 'Near Shishu Kalyan' },
  { name: 'Babu Bazar / Mahavir Tola', nameHi: 'बाबू बाजार / महावीर टोला', pincode: '802301', landmark: 'Near Mahavir Temple' },
  { name: 'Anaith / Godhna Road', nameHi: 'अनईठ / गोढ़ना रोड', pincode: '802301', landmark: 'Near Anaith More' },
  { name: 'Dharhara / Maula Bagh', nameHi: 'धरहरा / मौला बाग', pincode: '802302', landmark: 'Near Jain College' },
  { name: 'Gangi / Bypass Road', nameHi: 'गांगी / बाईपास रोड', pincode: '802302', landmark: 'Gangi Pul' },
  { name: 'Chandi / Udwantnagar Border', nameHi: 'चांदी / उदवंतनगर सीमा', pincode: '802302', landmark: 'Block Office Area' }
];

export const INITIAL_DEMO_BOOKINGS = [
  {
    bookingId: 'RSL-2026-48291',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    patient: {
      fullName: 'Ramesh Sharma',
      whatsappPhone: '9835012345',
      age: 48,
      gender: 'Male' as const,
      address: 'House #14, Shiv Mandir Gali, Nawada',
      landmark: 'Near Nawada Chowk',
      locality: 'Nawada / Hari Jee Ka Hata',
      pincode: '802301'
    },
    fulfillmentType: 'HOME_COLLECTION' as const,
    preferredDate: '2026-08-16',
    preferredSlot: '07:00 AM - 09:00 AM',
    selectedTests: [
      {
        id: 'cbc-01',
        name: 'Complete Blood Count (CBC) with ESR',
        nameHi: 'सम्पूर्ण रक्त जांच (सीबीसी + ईएसआर)',
        category: 'routine' as const,
        mrp: 400,
        price: 250,
        discountPercent: 38,
        fastingHours: 0,
        fastingNoteEn: 'No Fasting Required',
        fastingNoteHi: 'खाली पेट रहने की आवश्यकता नहीं',
        turnaroundTime: '60 - 90 mins',
        turnaroundTimeHi: '60 - 90 मिनट',
        sampleType: 'EDTA Whole Blood',
        sampleTypeHi: 'रक्त सैंपल',
        parametersCount: 28,
        descriptionEn: 'Essential screen for anemia, infections, TLC, DLC.',
        descriptionHi: 'खून की कमी, प्लेटलेट व संक्रमण जांच।',
        parametersList: ['Hemoglobin', 'TLC', 'DLC', 'Platelets', 'ESR']
      },
      {
        id: 'sugar-fasting-03',
        name: 'Blood Sugar Fasting (Glucose Fasting)',
        nameHi: 'फास्टिंग ब्लड शुगर (खाली पेट)',
        category: 'diabetes' as const,
        mrp: 100,
        price: 60,
        discountPercent: 40,
        fastingHours: 8,
        fastingNoteEn: '8-10 Hours Overnight Fasting',
        fastingNoteHi: '8-10 घंटे उपवास',
        turnaroundTime: '30 mins',
        turnaroundTimeHi: '30 मिनट',
        sampleType: 'Fluoride Plasma',
        sampleTypeHi: 'फ्लोराइड प्लाज्मा',
        parametersCount: 1,
        descriptionEn: 'Fasting glucose screen.',
        descriptionHi: 'फास्टिंग शुगर जांच।',
        parametersList: ['Plasma Glucose Fasting']
      }
    ],
    totalMrp: 500,
    discountAmount: 190,
    homeCollectionFee: 0,
    finalPayable: 310,
    paymentStatus: 'PAID' as const,
    paymentRefId: 'UPI-RAZOR-892182',
    reportStatus: 'IN_TESTING' as const,
    phlebotomistName: 'Manoj Kumar (Certified DMLT)',
    phlebotomistPhone: '+91 99341 82910',
    statusHistory: [
      { status: 'BOOKED' as const, timestamp: '08:00 AM', note: 'Online booking confirmed via WhatsApp.' },
      { status: 'PHLEBOTOMIST_ASSIGNED' as const, timestamp: '08:15 AM', note: 'Phlebotomist Manoj Kumar dispatched with vacutainer kit.' },
      { status: 'SAMPLE_COLLECTED' as const, timestamp: '08:50 AM', note: 'Barcoded EDTA & Fluoride tubes received safely.' },
      { status: 'IN_TESTING' as const, timestamp: '09:30 AM', note: 'Processing on 5-part automated analyzer at Central Lab, Ara.' }
    ]
  },
  {
    bookingId: 'RSL-2026-1002',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    patient: {
      fullName: 'Sunita Devi',
      whatsappPhone: '9431098765',
      age: 42,
      gender: 'Female' as const,
      locality: 'Hospital Road / Sadar Hospital Area',
      pincode: '802301'
    },
    fulfillmentType: 'LAB_VISIT' as const,
    preferredDate: '2026-08-16',
    preferredSlot: '09:00 AM - 11:00 AM',
    selectedTests: [
      {
        id: 'thyroid-08',
        name: 'Thyroid Profile (Total T3, T4, TSH)',
        nameHi: 'थायराइड प्रोफाइल (T3, T4, TSH)',
        category: 'thyroid' as const,
        mrp: 600,
        price: 400,
        discountPercent: 33,
        fastingHours: 0,
        fastingNoteEn: 'Morning Sample Preferred',
        fastingNoteHi: 'सुबह का सैंपल श्रेष्ठ',
        turnaroundTime: '3 hours',
        turnaroundTimeHi: '3 घंटे',
        sampleType: 'Serum (CLIA)',
        sampleTypeHi: 'रक्त सीरम',
        parametersCount: 3,
        descriptionEn: 'Screening for hypothyroidism / hyperthyroidism.',
        descriptionHi: 'थायराइड ग्रंथि जांच।',
        parametersList: ['T3', 'T4', 'TSH Ultrasensitive']
      }
    ],
    totalMrp: 600,
    discountAmount: 200,
    homeCollectionFee: 0,
    finalPayable: 400,
    paymentStatus: 'PAID' as const,
    paymentRefId: 'UPI-GPAY-449102',
    reportStatus: 'SENT_VIA_WHATSAPP' as const,
    statusHistory: [
      { status: 'BOOKED' as const, timestamp: '09:10 AM', note: 'Lab walk-in token generated.' },
      { status: 'SAMPLE_COLLECTED' as const, timestamp: '09:30 AM', note: 'Blood draw completed at Lab Reception Station #2.' },
      { status: 'IN_TESTING' as const, timestamp: '10:15 AM', note: 'Automated CLIA analyzer testing completed.' },
      { status: 'REPORT_READY' as const, timestamp: '12:30 PM', note: 'Pathologist Dr. S. K. Verma certified the report.' },
      { status: 'SENT_VIA_WHATSAPP' as const, timestamp: '12:45 PM', note: 'Digitally signed PDF report delivered on WhatsApp.' }
    ]
  }
];
