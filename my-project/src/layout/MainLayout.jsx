import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AIChat from '../components/AIChat';
import { Map as MapIcon, LayoutDashboard, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children, hideSidebar = false }) => {
    return (
        <div className="min-h-screen flex flex-col bg-navy-deep text-white selection:bg-gold selection:text-gold">
            <Navbar />
            <div className="flex flex-1">
                {!hideSidebar && <Sidebar />}
                <main className={`flex-1 p-4 md:p-6 lg:p-8 pb-32 lg:pb-8 ${hideSidebar ? 'max-w-7xl mx-auto w-full' : ''}`}>
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Nav */}
            {!hideSidebar && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-navy/80 backdrop-blur-2xl border-t border-white/10 z-[70] px-6 py-3 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                    <Link to="/" className="flex flex-col items-center gap-1 text-white/50 hover:text-gold transition-colors">
                        <MapIcon size={20} />
                        <span className="text-[9px] font-black uppercase tracking-wider">World Map</span>
                    </Link>
                    <Link to="/dashboard" className="flex flex-col items-center gap-1 text-white/50 hover:text-gold transition-colors">
                        <LayoutDashboard size={20} />
                        <span className="text-[9px] font-black uppercase tracking-wider">Analytics</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center gap-1 text-white/50 hover:text-gold transition-colors">
                        <User size={20} />
                        <span className="text-[9px] font-black uppercase tracking-wider">Profile</span>
                    </Link>
                </div>
            )}

            {!hideSidebar && <AIChat />}
        </div>
    );
};

export default MainLayout;
