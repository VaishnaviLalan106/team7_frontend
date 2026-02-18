import React from 'react';
import { motion } from 'framer-motion';
import {
    Trophy, Award, Zap, Star, Shield,
    ArrowRight, Sparkles, Map, Target,
    Settings, Edit3, Share2, Compass, Heart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Technical', score: 85 },
    { name: 'Behavioral', score: 92 },
    { name: 'Coding', score: 78 },
    { name: 'Logic', score: 88 },
];

const Profile = () => {
    return (
        <div className="space-y-8 pb-12">
            {/* Achievement Profile Header */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="glass-card bg-gradient-to-r from-forest to-grass p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-10 border-none shadow-2xl shadow-forest/20"
            >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] animate-pulse"></div>
                <div className="absolute top-0 right-[-50px] w-96 h-96 bg-gold/5 rounded-full blur-[80px]"></div>

                <div className="relative group shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] bg-gradient-to-br from-sunlight to-gold p-1.5 shadow-2xl shadow-black/20 group-hover:scale-105 transition-transform rotate-6 group-hover:rotate-0">
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-navy border-4 border-navy flex items-center justify-center text-7xl">🦊</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-navy text-gold p-3 rounded-2xl shadow-xl flex items-center justify-center border-2 border-white/10">
                        <Edit3 size={18} />
                    </div>
                </div>

                <div className="text-center md:text-left flex-1 relative z-10">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                        <h1 className="text-4xl font-black italic tracking-tight underline decoration-sunlight decoration-4 underline-offset-4">Adventurer Profile</h1>
                        <span className="px-5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-white/30">Lvl 12 Elite Candidate</span>
                    </div>
                    <p className="text-white/80 font-bold text-lg mb-8 italic">"Seeking the ultimate career destiny through code, design, and spirit."</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-sunlight/20 rounded-2xl border border-sunlight/30 backdrop-blur-md text-sm font-black text-sunlight">
                            <Trophy size={16} fill="currentColor" /> Offer Hunter Rank
                        </div>
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-sky/20 rounded-2xl border border-sky/30 backdrop-blur-md text-sm font-black text-sky-200">
                            <Compass size={16} /> 12 Islands Explored
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 relative z-10 self-start">
                    <button className="p-3 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg"><Share2 size={20} /></button>
                    <button className="p-3 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg"><Settings size={20} /></button>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Achievement Gallery */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    className="glass-card p-8"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-white flex items-center gap-3">
                            <Star size={22} className="text-gold" /> Achievement Hall
                        </h3>
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none">8 / 24 Earned</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { icon: '🦁', name: 'Brave Heart', unlocked: true },
                            { icon: '🦅', name: 'Visionary', unlocked: true },
                            { icon: '🦉', name: 'Concept Wise', unlocked: true },
                            { icon: '🐉', name: 'Boss Slayer', unlocked: true },
                            { icon: '🐢', name: 'Code Hardy', unlocked: true },
                            { icon: '🦄', name: 'Unicorn Find', unlocked: true },
                            { icon: '🦊', name: 'Swift Move', unlocked: false },
                            { icon: '🐺', name: 'Team Lead', unlocked: false },
                            { icon: '👑', name: 'King Offer', unlocked: false },
                        ].map((ach, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-lg transition-all border-2 ${ach.unlocked ? 'bg-white/10 border-gold/20 grayscale-0 group-hover:scale-110' : 'bg-white/5 border-white/5 grayscale opacity-40'}`}>
                                    {ach.icon}
                                </div>
                                <span className={`text-[9px] font-black uppercase text-center tracking-tighter ${ach.unlocked ? 'text-white' : 'text-text-muted'}`}>{ach.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Performance & Skill Hall */}
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="glass-card lg:col-span-2 p-8"
                >
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-black text-white flex items-center gap-3">
                            <Sparkles size={22} className="text-grass" /> Spirit Arsenal Strength
                        </h2>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-grass/10 border border-grass/20 rounded-xl">
                                <Heart size={14} className="text-grass fill-grass" />
                                <span className="text-[10px] font-black text-grass">HEALTHY ROUTINE</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 'bold' }} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(30,41,59,0.95)', color: '#F1F5F9', fontWeight: 'bold' }} />
                                    <Bar dataKey="score" fill="#22C55E" radius={[10, 10, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-text-muted uppercase tracking-widest border-b border-white/10 pb-2">Recent Combat History</h4>
                            {[
                                { trial: 'FAANG Fortress mock', score: 'A-', date: 'Yesterday', xp: '+120' },
                                { trial: 'Interview Arena Round 2', score: 'B+', date: '2 days ago', xp: '+80' },
                                { trial: 'Code Dungeon Runes', score: 'S', date: '5 days ago', xp: '+200' },
                            ].map((h, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-left">
                                        <p className="text-sm font-black text-white leading-tight">{h.trial}</p>
                                        <p className="text-[10px] font-black text-text-muted mt-1 uppercase tracking-tighter">{h.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-sm font-black px-2 py-0.5 rounded-lg ${h.score === 'S' ? 'text-gold' : 'text-grass'}`}>{h.score}</span>
                                        <p className="text-[10px] font-black text-gold mt-1">{h.xp} XP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="p-10 bg-gold/5 border-2 border-gold/20 rounded-[3rem] text-center">
                <h3 className="text-xl font-black text-gold mb-2">Hall of Honor Exchange</h3>
                <p className="text-sm font-medium text-text-secondary italic mb-8">Exchange your earned XP for legendary portfolio skins and certified scrolls.</p>
                <button className="btn-primary px-12 py-4 shadow-xl">Visit the Treasure Merchant</button>
            </div>
        </div>
    );
};

export default Profile;
