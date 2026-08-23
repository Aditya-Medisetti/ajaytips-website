import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { TestProvider } from './context/TestContext';

import Header from './components/Header';
import Footer from './components/Footer';

// All Application Pages
import Home from './pages/Home';
import Store from './pages/Store';
import CourseDetails from './pages/CourseDetails';
import VideoLearning from './pages/VideoLearning';
import LiveClasses from './pages/LiveClasses';
import TestSeries from './pages/TestSeries';
import TestInterface from './pages/TestInterface';
import TestResult from './pages/TestResult';
import StudyMaterials from './pages/StudyMaterials';
import FreeMaterials from './pages/FreeMaterials';
import OfflineDownloads from './pages/OfflineDownloads';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import Performance from './pages/Performance';
import Payments from './pages/Payments';
import Assignments from './pages/Assignments';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <TestProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Store />} />
                  <Route path="/courses/:id" element={<CourseDetails />} />
                  <Route path="/course/:id" element={<CourseDetails />} />
                  <Route path="/learn/:courseId" element={<VideoLearning />} />
                  <Route path="/video-learning/:courseId" element={<VideoLearning />} />
                  <Route path="/live" element={<LiveClasses />} />
                  <Route path="/live-classes" element={<LiveClasses />} />
                  <Route path="/tests" element={<TestSeries />} />
                  <Route path="/test-series" element={<TestSeries />} />
                  <Route path="/test-interface/:testId" element={<TestInterface />} />
                  <Route path="/test-result/:testId" element={<TestResult />} />
                  <Route path="/materials" element={<StudyMaterials />} />
                  <Route path="/study-materials" element={<StudyMaterials />} />
                  <Route path="/free-content" element={<FreeMaterials />} />
                  <Route path="/free-materials" element={<FreeMaterials />} />
                  <Route path="/offline-downloads" element={<OfflineDownloads />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/dashboard" element={<StudentDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/performance" element={<Performance />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/teacher" element={<TeacherDashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </TestProvider>
      </DataProvider>
    </AuthProvider>
  );
}
