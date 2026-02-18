import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, ChevronRight, Sparkles, Gift, Zap, X } from 'lucide-react';

const zones = [
    {
        id: 'resume', name: 'Resume Island', subtitle: 'Forge your clarity scroll',
        path: '/resume-island', progress: 85, unlocked: true, completed: false,
        gradient: 'from-emerald-400 to-green-600', xp: 200,
        icon: '📜', accent: '#22C55E',
    },
    {
        id: 'concept', name: 'Concept Caverns', subtitle: 'Master the crystal chambers',
        path: '/concept-caverns', progress: 60, unlocked: true, completed: false,
        gradient: 'from-sky-400 to-blue-600', xp: 300,
        icon: '💎', accent: '#38BDF8',
    },
    {
        id: 'arena', name: 'Interview Arena', subtitle: 'Battle the stone colosseum',
        path: '/interview-arena', progress: 30, unlocked: true, completed: false,
        gradient: 'from-rose-400 to-pink-600', xp: 400,
        icon: '⚔️', accent: '#FB7185',
    },
    {
        id: 'dungeon', name: 'Code Dungeon', subtitle: 'Decode the ancient runes',
        path: '/code-dungeon', progress: 15, unlocked: true, completed: false,
        gradient: 'from-amber-400 to-orange-600', xp: 350,
        icon: '🧩', accent: '#FBBF24',
    },
    {
        id: 'fortress', name: 'Company Fortress', subtitle: 'Storm the castle heights',
        path: '/company-fortress', progress: 0, unlocked: true, completed: false,
        gradient: 'from-violet-400 to-purple-600', xp: 500,
        icon: '🏰', accent: '#A78BFA',
    },
    {
        id: 'temple', name: 'Final Offer Temple', subtitle: 'Claim the golden crown',
        path: '/final-temple', progress: 0, unlocked: false, completed: false,
        gradient: 'from-yellow-400 to-amber-600', xp: 1000,
        icon: '👑', accent: '#F59E0B', special: true,
    },
];

/* ── Winding path SVG between nodes ── */
const WindingPath = ({ index, accent, progress }) => {
    const isLeft = index % 2 === 0; // even = left side, odd = right side

    return (
        <div className="relative h-28 w-full flex items-center justify-center">
            <svg width="280" height="112" viewBox="0 0 280 112" fill="none" className="overflow-visible">
                <defs>
                    <linearGradient id={`pathGrad-${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0.15" />
                    </linearGradient>
                </defs>
                {/* Background trail */}
                <path
                    d={isLeft
                        ? "M 70 0 C 70 40, 210 40, 210 112"
                        : "M 210 0 C 210 40, 70 40, 70 112"}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Glowing active path */}
                <motion.path
                    d={isLeft
                        ? "M 70 0 C 70 40, 210 40, 210 112"
                        : "M 210 0 C 210 40, 70 40, 70 112"}
                    stroke={`url(#pathGrad-${index})`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.3, ease: 'easeInOut' }}
                />
                {/* Traveling dot */}
                {progress > 0 && (
                    <motion.circle
                        r="4"
                        fill={accent}
                        filter={`drop-shadow(0 0 6px ${accent})`}
                        animate={{
                            offsetDistance: ['0%', '100%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        style={{
                            offsetPath: `path("${isLeft
                                ? 'M 70 0 C 70 40, 210 40, 210 112'
                                : 'M 210 0 C 210 40, 70 40, 70 112'}")`,
                        }}
                    />
                )}
            </svg>
        </div>
    );
};

/* ── Island node ── */
const IslandNode = ({ zone, index }) => {
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.15, type: 'spring', stiffness: 100 }}
            className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full max-w-2xl mx-auto`}
        >
            {zone.unlocked ? (
                <Link to={zone.path} className="block group w-[320px]">
                    <div className={`relative p-5 rounded-2xl border transition-all duration-300
                        bg-white/[0.03] border-white/10 backdrop-blur-sm
                        hover:bg-white/[0.07] hover:border-white/20 hover:shadow-xl hover:shadow-[${zone.accent}]/10
                        group-hover:scale-[1.02]`}
                    >
                        {/* Accent top border */}
                        <div className={`absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r ${zone.gradient} rounded-b opacity-50 group-hover:opacity-100 transition-opacity`} />

                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shrink-0
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                {zone.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className={`font-bold text-sm text-white group-hover:text-white transition-colors truncate ${zone.special ? 'text-gold' : ''}`}>
                                        {zone.name}
                                    </h3>
                                    {zone.special && <Sparkles size={12} className="text-gold animate-pulse shrink-0" />}
                                </div>
                                <p className="text-[11px] text-text-muted italic truncate">{zone.subtitle}</p>

                                {/* Progress */}
                                <div className="mt-3">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[10px] font-bold text-white/40">{zone.progress}%</span>
                                        <span className="text-[10px] font-bold text-gold/60 flex items-center gap-1">
                                            <Zap size={10} className="fill-gold/60" />+{zone.xp} XP
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${zone.progress}%` }}
                                            transition={{ duration: 1.2, delay: 0.5 + index * 0.15 }}
                                            className={`h-full bg-gradient-to-r ${zone.gradient} rounded-full`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="w-[320px] p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm opacity-50">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                            <Lock size={22} className="text-white/20" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-sm text-white/30">{zone.name}</h3>
                            <p className="text-[10px] text-white/15 font-bold uppercase tracking-wider mt-1">Locked</p>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

/* ── Explorer avatar (cute fox) ── */
const ExplorerAvatar = () => {
    const currentZoneIndex = [...zones].reverse().findIndex(z => z.progress > 0 && z.unlocked);
    const activeIndex = currentZoneIndex >= 0 ? zones.length - 1 - currentZoneIndex : 0;

    return (
        <motion.div
            className="absolute z-20 pointer-events-none"
            style={{
                top: `${activeIndex * 240 + 20}px`,
                left: activeIndex % 2 === 0 ? '12%' : '72%',
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
            <div className="relative">
                <span className="text-3xl block filter drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]">🦊</span>
                <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </motion.div>
    );
};

/* ── Background ── */
const MapBackground = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Radial glows */}
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-grass/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[15%] w-72 h-72 bg-sky/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[30%] w-56 h-56 bg-rose/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] right-[25%] w-80 h-80 bg-gold/5 rounded-full blur-[140px]" />
        {/* Stars */}
        {Array.from({ length: 30 }, (_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
        ))}
    </div>
);

/* ── Daily Quest Modal ── */
const QuestModal = ({ onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-navy border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
            onClick={e => e.stopPropagation()}
        >
            <div className="text-5xl mb-4">🎁</div>
            <h2 className="text-xl font-bold text-white mb-2">Daily Bounty</h2>
            <p className="text-sm text-text-secondary mb-6">Complete any zone activity to earn bonus XP today!</p>
            <div className="flex items-center justify-center gap-2 mb-6">
                <span className="px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg text-xs font-bold text-gold flex items-center gap-1">
                    <Zap size={12} className="fill-gold" /> +150 Bonus XP
                </span>
            </div>
            <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-grass to-emerald-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity">
                Start Exploring
            </button>
        </motion.div>
    </motion.div>
);

/* ── Main Component ── */
const CareerMap = () => {
    const [showQuest, setShowQuest] = useState(false);

    return (
        <div className="min-h-[calc(100vh-4rem)] relative bg-navy-deep">
            <MapBackground />

            <div className="relative z-10 max-w-4xl mx-auto py-10 px-4">
                {/* Header */}
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
                        <Sparkles size={14} className="text-gold animate-pulse" />
                        <span className="text-[10px] font-bold text-gold/80 tracking-widest uppercase">Career Expedition</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
                        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-sunlight to-gold">Adventure</span> Path
                    </h1>
                    <p className="text-text-muted text-sm max-w-md mx-auto">Follow the winding trail. Conquer each island. Claim the crown.</p>
                </motion.div>

                {/* Vertical Journey */}
                <div className="relative">
                    <ExplorerAvatar />

                    {zones.map((zone, i) => (
                        <div key={zone.id}>
                            <IslandNode zone={zone} index={i} />
                            {i < zones.length - 1 && (
                                <WindingPath index={i} accent={zones[i + 1].accent} progress={zone.progress} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Finish line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-center mt-8 py-6"
                >
                    <div className="text-3xl mb-2">🏁</div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Destiny Awaits</p>
                </motion.div>
            </div>

            {/* Daily Bounty FAB */}
            <motion.button onClick={() => setShowQuest(true)}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-8 right-8 z-[60] flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/15 text-white font-bold text-sm hover:bg-white/10 hover:border-gold/30 transition-all shadow-2xl"
            >
                <Gift size={18} className="text-gold" /> Bounty
            </motion.button>

            {/* Quest Modal */}
            <AnimatePresence>
                {showQuest && <QuestModal onClose={() => setShowQuest(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default CareerMap;
