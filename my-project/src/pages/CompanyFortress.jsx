import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Trophy, CheckCircle2, ArrowLeft, ArrowRight, Sparkles, Building2, Landmark, Rocket, Users } from 'lucide-react';

const companies = [
    { id: 'faang', name: '🏰 FAANG Fortress', desc: 'Conquer the algorithmic giants of the grand valley', xp: 500, icon: '🏛' },
    { id: 'startup', name: '🚀 Unicorn Woods', desc: 'Fast-paced challenges in the magical land of startups', xp: 400, icon: '🦄' },
    { id: 'service', name: '🏢 Enterprise Estate', desc: 'Master the scaling towers of global service leaders', xp: 300, icon: '🏗' },
];

const CompanyFortress = () => {
    const [active, setActive] = useState(null);
    const [step, setStep] = useState(0);

    const interviewSteps = [
        { q: "What's the time complexity of searching a value in a binary search tree?", options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"], answer: 0 },
        { q: "How would you handle a conflict with a team member?", options: ["Discuss openly to find common ground", "Report to manager immediately", "Ignore it", "Write a stern email"], answer: 0 },
    ];

    if (active) {
        const company = companies.find(c => c.id === active);
        const q = interviewSteps[step];
        return (
            <div className="max-w-3xl mx-auto space-y-8 px-4 pb-12">
                <button onClick={() => { setActive(null); setStep(0); }} className="flex items-center gap-2 text-white hover:text-rose transition-colors text-sm font-black uppercase tracking-widest"><ArrowLeft size={18} /> Exit Grounds</button>

                <div className="glass-card p-10 md:p-14 border-emerald-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 text-8xl">{company.icon}</div>

                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-[10px] font-black text-emerald-600 bg-grass/10 border border-emerald-100 px-4 py-1.5 rounded-full uppercase tracking-widest">Company Quest</span>
                            <h3 className="text-2xl font-black text-white mt-4">{company.name}</h3>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Stage</span>
                            <div className="text-3xl font-black text-white">{step + 1}<span className="text-white/30">/</span>3</div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-10 rounded-[2.5rem] border-2 border-white mb-10 text-center relative z-10">
                        <p className="text-2xl font-black text-white leading-tight">"{q.q}"</p>
                    </div>

                    <div className="grid gap-4">
                        {q.options.map((opt, i) => (
                            <button key={i} onClick={() => setStep(s => Math.min(s + 1, 2))}
                                className="w-full text-left px-8 py-5 rounded-2xl border-2 border-white/10 bg-white/5 hover:border-emerald-300 hover:bg-white/10 text-text-secondary hover:text-white font-bold transition-all flex items-center gap-5 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/10 text-white/50 group-hover:bg-emerald-100 group-hover:text-emerald-600 flex items-center justify-center font-black transition-all shadow-sm">{i + 1}</div>
                                {opt}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12 flex justify-end">
                        {step < 1 ? (
                            <button onClick={() => setStep(step + 1)} className="btn-primary px-12 italic">Next Trial</button>
                        ) : (
                            <button onClick={() => { setActive(null); setStep(0); }} className="btn-primary px-16 bg-gradient-to-r from-sunlight to-gold text-gold shadow-gold/20">
                                <Sparkles size={20} className="animate-pulse" /> Complete Conquest
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <Globe size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-white">Company Fortress</h1>
                    </div>
                    <p className="text-text-secondary font-medium pl-1">Infiltrate the high towers of industry giants.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-sunlight/10 border border-sunlight/30 rounded-2xl">
                    <Zap size={16} className="text-gold fill-gold" />
                    <span className="text-xs font-black text-gold uppercase tracking-widest">Potential: +500 XP</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {companies.map((c, i) => (
                    <motion.button key={c.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => setActive(c.id)}
                        className="glass-card-hover text-left group flex flex-col items-center justify-center text-center p-12 border-white/10"
                    >
                        <div className="text-7xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform filter drop-shadow-md">{c.icon}</div>
                        <h3 className="text-2xl font-black text-white mb-3 leading-tight">{c.name}</h3>
                        <p className="text-sm font-medium text-text-secondary mb-10 italic">{c.desc}</p>

                        <div className="w-full pt-8 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-grass bg-grass/10 px-3 py-1.5 rounded-xl uppercase tracking-widest">Mock Trial</span>
                            <span className="text-xs font-black text-gold flex items-center gap-1.5"><Zap size={12} className="fill-gold" /> +{c.xp} XP</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CompanyFortress;
