import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import XPBar from '../components/XPBar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Treasure Map' },
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/profile', label: 'Profile' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-border/50">
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-amber flex items-center justify-center text-navy font-black text-sm">P</div>
                    <span className="text-lg font-black">Prep<span className="text-gold">Nova</span></span>
                </Link>

                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${location.pathname === link.to ? 'text-gold bg-gold/10' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                }`}
                        >{link.label}</Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <XPBar />
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-text-secondary hover:text-text-primary p-2">
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden bg-navy-light/95 backdrop-blur-xl border-t border-border/50 py-3 px-4 space-y-1">
                    {navLinks.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium ${location.pathname === link.to ? 'text-gold bg-gold/10' : 'text-text-secondary hover:bg-surface-hover'
                                }`}
                        >{link.label}</Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
