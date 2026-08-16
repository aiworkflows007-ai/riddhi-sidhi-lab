import { SymptomCluster } from '../types';

export const SYMPTOM_CLUSTERS: SymptomCluster[] = [
  {
    id: 'sym-fever',
    nameEn: 'Fever, Chills & Shivering',
    nameHi: 'बुखार, कंपकंपी और ठंड लगना',
    iconName: 'Thermometer',
    descriptionEn: 'High body temperature, sweating, headache, or acute body ache.',
    descriptionHi: 'तेज बुखार, ठंड लगना, सिरदर्द या शरीर टूटना।',
    suggestedTestIds: ['cbc-01', 'widal-02', 'dengue-09'],
    packageTitleEn: 'Fever & Infection Screening Panel',
    packageTitleHi: 'बुखार एवं संक्रमण जांच पैकेज'
  },
  {
    id: 'sym-fatigue',
    nameEn: 'Weakness, Fatigue & Dizziness',
    nameHi: 'कमजोरी, अत्यधिक थकान व चक्कर',
    iconName: 'BatteryLow',
    descriptionEn: 'Persistent low energy, muscle fatigue, sleepiness, pale skin.',
    descriptionHi: 'लगातार थकान, शरीर में जान न लगना, सुस्ती व खून की कमी।',
    suggestedTestIds: ['cbc-01', 'sugar-fasting-03', 'thyroid-08', 'vitamins-11'],
    packageTitleEn: 'Vital Energy & Anemia Panel',
    packageTitleHi: 'ऊर्जा एवं एनीमिया जांच पैकेज'
  },
  {
    id: 'sym-diabetes',
    nameEn: 'Frequent Urination & Excessive Thirst',
    nameHi: 'बार-बार पेशाब और ज्यादा प्यास लगना',
    iconName: 'Droplets',
    descriptionEn: 'Waking at night to urinate, dry mouth, slow healing wounds, weight drop.',
    descriptionHi: 'रात में बार-बार पेशाब, मुंह सूखना, घाव देर से भरना।',
    suggestedTestIds: ['sugar-fasting-03', 'hba1c-04', 'kft-07', 'urine-12'],
    packageTitleEn: 'Complete Diabetic Care Panel',
    packageTitleHi: 'सम्पूर्ण मधुमेह सुरक्षा पैकेज'
  },
  {
    id: 'sym-joint-pain',
    nameEn: 'Joint Pain, Knee Swelling & Stiffness',
    nameHi: 'जोड़ों व घुटनों में दर्द एवं सूजन',
    iconName: 'Activity',
    descriptionEn: 'Morning stiffness in fingers, knee pain, swelling or high uric acid symptoms.',
    descriptionHi: 'सुबह उंगलियों में जकड़न, घुटने में दर्द व यूरिक एसिड की समस्या।',
    suggestedTestIds: ['kft-07', 'cbc-01', 'vitamins-11'],
    packageTitleEn: 'Bone, Joint & Uric Acid Profile',
    packageTitleHi: 'हड्डी, जोड़ एवं यूरिक एसिड जांच'
  },
  {
    id: 'sym-jaundice',
    nameEn: 'Yellow Eyes/Urine, Nausea & Acidity',
    nameHi: 'पीली आंखें/पेशाब, उल्टी का मन व गैस',
    iconName: 'Flame',
    descriptionEn: 'Loss of appetite, yellow skin/eyes, upper right abdominal discomfort.',
    descriptionHi: 'भूख न लगना, पीलिया के लक्षण, पेट में भारीपन व बदहजमी।',
    suggestedTestIds: ['lft-06', 'urine-12', 'cbc-01'],
    packageTitleEn: 'Liver & Jaundice Care Profile',
    packageTitleHi: 'लिवर एवं पीलिया केयर पैकेज'
  },
  {
    id: 'sym-thyroid',
    nameEn: 'Sudden Weight Change & Hair Fall',
    nameHi: 'अचानक वजन बढ़ना/घटना व बाल झड़ना',
    iconName: 'Sparkles',
    descriptionEn: 'Unexplained weight gain/loss, mood swings, feeling too cold/hot, puffiness.',
    descriptionHi: 'बिना कारण वजन बदलाव, गले में सूजन, अत्यधिक बाल गिरना।',
    suggestedTestIds: ['thyroid-08', 'cbc-01', 'vitamins-11'],
    packageTitleEn: 'Thyroid & Metabolic Health Screen',
    packageTitleHi: 'थायराइड एवं मेटाबॉलिक जांच'
  },
  {
    id: 'sym-urinary',
    nameEn: 'Burning Sensation in Urine / Pain',
    nameHi: 'पेशाब में जलन एवं दर्द',
    iconName: 'AlertCircle',
    descriptionEn: 'Painful urination, foul odor, cloudy urine, lower pelvic cramps.',
    descriptionHi: 'पेशाब करते समय तेज जलन, दुर्गंध व पेट के निचले हिस्से में दर्द।',
    suggestedTestIds: ['urine-12', 'kft-07'],
    packageTitleEn: 'Urinary Tract Infection (UTI) Panel',
    packageTitleHi: 'मूत्र मार्ग संक्रमण जांच'
  },
  {
    id: 'sym-routine',
    nameEn: 'Full Body Preventive Health Check',
    nameHi: 'वार्षिक सम्पूर्ण स्वास्थ्य परीक्षण',
    iconName: 'ShieldCheck',
    descriptionEn: 'No active disease, but want complete reassurance of heart, liver, kidney, blood.',
    descriptionHi: 'स्वस्थ रहने और समय पर बीमारियों से बचाव के लिए संपूर्ण जांच।',
    suggestedTestIds: ['full-body-10'],
    packageTitleEn: 'Sampoorna Swasthya Kavach',
    packageTitleHi: 'सम्पूर्ण स्वास्थ्य कवच'
  }
];
