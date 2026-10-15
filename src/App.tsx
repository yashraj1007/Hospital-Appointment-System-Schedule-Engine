import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ComingSoon from './components/common/ComingSoon';
import NotificationsPage from './pages/common/Notifications';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';
import PatientProfile from './pages/patient/Profile';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPatients from './pages/doctor/Patients';
import DoctorProfile from './pages/doctor/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AppointmentRequests from './pages/admin/AppointmentRequests';
import AdminAppointments from './pages/admin/Appointments';
import AdminDoctors from './pages/admin/Doctors';
import AdminPatients from './pages/admin/Patients';
import AdminReports from './pages/admin/Reports';
import AdminProfile from './pages/admin/Profile';

import AdminSettings from './pages/admin/Settings';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Patient Routes */}
          <Route
            path="/patient/*"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Routes>
                  <Route path="dashboard" element={<PatientDashboard />} />
                  <Route path="book-appointment" element={<BookAppointment />} />
                  <Route path="appointments" element={<MyAppointments />} />
                  <Route path="notifications" element={<NotificationsPage role="patient" />} />
                  <Route path="profile" element={<PatientProfile />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor/*"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Routes>
                  <Route path="dashboard" element={<DoctorDashboard />} />
                  <Route path="appointments" element={<DoctorAppointments />} />
                  <Route path="patients" element={<DoctorPatients />} />
                  <Route path="notifications" element={<NotificationsPage role="doctor" />} />
                  <Route path="profile" element={<DoctorProfile />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="requests" element={<AppointmentRequests />} />
                  <Route path="appointments" element={<AdminAppointments />} />
                  <Route path="doctors" element={<AdminDoctors />} />
                  <Route path="patients" element={<AdminPatients />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="notifications" element={<NotificationsPage role="admin" />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </NotificationProvider>
  </AuthProvider>
);
}
