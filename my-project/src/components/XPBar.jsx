import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Trophy } from 'lucide-react';

const ranks = ['Explorer', 'Strategist', 'Challenger', 'Elite Candidate', 'Offer Hunter'];

const XPBar = ({ xp = 2450, streak = 5, level = 8 }) => {
    const maxXP = level * 500;
    const pct = Math.min((xp % 500) / 500 * 100, 100);
    const rank = ranks[Math.min(Math.floor(level / 2), ranks.length - 1)];

    return (
        <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber/10 border border-amber/20">
                <Flame size={14} className="text-amber" />
                <span className="text-xs font-bold text-amber">{streak}</span>
            </div>

            {/* XP + Level */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20">
                <Zap size={14} className="text-gold" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gold leading-none">{xp} XP</span>
                    <div className="w-16 h-1 bg-navy rounded-full mt-1 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            className="h-full bg-gold rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Rank */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple/10 border border-purple/20">
                <Trophy size={14} className="text-purple" />
                <span className="text-[10px] font-bold text-purple">{rank}</span>
            </div>
        </div>
    );
};

export default XPBar;
