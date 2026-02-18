import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<MainLayout hideSidebar><Login /></MainLayout>} />
        <Route path="/signup" element={<MainLayout hideSidebar><Signup /></MainLayout>} />

        {/* Treasure Map */}
        <Route path="/" element={<MainLayout><CareerMap /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />

        {/* Zones */}
        <Route path="/resume-island" element={<MainLayout><ResumeIsland /></MainLayout>} />
        <Route path="/concept-caverns" element={<MainLayout><ConceptCaverns /></MainLayout>} />
        <Route path="/interview-arena" element={<MainLayout><InterviewArena /></MainLayout>} />
        <Route path="/code-dungeon" element={<MainLayout><CodeDungeon /></MainLayout>} />
        <Route path="/company-fortress" element={<MainLayout><CompanyFortress /></MainLayout>} />
        <Route path="/final-temple" element={<MainLayout><FinalTemple /></MainLayout>} />

        {/* Profile */}
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
