import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Compass, Sparkles, Heart } from 'lucide-react';

const Login = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-sky-light">
            {/* Background Nature Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sunlight/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-grass/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-10 right-20 text-4xl animate-float-island">☁️</div>
                <div className="absolute bottom-20 left-10 text-4xl animate-float-island" style={{ animationDelay: '1s' }}>🐦</div>
                {/* Floating Petals */}
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div key={i} className="absolute text-rose/30"
                        initial={{ top: '-10%', left: `${Math.random() * 100}%` }}
                        animate={{ top: '110%', x: [0, 50, -50, 0], rotate: 360 }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'linear', delay: i * 2 }}
                    >🌸</motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full relative z-10">
                <div className="glass-card border-none bg-white/90 shadow-2xl p-0 overflow-hidden rounded-[2.5rem] relative">

                    {/* Royal Rose Frame Decoration */}
                    <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent floral-frame rounded-[2.5rem] z-20"></div>

                    {/* Top Floral Corner */}
                    <div className="absolute top-0 right-0 p-4 z-10 opacity-60">
                        <div className="text-4xl animate-pulse">🌹</div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 z-10 opacity-60">
                        <div className="text-4xl animate-pulse">🌹</div>
                    </div>

                    <div className="p-10 md:p-12 relative z-10">
                        <div className="text-center mb-10">
                            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                                <div className="bg-gradient-to-br from-gold to-sunlight p-2.5 rounded-2xl shadow-lg shadow-gold/20 group-hover:rotate-12 transition-transform">
                                    <Compass size={24} className="text-gold" />
                                </div>
                                <span className="font-black text-2xl text-white italic tracking-tight">Prep<span className="text-gold">Nova</span></span>
                            </Link>
                            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
                            <p className="text-text-secondary font-bold text-sm tracking-wide uppercase italic">The Adventure Awaits Your Command</p>
                        </div>

                        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white uppercase tracking-widest ml-1">Explorer ID (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-grass group-focus-within:text-gold transition-colors" size={20} />
                                    <input type="email" placeholder="explorer@quest.com" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sunlight/30 focus:border-sunlight transition-all text-white placeholder-white/30" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-black text-white uppercase tracking-widest">Secret Scroll (Password)</label>
                                    <button type="button" className="text-[10px] font-black text-rose hover:underline uppercase tracking-widest">Lost Key?</button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-grass group-focus-within:text-gold transition-colors" size={20} />
                                    <input type={show ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sunlight/30 focus:border-sunlight transition-all text-white placeholder-white/30" />
                                    <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-grass hover:text-gold transition-colors">
                                        {show ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="w-full btn-primary py-4 text-lg group animate-bloom">
                                <Sparkles size={20} className="group-hover:animate-spin" /> Resume Adventure
                            </button>
                        </form>

                        <div className="mt-10 text-center relative">
                            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10"></div>
                            <span className="relative bg-white px-4 text-[10px] font-black text-white/40 uppercase tracking-widest">New Recruit?</span>
                        </div>

                        <p className="mt-6 text-center">
                            <Link to="/signup" className="inline-flex items-center gap-2 text-white font-black hover:text-rose transition-colors group">
                                Join the Expedition <div className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center text-rose group-hover:bg-rose group-hover:text-white transition-all"><Heart size={14} fill="currentColor" /></div>
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
