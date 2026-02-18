import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AIChat from '../components/AIChat';

const MainLayout = ({ children, hideSidebar = false }) => {
    return (
        <div className="min-h-screen flex flex-col bg-navy">
            <Navbar />
            <div className="flex flex-1">
                {!hideSidebar && <Sidebar />}
                <main className={`flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 ${hideSidebar ? 'max-w-7xl mx-auto w-full' : ''}`}>
                    {children}
                </main>
            </div>
            {!hideSidebar && <AIChat />}
        </div>
    );
};

export default MainLayout;
