import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Compass, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            login({ email, displayName: email.split('@')[0], avatar: '🦊' });
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Stunning Hero Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000"
                    alt="Adventure Background"
                    className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/30"></div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full relative z-10"
            >
                <div className="glass-card border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl p-0 overflow-hidden rounded-[2.5rem] relative">

                    {/* Animated Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="p-10 md:p-12 relative z-10">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 mb-6 group cursor-pointer">
                                <motion.div
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-gradient-to-br from-gold to-sunlight p-3 rounded-2xl shadow-lg shadow-gold/20"
                                >
                                    <Compass size={28} className="text-navy" />
                                </motion.div>
                                <span className="font-black text-3xl text-white italic tracking-tight">Prep<span className="text-gold uppercase">Nova</span></span>
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back, Explorer</h2>
                            <p className="text-text-muted font-bold text-[10px] tracking-[0.2em] uppercase italic opacity-80">The Grand Quest Awaits Your Return</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Explorer ID (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="explorer@prepnova.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black text-white/60 uppercase tracking-widest">Secret Scroll (Password)</label>
                                    <button type="button" className="text-[10px] font-black text-gold hover:text-white transition-colors uppercase tracking-widest">Lost Key?</button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold transition-colors" size={20} />
                                    <input
                                        type={show ? 'text' : 'password'}
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
                                    />
                                    <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors">
                                        {show ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-gradient-to-r from-gold to-sunlight text-navy font-black rounded-2xl shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-navy/30 border-t-navy rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                        Resume Adventure
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 text-center relative">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10"></div>
                            <span className="relative bg-[#1A2333] px-4 text-[10px] font-black text-white/40 uppercase tracking-widest rounded-full">New Recruit?</span>
                        </div>

                        <p className="mt-8 text-center">
                            <Link to="/signup" className="inline-flex items-center gap-2 text-white/80 font-bold text-sm tracking-tight hover:text-gold transition-colors group">
                                Join the Expedition <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Ambient Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold/30 rounded-full"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Login;
