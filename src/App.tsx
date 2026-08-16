import React from 'react';
import { LabProvider, useLab } from './context/LabContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TestCatalogue } from './components/TestCatalogue';
import { ReportTracker } from './components/ReportTracker';
import { DoctorConcierge } from './components/DoctorConcierge';
import { SymptomMatcherModal } from './components/SymptomMatcherModal';
import { UploadPrescriptionModal } from './components/UploadPrescriptionModal';
import { TestDetailModal } from './components/TestDetailModal';
import { BookingModal } from './components/BookingModal';
import { VerificationModal } from './components/VerificationModal';
import { StaffOpsDrawer } from './components/StaffOpsDrawer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { activeTab } = useLab();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Render Tab Content based on Navigation */}
        {activeTab === 'home' && (
          <>
            <Hero />
            <TestCatalogue />
            <ReportTracker />
            <DoctorConcierge />
          </>
        )}

        {activeTab === 'catalogue' && (
          <div style={{ paddingTop: '1.5rem' }}>
            <TestCatalogue />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div style={{ paddingTop: '1.5rem' }}>
            <ReportTracker />
          </div>
        )}

        {activeTab === 'doctors' && (
          <div style={{ paddingTop: '1.5rem' }}>
            <DoctorConcierge />
          </div>
        )}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <SymptomMatcherModal />
      <UploadPrescriptionModal />
      <TestDetailModal />
      <BookingModal />
      <VerificationModal />
      <StaffOpsDrawer />
      <StickyMobileBar />
    </div>
  );
};

export function App() {
  return (
    <LabProvider>
      <MainLayout />
    </LabProvider>
  );
}

export default App;
