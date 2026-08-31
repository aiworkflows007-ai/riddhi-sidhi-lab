import React from 'react';
import { LabProvider, useLab } from './context/LabContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DoctorConcierge } from './components/DoctorConcierge';
import { ReportTracker } from './components/ReportTracker';
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
            <DoctorConcierge />
            <ReportTracker />
          </>
        )}

        {activeTab === 'doctors' && (
          <div style={{ paddingTop: '1.5rem' }}>
            <DoctorConcierge />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div style={{ paddingTop: '1.5rem' }}>
            <ReportTracker />
          </div>
        )}
      </main>

      <Footer />

      {/* Global Staff Drawer & Mobile Bar */}
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
