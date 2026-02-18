import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, Award, Clock, Zap, Target,
    BarChart3, Activity, Star, Calendar, ArrowUpRight,
    Map, ScrollText, BookOpen, Users, Code2, Globe, Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const data = [
    { name: 'Mon', xp: 400 }, { name: 'Tue', xp: 700 }, { name: 'Wed', xp: 1200 },
    { name: 'Thu', xp: 900 }, { name: 'Fri', xp: 1500 }, { name: 'Sat', xp: 1800 },
    { name: 'Sun', xp: 2100 },
];

const skillData = [
    { subject: 'Technical', A: 120, fullMark: 150 },
    { subject: 'Logic', A: 98, fullMark: 150 },
    { subject: 'Design', A: 86, fullMark: 150 },
    { subject: 'Speed', A: 99, fullMark: 150 },
    { subject: 'Soft Skills', A: 85, fullMark: 150 },
];

const Dashboard = () => {
    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2">
                <div>
                    <h1 className="text-4xl font-black text-white">Expedition <span className="text-gold">Analytics</span></h1>
                    <p className="text-text-secondary font-medium mt-1">Proof of your journey across the destiny islands.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-secondary px-6 text-sm flex items-center gap-2">
                        <Calendar size={18} /> Weekly Bounty
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                    { label: 'Total XP', val: '12,450', change: '+2.4k', icon: Zap, color: 'text-gold', bg: 'bg-gold/10' },
                    { label: 'Expedition Rank', val: 'Offer Hunter', change: 'Top 5%', icon: Award, color: 'text-rose', bg: 'bg-rose/10' },
                    { label: 'Focus Points', val: '342', change: '+12', icon: Target, color: 'text-grass', bg: 'bg-grass/10' },
                    { label: 'Active Streak', val: '12 Days', change: 'Steady', icon: Activity, color: 'text-sky', bg: 'bg-sky/10' },
                ].map((m, i) => (
                    <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        className="glass-card flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center mb-4 ${m.color}`}>
                            <m.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">{m.label}</p>
                        <h3 className="text-2xl font-black text-white leading-none mb-2">{m.val}</h3>
                        <span className="text-[10px] font-black text-grass px-2 py-0.5 bg-grass/10 rounded-full">{m.change}</span>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Performance Chart */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                    className="glass-card lg:col-span-2 p-8 relative overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-white flex items-center gap-2">
                                <TrendingUp size={22} className="text-grass" /> Growth Trajectory
                            </h3>
                            <p className="text-xs font-medium text-text-secondary italic">XP gathered during recent island raids</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="w-3 h-3 rounded-full bg-grass shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none">Forest XP</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(30, 41, 59, 0.95)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#F1F5F9', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="xp" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Skill Map */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                    className="glass-card p-8 flex flex-col justify-center items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 p-6 opacity-10 rotate-12 text-6xl">💎</div>
                    <div className="mb-6">
                        <h3 className="text-xl font-black text-white">Soul Essence</h3>
                        <p className="text-xs font-black text-grass uppercase tracking-wider">Skill Potential Radar</p>
                    </div>
                    <div className="h-[280px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }} />
                                <Radar name="Skills" dataKey="A" stroke="#22C55E" strokeWidth={3} fill="#22C55E" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-[11px] text-text-secondary mt-4 leading-relaxed font-bold italic">Gather more shards in <span className="text-sky">Concept Caverns</span> to broaden your soul essence.</p>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Activity Feed */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                    className="glass-card p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-white flex items-center gap-3">
                            <Activity size={22} className="text-rose" /> Expedition Log
                        </h3>
                        <button className="text-[10px] font-black text-gold uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { action: 'Slayed People Dragon', zone: 'Interview Arena', time: '2h ago', xp: 400, icon: <Users size={16} />, color: 'bg-rose text-white' },
                            { action: 'Forged Clarity Scroll', zone: 'Resume Island', time: '5h ago', xp: 200, icon: <ScrollText size={16} />, color: 'bg-grass text-white' },
                            { action: 'Gathered Concept Shard', zone: 'Concept Caverns', time: 'Yesterday', xp: 300, icon: <BookOpen size={16} />, color: 'bg-sky text-white' },
                            { action: 'Deciphered Login Rune', zone: 'Code Dungeon', time: '2 days ago', xp: 150, icon: <Code2 size={16} />, color: 'bg-amber text-white' },
                        ].map((log, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className={`w-10 h-10 rounded-2xl ${log.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    {log.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-black text-white leading-tight truncate">{log.action}</h4>
                                    <p className="text-[10px] font-black text-grass uppercase tracking-tighter mt-0.5">{log.zone} • <span className="text-text-muted">{log.time}</span></p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[11px] font-black text-gold bg-gold/10 border border-gold/20 px-2 py-1 rounded-lg">+{log.xp} XP</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Badges Cabinet */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
                    className="glass-card p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-white flex items-center gap-3">
                            <Star size={22} className="text-gold" /> Hall of Honor
                        </h3>
                        <button className="text-[10px] font-black text-gold uppercase tracking-widest hover:underline">Exchanges</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: 'Scroll Forge', desc: 'Resume Hero', icon: '📜', color: 'bg-grass/10' },
                            { name: 'Crystal Eye', desc: 'Concept Master', icon: '💎', color: 'bg-sky/10' },
                            { name: 'Dragon Bane', desc: 'Mock Slayer', icon: '🐉', color: 'bg-rose/10' },
                            { name: 'Rune King', desc: 'Code Master', icon: '🧩', color: 'bg-gold/10' },
                        ].map((badge, i) => (
                            <div key={i} className="p-5 rounded-3xl border border-white/10 flex items-center gap-4 hover:border-gold/30 hover:bg-white/5 transition-all group">
                                <div className="text-3xl group-hover:scale-110 transition-transform">{badge.icon}</div>
                                <div className="text-left">
                                    <h4 className="text-xs font-black text-white leading-none mb-1">{badge.name}</h4>
                                    <p className="text-[10px] font-black text-grass uppercase tracking-tighter">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-4 bg-gold/10 border-2 border-gold/20 rounded-2xl flex items-center justify-center gap-4 text-gold font-black text-sm">
                        <Sparkles size={20} className="animate-pulse" /> Complete FAANG Fortress to unlock the Elite Hall
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
