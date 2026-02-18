import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, ChevronRight, Sparkles, Gift, Flame, Zap, X } from 'lucide-react';

const zones = [
    {
        id: 'resume', name: '🏝 Resume Island', subtitle: 'Clarity Scroll', desc: 'Upload & forge your resume against any job description',
        path: '/resume-island', progress: 85, unlocked: true, completed: false, color: 'from-amber-400 to-yellow-500', xp: 200,
        pos: { top: '12%', left: '8%' }
    },
    {
        id: 'concept', name: '🧠 Concept Caverns', subtitle: 'Crystal Chambers', desc: 'Master concepts through combat, rapid-fire & deep explanations',
        path: '/concept-caverns', progress: 60, unlocked: true, completed: false, color: 'from-purple to-violet-400', xp: 300,
        pos: { top: '5%', left: '42%' }
    },
    {
        id: 'arena', name: '⚔️ Interview Arena', subtitle: 'Stone Colosseum', desc: 'Face AI interviewers in boss-fight interview rounds',
        path: '/interview-arena', progress: 30, unlocked: true, completed: false, color: 'from-coral to-red-400', xp: 400,
        pos: { top: '18%', left: '72%' }
    },
    {
        id: 'dungeon', name: '🧩 Code Dungeon', subtitle: 'Crystal Cave', desc: 'Fix bugs, complete functions, solve logic puzzles',
        path: '/code-dungeon', progress: 15, unlocked: true, completed: false, color: 'from-blue-400 to-cyan-400', xp: 350,
        pos: { top: '52%', left: '5%' }
    },
    {
        id: 'fortress', name: '🏰 Company Fortress', subtitle: 'Castle Heights', desc: 'Company-specific mock interviews — FAANG, Startups, and more',
        path: '/company-fortress', progress: 0, unlocked: true, completed: false, color: 'from-emerald to-teal-400', xp: 500,
        pos: { top: '48%', left: '65%' }
    },
    {
        id: 'temple', name: '👑 Final Offer Temple', subtitle: 'Golden Summit', desc: 'Your ultimate career readiness assessment awaits',
        path: '/final-temple', progress: 0, unlocked: false, completed: false, color: 'from-gold to-amber-300', xp: 1000,
        pos: { top: '38%', left: '38%' }
    },
];

const pathsBetween = [
    { from: 'resume', to: 'concept', d: 'M 18 22 Q 30 5, 48 15' },
    { from: 'concept', to: 'arena', d: 'M 52 15 Q 62 8, 78 28' },
    { from: 'resume', to: 'dungeon', d: 'M 15 28 Q 8 40, 12 58' },
    { from: 'arena', to: 'fortress', d: 'M 78 32 Q 75 45, 72 55' },
    { from: 'dungeon', to: 'temple', d: 'M 18 62 Q 28 52, 44 48' },
    { from: 'fortress', to: 'temple', d: 'M 68 58 Q 58 52, 48 48' },
];

const DailyQuest = ({ onClose }) => (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
        <div className="glass-card max-w-md w-full text-center relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-text-primary"><X size={18} /></button>
            <div className="text-5xl mb-4 animate-chest">🎁</div>
            <h2 className="text-xl font-black mb-2">Daily Treasure Quest</h2>
            <p className="text-sm text-text-secondary mb-6">Complete today's challenges to earn XP and keep your streak alive!</p>
            <div className="space-y-3 text-left mb-6">
                {[
                    { task: '5 Rapid-fire concept questions', xp: 50, done: false },
                    { task: '1 Behavioral question', xp: 30, done: false },
                    { task: '1 Coding challenge', xp: 80, done: false },
                ].map((q, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-navy">
                        <div className="w-6 h-6 rounded-full border-2 border-gold/30 flex-shrink-0"></div>
                        <span className="text-sm font-medium flex-1">{q.task}</span>
                        <span className="text-xs font-bold text-gold">+{q.xp} XP</span>
                    </div>
                ))}
            </div>
            <Link to="/concept-caverns" onClick={onClose} className="btn-primary inline-flex items-center gap-2">
                <Sparkles size={16} /> Start Quest
            </Link>
        </div>
    </motion.div>
);

const CareerMap = () => {
    const [showQuest, setShowQuest] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const p = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 4,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 6,
        }));
        setParticles(p);
    }, []);

    return (
        <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
            {/* Fog overlays */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy/80 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/80 to-transparent z-10"></div>
                <div className="absolute top-10 left-[10%] w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[100px] animate-drift"></div>
                <div className="absolute bottom-20 right-[15%] w-[400px] h-[400px] bg-purple/[0.04] rounded-full blur-[100px] animate-drift" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/[0.02] rounded-full blur-[120px]"></div>
            </div>

            {/* Floating particles */}
            {particles.map(p => (
                <motion.div key={p.id}
                    className="absolute rounded-full bg-gold/20 pointer-events-none"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                    animate={{ y: [-10, 10, -10], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
                />
            ))}

            <div className="relative z-10 max-w-6xl mx-auto py-6 px-2">
                {/* Header */}
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-3">
                        <Sparkles size={12} className="text-gold" />
                        <span className="text-[11px] font-bold text-gold tracking-wide uppercase">Career Treasure Hunt</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black">Your Adventure Awaits</h1>
                    <p className="text-text-secondary text-sm mt-2 max-w-md mx-auto">Navigate the world. Conquer each zone. Claim the Final Offer.</p>
                </motion.div>

                {/* Daily Quest Button */}
                <motion.button onClick={() => setShowQuest(true)}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                    className="fixed top-24 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold font-bold text-sm animate-glow hover:bg-gold/20 transition-all"
                >
                    <Gift size={18} className="animate-chest" /> Daily Quest
                </motion.button>

                {/* SVG Map Canvas */}
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                    {/* SVG Paths */}
                    <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 75" preserveAspectRatio="none">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="0.5" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                        </defs>
                        {pathsBetween.map((p, i) => (
                            <g key={i}>
                                <path d={p.d} fill="none" stroke="#33415530" strokeWidth="0.3" strokeDasharray="1,0.5" />
                                <motion.path d={p.d} fill="none" stroke="#FBBF2430" strokeWidth="0.2" strokeDasharray="0.5,1"
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                                    filter="url(#glow)"
                                />
                            </g>
                        ))}
                    </svg>

                    {/* Zone Nodes */}
                    {zones.map((zone, i) => (
                        <motion.div key={zone.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200 }}
                            className="absolute z-10"
                            style={{ top: zone.pos.top, left: zone.pos.left, width: 'clamp(140px, 28%, 220px)' }}
                        >
                            {zone.unlocked ? (
                                <Link to={zone.path} className="block group">
                                    <div className={`glass-card-hover p-4 ${zone.completed ? 'zone-complete' : ''}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">{zone.name.split(' ')[0]}</span>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold group-hover:text-gold transition-colors leading-tight">
                                                    {zone.name.split(' ').slice(1).join(' ')}
                                                </h3>
                                                <p className="text-[10px] text-text-muted font-medium">{zone.subtitle}</p>
                                            </div>
                                            <ChevronRight size={14} className="text-text-muted group-hover:text-gold transition-colors" />
                                        </div>
                                        <p className="text-[11px] text-text-secondary mb-3 leading-relaxed">{zone.desc}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-navy h-1.5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${zone.progress}%` }}
                                                    transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }}
                                                    className={`h-full bg-gradient-to-r ${zone.color} rounded-full`}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-text-muted">{zone.progress}%</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-[10px] font-bold text-gold flex items-center gap-1"><Zap size={10} /> +{zone.xp} XP</span>
                                            {zone.completed && <span className="text-[10px] font-bold text-emerald flex items-center gap-1"><CheckCircle2 size={10} /> Clear</span>}
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="glass-card p-4 zone-locked">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Lock size={16} className="text-text-muted" />
                                        <h3 className="text-sm font-bold text-text-muted">{zone.name.split(' ').slice(1).join(' ')}</h3>
                                    </div>
                                    <p className="text-[11px] text-text-muted">{zone.desc}</p>
                                    <p className="text-[10px] text-text-muted mt-2 font-bold">🔒 Complete all zones to unlock</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Daily Quest Modal */}
            <AnimatePresence>{showQuest && <DailyQuest onClose={() => setShowQuest(false)} />}</AnimatePresence>
        </div>
    );
};

export default CareerMap;
