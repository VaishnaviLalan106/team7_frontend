import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Flame, Shield, Zap, Sparkles, ChevronRight, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const XPBar = () => {
    const stats = {
        level: 8,
        xp: 2450,
        nextXp: 3000,
        streak: 5,
        rank: 'Elite Adventurer'
    };

    const progress = (stats.xp / stats.nextXp) * 100;

    return (
        <div className="flex items-center gap-4 lg:gap-6 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-xl">
                <Flame size={14} className="text-gold fill-gold" />
                <span className="text-xs font-black text-gold uppercase tracking-widest">{stats.streak} DAYS</span>
            </div>

            <div className="flex flex-col gap-1 min-w-[120px] lg:min-w-[180px]">
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-1.5">
                        <Sparkles size={12} className="text-gold" />
                        <span className="text-[10px] font-black text-white/80 uppercase tracking-tighter">LVL {stats.level} • {stats.rank}</span>
                    </div>
                    <span className="text-[9px] font-black text-text-muted">{stats.xp} / {stats.nextXp} XP</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5 p-[1px]">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-grass to-gold rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-white/30 opacity-30"></div>
                    </motion.div>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 group cursor-help">
                <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy-deep transition-all">
                    <Trophy size={16} />
                </div>
            </div>
        </div>
    );
};

export default XPBar;
