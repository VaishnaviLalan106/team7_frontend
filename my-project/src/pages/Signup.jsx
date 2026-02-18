import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Compass, CheckCircle2, Star } from 'lucide-react';

const Signup = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px]"></div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl w-full grid md:grid-cols-2 overflow-hidden rounded-3xl border border-border/30 bg-surface/40 backdrop-blur-xl relative z-10">
                {/* Left info */}
                <div className="bg-gradient-to-br from-navy-light to-navy p-10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-purple/5 pointer-events-none"></div>
                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-10">
                            <div className="bg-gradient-to-br from-gold to-amber p-2 rounded-xl">
                                <Compass size={20} className="text-navy" />
                            </div>
                            <span className="font-extrabold text-lg text-text-primary">Prep<span className="text-gold">Nova</span></span>
                        </Link>
                        <h2 className="text-3xl font-black mb-6">Join the Treasure Hunt.</h2>
                        <ul className="space-y-4">
                            {['Explore Resume Island', 'Conquer Concept Caverns', 'Win Arena Battles', 'Claim Inner Temple Offers'].map((t, i) => (
                                <li key={i} className="flex items-center gap-3 text-text-secondary text-sm font-medium">
                                    <CheckCircle2 size={18} className="text-emerald flex-shrink-0" /> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative z-10 mt-10 bg-gold/5 p-5 rounded-2xl border border-gold/10">
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="fill-gold text-gold" />)}
                        </div>
                        <p className="text-xs text-text-muted italic">"Converting prep into a treasure hunt made me actually look forward to studying every day. Highly recommended!"</p>
                        <p className="mt-3 text-sm font-bold text-gold">— Priya S., Elite Candidate</p>
                    </div>
                </div>
                {/* Right form */}
                <div className="p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black mb-1">Enlist Now</h2>
                        <p className="text-text-secondary text-sm">Join thousands in the Career Adventure World.</p>
                    </div>
                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-text-secondary">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-gold transition-colors" size={16} />
                                <input type="text" placeholder="Alex Johnson" className="w-full bg-navy border border-border rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-text-primary placeholder-text-muted" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-text-secondary">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-gold transition-colors" size={16} />
                                <input type="email" placeholder="you@quest.com" className="w-full bg-navy border border-border rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-text-primary placeholder-text-muted" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-text-secondary">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-gold transition-colors" size={16} />
                                <input type={show ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-navy border border-border rounded-xl py-2.5 pl-11 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-text-primary placeholder-text-muted" />
                                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors">
                                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary py-3 text-sm font-bold mt-2">Begin My Quest</button>
                    </form>
                    <p className="mt-6 text-center text-sm text-text-secondary">
                        Already enlisted? <Link to="/login" className="text-gold font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
