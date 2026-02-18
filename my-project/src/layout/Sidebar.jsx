import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, LayoutDashboard, Palmtree, Brain, Swords, Castle, Code2, Crown, User, Lock } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const zones = [
        { icon: Map, label: 'Treasure Map', path: '/', unlocked: true },
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', unlocked: true },
        { icon: Palmtree, label: 'Resume Island', path: '/resume-island', unlocked: true },
        { icon: Brain, label: 'Concept Caverns', path: '/concept-caverns', unlocked: true },
        { icon: Swords, label: 'Interview Arena', path: '/interview-arena', unlocked: true },
        { icon: Code2, label: 'Code Dungeon', path: '/code-dungeon', unlocked: true },
        { icon: Castle, label: 'Company Fortress', path: '/company-fortress', unlocked: true },
        { icon: Crown, label: 'Offer Temple', path: '/final-temple', unlocked: false },
        { icon: User, label: 'Profile', path: '/profile', unlocked: true },
    ];

    const mobileItems = zones.filter(z => ['/', '/dashboard', '/resume-island', '/interview-arena', '/profile'].includes(z.path));

    return (
        <>
            <aside className="w-60 bg-navy-light/50 backdrop-blur-sm border-r border-border/30 hidden lg:flex flex-col py-6 px-3 gap-1">
                {zones.map((z) => {
                    const isActive = location.pathname === z.path;
                    return (
                        <Link key={z.path} to={z.unlocked ? z.path : '#'}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${!z.unlocked ? 'opacity-30 cursor-not-allowed border-transparent' :
                                    isActive ? 'bg-gold/10 text-gold border-gold/20' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary border-transparent'
                                }`}
                        >
                            {z.unlocked ? <z.icon size={18} /> : <Lock size={18} />}
                            <span>{z.label}</span>
                        </Link>
                    );
                })}
            </aside>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-xl border-t border-border/50">
                <div className="flex justify-around py-2">
                    {mobileItems.map((z) => {
                        const isActive = location.pathname === z.path;
                        return (
                            <Link key={z.path} to={z.path}
                                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${isActive ? 'text-gold' : 'text-text-muted'}`}
                            >
                                <z.icon size={20} />
                                <span className="text-[10px] font-semibold">{z.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
