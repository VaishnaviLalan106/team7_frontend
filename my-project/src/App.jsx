import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import MainLayout from './layout/MainLayout';
import CareerMap from './pages/CareerMap';
import Dashboard from './pages/Dashboard';
import ResumeIsland from './pages/ResumeIsland';
import ConceptCaverns from './pages/ConceptCaverns';
import InterviewArena from './pages/InterviewArena';
import CodeDungeon from './pages/CodeDungeon';
import CompanyFortress from './pages/CompanyFortress';
import FinalTemple from './pages/FinalTemple';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Roadmap from './pages/Roadmap';
import ProjectBuilder from './pages/ProjectBuilder';

// Protect routes that require login
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Redirect logged-in users away from auth pages
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Handle Landing page vs World Map logic
const InitialLanding = () => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <CareerMap /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Auth - No Map, no Sidebar, no Nav */}
          <Route path="/login" element={
            <PublicRoute>
              <MainLayout hideSidebar hideNav><Login /></MainLayout>
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <MainLayout hideSidebar hideNav><Signup /></MainLayout>
            </PublicRoute>
          } />

          {/* Root/Map - Protected */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout><InitialLanding /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout><Dashboard /></MainLayout>
            </ProtectedRoute>
          } />

          {/* Zones - Protected */}
          <Route path="/resume-island" element={<ProtectedRoute><MainLayout><ResumeIsland /></MainLayout></ProtectedRoute>} />
          <Route path="/concept-caverns" element={<ProtectedRoute><MainLayout><ConceptCaverns /></MainLayout></ProtectedRoute>} />
          <Route path="/interview-arena" element={<ProtectedRoute><MainLayout><InterviewArena /></MainLayout></ProtectedRoute>} />
          <Route path="/code-dungeon" element={<ProtectedRoute><MainLayout><CodeDungeon /></MainLayout></ProtectedRoute>} />
          <Route path="/company-fortress" element={<ProtectedRoute><MainLayout><CompanyFortress /></MainLayout></ProtectedRoute>} />
          <Route path="/final-temple" element={<ProtectedRoute><MainLayout><FinalTemple /></MainLayout></ProtectedRoute>} />

          {/* Profile & Roadmap - Protected */}
          <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><MainLayout><Roadmap /></MainLayout></ProtectedRoute>} />
          <Route path="/project-builder" element={<ProtectedRoute><MainLayout><ProjectBuilder /></MainLayout></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
