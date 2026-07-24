import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import AppLayout from './components/layout/AppLayout';
import CourseDetail from './pages/CourseDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Learn from './pages/Learn';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:courseId/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
        <Route path="/courses/:courseId/modules/:moduleId/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} />
        <Route path="/courses/:courseId/modules/:moduleId/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </AppLayout>
  );
}
