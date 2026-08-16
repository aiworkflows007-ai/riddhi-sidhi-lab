import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { DIAGNOSTIC_TESTS } from '../data/tests';
import { DiagnosticTest } from '../types';
import { 
  Search, 
  Filter, 
  FlaskConical, 
  Clock, 
  Check, 
  Plus, 
  Info, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Flame,
  Droplets,
  Heart,
  Activity
} from 'lucide-react';

export const TestCatalogue: React.FC = () => {
  const { 
    language, 
    addToCart, 
    isInCart, 
    setSelectedTestForDetail, 
    setIsBookingModalOpen 
  } = useLab();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', nameEn: 'All Tests (500+)', nameHi: 'सभी जांचें' },
    { id: 'routine', nameEn: 'Blood & Routine', nameHi: 'रक्त एवं रूटीन' },
    { id: 'fever', nameEn: 'Fever & Infection', nameHi: 'बुखार एवं संक्रमण' },
    { id: 'diabetes', nameEn: 'Diabetes / Sugar', nameHi: 'शुगर / मधुमेह' },
    { id: 'thyroid', nameEn: 'Thyroid', nameHi: 'थायराइड' },
    { id: 'full_body', nameEn: 'Full Body Checkup', nameHi: 'फुल बॉडी चेकअप' },
    { id: 'heart', nameEn: 'Heart & Lipid', nameHi: 'हृदय एवं कोलेस्ट्रॉल' },
    { id: 'liver_kidney', nameEn: 'Liver & Kidney', nameHi: 'लिवर एवं किडनी' },
    { id: 'vitamins', nameEn: 'Vitamins & Bone', nameHi: 'विटामिन एवं हड्डी' }
  ];

  const filteredTests = DIAGNOSTIC_TESTS.filter(test => {
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch = 
      test.name.toLowerCase().includes(query) ||
      test.nameHi.includes(query) ||
      test.descriptionEn.toLowerCase().includes(query) ||
      test.descriptionHi.includes(query) ||
      test.parametersList.some(p => p.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const handleBookSingleTest = (test: DiagnosticTest) => {
    addToCart(test);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="app-container" id="catalogue" style={{ padding: '3rem 1.25rem' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'var(--primary-100)', color: 'var(--primary-800)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <FlaskConical size={16} />
          <span>{language === 'hi' ? 'एनएबीएल-मानक ऑटोमेटेड पैथोलॉजी' : 'NABL-Calibrated Precision Diagnostics'}</span>
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--slate-900)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          {language === 'hi' ? 'जांच सूची एवं पैकेज (Test Catalogue)' : 'Diagnostic Tests & Health Packages'}
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--slate-600)' }}>
          {language === 'hi' 
            ? 'पारदर्शी स्थानीय दरें, 100% डॉक्टर सत्यापित रिपोर्ट, और घर बैठे निःशुल्क सैंपल कलेक्शन।'
            : 'Transparent Ara pricing, verified pathologist sign-off, and doorstep phlebotomy.'}
        </p>
      </div>

      {/* Search & Filter Hub */}
      <div style={{ background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={20} color="var(--slate-400)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder={language === 'hi' ? 'जांच का नाम खोजें (उदा: CBC, Sugar, Thyroid, Dengue, LFT)...' : 'Search 500+ tests (e.g. CBC, Lipid, HbA1c, Thyroid, Dengue)...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.85rem', fontSize: '1rem', minHeight: '50px' }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', fontWeight: 700 }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.35rem', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`chip-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{ whiteSpace: 'nowrap' }}
            >
              <span>{language === 'hi' ? cat.nameHi : cat.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Disclaimers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
        <div>
          {language === 'hi' ? `कुल ${filteredTests.length} जांच उपलब्ध` : `Showing ${filteredTests.length} diagnostic tests`}
        </div>
        <div>
          ⭐ {language === 'hi' ? 'आरा में 60 मिनट में होम कलेक्शन' : 'Doorstep sample pickup across Ara'}
        </div>
      </div>

      {/* Test Cards Grid */}
      <div className="test-grid">
        {filteredTests.map(test => {
          const inCart = isInCart(test.id);
          return (
            <div key={test.id} className="test-card">
              <div>
                {/* Header Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className={`badge ${test.popular ? 'badge-amber' : 'badge-teal'}`}>
                    {test.popular ? '⭐ MOST POPULAR' : test.category.toUpperCase().replace('_', ' ')}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                    {test.parametersCount} {language === 'hi' ? 'पैरामीटर' : 'Params'}
                  </span>
                </div>

                {/* Test Titles */}
                <h3 className="test-title">{test.name}</h3>
                <div className="test-title-hi">{test.nameHi}</div>

                {/* Metadata Badges */}
                <div className="test-meta-pills">
                  <span className={`badge ${test.fastingHours > 0 ? 'badge-amber' : 'badge-emerald'}`}>
                    🍽️ {language === 'hi' ? test.fastingNoteHi : test.fastingNoteEn}
                  </span>
                  <span className="badge badge-slate">
                    ⏱️ {language === 'hi' ? test.turnaroundTimeHi : test.turnaroundTime}
                  </span>
                  <span className="badge badge-slate">
                    🧪 {language === 'hi' ? test.sampleTypeHi : test.sampleType}
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {language === 'hi' ? test.descriptionHi : test.descriptionEn}
                </p>
              </div>

              {/* Price & Action Row */}
              <div>
                <div className="price-row">
                  <span className="current-price">₹{test.price}</span>
                  <span className="mrp-price">₹{test.mrp}</span>
                  <span className="discount-tag">{test.discountPercent}% OFF</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setSelectedTestForDetail(test)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Info size={16} />
                    <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                  </button>

                  <button 
                    onClick={() => inCart ? {} : addToCart(test)}
                    className={`btn btn-sm ${inCart ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    {inCart ? <Check size={16} /> : <Plus size={16} />}
                    <span>{inCart ? (language === 'hi' ? 'कार्ट में है' : 'In Cart') : (language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
