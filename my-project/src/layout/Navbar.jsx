import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Bell, Sparkles, Flame } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const location = useLocation();
    const { user } = useUser();
    const [showNotifications, setShowNotifications] = React.useState(false);

    const notifications = [
        {
            id: 1, type: 'reward', title: 'Roadmap Generated!',
            desc: 'Nova AI has finished forging your custom learning path.',
            time: '2m ago', icon: '📚', color: 'emerald'
        },
        {
            id: 2, type: 'arena', title: 'New Arena Unlock',
            desc: 'System Design Fortress is now open for your expedition.',
            time: '1h ago', icon: '⚔️', color: 'rose'
        },
        {
            id: 3, type: 'streak', title: 'Streak Milestone',
            desc: '5-Day explorer streak! You earned a +50 XP bonus.',
            time: '3h ago', icon: '🔥', color: 'gold'
        },
    ];

    return (
        <nav className="h-16 bg-navy/80 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50 px-4 md:px-6">
            <div className="h-full flex items-center justify-between gap-4">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                    <div className="bg-gradient-to-br from-grass to-forest p-2 rounded-xl shadow-lg shadow-grass/20 group-hover:rotate-12 transition-all">
                        <Compass className="text-white" size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl text-white tracking-tighter italic leading-none">Prep<span className="text-gold">Nova</span></span>
                        <span className="text-[8px] font-black text-grass tracking-[0.15em] uppercase leading-none mt-0.5">Expedition</span>
                    </div>
                </Link>

                {/* Center nav pills */}
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

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Streak */}
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
                            <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-grass to-gold rounded-full" />
                        </div>
                    </div>

                    {/* Notification */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`w-8 h-8 rounded-lg border transition-all relative flex items-center justify-center
                                ${showNotifications
                                    ? 'bg-gold/10 border-gold/30 text-gold shadow-lg shadow-gold/10'
                                    : 'bg-white/5 border-white/10 text-text-muted hover:text-gold hover:border-gold/30'}`}
                        >
                            <Bell size={14} />
                            {!showNotifications && (
                                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full animate-pulse" />
                            )}
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <>
                                    {/* Backdrop for closing */}
                                    <div className="fixed inset-0 z-0" onClick={() => setShowNotifications(false)} />

                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-12 right-0 w-80 bg-navy/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl p-6 z-50 overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-sunlight to-gold"></div>

                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-sm font-black text-white italic tracking-tight">Expedition <span className="text-gold">Alerts</span></h3>
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{notifications.length} New</span>
                                        </div>

                                        <div className="space-y-4">
                                            {notifications.map((n) => (
                                                <motion.div
                                                    key={n.id}
                                                    whileHover={{ x: 5 }}
                                                    className="flex gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer group"
                                                >
                                                    <div className={`w-10 h-10 rounded-xl bg-${n.color}-500/10 flex items-center justify-center text-xl shrink-0 border border-${n.color}-500/20 group-hover:scale-110 transition-transform shadow-lg shadow-${n.color}-500/5`}>
                                                        {n.icon}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-xs font-bold text-white group-hover:text-gold transition-colors">{n.title}</h4>
                                                            <span className="text-[9px] text-text-muted font-bold whitespace-nowrap">{n.time}</span>
                                                        </div>
                                                        <p className="text-[10px] text-text-muted leading-relaxed line-clamp-2">{n.desc}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <button className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all">
                                            Dismiss All Scrolls
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Avatar from context */}
                    <Link to="/profile" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sunlight to-gold p-[2px] shadow-md group-hover:scale-105 transition-all">
                            <div className="w-full h-full rounded-[10px] overflow-hidden bg-navy flex items-center justify-center text-lg">
                                {user.avatar}
                            </div>
                        </div>
                        <span className="hidden xl:block text-xs font-bold text-white/80 truncate max-w-[80px]">{user.displayName}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
