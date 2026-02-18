import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Castle, Zap, Trophy, Shield, ChevronRight, ArrowLeft, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';

const companies = [
    {
        id: 'faang', name: '🏰 FAANG Tower', desc: 'Google, Amazon, Meta, Apple, Netflix — elite interview prep', xp: 500, color: 'from-gold to-amber',
        questions: [
            { q: 'Design a URL shortener system.', options: ['Hash-based key generation', 'Sequential IDs', 'Random names', 'Manual entry'], answer: 0 },
            { q: 'What is eventual consistency?', options: ['Data syncs eventually across nodes', 'Data is always consistent', 'No consistency', 'Real-time sync'], answer: 0 },
        ]
    },
    {
        id: 'startup', name: '🚀 Startup Hub', desc: 'Fast-paced, product-focused interview rounds', xp: 350, color: 'from-emerald to-teal-400',
        questions: [
            { q: 'How would you prioritize features for an MVP?', options: ['User impact vs effort matrix', 'Build everything', 'Random selection', 'CEO decides all'], answer: 0 },
            { q: 'Describe your approach to rapid prototyping.', options: ['Build, test, iterate quickly', 'Spend months planning', 'Copy competitors', 'Skip testing'], answer: 0 },
        ]
    },
    {
        id: 'service', name: '🏢 Service Castle', desc: 'TCS, Infosys, Wipro — structured interview format', xp: 300, color: 'from-purple to-violet-400',
        questions: [
            { q: 'What is the SDLC?', options: ['Software Development Life Cycle', 'System Data Logic Controller', 'Server Deployment Log', 'Static Design Layout'], answer: 0 },
            { q: 'Explain client-server architecture.', options: ['Client requests, server responds', 'Both are servers', 'Client only', 'No interaction'], answer: 0 },
        ]
    },
];

const CompanyFortress = () => {
    const [active, setActive] = useState(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [done, setDone] = useState(false);

    const company = active !== null ? companies[active] : null;
    const qs = company?.questions || [];

    const handleAnswer = (idx) => {
        setAnswers({ ...answers, [currentQ]: idx });
    };

    const calcScore = () => {
        let c = 0;
        qs.forEach((q, i) => { if (answers[i] === q.answer) c++; });
        return c;
    };

    if (done && company) {
        const score = calcScore();
        return (
            <div className="max-w-lg mx-auto py-16">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center">
                    <div className="text-5xl mb-4">{score === qs.length ? '🏰' : '🛡️'}</div>
                    <h2 className="text-2xl font-black mb-2">{score === qs.length ? 'Fortress Conquered!' : 'Good Fight!'}</h2>
                    <p className="text-text-secondary text-sm mb-4">{score}/{qs.length} correct at {company.name.split(' ').slice(1).join(' ')}</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 rounded-lg text-xs font-bold text-gold"><Zap size={12} /> +{score * 100} XP</span>
                        {score === qs.length && <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple/10 rounded-lg text-xs font-bold text-purple"><Trophy size={12} /> Fortress Guard</span>}
                    </div>
                    <div className="space-y-2 text-left mb-6">
                        {qs.map((q, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${answers[i] === q.answer ? 'border-emerald/20 bg-emerald/5' : 'border-red-500/20 bg-red-500/5'}`}>
                                {answers[i] === q.answer ? <CheckCircle2 size={16} className="text-emerald flex-shrink-0" /> : <XCircle size={16} className="text-red-400 flex-shrink-0" />}
                                <span className="text-sm truncate">{q.q}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => { setActive(null); setCurrentQ(0); setAnswers({}); setDone(false); }} className="btn-primary flex items-center gap-2"><RotateCcw size={14} /> Again</button>
                        <button onClick={() => { setActive(null); setDone(false); setCurrentQ(0); setAnswers({}); }} className="btn-ghost">All Fortresses</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (company) {
        const q = qs[currentQ];
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <button onClick={() => { setActive(null); setCurrentQ(0); setAnswers({}); }} className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium"><ArrowLeft size={16} /> Back</button>
                <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-purple bg-purple/10 px-2.5 py-1 rounded-md">{company.name}</span>
                        <span className="text-xs font-bold text-text-muted">Q{currentQ + 1}/{qs.length}</span>
                    </div>
                    <div className="w-full bg-navy h-1.5 rounded-full mb-6 overflow-hidden">
                        <motion.div animate={{ width: `${((currentQ + 1) / qs.length) * 100}%` }} className="h-full bg-gradient-to-r from-gold to-purple rounded-full" />
                    </div>
                    <p className="text-lg font-semibold mb-6">{q.q}</p>
                    <div className="space-y-3">
                        {q.options.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(idx)}
                                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${answers[currentQ] === idx ? 'border-gold bg-gold/10 text-gold' : 'border-border hover:border-gold/20 hover:bg-surface-hover text-text-secondary'}`}
                            >{opt}</button>
                        ))}
                    </div>
                    <div className="flex justify-end mt-8">
                        {currentQ < qs.length - 1 ? (
                            <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary">Next</button>
                        ) : (
                            <button onClick={() => setDone(true)} className="btn-primary flex items-center gap-1"><Sparkles size={16} /> Submit</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-2xl">🏰</span><h1 className="text-2xl font-black">Company Fortress</h1></div>
                <p className="text-text-secondary text-sm">Choose your fortress. Face company-specific interview challenges.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
                {companies.map((c, i) => (
                    <motion.button key={c.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActive(i); setCurrentQ(0); setAnswers({}); setDone(false); }}
                        className="glass-card-hover text-left group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`}></div>
                        <div className="text-3xl mb-3">{c.name.split(' ')[0]}</div>
                        <h3 className="text-lg font-bold group-hover:text-gold transition-colors mb-1">{c.name.split(' ').slice(1).join(' ')}</h3>
                        <p className="text-sm text-text-secondary mb-4">{c.desc}</p>
                        <div className="flex items-center justify-between text-xs font-bold text-text-muted">
                            <span>{c.questions.length} Questions</span>
                            <span className="text-gold flex items-center gap-1"><Zap size={12} /> +{c.xp} XP</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CompanyFortress;
