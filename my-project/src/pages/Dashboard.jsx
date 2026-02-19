import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {
    TrendingUp, Award, Clock, Zap, Target,
    BarChart3, Activity, Star, Calendar, ArrowUpRight,
    Map, ScrollText, BookOpen, Users, Code2, Globe, Sparkles,
    AlertTriangle, RefreshCw, Brain, Lock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line, BarChart, Bar } from 'recharts';
import { getAnalytics } from '../services/apiService';

// Initial empty states for charts
const initialXpData = [
    { name: 'Mon', xp: 0 }, { name: 'Tue', xp: 0 }, { name: 'Wed', xp: 0 },
    { name: 'Thu', xp: 0 }, { name: 'Fri', xp: 0 }, { name: 'Sat', xp: 0 },
    { name: 'Sun', xp: 0 },
];

const initialSkillData = [
    { subject: 'Technical', A: 0, fullMark: 150 },
    { subject: 'Logic', A: 0, fullMark: 150 },
    { subject: 'Design', A: 0, fullMark: 150 },
    { subject: 'Speed', A: 0, fullMark: 150 },
    { subject: 'Soft Skills', A: 0, fullMark: 150 },
];

const Dashboard = () => {
    const { user } = useUser();
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        if (user.hasCompletedOnboarding) {
            getAnalytics().then(setAnalytics).catch(() => {
                // Handle case where analytics might fail or be empty
                setAnalytics(null);
            });
        }
    }, [user.hasCompletedOnboarding]);

    const chartData = analytics?.performanceTrend?.map(p => ({
        name: p.date.split(' ')[1] || p.date,
        xp: p.score * 20 // Mocking some XP relation for visual
    })) || initialXpData;

    const currentSkillData = analytics?.scoreBreakdown?.map(s => ({
        subject: s.type,
        A: s.score,
        fullMark: 100
    })) || initialSkillData;

    if (!user.hasCompletedOnboarding) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full glass-card p-10 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-emerald-500/5 pointer-events-none"></div>
                    <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Lock size={40} className="text-gold" />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-3">Expedition Locked</h2>
                    <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                        To unveil your analytics and track your progress, you must first forge your <span className="text-gold italic">Clarity Scroll</span> in Resume Island.
                    </p>
                    <Link to="/resume-island" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                        <ScrollText size={18} /> Visit Resume Island
                    </Link>
                </motion.div>
            </div>
        );
    }

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
                    { label: 'Total XP', val: user.xp.toLocaleString() || '0', change: '+0', icon: Zap, color: 'text-gold', bg: 'bg-gold/10' },
                    { label: 'Tests Taken', val: analytics?.totalTests || '0', change: `Avg ${analytics?.avgScore || 0}%`, icon: Target, color: 'text-grass', bg: 'bg-grass/10' },
                    { label: 'Active Streak', val: `${user.streak || 0} Days`, change: 'On Fire', icon: Activity, color: 'text-rose', bg: 'bg-rose/10' },
                    { label: 'This Week', val: analytics?.testsThisWeek || '0', change: 'Tests', icon: Brain, color: 'text-sky', bg: 'bg-sky/10' },
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
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}`} />
                                <Tooltip contentStyle={{ background: 'rgba(30, 41, 59, 0.95)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#F1F5F9', fontSize: '12px', fontWeight: 'bold' }} />
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
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentSkillData}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 'bold' }} />
                                <Radar name="Skills" dataKey="A" stroke="#22C55E" strokeWidth={3} fill="#22C55E" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* ── AI ANALYTICS SECTION ── */}
            {analytics && (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Performance Trend */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
                        className="glass-card lg:col-span-2 p-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-white flex items-center gap-2">
                                <TrendingUp size={18} className="text-gold" /> Performance Trend
                            </h3>
                            <span className="text-[10px] text-text-muted uppercase tracking-wider">Last 6 weeks</span>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics.performanceTrend}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                                    <XAxis dataKey="date" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
                                    <Tooltip contentStyle={{ background: 'rgba(30, 41, 59, 0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#F1F5F9', fontSize: '11px', fontWeight: 'bold' }} />
                                    <Line type="monotone" dataKey="score" stroke="#FBBF24" strokeWidth={3} dot={{ fill: '#FBBF24', r: 4 }} activeDot={{ r: 6, stroke: '#FBBF24', strokeWidth: 2, fill: '#0F172A' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Score Breakdown */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                            <BarChart3 size={18} className="text-sky-400" /> Score Breakdown
                        </h3>
                        <div className="space-y-4">
                            {analytics.scoreBreakdown.map((item) => (
                                <div key={item.type}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-bold text-white">{item.type}</span>
                                        <span className="text-xs font-bold text-text-muted">{item.score}% ({item.total} tests)</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.score}%` }} transition={{ duration: 1, delay: 0.5 }}
                                            className={`h-full rounded-full ${item.score >= 80 ? 'bg-emerald-400' : item.score >= 60 ? 'bg-gold' : 'bg-rose-400'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Weak Areas + Revision */}
            {analytics && (
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Weak Areas */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                            <AlertTriangle size={18} className="text-rose-400" /> Weak Areas
                        </h3>
                        <div className="space-y-3">
                            {analytics.weakAreas.map((area, i) => (
                                <div key={area} className="flex items-center gap-3 p-3 bg-rose-500/5 rounded-xl border border-rose-500/10">
                                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-bold">{i + 1}</div>
                                    <span className="text-sm font-bold text-white">{area}</span>
                                    <span className="ml-auto text-[9px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded uppercase">Needs work</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Revision Suggestions */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                            <RefreshCw size={18} className="text-gold" /> Suggested Revisions
                        </h3>
                        <div className="space-y-3">
                            {analytics.revisionTopics.map((topic, i) => (
                                <div key={topic} className="flex items-center gap-3 p-3 bg-gold/5 rounded-xl border border-gold/10">
                                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                                        <BookOpen size={14} className="text-gold" />
                                    </div>
                                    <span className="text-sm font-bold text-white">{topic}</span>
                                    <span className="ml-auto text-[9px] font-bold text-gold bg-gold/10 px-2 py-1 rounded uppercase">Review</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

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
                        {analytics?.recentLogs?.length > 0 ? (
                            analytics.recentLogs.map((log, i) => (
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
                            ))
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-xs font-bold text-text-muted italic">"A thousand mile journey starts with a single step..."</p>
                                <p className="text-[10px] text-text-muted/50 mt-1 uppercase tracking-widest">Awaiting First Combat</p>
                            </div>
                        )}
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
                        {(user.achievements || []).map((badge, i) => (
                            <div key={i} className="p-5 rounded-3xl border border-white/10 flex items-center gap-4 hover:border-gold/30 hover:bg-white/5 transition-all group">
                                <div className="text-3xl group-hover:scale-110 transition-transform">{badge.icon}</div>
                                <div className="text-left">
                                    <h4 className="text-xs font-black text-white leading-none mb-1">{badge.name}</h4>
                                    <p className="text-[10px] font-black text-grass uppercase tracking-tighter">{badge.desc}</p>
                                </div>
                            </div>
                        ))}
                        {(user.achievements || []).length === 0 && (
                            <div className="col-span-2 py-4 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">No Medals Earned Yet</p>
                            </div>
                        )}
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
