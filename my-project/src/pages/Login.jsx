import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Compass } from 'lucide-react';

const Login = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px]"></div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full relative z-10">
                <div className="glass-card border-border/30 p-8 md:p-10">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="bg-gradient-to-br from-gold to-amber p-2 rounded-xl">
                                <Compass size={22} className="text-navy" />
                            </div>
                            <span className="font-extrabold text-xl">Prep<span className="text-gold">Nova</span></span>
                        </Link>
                        <h2 className="text-2xl font-black mb-1">Welcome back, Adventurer</h2>
                        <p className="text-text-secondary text-sm">Your career quest continues.</p>
                    </div>
                    <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-text-secondary">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-gold transition-colors" size={18} />
                                <input type="email" placeholder="you@quest.com" className="w-full bg-navy border border-border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-text-primary placeholder-text-muted" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between">
                                <label className="text-xs font-semibold text-text-secondary">Password</label>
                                <button type="button" className="text-xs font-bold text-gold hover:underline">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-gold transition-colors" size={18} />
                                <input type={show ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-navy border border-border rounded-xl py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-text-primary placeholder-text-muted" />
                                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors">
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary py-3.5 text-base font-bold">Resume Quest</button>
                    </form>
                    <p className="mt-8 text-center text-sm text-text-secondary">
                        New to the hunt? <Link to="/signup" className="text-gold font-bold hover:underline">Join the Adventure</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
