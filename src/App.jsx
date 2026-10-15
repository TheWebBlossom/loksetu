import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ComplaintProvider } from './context/ComplaintContext';
import RoleSwitchModal from './components/RoleSwitchModal';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import CitizenLayout from './layouts/CitizenLayout';
import AuthorityLayout from './layouts/AuthorityLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SubmitGrievancePage from './pages/SubmitGrievancePage';
import CitizenDashboardPage from './pages/CitizenDashboardPage';
import MyComplaintsPage from './pages/MyComplaintsPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import PublicComplaintsPage from './pages/PublicComplaintsPage';
import ResolvedIssuesPage from './pages/ResolvedIssuesPage';
import AuthorityDashboardPage from './pages/AuthorityDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ComplaintProvider>
          <BrowserRouter>
            {/* Global Role Switch Authentication Modal */}
            <RoleSwitchModal />

            <Routes>
              {/* Public Layout Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/submit-grievance" element={<SubmitGrievancePage />} />
                <Route path="/public/complaints" element={<PublicComplaintsPage />} />
                <Route path="/public/resolved" element={<ResolvedIssuesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Citizen Layout Routes (Protected) */}
              <Route
                element={
                  <ProtectedRoute allowedRoles={['citizen']}>
                    <CitizenLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/citizen/dashboard" element={<CitizenDashboardPage />} />
                <Route path="/citizen/complaints" element={<MyComplaintsPage />} />
                <Route path="/citizen/complaints/:id" element={<ComplaintDetailsPage />} />
              </Route>

              {/* Authority Layout Routes (Protected) */}
              <Route
                element={
                  <ProtectedRoute allowedRoles={['authority']}>
                    <AuthorityLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/authority/dashboard" element={<AuthorityDashboardPage />} />
              </Route>

              {/* Platform Administration Layout Routes (Protected) */}
              <Route
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ComplaintProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
