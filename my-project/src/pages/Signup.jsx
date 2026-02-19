import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Compass, Sparkles, Map, Star, ChevronRight, X, PartyPopper } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';

const WelcomePopup = ({ name, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-deep/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.5, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                className="max-w-sm w-full glass-card p-8 text-center relative overflow-hidden"
            >
                {/* Party Poppers Background Effects */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -200,
                            x: (i - 2.5) * 50,
                            rotate: 360
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className="absolute bottom-0 left-1/2 text-2xl"
                    >
                        {['🎉', '✨', '🎊', '⭐'][i % 4]}
                    </motion.div>
                ))}

                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <PartyPopper size={40} className="text-gold" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-gold/10 rounded-full"
                    />
                </div>

                <h2 className="text-2xl font-black text-white mb-2">Welcome Aboard!</h2>
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                    Greetings, <span className="text-gold font-bold">{name}</span>! Your journey begins now. We've granted you your first badge of honor.
                </p>

                <div className="flex flex-col items-center gap-2 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-2xl border border-gold/20 shadow-lg shadow-gold/5">
                        ❤️
                    </div>
                    <p className="text-[10px] font-black text-gold uppercase tracking-widest">Achieved: Welcome Aboard Badge</p>
                </div>

                <button
                    onClick={onClose}
                    className="btn-primary w-full py-4 text-sm font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20"
                >
                    Enter the World
                </button>
            </motion.div>
        </motion.div>
    );
};

const Signup = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration delay
        setTimeout(() => {
            // We don't call login() here yet to prevent immediate redirect
            setShowWelcome(true);
            setIsLoading(false);
        }, 800);
    };

    const handleCloseWelcome = () => {
        // Now we login and it will trigger the redirect
        login({
            email: formData.email,
            displayName: formData.name,
            avatar: '🦁'
        });
        setShowWelcome(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <AnimatePresence>
                {showWelcome && (
                    <WelcomePopup name={formData.name} onClose={handleCloseWelcome} />
                )}
            </AnimatePresence>
            {/* Stunning Hero Background */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000"
                    alt="Mountain Night"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-deep/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/20 via-transparent to-navy-deep/90"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full grid md:grid-cols-2 overflow-hidden rounded-[2.5rem] border border-white/10 bg-navy-deep/40 backdrop-blur-3xl shadow-2xl relative z-10"
            >
                {/* Left side: The World Invite (Decorative/Info) */}
                <div className="hidden md:flex bg-gradient-to-br from-forest/40 to-grass/40 p-8 flex-col justify-between relative overflow-hidden border-r border-white/10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] opacity-20"></div>

                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 group-hover:rotate-12 transition-transform shadow-xl">
                                <Compass size={28} className="text-gold" />
                            </div>
                            <span className="font-black text-3xl text-white italic tracking-tight">Prep<span className="text-gold uppercase">Nova</span></span>
                        </Link>

                        <h2 className="text-2xl font-black text-white mb-4 leading-[1.1] drop-shadow-2xl">
                            The Grand Quest <br /><span className="text-gold italic">Starts Here.</span>
                        </h2>

                        <div className="space-y-2">
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
                                    className="flex items-center gap-4 text-white/90 font-bold text-sm bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-colors"
                                >
                                    <div className={`w-8 h-8 rounded-xl bg-${item.c}-500/20 flex items-center justify-center text-${item.c}-400 group-hover:scale-110 transition-transform text-xs`}>
                                        {item.i}
                                    </div>
                                    {item.t}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-gold text-gold" />)}
                        </div>
                        <p className="text-sm text-white/80 italic font-medium leading-relaxed">"PrepNova transformed my interview prep into a legendary adventure. I landed my dream role!"</p>
                        <p className="mt-3 text-xs font-black text-gold uppercase tracking-widest">— Alex Johnson, Software Engineer</p>
                    </div>
                </div>

                {/* Right side: The Enrollment Form */}
                <div className="p-8 md:p-10 bg-white/5 flex flex-col justify-center">
                    <div className="mb-10 lg:hidden">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Compass size={24} className="text-gold" />
                            <span className="font-black text-2xl text-white italic">Prep<span className="text-gold uppercase">Nova</span></span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-white mb-2">Become a Recruit</h2>
                        <p className="text-text-muted font-bold text-[10px] tracking-widest uppercase italic opacity-70">Begin Your Ascension to Glory</p>
                    </div>

                    <form className="space-y-3" onSubmit={handleSubmit}>
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
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
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
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
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
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-11 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-white placeholder-white/20"
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

                    <div className="mt-8 text-center relative">
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
