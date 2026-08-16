import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { SYMPTOM_CLUSTERS } from '../data/symptoms';
import { DIAGNOSTIC_TESTS } from '../data/tests';
import { 
  X, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Plus, 
  ShoppingCart, 
  ShieldAlert,
  Thermometer,
  BatteryLow,
  Droplets,
  Activity,
  Flame,
  ShieldCheck
} from 'lucide-react';

export const SymptomMatcherModal: React.FC = () => {
  const { 
    isSymptomModalOpen, 
    setIsSymptomModalOpen, 
    language, 
    addToCart, 
    isInCart,
    setIsBookingModalOpen 
  } = useLab();

  const [selectedClusterIds, setSelectedClusterIds] = useState<string[]>(['sym-fever']);

  if (!isSymptomModalOpen) return null;

  const toggleCluster = (id: string) => {
    setSelectedClusterIds(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(item => item !== id) : prev) : [...prev, id]
    );
  };

  // Collect unique suggested test IDs based on selected symptom clusters
  const suggestedTestIds = Array.from(
    new Set(
      SYMPTOM_CLUSTERS
        .filter(c => selectedClusterIds.includes(c.id))
        .flatMap(c => c.suggestedTestIds)
    )
  );

  const matchedTests = DIAGNOSTIC_TESTS.filter(t => suggestedTestIds.includes(t.id));

  const handleAddAllMatched = () => {
    matchedTests.forEach(test => addToCart(test));
    setIsSymptomModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Thermometer': return <Thermometer size={18} />;
      case 'BatteryLow': return <BatteryLow size={18} />;
      case 'Droplets': return <Droplets size={18} />;
      case 'Activity': return <Activity size={18} />;
      case 'Flame': return <Flame size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSymptomModalOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--primary-100)', color: 'var(--primary-800)', padding: '0.4rem', borderRadius: 'var(--radius-md)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                {language === 'hi' ? 'लक्षण अनुसार जांच सुझाव' : 'Symptom-Based Test Matcher'}
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                {language === 'hi' ? 'अपने लक्षण चुनें और उपयुक्त टेस्ट देखें' : 'Select your symptoms to see recommended tests'}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsSymptomModalOpen(false)}
            className="btn btn-secondary btn-icon-only"
          >
            <X size={20} />
          </button>
        </div>

        {/* Informational Medical Disclaimer */}
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>{language === 'hi' ? 'महत्वपूर्ण सूचना:' : 'Medical Disclaimer:'}</strong>{' '}
            {language === 'hi' 
              ? 'यह प्रणाली केवल प्राथमिक सुझाव है, चिकित्सीय निदान नहीं। जांच उपरांत चिकित्सक से परामर्श अवश्य लें।'
              : 'This rule-based tool is an informational aid, not clinical diagnosis. Always consult a qualified physician.'}
          </div>
        </div>

        {/* Symptom Chips Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ marginBottom: '0.75rem' }}>
            {language === 'hi' ? '1. अपने लक्षण चुनें (Select Symptoms):' : '1. Select Your Symptoms:'}
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {SYMPTOM_CLUSTERS.map(cluster => {
              const isSelected = selectedClusterIds.includes(cluster.id);
              return (
                <button
                  key={cluster.id}
                  onClick={() => toggleCluster(cluster.id)}
                  className={`chip-btn ${isSelected ? 'active' : ''}`}
                >
                  {getIcon(cluster.iconName)}
                  <span>{language === 'hi' ? cluster.nameHi : cluster.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Matched Tests Result */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label className="form-label" style={{ margin: 0 }}>
              {language === 'hi' ? `2. अनुशंसित जांच (${matchedTests.length} जांच):` : `2. Recommended Tests (${matchedTests.length} tests):`}
            </label>
            <button 
              onClick={handleAddAllMatched}
              className="btn btn-sm btn-primary"
            >
              <ShoppingCart size={14} />
              <span>{language === 'hi' ? 'सभी कार्ट में जोड़ें व बुक करें' : 'Add All & Book'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {matchedTests.map(test => {
              const inCart = isInCart(test.id);
              return (
                <div 
                  key={test.id}
                  style={{
                    background: 'var(--slate-50)',
                    border: '1px solid var(--slate-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--slate-900)' }}>
                      {language === 'hi' ? test.nameHi : test.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                      ⏱️ {language === 'hi' ? test.turnaroundTimeHi : test.turnaroundTime} • 🧪 {language === 'hi' ? test.sampleTypeHi : test.sampleType}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)' }}>₹{test.price}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textDecoration: 'line-through' }}>₹{test.mrp}</div>
                    </div>

                    <button
                      onClick={() => inCart ? {} : addToCart(test)}
                      className={`btn btn-sm ${inCart ? 'btn-secondary' : 'btn-primary'}`}
                    >
                      {inCart ? <Check size={14} /> : <Plus size={14} />}
                      <span>{inCart ? (language === 'hi' ? 'जुड़ा है' : 'Added') : (language === 'hi' ? 'जोड़ें' : 'Add')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
          <button 
            onClick={() => setIsSymptomModalOpen(false)}
            className="btn btn-secondary"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
          <button 
            onClick={handleAddAllMatched}
            className="btn btn-primary"
          >
            <ShoppingCart size={16} />
            <span>{language === 'hi' ? 'कार्ट में जोड़ें और आगे बढ़ें' : 'Add to Cart & Proceed'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
