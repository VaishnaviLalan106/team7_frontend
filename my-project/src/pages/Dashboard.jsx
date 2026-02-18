import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Trophy, Target, Zap, CheckCircle2, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const weeklyData = [
    { day: 'Mon', score: 65 }, { day: 'Tue', score: 72 }, { day: 'Wed', score: 68 },
    { day: 'Thu', score: 80 }, { day: 'Fri', score: 75 }, { day: 'Sat', score: 88 }, { day: 'Sun', score: 82 },
];

const heatmapData = [
    { skill: 'React', level: 85, color: 'from-emerald to-teal-400' },
    { skill: 'Node.js', level: 72, color: 'from-purple to-violet-400' },
    { skill: 'SQL', level: 55, color: 'from-gold to-amber' },
    { skill: 'DSA', level: 40, color: 'from-coral to-red-400' },
    { skill: 'System Design', level: 30, color: 'from-blue-400 to-cyan-400' },
];

const activity = [
    { action: 'Cleared Concept Caverns', xp: '+150 XP', time: '2h ago', icon: '🧠' },
    { action: 'Resume forged on Island', xp: '+200 XP', time: '5h ago', icon: '🏝' },
    { action: 'Arena Round 1 won', xp: '+200 XP', time: '1d ago', icon: '⚔️' },
    { action: 'Code Dungeon puzzle solved', xp: '+100 XP', time: '2d ago', icon: '🧩' },
];

const badges = [
    { name: 'Scroll Forger', icon: '📜' }, { name: 'Crystal Hunter', icon: '💎' },
    { name: 'Arena Fighter', icon: '⚔️' }, { name: 'Code Explorer', icon: '🧩' },
];

const Dashboard = () => {
    const metrics = [
        { label: 'Resume Match', value: '78%', icon: Target, color: 'text-gold', bg: 'bg-gold/10', border: 'border-gold/20' },
        { label: 'Total XP', value: '2,450', icon: Trophy, color: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/20' },
        { label: 'Day Streak', value: '5', icon: Flame, color: 'text-amber', bg: 'bg-amber/10', border: 'border-amber/20' },
        { label: 'Offer Ready', value: '62%', icon: TrendingUp, color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/20' },
    ];

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-black mb-1">Dashboard</h1><p className="text-text-secondary text-sm">Your career adventure analytics.</p></div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}
                        className={`glass-card ${m.border} border`}
                    >
                        <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center ${m.color} mb-4`}><m.icon size={20} /></div>
                        <div className="text-2xl font-black mb-0.5">{m.value}</div>
                        <div className="text-xs text-text-muted font-semibold">{m.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-card">
                    <h3 className="font-bold text-lg mb-4">Weekly Performance</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={weeklyData}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#FBBF24" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '12px', color: '#F1F5F9', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="score" stroke="#FBBF24" strokeWidth={2.5} fill="url(#colorScore)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card">
                    <h3 className="font-bold text-lg mb-4">Badges Earned</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {badges.map((b, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 p-3 bg-navy rounded-xl border border-border/30">
                                <span className="text-2xl">{b.icon}</span>
                                <span className="text-[10px] font-bold text-text-muted text-center">{b.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card">
                    <h3 className="font-bold text-lg mb-5">Skill Heatmap</h3>
                    <div className="space-y-4">
                        {heatmapData.map((s, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1"><span className="font-semibold">{s.skill}</span><span className="text-text-muted font-bold">{s.level}%</span></div>
                                <div className="w-full bg-navy h-2.5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 1, delay: 0.3 + i * 0.1 }} className={`h-full bg-gradient-to-r ${s.color} rounded-full`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card">
                    <h3 className="font-bold text-lg mb-5">Recent Activity</h3>
                    <div className="space-y-4">
                        {activity.map((a, i) => (
                            <div key={i} className="flex items-center gap-4 py-2 border-b border-border/20 last:border-0">
                                <span className="text-xl">{a.icon}</span>
                                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{a.action}</p><p className="text-xs text-text-muted">{a.time}</p></div>
                                <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-1 rounded-md whitespace-nowrap">{a.xp}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
