import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Bell, Sparkles, Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="h-16 bg-navy/80 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 px-4 md:px-6">
            <div className="h-full flex items-center justify-between gap-4">

                {/* Logo — compact */}
                <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                    <div className="bg-gradient-to-br from-grass to-forest p-2 rounded-xl shadow-lg shadow-grass/20 group-hover:rotate-12 transition-all">
                        <Compass className="text-white" size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl text-white tracking-tighter italic leading-none">Prep<span className="text-gold">Nova</span></span>
                        <span className="text-[8px] font-black text-grass tracking-[0.15em] uppercase leading-none mt-0.5">Expedition</span>
                    </div>
                </Link>

                {/* Center: Simple nav pills */}
                <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    {[
                        { name: 'Map', path: '/', icon: '🗺' },
                        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
                        { name: 'Profile', path: '/profile', icon: '👤' },
                    ].map((item) => (
                        <Link key={item.name} to={item.path}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5
                                ${location.pathname === item.path
                                    ? 'bg-white/10 text-gold'
                                    : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="text-sm">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right: Minimal stats + avatar */}
                <div className="flex items-center gap-3">
                    {/* Streak badge */}
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
                        <Flame size={14} className="text-gold fill-gold" />
                        <span className="text-[10px] font-black text-gold">5</span>
                    </div>

                    {/* XP mini */}
                    <div className="hidden md:flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1">
                            <Sparkles size={10} className="text-gold" />
                            <span className="text-[10px] font-black text-white/70">LVL 8</span>
                        </div>
                        <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '82%' }}
                                transition={{ duration: 1 }}
                                className="h-full bg-gradient-to-r from-grass to-gold rounded-full"
                            />
                        </div>
                    </div>

                    {/* Notification */}
                    <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 transition-all relative">
                        <Bell size={14} />
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full animate-pulse" />
                    </button>

                    {/* Avatar */}
                    <Link to="/profile" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sunlight to-gold p-[2px] shadow-md group-hover:scale-105 transition-all">
                            <div className="w-full h-full rounded-[10px] overflow-hidden bg-navy flex items-center justify-center text-lg">
                                🦊
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
