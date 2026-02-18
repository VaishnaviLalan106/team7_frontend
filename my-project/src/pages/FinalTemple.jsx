import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, Star, Sparkles, Shield, Zap, TrendingUp, Radar, Crown, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalTemple = () => {
    const requirements = [
        { label: 'Resume Island Mastery', icon: <CheckCircle2 className="text-grass" />, done: true },
        { label: 'Concept Shard Collection', icon: <CheckCircle2 className="text-grass" />, done: true },
        { label: 'Interview Arena Slays', icon: <Star className="text-gold" />, done: true },
        { label: 'Code Dungeon Runes', icon: <Star className="text-gold" />, done: false },
    ];

    const skills = [
        { name: 'Core Strength', val: 85, color: 'bg-grass' },
        { name: 'Mock Combat', val: 72, color: 'bg-sky' },
        { name: 'Spirit/Behavioral', val: 90, color: 'bg-rose' },
        { name: 'XP Level', val: 65, color: 'bg-gold' },
    ];

    return (
        <div className="space-y-10 pb-16">
            {/* Header with Royal Banner */}
            <div className="text-center relative py-12">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sunlight/20 rounded-full blur-[100px]"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-sunlight/30"></div>
                </div>
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border-2 border-sunlight shadow-xl shadow-gold/20 mb-6 group">
                        <Crown size={24} className="text-gold group-hover:scale-120 transition-transform" />
                        <span className="text-xs font-black text-gold tracking-[0.3em] uppercase italic">The Summit of Destiny</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-sm">Final Offer Temple</h1>
                    <p className="text-text-secondary font-bold mt-4 max-w-2xl mx-auto italic">Only the worthy adventurers who have conquered the trails across the islands may enter the sacred grounds of the ultimate career offer.</p>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Readiness Gate */}
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card border-sunlight/40 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-8 rotate-12 opacity-5 text-7xl">🏛</div>
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                        <Shield size={24} className="text-gold" /> Readiness Gate
                    </h3>
                    <div className="space-y-4 flex-1">
                        {requirements.map((r, i) => (
                            <div key={i} className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${r.done ? 'border-grass/20 bg-grass/5' : 'border-white/10 bg-slate-50 opacity-60'}`}>
                                <span className="text-sm font-bold text-white">{r.label}</span>
                                {r.done ? <CheckCircle2 size={18} className="text-grass" /> : <Shield size={18} className="text-white/40" />}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none">Overall Seal</span>
                            <span className="text-xs font-black text-white leading-none">75% UNLOCKED</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white shadow-none">
                            <div className="h-full bg-gradient-to-r from-grass to-gold w-[75%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Skill Radar / Stats */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card border-white/10 lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-sky/5 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                        <TrendingUp size={24} className="text-sky" /> Career Potential Radar
                    </h3>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            {skills.map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-xs font-black text-text-secondary uppercase tracking-widest">{s.name}</span>
                                        <span className="text-xs font-black text-white">{s.val}%</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                                            className={`h-full ${s.color} rounded-full relative`}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-water opacity-20"></div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-6">
                                <button className="btn-ghost w-full py-4 text-sm flex items-center justify-center gap-3 border-sky/20 hover:bg-sky/10">
                                    <Sparkles size={18} className="text-sky" /> Generate Full Spirit Scroll
                                </button>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-[2.5rem] border-2 border-white p-8 flex flex-col justify-center text-center relative group overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy-very-light.png')]"></div>
                            <div className="text-[10px] font-black text-grass uppercase tracking-[0.2em] mb-4">Expedition Status</div>
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-sunlight mx-auto mb-6 flex items-center justify-center shadow-xl shadow-gold/20 rotate-12 group-hover:rotate-0 transition-transform">
                                <Trophy size={48} className="text-gold" />
                            </div>
                            <h4 className="text-2xl font-black text-white mb-2">Offer Hunter</h4>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-6">Master Class Adventurer</p>
                            <Link to="/profile" className="text-xs font-black text-sky hover:text-sky flex items-center justify-center gap-2 hover:underline">
                                View Achievement Hall <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* The Final Gate CTA */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="glass-card bg-gradient-to-r from-forest to-grass text-white py-12 px-10 text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black mb-4">Unlock the Royal Offer Hall</h2>
                    <p className="text-white/80 font-bold italic mb-10 leading-relaxed">Prepare your heart. The Final Interview Boss awaits in the Hall of Honor. Complete the Dungeon Runes to unlock your ultimate destiny.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-secondary px-12 py-5 text-xl flex items-center gap-3 opacity-50 cursor-not-allowed">
                            <Shield size={24} /> Seal Restricted
                        </button>
                        <Link to="/code-dungeon" className="btn-ghost bg-white/10 border-white/30 text-white px-10 py-5 text-lg hover:bg-white/20">
                            Enter Code Dungeon <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FinalTemple;
