import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, CheckCircle2, XCircle, ChevronRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

const chambers = [
    { id: 'combat', name: '⚔️ Concept Combat', desc: 'Answer MCQs to defeat concept monsters', questions: 10, xp: 150, color: 'from-coral to-red-400' },
    { id: 'explain', name: '🧒 Explain Like 10', desc: 'Explain complex concepts simply to earn crystals', questions: 5, xp: 200, color: 'from-purple to-violet-400' },
    { id: 'rapid', name: '⚡ Rapid Fire 60', desc: '60-second blitz — answer as many as you can', questions: 15, xp: 250, color: 'from-gold to-amber' },
];

const sampleQuestions = [
    { q: 'What does DNS stand for?', options: ['Domain Name System', 'Data Network Service', 'Digital Node System', 'Direct Name Server'], answer: 0, topic: 'Networking' },
    { q: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Tree'], answer: 1, topic: 'DSA' },
    { q: 'What is the virtual DOM?', options: ['A lightweight copy of the real DOM', 'A CSS framework', 'A database', 'A server protocol'], answer: 0, topic: 'React' },
    { q: 'What is Big O notation for?', options: ['Describing algorithm efficiency', 'Styling HTML', 'Managing state', 'Network routing'], answer: 0, topic: 'DSA' },
    { q: 'What is a closure?', options: ['Function with access to outer scope', 'A CSS selector', 'A database index', 'A testing framework'], answer: 0, topic: 'JavaScript' },
];

const ConceptCaverns = () => {
    const [active, setActive] = useState(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (idx) => setAnswers({ ...answers, [currentQ]: idx });

    const calcScore = () => {
        let c = 0;
        Object.keys(answers).forEach(k => { if (answers[k] === sampleQuestions[k]?.answer) c++; });
        return c;
    };

    if (showResults) {
        const score = calcScore();
        const total = sampleQuestions.length;
        const pct = Math.round((score / total) * 100);
        return (
            <div className="max-w-lg mx-auto py-16">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center">
                    <div className="text-5xl mb-4">{pct >= 70 ? '💎' : '🔮'}</div>
                    <h2 className="text-2xl font-black mb-2">{pct >= 70 ? 'Crystal Shard Earned!' : 'Keep Exploring!'}</h2>
                    <p className="text-text-secondary text-sm mb-4">You scored {score}/{total} ({pct}%)</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 rounded-lg text-xs font-bold text-gold"><Zap size={12} /> +{score * 30} XP</span>
                        {pct >= 70 && <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple/10 rounded-lg text-xs font-bold text-purple"><Trophy size={12} /> Shard #{Math.floor(Math.random() * 99)}</span>}
                    </div>
                    <div className="space-y-2 text-left mb-6">
                        {sampleQuestions.map((q, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${answers[i] === q.answer ? 'border-emerald/20 bg-emerald/5' : 'border-red-500/20 bg-red-500/5'}`}>
                                {answers[i] === q.answer ? <CheckCircle2 size={16} className="text-emerald flex-shrink-0" /> : <XCircle size={16} className="text-red-400 flex-shrink-0" />}
                                <span className="text-sm truncate flex-1">{q.q}</span>
                                <span className="text-[10px] font-bold text-text-muted">{q.topic}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => { setCurrentQ(0); setAnswers({}); setShowResults(false); }} className="btn-primary flex items-center gap-2"><RotateCcw size={14} /> Retry</button>
                        <button onClick={() => { setActive(null); setShowResults(false); setAnswers({}); }} className="btn-ghost">All Chambers</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (active) {
        const q = sampleQuestions[currentQ];
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <button onClick={() => { setActive(null); setAnswers({}); }} className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium"><ArrowLeft size={16} /> Back</button>
                <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-purple bg-purple/10 px-2.5 py-1 rounded-md">{q.topic}</span>
                        <span className="text-xs font-bold text-text-muted">Q{currentQ + 1}/{sampleQuestions.length}</span>
                    </div>
                    <div className="w-full bg-navy h-1.5 rounded-full mb-6 overflow-hidden">
                        <motion.div animate={{ width: `${((currentQ + 1) / sampleQuestions.length) * 100}%` }} className="h-full bg-gradient-to-r from-gold to-purple rounded-full" />
                    </div>
                    <p className="text-lg font-semibold mb-6">{q.q}</p>
                    <div className="space-y-3">
                        {q.options.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(idx)}
                                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${answers[currentQ] === idx ? 'border-gold bg-gold/10 text-gold' : 'border-border hover:border-gold/20 hover:bg-surface-hover text-text-secondary'}`}
                            >{opt}</button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8">
                        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="btn-ghost disabled:opacity-30">Prev</button>
                        {currentQ < sampleQuestions.length - 1 ? (
                            <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary flex items-center gap-1">Next <ChevronRight size={16} /></button>
                        ) : (
                            <button onClick={() => setShowResults(true)} className="btn-primary flex items-center gap-1"><Sparkles size={16} /> Submit</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-2xl">🧠</span><h1 className="text-2xl font-black">Concept Caverns</h1></div>
                <p className="text-text-secondary text-sm">Enter the crystal chambers. Master concepts to earn treasure shards.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
                {chambers.map((c, i) => (
                    <motion.button key={c.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActive(c.id); setCurrentQ(0); setAnswers({}); }}
                        className="glass-card-hover text-left group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`}></div>
                        <div className="text-3xl mb-3">{c.name.split(' ')[0]}</div>
                        <h3 className="text-lg font-bold group-hover:text-gold transition-colors mb-1">{c.name.split(' ').slice(1).join(' ')}</h3>
                        <p className="text-sm text-text-secondary mb-4">{c.desc}</p>
                        <div className="flex items-center justify-between text-xs font-bold text-text-muted">
                            <span>{c.questions} Questions</span>
                            <span className="text-gold flex items-center gap-1"><Zap size={12} /> +{c.xp} XP</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ConceptCaverns;
