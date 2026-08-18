# Riddhi Sidhi Janch Lab

A web application designed for a diagnostic pathology laboratory serving patients and healthcare professionals. The platform enables patients to browse comprehensive diagnostic test catalogues, schedule doorstep home sample collections, consult affiliated doctors, and track diagnostic reports online.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling & UI:** Tailwind CSS, Lucide React
- **Utilities:** QRCode generation, Canvas Confetti
- **Testing:** Playwright (End-to-End testing)
- **Deployment:** Docker, Nginx

## Key Features

- **Diagnostic Test Catalogue:** Categorized pathology test catalogue with pricing, fasting guidelines, parameter details, and turnaround times.
- **Symptom Matcher:** Interactive symptom assessment workflow that recommends relevant health screening packages.
- **Home Collection & Lab Booking:** Multi-step booking pipeline supporting home sample collection and walk-in appointments.
- **Report Tracking:** Real-time tracking of diagnostic sample stages and digital report access using booking ID or phone number.
- **Doctor Concierge:** Direct appointment coordination and queue assistance for local medical specialists.
- **Staff Operations Drawer:** Administrative interface for phlebotomist dispatch and sample status updates.

## Project Structure

```
├── src/
│   ├── components/      # UI components (Booking, TestCatalogue, ReportTracker, etc.)
│   ├── context/         # React Context for state and local persistence
│   ├── data/            # Diagnostic test definitions and doctor profiles
│   ├── types/           # TypeScript domain interfaces and type definitions
│   ├── App.tsx          # Main application layout and routing
│   └── main.tsx         # Application entry point
├── tests/               # Playwright automated end-to-end test suites
├── nginx.conf           # Production Nginx reverse proxy configuration
├── Dockerfile           # Production container build
└── package.json         # Project metadata and dependencies
```

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/aiworkflows007-ai/riddhi-sidhi-lab.git
   cd riddhi-sidhi-lab
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### Running Tests
```bash
npx playwright test
```
