import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Compass, CheckCircle2, Star, Sparkles, Map } from 'lucide-react';

const Signup = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-sky-light">
            {/* Background Nature Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#FDE04715_0%,transparent_50%)]"></div>
                {/* Floating Islands Decor */}
                <div className="absolute top-[15%] right-[5%] text-6xl animate-float-island">🏝️</div>
                <div className="absolute bottom-[20%] left-[5%] text-5xl animate-float-island" style={{ animationDelay: '1.5s' }}>⛰️</div>
                <div className="absolute top-[40%] left-[10%] text-3xl animate-float-island opacity-40" style={{ animationDelay: '2s' }}>☁️</div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-5xl w-full grid md:grid-cols-2 overflow-hidden rounded-[3rem] border-none bg-white/90 backdrop-blur-xl shadow-2xl relative"
            >
                {/* Royal Rose Frame Decoration (Global) */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent floral-frame rounded-[3rem] z-30"></div>

                {/* Left side: The World Invite */}
                <div className="bg-gradient-to-br from-forest to-grass p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                    {/* Interior nature decor */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')]"></div>
                    <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-sunlight/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
                            <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-2xl border border-white/30 group-hover:rotate-12 transition-transform">
                                <Compass size={24} className="text-white" />
                            </div>
                            <span className="font-black text-2xl text-white italic tracking-tight">Prep<span className="text-sunlight">Nova</span></span>
                        </Link>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight drop-shadow-md">
                            Your Grand Quest <br /><span className="text-sunlight italic">Begins Here.</span>
                        </h2>

                        <ul className="space-y-5">
                            {[
                                { t: 'Chart Your Career Map', i: <Map size={18} /> },
                                { t: 'Unveil AI Clarity Scrolls', i: <Sparkles size={18} /> },
                                { t: 'Conquer Interview Arenas', i: <User size={18} /> },
                                { t: 'Claim Elite Temple Offers', i: <Star size={18} /> }
                            ].map((item, i) => (
                                <motion.li key={i}
                                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-4 text-white/90 font-bold text-sm bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-sm"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-sunlight/20 flex items-center justify-center text-sunlight">
                                        {item.i}
                                    </div>
                                    {item.t}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-xl">
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-sunlight text-sunlight" />)}
                        </div>
                        <p className="text-sm text-white/90 italic font-medium leading-relaxed">"Traversing these islands felt like playing a legendary RPG. It's the most vibrant way to prepare for a career!"</p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sunlight flex items-center justify-center font-black text-white">P</div>
                            <div>
                                <p className="text-sm font-black text-white">— Priya S.</p>
                                <p className="text-[10px] font-black text-sunlight uppercase tracking-widest">Elite Candidate</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: The Enlistment Form */}
                <div className="p-10 md:p-14 relative bg-white">
                    <div className="absolute top-0 right-0 p-6 opacity-40 rotate-12">🌹</div>

                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-white mb-2">Join the Expedition</h2>
                        <p className="text-text-secondary font-bold text-sm tracking-wide uppercase italic">Create your adventurer profile</p>
                    </div>

                    <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white uppercase tracking-widest ml-1">Adventurer Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-grass group-focus-within:text-gold transition-colors" size={18} />
                                <input type="text" placeholder="Alex Johnson" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sunlight/30 focus:border-sunlight transition-all text-white placeholder-white/30" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white uppercase tracking-widest ml-1">Communication Pigeon (Email)</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-grass group-focus-within:text-gold transition-colors" size={18} />
                                <input type="email" placeholder="you@quest.com" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sunlight/20 focus:border-sunlight transition-all text-white placeholder-white/30" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white uppercase tracking-widest ml-1">Secret Cipher (Password)</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-grass group-focus-within:text-gold transition-colors" size={18} />
                                <input type={show ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-3.5 pl-11 pr-11 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sunlight/20 focus:border-sunlight transition-all text-white placeholder-white/30" />
                                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-grass hover:text-gold transition-colors">
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn-primary py-4 text-lg font-black mt-4 shadow-xl shadow-grass/20 hover:scale-[1.02] transition-transform">
                            <Sparkles size={20} className="animate-pulse" /> Begin My Expedition
                        </button>
                    </form>

                    <div className="mt-10 text-center relative">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/10"></div>
                        <span className="relative bg-white px-4 text-[10px] font-black text-white/40 uppercase tracking-widest">Already Registered?</span>
                    </div>

                    <p className="mt-6 text-center">
                        <Link to="/login" className="text-white font-black hover:text-rose transition-colors uppercase tracking-widest text-[11px] border-b-2 border-sunlight pb-1">
                            Back to Outpost (Sign In)
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
