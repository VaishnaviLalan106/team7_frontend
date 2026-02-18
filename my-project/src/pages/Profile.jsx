import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Flame, Zap, Target, Shield, Star, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const historyData = [
    { week: 'W1', score: 45 }, { week: 'W2', score: 55 }, { week: 'W3', score: 62 },
    { week: 'W4', score: 68 }, { week: 'W5', score: 75 }, { week: 'W6', score: 82 },
];

const achievements = [
    { name: 'Scroll Forger', desc: 'Completed Resume Island', icon: '📜', earned: true },
    { name: 'Crystal Hunter', desc: 'Cleared 3 Concept chambers', icon: '💎', earned: true },
    { name: 'Arena Champion', desc: 'Defeated Interview boss', icon: '⚔️', earned: true },
    { name: 'Dungeon Master', desc: 'Perfect Code Dungeon run', icon: '🧩', earned: false },
    { name: 'Fortress Guard', desc: 'Conquered all companies', icon: '🏰', earned: false },
    { name: 'Offer Hunter', desc: 'Unlocked Final Temple', icon: '👑', earned: false },
];

const skills = [
    { name: 'React', level: 85, color: 'from-emerald to-teal-400' },
    { name: 'Node.js', level: 72, color: 'from-purple to-violet-400' },
    { name: 'DSA', level: 40, color: 'from-coral to-red-400' },
    { name: 'SQL', level: 55, color: 'from-gold to-amber' },
];

const Profile = () => (
    <div className="space-y-6">
        {/* Profile Header */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-amber flex items-center justify-center text-navy text-3xl font-black flex-shrink-0">A</div>
            <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-black">Adventurer</h1>
                <p className="text-text-secondary text-sm">Career Treasure Hunter</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg text-xs font-bold text-gold"><Crown size={14} /> Level 8</span>
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-purple/10 border border-purple/20 rounded-lg text-xs font-bold text-purple"><Zap size={14} /> 2,450 XP</span>
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-amber/10 border border-amber/20 rounded-lg text-xs font-bold text-amber"><Flame size={14} /> 5 Streak</span>
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-emerald/10 border border-emerald/20 rounded-lg text-xs font-bold text-emerald"><Target size={14} /> 62% Ready</span>
                </div>
            </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
            {/* Achievements */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card">
                <h3 className="font-bold text-lg mb-5">Achievements</h3>
                <div className="grid grid-cols-2 gap-3">
                    {achievements.map((a, i) => (
                        <div key={i} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${a.earned ? 'border-gold/20 bg-gold/5' : 'border-border/20 bg-navy opacity-40'}`}>
                            <span className="text-2xl">{a.icon}</span>
                            <span className="text-xs font-bold text-center">{a.name}</span>
                            <span className="text-[10px] text-text-muted text-center">{a.desc}</span>
                            {a.earned && <CheckCircle2 size={14} className="text-gold" />}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Performance History */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card">
                <h3 className="font-bold text-lg mb-5">Performance History</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={historyData}>
                        <defs>
                            <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#FBBF24" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '12px', color: '#F1F5F9', fontSize: '12px' }} />
                        <Area type="monotone" dataKey="score" stroke="#FBBF24" strokeWidth={2.5} fill="url(#histGrad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </div>

        {/* Skills */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card">
            <h3 className="font-bold text-lg mb-5">Skill Arsenal</h3>
            <div className="space-y-4">
                {skills.map((s, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1"><span className="font-semibold">{s.name}</span><span className="text-text-muted font-bold">{s.level}%</span></div>
                        <div className="w-full bg-navy h-2.5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.1 }} className={`h-full bg-gradient-to-r ${s.color} rounded-full`} />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    </div>
);

export default Profile;
