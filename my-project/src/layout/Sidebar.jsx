import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Compass, Map as MapIcon, LayoutDashboard, User,
    ScrollText, Users, Globe, Code2,
    Lock, CheckCircle2, Trophy, Sparkles, BookOpen,
    ChevronLeft, ChevronRight, Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const zones = [
    { id: 'resume', name: 'Resume Island', icon: ScrollText, path: '/resume-island', unlocked: true, completed: false },
    { id: 'concept', name: 'Concept Caverns', icon: BookOpen, path: '/concept-caverns', unlocked: true, completed: false },
    { id: 'arena', name: 'Interview Arena', icon: Users, path: '/interview-arena', unlocked: true, completed: false },
    { id: 'dungeon', name: 'Code Dungeon', icon: Code2, path: '/code-dungeon', unlocked: true, completed: false },
    { id: 'fortress', name: 'Company Fortress', icon: Globe, path: '/company-fortress', unlocked: true, completed: false },
    { id: 'temple', name: 'Final Temple', icon: Trophy, path: '/final-temple', unlocked: false, completed: false },
];

const Sidebar = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(true);

    const width = collapsed ? 'w-[72px]' : 'w-64';

    return (
        <motion.aside
            className={`${width} bg-navy/50 backdrop-blur-2xl border-r border-white/10 h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex flex-col py-6 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out z-30`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="mx-auto mb-6 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-gold hover:bg-white/10 transition-all shrink-0"
            >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className="space-y-8 flex-1">
                {/* Main Nav */}
                <div className={collapsed ? 'px-3' : 'px-4'}>
                    {!collapsed && <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4 pl-2">Outpost</h3>}
                    <div className="space-y-1.5">
                        {[
                            { name: 'World Map', path: '/', icon: MapIcon },
                            { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                            { name: 'Profile', path: '/profile', icon: User },
                        ].map((item) => (
                            <Link key={item.name} to={item.path}
                                className={`flex items-center gap-3 rounded-xl text-sm font-bold transition-all group relative
                                    ${collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'}
                                    ${location.pathname === item.path
                                        ? 'bg-grass/20 text-grass'
                                        : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}
                                title={collapsed ? item.name : undefined}
                            >
                                <item.icon size={18} className={location.pathname === item.path ? 'text-gold' : 'text-text-muted group-hover:text-grass transition-colors'} />
                                {!collapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Expedition Zones */}
                <div className={collapsed ? 'px-3' : 'px-4'}>
                    {!collapsed && (
                        <div className="flex items-center justify-between mb-4 pl-2">
                            <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Zones</h3>
                            <Sparkles size={12} className="text-gold" />
                        </div>
                    )}
                    {collapsed && <div className="h-px bg-white/10 mb-4" />}
                    <div className="space-y-1.5">
                        {zones.map((zone) => (
                            <Link key={zone.id} to={zone.unlocked ? zone.path : '#'}
                                className={`flex items-center gap-3 rounded-xl text-sm font-bold transition-all group relative
                                    ${collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'}
                                    ${location.pathname === zone.path
                                        ? 'bg-white/10 text-white'
                                        : zone.unlocked
                                            ? 'text-text-secondary hover:bg-white/5 hover:text-white'
                                            : 'opacity-30 cursor-not-allowed text-text-muted'}`}
                                title={collapsed ? zone.name : undefined}
                            >
                                <div className={`p-1.5 rounded-lg transition-all shrink-0
                                    ${location.pathname === zone.path
                                        ? 'bg-grass text-white'
                                        : 'bg-white/5 text-text-muted group-hover:bg-grass/20 group-hover:text-grass'}`}
                                >
                                    <zone.icon size={14} />
                                </div>
                                {!collapsed && (
                                    <>
                                        <span className="truncate flex-1">{zone.name}</span>
                                        <div className="shrink-0">
                                            {zone.completed ? (
                                                <CheckCircle2 size={14} className="text-grass" />
                                            ) : !zone.unlocked ? (
                                                <Lock size={14} className="text-text-muted" />
                                            ) : (
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                            )}
                                        </div>
                                    </>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Rank */}
            {!collapsed && (
                <div className="mt-auto pt-6 px-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Rank</span>
                            <span className="text-[9px] font-black text-gold bg-gold/10 px-1.5 py-0.5 rounded">ELITE</span>
                        </div>
                        <div className="text-xs font-black text-white mb-3 flex items-center gap-1.5">
                            <Trophy size={14} className="text-gold" />
                            Offer Hunter
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-grass w-[62%] rounded-full" />
                        </div>
                    </div>
                </div>
            )}
        </motion.aside>
    );
};

export default Sidebar;
