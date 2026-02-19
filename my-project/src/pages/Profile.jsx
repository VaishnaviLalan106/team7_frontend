import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Award, Zap, Star, Shield,
    ArrowRight, Sparkles, Map, Target,
    Settings, Edit3, Share2, Compass, Heart, LogOut
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUser } from '../context/UserContext';
import AvatarEditor from '../components/AvatarEditor';
import ShareModal from '../components/ShareModal';
import MerchantModal from '../components/MerchantModal';

const allAchievements = [
    { id: 'welcome_aboard', icon: '❤️', name: 'Welcome Aboard' },
    { id: 'visionary', icon: '🦅', name: 'Visionary' },
    { id: 'clarity_scroll', icon: '📜', name: 'Concept Wise' },
    { id: 'boss_slayer', icon: '🐉', name: 'Boss Slayer' },
    { id: 'code_hardy', icon: '🐢', name: 'Code Hardy' },
    { id: 'unicorn_find', icon: '🦄', name: 'Unicorn Find' },
    { id: 'swift_move', icon: '🦊', name: 'Swift Move' },
    { id: 'team_lead', icon: '🐺', name: 'Team Lead' },
    { id: 'king_offer', icon: '👑', name: 'King Offer' },
];

const Profile = () => {
    const { user, logout } = useUser();
    const [showEditor, setShowEditor] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [showMerchant, setShowMerchant] = useState(false);

    // Dynamic data for chart
    const performanceData = user.combatHistory?.length > 0
        ? [
            { name: 'Technical', score: 85 },
            { name: 'Behavioral', score: 92 },
            { name: 'Coding', score: 78 },
            { name: 'Logic', score: 88 },
        ]
        : [
            { name: 'Technical', score: 0 },
            { name: 'Behavioral', score: 0 },
            { name: 'Coding', score: 0 },
            { name: 'Logic', score: 0 },
        ];

    return (
        <div className="space-y-8 pb-12">
            {/* Achievement Profile Header */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="glass-card bg-gradient-to-r from-forest to-grass p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-10 border-none shadow-2xl shadow-forest/20"
            >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] animate-pulse"></div>
                <div className="absolute top-0 right-[-50px] w-96 h-96 bg-gold/5 rounded-full blur-[80px]"></div>

                <div className="relative group shrink-0 cursor-pointer" onClick={() => setShowEditor(true)}>
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] bg-gradient-to-br from-sunlight to-gold p-1.5 shadow-2xl shadow-black/20 group-hover:scale-105 transition-transform rotate-6 group-hover:rotate-0">
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-navy border-4 border-navy flex items-center justify-center text-7xl">{user.avatar}</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-navy text-gold p-3 rounded-2xl shadow-xl flex items-center justify-center border-2 border-white/10 group-hover:bg-gold group-hover:text-navy transition-all">
                        <Edit3 size={18} />
                    </div>
                </div>

                <div className="text-center md:text-left flex-1 relative z-10">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                        <h1 className="text-4xl font-black italic tracking-tight underline decoration-sunlight decoration-4 underline-offset-4">{user.displayName}</h1>
                        <span className="px-5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest border border-white/30">Lvl {user.level || 1} {user.title}</span>
                    </div>
                    <p className="text-white/80 font-bold text-lg mb-8 italic">"Seeking the ultimate career destiny through code, design, and spirit."</p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-sunlight/20 rounded-2xl border border-sunlight/30 backdrop-blur-md text-sm font-black text-sunlight">
                            <Trophy size={16} fill="currentColor" /> Offer Hunter Rank
                        </div>
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-sky/20 rounded-2xl border border-sky/30 backdrop-blur-md text-sm font-black text-sky-200">
                            <Compass size={16} /> {user.islandsExplored || 0} Islands Explored
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 relative z-10 self-start">
                    <button onClick={() => setShowShare(true)} title="Share Expedition" className="p-3 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg">
                        <Share2 size={20} />
                    </button>
                    <button onClick={() => setShowEditor(true)} title="Settings" className="p-3 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all shadow-lg">
                        <Settings size={20} />
                    </button>
                    <button onClick={logout} title="Exit Expedition" className="p-3 bg-rose-500/20 rounded-2xl border border-rose-500/30 hover:bg-rose-500/40 text-rose-200 transition-all shadow-lg">
                        <LogOut size={20} />
                    </button>
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
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none">{user.achievements?.length || 0} / {allAchievements.length} Earned</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {allAchievements.map((ach, i) => {
                            const isUnlocked = user.achievements?.find(a => a.id === ach.id);
                            return (
                                <div key={i} className="flex flex-col items-center gap-2 group cursor-help">
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-lg transition-all border-2 ${isUnlocked ? 'bg-white/10 border-gold/20 grayscale-0 group-hover:scale-110' : 'bg-white/5 border-white/5 grayscale opacity-40'}`}>
                                        {ach.icon}
                                    </div>
                                    <span className={`text-[9px] font-black uppercase text-center tracking-tighter ${isUnlocked ? 'text-white' : 'text-text-muted'}`}>{ach.name}</span>
                                </div>
                            );
                        })}
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
                        <div className="h-[250px] w-full relative">
                            {user.combatHistory?.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-navy/20 backdrop-blur-[1px] rounded-2xl">
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Awaiting First combat</p>
                                </div>
                            )}
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 'bold' }} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(30,41,59,0.95)', color: '#F1F5F9', fontWeight: 'bold' }} />
                                    <Bar dataKey="score" fill="#22C55E" radius={[10, 10, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-text-muted uppercase tracking-widest border-b border-white/10 pb-2">Recent Combat History</h4>
                            {user.combatHistory?.length > 0 ? (
                                user.combatHistory.map((h, i) => (
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
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                    <Target size={24} className="text-white/20 mb-3" />
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">No trials completed yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="p-10 bg-gold/5 border-2 border-gold/20 rounded-[3rem] text-center">
                <h3 className="text-xl font-black text-gold mb-2">Hall of Honor Exchange</h3>
                <p className="text-sm font-medium text-text-secondary italic mb-8">Exchange your earned XP for legendary portfolio skins and certified scrolls.</p>
                <button onClick={() => setShowMerchant(true)} className="btn-primary px-12 py-4 shadow-xl">Visit the Treasure Merchant</button>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showEditor && <AvatarEditor onClose={() => setShowEditor(false)} />}
            </AnimatePresence>
            <AnimatePresence>
                {showShare && <ShareModal onClose={() => setShowShare(false)} />}
            </AnimatePresence>
            <AnimatePresence>
                {showMerchant && <MerchantModal onClose={() => setShowMerchant(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
