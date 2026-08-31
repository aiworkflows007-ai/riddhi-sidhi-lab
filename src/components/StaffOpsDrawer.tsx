import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { ConciergeStatus } from '../types';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Stethoscope, 
  FileSpreadsheet, 
  ShieldCheck,
  RotateCcw,
  Clock,
  Ticket,
  Smartphone,
  AlertTriangle
} from 'lucide-react';

export const StaffOpsDrawer: React.FC = () => {
  const { 
    isStaffOpsOpen, 
    setIsStaffOpsOpen, 
    doctorRequests, 
    updateDoctorRequestStatus, 
    releaseTokenSlip,
    autoRefundToken,
    language 
  } = useLab();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'released' | 'refunded'>('all');
  const [activeReleaseModal, setActiveReleaseModal] = useState<string | null>(null);
  const [releaseTokenNo, setReleaseTokenNo] = useState('Serial #18');
  const [releaseTime, setReleaseTime] = useState('10:45 AM, Today');
  const [releaseNotes, setReleaseNotes] = useState('Official compounder slip counter received.');

  const [activeRefundModal, setActiveRefundModal] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState('Doctor unavailable / Clinic queue full');

  if (!isStaffOpsOpen) return null;

  const filteredRequests = doctorRequests.filter(r => {
    if (activeTab === 'pending') return r.status === 'REQUESTED' || r.status === 'LINE_QUEUED';
    if (activeTab === 'released') return r.status === 'TOKEN_CONFIRMED';
    if (activeTab === 'refunded') return r.status === 'UNAVAILABLE_REFUNDED';
    return true;
  });

  const totalPaid = doctorRequests.filter(r => r.paymentStatus === 'PAID' || r.status === 'TOKEN_CONFIRMED').length;
  const totalReleased = doctorRequests.filter(r => r.status === 'TOKEN_CONFIRMED').length;
  const totalRefunded = doctorRequests.filter(r => r.status === 'UNAVAILABLE_REFUNDED').length;

  const handleConfirmRelease = (requestId: string, patientPhone: string, doctorName: string, patientName: string) => {
    releaseTokenSlip(requestId, releaseTokenNo, releaseTime, releaseNotes);
    setActiveReleaseModal(null);

    // Send WhatsApp Slip Notification
    const msg = encodeURIComponent(
      `🏥 *DoctorSathi Ara — डॉक्टर पर्चा व टोकन रसीद जारी*\n\n` +
      `✅ *टोकन नंबर:* ${releaseTokenNo}\n` +
      `⏰ *क्लिनिक पहुंचने का समय:* ${releaseTime}\n` +
      `👨‍⚕️ *डॉक्टर:* ${doctorName}\n` +
      `👤 *मरीज:* ${patientName}\n` +
      `📋 *आईडी:* ${requestId}\n\n` +
      `📸 *पर्चा विवरण:* हमारे फील्ड रनर ने क्लिनिक काउंटर से आपका आधिकारिक पर्चा बनवा दिया है। कृपया निर्धारित समय से 10 मिनट पहले क्लिनिक पहुंचें।`
    );
    window.open(`https://wa.me/91${patientPhone.replace(/\D/g, '').slice(-10)}?text=${msg}`, '_blank');
  };

  const handleConfirmRefund = (requestId: string, patientPhone: string, doctorName: string, patientName: string) => {
    autoRefundToken(requestId, refundReason);
    setActiveRefundModal(null);

    // Send WhatsApp Refund Notification
    const msg = encodeURIComponent(
      `💸 *DoctorSathi Ara — 100% ऑटो-रिफंड सूचना*\n\n` +
      `नमस्ते ${patientName} जी,\n` +
      `डॉक्टर ${doctorName} के क्लिनिक में आज कोटा फुल / डॉक्टर अनुपस्थित होने के कारण पर्चा नहीं बन सका।\n\n` +
      `✅ *रिफंड स्थिति:* ₹39 का 100% ऑटो-रिफंड तुरंत आपके UPI खाते में वापस भेज दिया गया है।\n` +
      `📋 *टोकन आईडी:* ${requestId}\n` +
      `📝 *कारण:* ${refundReason}\n\n` +
      `DoctorSathi 100% पारदर्शी और भरोसेमंद सेवा के लिए प्रतिबद्ध है।`
    );
    window.open(`https://wa.me/91${patientPhone.replace(/\D/g, '').slice(-10)}?text=${msg}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsStaffOpsOpen(false)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '1080px', width: '96%', maxHeight: '92vh', overflowY: 'auto' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--primary-700)', color: '#fff', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
              <Stethoscope size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-900)' }}>
                  DoctorSathi Ara • Ground Staff Queue & Refund Console
                </h2>
                <span className="badge badge-emerald">LIVE OPS</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                Morning 6:00 AM clinic runners, slip release management & instant auto-refund processor
              </div>
            </div>
          </div>

          <button onClick={() => setIsStaffOpsOpen(false)} className="btn btn-secondary btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* Stats Metrics Bento Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700 }}>PAID BOOKINGS (₹39)</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#15803d' }}>{totalPaid}</div>
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>SLIPS RELEASED</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1d4ed8' }}>{totalReleased}</div>
          </div>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>100% AUTO-REFUNDED</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#b91c1c' }}>{totalRefunded}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button 
            onClick={() => setActiveTab('all')}
            className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Requests ({doctorRequests.length})
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`btn btn-sm ${activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Queued / In-Line
          </button>
          <button 
            onClick={() => setActiveTab('released')}
            className={`btn btn-sm ${activeTab === 'released' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Slips Released ({totalReleased})
          </button>
          <button 
            onClick={() => setActiveTab('refunded')}
            className={`btn btn-sm ${activeTab === 'refunded' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Auto-Refunded ({totalRefunded})
          </button>
        </div>

        {/* Doctor Requests Table */}
        <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', borderBottom: '1px solid var(--slate-200)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Request ID & Payment</th>
                <th style={{ padding: '0.75rem 1rem' }}>Patient Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Doctor & Clinic</th>
                <th style={{ padding: '0.75rem 1rem' }}>Queue Status</th>
                <th style={{ padding: '0.75rem 1rem' }}>Token / Refund Info</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Staff Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(r => (
                <tr key={r.requestId} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                  {/* Request & Payment */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary-800)' }}>{r.requestId}</div>
                    <div style={{ fontSize: '0.75rem', color: r.paymentStatus === 'PAID' ? '#15803d' : '#b91c1c', fontWeight: 700 }}>
                      ₹{r.tokenBookingFee || 39} {r.paymentStatus} ({r.paymentMethod || 'UPI'})
                    </div>
                    {r.paymentUtr && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>UTR: {r.paymentUtr}</div>
                    )}
                  </td>

                  {/* Patient Info */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 700 }}>{r.patientName} ({r.patientAge} Y)</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>📱 {r.whatsappPhone}</div>
                  </td>

                  {/* Doctor Info */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{r.doctorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{r.clinicName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-700)', fontWeight: 600 }}>{r.preferredDate} ({r.preferredSlot})</div>
                  </td>

                  {/* Status Dropdown */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <select 
                      value={r.status}
                      onChange={(e) => updateDoctorRequestStatus(r.requestId, e.target.value as ConciergeStatus)}
                      className="form-select"
                      style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', fontWeight: 700 }}
                    >
                      <option value="REQUESTED">REQUESTED</option>
                      <option value="LINE_QUEUED">LINE_QUEUED (6 AM)</option>
                      <option value="TOKEN_CONFIRMED">TOKEN_CONFIRMED</option>
                      <option value="UNAVAILABLE_REFUNDED">UNAVAILABLE_REFUNDED</option>
                    </select>
                  </td>

                  {/* Token / Refund Info */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    {r.status === 'TOKEN_CONFIRMED' ? (
                      <div>
                        <span className="badge badge-emerald" style={{ fontWeight: 800 }}>
                          {r.confirmedTokenNumber || 'Serial #14'}
                        </span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '0.2rem' }}>
                          ⏱️ {r.confirmedTime || '10:30 AM'}
                        </div>
                      </div>
                    ) : r.status === 'UNAVAILABLE_REFUNDED' ? (
                      <div>
                        <span className="badge badge-rose" style={{ fontWeight: 800 }}>
                          💸 AUTO-REFUNDED ₹{r.refundAmount || 39}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                          Ref UTR: {r.refundUtr || 'REF-UPI-2026-98124'}
                        </div>
                      </div>
                    ) : (
                      <span className="badge badge-amber">Awaiting 6 AM Line</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
                      {/* Action 1: Release Slip */}
                      {r.status !== 'TOKEN_CONFIRMED' && r.status !== 'UNAVAILABLE_REFUNDED' && (
                        <button
                          onClick={() => {
                            setActiveReleaseModal(r.requestId);
                            setReleaseTokenNo('Serial #' + Math.floor(8 + Math.random() * 20));
                          }}
                          className="btn btn-sm btn-primary"
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', width: '100%' }}
                        >
                          <Ticket size={14} />
                          <span>पर्चा रिलीज करें</span>
                        </button>
                      )}

                      {/* Action 2: Auto Refund */}
                      {r.status !== 'UNAVAILABLE_REFUNDED' && (
                        <button
                          onClick={() => setActiveRefundModal(r.requestId)}
                          className="btn btn-sm btn-secondary"
                          style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem', width: '100%', color: '#b91c1c' }}
                        >
                          <RotateCcw size={13} />
                          <span>100% रिफंड करें</span>
                        </button>
                      )}

                      {/* Action 3: Send WhatsApp */}
                      <a 
                        href={`https://wa.me/91${r.whatsappPhone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`नमस्ते ${r.patientName} जी, DoctorSathi Ara से आपका टोकन अनुरोध (${r.requestId}) स्टेटस: ${r.status}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', width: '100%' }}
                      >
                        <Send size={13} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL 1: RELEASE SLIP MODAL */}
        {activeReleaseModal && (
          <div className="modal-overlay" onClick={() => setActiveReleaseModal(null)}>
            <div className="modal-card" style={{ maxWidth: '440px', background: '#fff' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                📸 डॉक्टर पर्चा व टोकन जारी करें (Release Slip)
              </h3>
              
              {(() => {
                const req = doctorRequests.find(d => d.requestId === activeReleaseModal);
                if (!req) return null;

                return (
                  <div>
                    <div style={{ background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                      <strong>{req.doctorName}</strong> • {req.clinicName}<br />
                      Patient: {req.patientName} ({req.whatsappPhone})
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>आधिकारिक सीरियल नंबर (Token Serial #):</label>
                      <input 
                        type="text" 
                        value={releaseTokenNo} 
                        onChange={e => setReleaseTokenNo(e.target.value)} 
                        className="form-input" 
                        placeholder="e.g. Serial #14" 
                      />
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>क्लिनिक पहुंचने का समय (Visit Time):</label>
                      <input 
                        type="text" 
                        value={releaseTime} 
                        onChange={e => setReleaseTime(e.target.value)} 
                        className="form-input" 
                        placeholder="e.g. 10:30 AM" 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button 
                        onClick={() => handleConfirmRelease(req.requestId, req.whatsappPhone, req.doctorName, req.patientName)}
                        className="btn btn-primary"
                        style={{ flex: 1, fontWeight: 800 }}
                      >
                        <CheckCircle2 size={16} />
                        <span>पर्चा रिलीज व WhatsApp भेजें</span>
                      </button>
                      <button onClick={() => setActiveReleaseModal(null)} className="btn btn-secondary">
                        रद्द
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* MODAL 2: AUTO REFUND MODAL */}
        {activeRefundModal && (
          <div className="modal-overlay" onClick={() => setActiveRefundModal(null)}>
            <div className="modal-card" style={{ maxWidth: '440px', background: '#fff' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#b91c1c', marginBottom: '0.75rem' }}>
                💸 100% ऑटो-रिफंड जारी करें (Auto-Refund ₹39)
              </h3>

              {(() => {
                const req = doctorRequests.find(d => d.requestId === activeRefundModal);
                if (!req) return null;

                return (
                  <div>
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem', color: '#991b1b' }}>
                      <strong>मरीज:</strong> {req.patientName} ({req.whatsappPhone})<br />
                      <strong>रिफंड राशि:</strong> ₹{req.tokenBookingFee || 39} (100% Full Refund via UPI)
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>रिफंड का कारण (Reason):</label>
                      <select 
                        value={refundReason}
                        onChange={e => setRefundReason(e.target.value)}
                        className="form-select"
                      >
                        <option value="Doctor emergency leave / Clinic closed today">डॉक्टर आज क्लिनिक में अनुपस्थित हैं</option>
                        <option value="Clinic 6:00 AM token quota filled before queue">क्लिनिक का सुबह का टोकन कोटा फुल हो गया</option>
                        <option value="Patient requested cancellation">मरीज द्वारा बुकिंग रद्द की गई</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleConfirmRefund(req.requestId, req.whatsappPhone, req.doctorName, req.patientName)}
                        className="btn btn-rose"
                        style={{ flex: 1, fontWeight: 800, background: '#b91c1c', color: '#fff' }}
                      >
                        <RotateCcw size={16} />
                        <span>₹39 तुरंत रिफंड करें</span>
                      </button>
                      <button onClick={() => setActiveRefundModal(null)} className="btn btn-secondary">
                        रद्द
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1rem' }}>
          <button onClick={() => setIsStaffOpsOpen(false)} className="btn btn-secondary">
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
