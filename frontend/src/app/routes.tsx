import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/public/LandingPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { UserLayout } from '../layouts/UserLayout';
import { PoliceLayout } from '../layouts/PoliceLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { UserDashboard } from '../pages/user/UserDashboard';
import { SafetyMapPage } from '../pages/user/SafetyMapPage';
import { EmergencyContactsPage } from '../pages/user/EmergencyContactsPage';
import { EvidenceStudioPage } from '../pages/user/EvidenceStudioPage';
import { FakeCallPage } from '../pages/user/FakeCallPage';
import { SafetyGuidePage } from '../pages/user/SafetyGuidePage';
import { PoliceDashboard } from '../pages/police/PoliceDashboard';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ProtectedRoute } from '../features/authentication/ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Citizen / User Portal Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute allowedRoles={['USER', 'POLICE', 'ADMIN']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="map" element={<SafetyMapPage />} />
        <Route path="contacts" element={<EmergencyContactsPage />} />
        <Route path="evidence" element={<EvidenceStudioPage />} />
        <Route path="fake-call" element={<FakeCallPage />} />
        <Route path="guide" element={<SafetyGuidePage />} />
      </Route>

      {/* Police / Law Enforcement Portal Routes */}
      <Route
        path="/police"
        element={
          <ProtectedRoute allowedRoles={['POLICE', 'ADMIN']}>
            <PoliceLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PoliceDashboard />} />
      </Route>

      {/* Admin Infrastructure & Verification Console */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
