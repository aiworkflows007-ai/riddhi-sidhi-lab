import React, { useState } from 'react';
import { useLab } from '../context/LabContext';
import { ReportStatus, ConciergeStatus } from '../types';
import { 
  X, 
  Table, 
  RefreshCw, 
  Send, 
  CheckCircle2, 
  Clock, 
  FlaskConical, 
  Stethoscope, 
  Edit3,
  FileSpreadsheet,
  PhoneCall
} from 'lucide-react';

export const StaffOpsDrawer: React.FC = () => {
  const { 
    isStaffOpsOpen, 
    setIsStaffOpsOpen, 
    bookings, 
    updateBookingStatus, 
    doctorRequests, 
    updateDoctorRequestStatus, 
    language 
  } = useLab();

  const [activeTab, setActiveTab] = useState<'bookings' | 'doctor_requests'>('bookings');

  if (!isStaffOpsOpen) return null;

  const statusOptions: ReportStatus[] = [
    'BOOKED',
    'PHLEBOTOMIST_ASSIGNED',
    'SAMPLE_COLLECTED',
    'IN_TESTING',
    'REPORT_READY',
    'SENT_VIA_WHATSAPP'
  ];

  const conciergeOptions: ConciergeStatus[] = [
    'REQUESTED',
    'LINE_QUEUED',
    'TOKEN_CONFIRMED',
    'COMPLETED',
    'UNAVAILABLE'
  ];

  return (
    <div className="modal-overlay" onClick={() => setIsStaffOpsOpen(false)}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '980px', width: '95%', maxHeight: '92vh' }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'var(--slate-900)', color: '#fff', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Lab Operations Store & Google Sheet Sync (v1)
                </h2>
                <span className="badge badge-emerald">LIVE SYNC</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                Riddhi Sidhi Janch Lab (Ashok's Team) • Change sample status to update patient tracking in real-time
              </div>
            </div>
          </div>

          <button onClick={() => setIsStaffOpsOpen(false)} className="btn btn-secondary btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`btn btn-sm ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <FlaskConical size={16} />
            <span>Test Bookings Sheet ({bookings.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('doctor_requests')}
            className={`btn btn-sm ${activeTab === 'doctor_requests' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Stethoscope size={16} />
            <span>Doctor Concierge Sheet ({doctorRequests.length})</span>
          </button>
        </div>

        {/* TAB 1: TEST BOOKINGS SHEET */}
        {activeTab === 'bookings' && (
          <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', borderBottom: '1px solid var(--slate-200)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Booking ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Patient & WhatsApp</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Fulfillment & Area</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Tests</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Live Status (Update)</th>
                  <th style={{ padding: '0.75rem 1rem' }}>WhatsApp Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.bookingId} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                      {b.bookingId}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{b.patient.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{b.patient.whatsappPhone} ({b.patient.age}Y/{b.patient.gender})</div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${b.fulfillmentType === 'HOME_COLLECTION' ? 'badge-teal' : 'badge-slate'}`} style={{ marginBottom: '0.2rem' }}>
                        {b.fulfillmentType === 'HOME_COLLECTION' ? '🏠 Home Pickup' : '🏥 Lab Walk-in'}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                        {b.patient.locality || 'Ara Central'}
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', maxWidth: '200px' }}>
                      <div style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {b.selectedTests.map(t => t.name).join(', ')}
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                      ₹{b.finalPayable} <span style={{ fontSize: '0.7rem', color: 'var(--emerald-700)' }}>({b.paymentStatus})</span>
                    </td>

                    {/* Status Dropdown to simulate staff action */}
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <select 
                        value={b.reportStatus}
                        onChange={(e) => updateBookingStatus(b.bookingId, e.target.value as ReportStatus)}
                        className="form-select"
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', fontWeight: 600, background: 'var(--slate-50)' }}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <a 
                        href={`https://wa.me/91${b.patient.whatsappPhone}?text=${encodeURIComponent(`नमस्ते ${b.patient.fullName} जी, आपकी रिद्धि सिद्धि जांच आईडी ${b.bookingId} का स्टेटस अपडेट: ${b.reportStatus}`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ padding: '0.3rem 0.6rem' }}
                      >
                        <Send size={14} />
                        <span>Send Update</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: DOCTOR REQUESTS SHEET */}
        {activeTab === 'doctor_requests' && (
          <div style={{ overflowX: 'auto', background: '#fff', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-md)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--slate-100)', color: 'var(--slate-700)', borderBottom: '1px solid var(--slate-200)' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Request ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Patient Name & Phone</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Doctor Requested</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Date & Session</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Token Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Confirmed Token #</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctorRequests.map(r => (
                  <tr key={r.requestId} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--primary-800)' }}>
                      {r.requestId}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 700 }}>{r.patientName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{r.whatsappPhone}</div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{r.doctorName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{r.clinicName}</div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div>{r.preferredDate}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{r.preferredSlot}</div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <select 
                        value={r.status}
                        onChange={(e) => updateDoctorRequestStatus(r.requestId, e.target.value as ConciergeStatus)}
                        className="form-select"
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        {conciergeOptions.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <input 
                        type="text" 
                        defaultValue={r.confirmedTokenNumber || 'Serial #14'}
                        onBlur={(e) => updateDoctorRequestStatus(r.requestId, r.status, e.target.value)}
                        className="form-input"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: '110px' }}
                      />
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <a 
                        href={`https://wa.me/91${r.whatsappPhone}?text=${encodeURIComponent(`🏥 *डॉक्टर टोकन रसीद*\nनमस्ते ${r.patientName} जी, ${r.doctorName} के क्लिनिक में आपका टोकन नंबर *${r.confirmedTokenNumber || 'Serial #14'}* बुक हो चुका है। कृपया समय से 10 मिनट पहले पहुंचें।`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp btn-sm"
                        style={{ padding: '0.3rem 0.6rem' }}
                      >
                        <Send size={14} />
                        <span>Send Token</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
