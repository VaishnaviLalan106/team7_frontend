import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Compass, Sparkles, Map, Star, ChevronRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration delay
        setTimeout(() => {
            login({
                email: formData.email,
                displayName: formData.name,
                avatar: '🦁'
            });
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Stunning Hero Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000"
                    alt="Mountain Night"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl w-full grid md:grid-cols-2 overflow-hidden rounded-[2.5rem] border border-white/10 bg-navy-deep/40 backdrop-blur-3xl shadow-2xl relative z-10"
            >
                {/* Left side: The World Invite (Decorative/Info) */}
                <div className="hidden md:flex bg-gradient-to-br from-forest/40 to-grass/40 p-12 flex-col justify-between relative overflow-hidden border-r border-white/10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] opacity-20"></div>

                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 group-hover:rotate-12 transition-transform shadow-xl">
                                <Compass size={28} className="text-gold" />
                            </div>
                            <span className="font-black text-3xl text-white italic tracking-tight">Prep<span className="text-gold uppercase">Nova</span></span>
                        </Link>

                        <h2 className="text-5xl font-black text-white mb-8 leading-[1.1] drop-shadow-2xl">
                            The Grand Quest <br /><span className="text-gold italic">Starts Here.</span>
                        </h2>

                        <div className="space-y-4">
                            {[
                                { t: 'Chart Your Career Map', i: <Map size={18} />, c: 'emerald' },
                                { t: 'Unveil AI Clarity Scrolls', i: <Sparkles size={18} />, c: 'gold' },
                                { t: 'Conquer Interview Arenas', i: <User size={18} />, c: 'rose' },
                                { t: 'Claim Elite Temple Offers', i: <Star size={18} />, c: 'sky' }
                            ].map((item, i) => (
                                <motion.div key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-4 text-white/90 font-bold text-sm bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-${item.c}-500/20 flex items-center justify-center text-${item.c}-400 group-hover:scale-110 transition-transform`}>
                                        {item.i}
                                    </div>
                                    {item.t}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}
                        </div>
                        <p className="text-sm text-white/80 italic font-medium leading-relaxed">"PrepNova transformed my interview prep into a legendary adventure. I landed my dream role!"</p>
                        <p className="mt-3 text-xs font-black text-gold uppercase tracking-widest">— Alex Johnson, Software Engineer</p>
                    </div>
                </div>

                {/* Right side: The Enrollment Form */}
                <div className="p-10 md:p-14 bg-white/5 flex flex-col justify-center">
                    <div className="mb-10 lg:hidden">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Compass size={24} className="text-gold" />
                            <span className="font-black text-2xl text-white italic">Prep<span className="text-gold uppercase">Nova</span></span>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-white mb-2">Become a Recruit</h2>
                        <p className="text-text-muted font-bold text-[10px] tracking-widest uppercase italic opacity-70">Begin Your Ascension to Glory</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Adventurer Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your hero name"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Pigeon Address (Email)</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@quest.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Secret Cipher (Password)</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold transition-colors" size={18} />
                                <input
                                    type={show ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-11 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
                                />
                                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors">
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Sparkles size={20} /> Begin My Expedition
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center relative">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10"></div>
                        <span className="relative bg-[#0F172A] px-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Enlisted Before?</span>
                    </div>

                    <p className="mt-8 text-center">
                        <Link to="/login" className="text-gold font-bold text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-1 group">
                            Return to Outpost <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
