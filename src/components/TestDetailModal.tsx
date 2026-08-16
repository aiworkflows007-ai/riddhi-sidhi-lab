import React from 'react';
import { useLab } from '../context/LabContext';
import { 
  X, 
  FlaskConical, 
  Clock, 
  Check, 
  Plus, 
  ShieldCheck, 
  AlertTriangle,
  FileText,
  ShoppingCart
} from 'lucide-react';

export const TestDetailModal: React.FC = () => {
  const { 
    selectedTestForDetail, 
    setSelectedTestForDetail, 
    language, 
    addToCart, 
    isInCart,
    setIsBookingModalOpen 
  } = useLab();

  if (!selectedTestForDetail) return null;

  const test = selectedTestForDetail;
  const inCart = isInCart(test.id);

  const handleBookNow = () => {
    addToCart(test);
    setSelectedTestForDetail(null);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedTestForDetail(null)}>
      <div className="modal-card" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-teal" style={{ marginBottom: '0.5rem' }}>
              {test.category.toUpperCase().replace('_', ' ')} • {test.parametersCount} PARAMETERS
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.3 }}>
              {test.name}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
              {test.nameHi}
            </div>
          </div>
          <button 
            onClick={() => setSelectedTestForDetail(null)}
            className="btn btn-secondary btn-icon-only"
          >
            <X size={20} />
          </button>
        </div>

        {/* Key Diagnostic Fast Facts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', background: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'उपवास (Fasting):' : 'Fasting:'}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: test.fastingHours > 0 ? 'var(--amber-700)' : 'var(--emerald-700)' }}>
              {language === 'hi' ? test.fastingNoteHi : test.fastingNoteEn}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'रिपोर्ट समय (TAT):' : 'Turnaround:'}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--slate-900)' }}>
              {language === 'hi' ? test.turnaroundTimeHi : test.turnaroundTime}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'सैंपल प्रकार:' : 'Sample Type:'}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--slate-900)' }}>
              {language === 'hi' ? test.sampleTypeHi : test.sampleType}
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--slate-900)' }}>
            {language === 'hi' ? 'जांच का उद्देश्य एवं विवरण' : 'Clinical Significance & Overview'}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            {language === 'hi' ? test.descriptionHi : test.descriptionEn}
          </p>
        </div>

        {/* Parameter Breakdown List */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--slate-900)' }}>
            {language === 'hi' ? `शामिल पैरामीटर्स (${test.parametersList.length})` : `Included Biomarkers & Parameters (${test.parametersList.length})`}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)', padding: '0.75rem' }}>
            {test.parametersList.map((param, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--slate-700)' }}>
                <Check size={14} color="var(--primary-600)" />
                <span>{param}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Pricing & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{language === 'hi' ? 'कुल देय राशि' : 'Special Lab Rate'}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>₹{test.price}</span>
              <span style={{ textDecoration: 'line-through', color: 'var(--slate-400)', fontSize: '0.95rem' }}>₹{test.mrp}</span>
              <span className="badge badge-emerald">{test.discountPercent}% OFF</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => inCart ? {} : addToCart(test)}
              className={`btn ${inCart ? 'btn-secondary' : 'btn-outline-teal'}`}
            >
              {inCart ? <Check size={16} /> : <Plus size={16} />}
              <span>{inCart ? (language === 'hi' ? 'कार्ट में जोड़ा गया' : 'Added to Cart') : (language === 'hi' ? 'कार्ट में डालें' : 'Add to Cart')}</span>
            </button>

            <button 
              onClick={handleBookNow}
              className="btn btn-primary"
            >
              <ShoppingCart size={16} />
              <span>{language === 'hi' ? 'अभी बुक करें' : 'Book Test'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
