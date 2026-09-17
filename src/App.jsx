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
import WebinarPage from '@/pages/WebinarPage';
import AgentAIWorkshopPage from '@/pages/AgentAIWorkshopPage.jsx';
import RoboticsWorkshopPage from '@/pages/RoboticsWorkshopPage';
import USAWebinarPage from '@/pages/USAWebinarPage';
import CoursePage from '@/pages/CoursePage';
import CompetitiveExamWebinarPage from '@/pages/CompetitiveExamWebinarPage';
import DataAnalyticsCrashCoursePage from '@/pages/DataAnalyticsCrashCoursePage';
import SkillVersePrivacyPolicyPage from '@/pages/skillverse/SkillVersePrivacyPolicyPage';

// SkillVerse imports
import SkillVerseLayout from '@/pages/skillverse/SkillVerseLayout';
import SkillVerseHomePage from '@/pages/skillverse/SkillVerseHomePage';
import SkillVerseCoursesPage from '@/pages/skillverse/SkillVerseCoursesPage';
import SkillVerseWorkshopsPage from '@/pages/skillverse/SkillVerseWorkshopsPage';
import CampusAmbassadorPage from '@/pages/skillverse/CampusAmbassadorPage';
import RoboticsInternshipPage from '@/pages/skillverse/RoboticsInternshipPage';
import DataAnalyticsAIInternshipPage from '@/pages/skillverse/DataAnalyticsAIInternshipPage';
import MechanicalEngineeringInternshipPage from '@/pages/skillverse/MechanicalEngineeringInternshipPage';
import SpeakEnglishPage from '@/pages/skillverse/SpeakEnglishWithAleenaPage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* SkillVerse Routes */}
        <Route
          path="/skillverse/*"
          element={
            <SkillVerseLayout>
              <Routes>
                <Route path="/" element={<SkillVerseHomePage />} />
                <Route path="/courses" element={<SkillVerseCoursesPage />} />
                <Route path="/workshops" element={<SkillVerseWorkshopsPage />} />
                <Route path="/campus-ambassador" element={<CampusAmbassadorPage />} />
                <Route path="/robotics-internship" element={<RoboticsInternshipPage />} />
                <Route path="/data-analytics-ai-internship" element={<DataAnalyticsAIInternshipPage />} />
                <Route path="/mechanical-engineering-internship" element={<MechanicalEngineeringInternshipPage />} />
                <Route path="/course" element={<CoursePage />} />
                <Route path="/data-analytics-crash-course" element={<DataAnalyticsCrashCoursePage />} />
                <Route path="/usa-webinar" element={<USAWebinarPage />} />
                <Route path="/agent-ai-workshop" element={<AgentAIWorkshopPage />} />
                <Route path="/robotics-workshop" element={<RoboticsWorkshopPage />} />
                <Route path="/competitive-exam-webinar" element={<CompetitiveExamWebinarPage />} />
                <Route path="/speak-english" element={<SpeakEnglishPage />} />
                <Route path="/privacypolicy" element={<SkillVersePrivacyPolicyPage />} />
              </Routes>
              <Toaster />
            </SkillVerseLayout>
          }
        />

        {/* Main Fullstackverse Routes */}
        <Route
          path="/*"
          element={
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
                  <Route path="/webinar" element={<WebinarPage />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppFloat />
              <Toaster />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;