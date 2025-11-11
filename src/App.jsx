import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import HomePage from '@/pages/HomePage';
import WebDevelopmentPage from '@/pages/WebDevelopmentPage';
import AppDevelopmentPage from '@/pages/AppDevelopmentPage';
import GameDevelopmentPage from '@/pages/GameDevelopmentPage';
import AboutUsPage from '@/pages/AboutUsPage';
import AIServicesPage from '@/pages/AIServicesPage';
import SoftwareDevelopmentPage from '@/pages/SoftwareDevelopmentPage';
import RFPPage from '@/pages/RFPPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/web-development" element={<WebDevelopmentPage />} />
            <Route path="/app-development" element={<AppDevelopmentPage />} />
            <Route path="/game-development" element={<GameDevelopmentPage />} />
            <Route path="/ai-services" element={<AIServicesPage />} />
            <Route path="/software-development" element={<SoftwareDevelopmentPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/rfp" element={<RFPPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;