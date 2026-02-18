import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Target, TrendingUp, Trophy, Zap, Shield, Lock, CheckCircle2 } from 'lucide-react';

const FinalTemple = () => {
    const readiness = 62;
    const confidence = 72;
    const skillsReady = readiness >= 70;
    const mockReady = confidence >= 70;
    const streakReady = true;
    const allReady = skillsReady && mockReady && streakReady;

    const skills = [
        { name: 'React', score: 85 }, { name: 'Node.js', score: 72 },
        { name: 'SQL', score: 55 }, { name: 'DSA', score: 40 },
        { name: 'System Design', score: 30 }, { name: 'Behavioral', score: 68 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-2xl">👑</span><h1 className="text-2xl font-black">Final Offer Temple</h1></div>
                <p className="text-text-secondary text-sm">The golden summit. Complete all requirements to unlock your career destiny.</p>
            </div>

            {/* Gate status */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className={`glass-card text-center ${allReady ? 'zone-complete' : ''}`}
            >
                <div className="text-5xl mb-4">{allReady ? '🏆' : '🔒'}</div>
                <h2 className="text-2xl font-black mb-2">{allReady ? 'Temple Unlocked!' : 'Gate Sealed'}</h2>
                <p className="text-text-secondary text-sm mb-6">{allReady ? 'You have proven yourself worthy.' : 'Meet all requirements to enter.'}</p>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                    {[
                        { label: 'Skill Score ≥ 70%', met: skillsReady, value: `${readiness}%`, icon: Target },
                        { label: 'Mock Score ≥ 70%', met: mockReady, value: `${confidence}%`, icon: Shield },
                        { label: '5+ Day Streak', met: streakReady, value: '5 Days', icon: Zap },
                    ].map((r, i) => (
                        <div key={i} className={`p-4 rounded-xl border ${r.met ? 'border-emerald/30 bg-emerald/5' : 'border-coral/30 bg-coral/5'}`}>
                            <r.icon size={20} className={`mx-auto mb-2 ${r.met ? 'text-emerald' : 'text-coral'}`} />
                            <div className={`text-lg font-black ${r.met ? 'text-emerald' : 'text-coral'}`}>{r.value}</div>
                            <div className="text-[10px] text-text-muted font-medium mt-1">{r.label}</div>
                            {r.met ? <CheckCircle2 size={14} className="text-emerald mx-auto mt-2" /> : <Lock size={14} className="text-coral mx-auto mt-2" />}
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Readiness Score */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-6">Offer Readiness</h3>
                    <div className="relative w-36 h-36 mb-4">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="8" />
                            <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round"
                                initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (264 * readiness) / 100 }}
                                transition={{ duration: 1.5, delay: 0.5 }} strokeDasharray="264" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-black text-gold">{readiness}%</span>
                        </div>
                    </div>
                    <p className="text-xs text-text-muted">Overall career readiness</p>
                </motion.div>

                {/* Confidence */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card flex flex-col items-center">
                    <h3 className="font-bold text-lg mb-6">Confidence Score</h3>
                    <div className="relative w-36 h-36 mb-4">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="8" />
                            <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round"
                                initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (264 * confidence) / 100 }}
                                transition={{ duration: 1.5, delay: 0.5 }} strokeDasharray="264" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-black text-purple">{confidence}%</span>
                        </div>
                    </div>
                    <p className="text-xs text-text-muted">AI-assessed interview confidence</p>
                </motion.div>
            </div>

            {/* Skill Radar (bars) */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card">
                <h3 className="font-bold text-lg mb-5">Skill Radar</h3>
                <div className="space-y-4">
                    {skills.map((s, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-semibold">{s.name}</span>
                                <span className="text-text-muted font-bold">{s.score}%</span>
                            </div>
                            <div className="w-full bg-navy h-2.5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                                    className={`h-full rounded-full ${s.score >= 70 ? 'bg-gradient-to-r from-emerald to-teal-400' : s.score >= 40 ? 'bg-gradient-to-r from-gold to-amber' : 'bg-gradient-to-r from-coral to-red-400'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Career Rank */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card text-center">
                <Crown size={32} className="text-gold mx-auto mb-3" />
                <h3 className="text-xl font-black text-gold mb-1">Elite Candidate</h3>
                <p className="text-sm text-text-secondary">Level 8 • 2,450 XP • 5 Day Streak</p>
            </motion.div>
        </div>
    );
};

export default FinalTemple;
