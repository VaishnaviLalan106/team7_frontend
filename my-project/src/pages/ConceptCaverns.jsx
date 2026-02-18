import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, CheckCircle2, XCircle, ChevronRight, ArrowLeft, RotateCcw, Sparkles, BookOpen, Compass } from 'lucide-react';

const chambers = [
    { id: 'combat', name: '⚔️ Concept Combat', desc: 'Answer MCQs to defeat concept monsters in the wild', questions: 10, xp: 150, color: 'from-rose to-rose', icon: '🦖' },
    { id: 'explain', name: '🧒 Explain Like 10', desc: 'Explain complex concepts simply to earn forest crystals', questions: 5, xp: 200, color: 'from-grass to-forest', icon: '🌿' },
    { id: 'rapid', name: '⚡ Rapid Fire 60', desc: '60-second nature blitz — answer as many as you can', questions: 15, xp: 250, color: 'from-sunlight to-gold', icon: '🌩️' },
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
            <div className="max-w-xl mx-auto py-16 px-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center border-emerald-200">
                    <div className="text-6xl mb-6">{pct >= 70 ? '💎' : '🔮'}</div>
                    <h2 className="text-3xl font-black text-white mb-2">{pct >= 70 ? 'Crystal Shard Earned!' : 'Keep Exploring!'}</h2>
                    <p className="text-text-secondary font-bold text-sm mb-6 uppercase tracking-widest italic">Expedition Score: {score}/{total} ({pct}%)</p>

                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sunlight/20 border border-sunlight/40 rounded-2xl text-xs font-black text-gold"><Zap size={14} className="fill-gold text-gold" /> +{score * 30} XP</span>
                        {pct >= 70 && <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky/10 border border-sky/20 rounded-2xl text-xs font-black text-sky"><Trophy size={14} /> Shard Gatherer</span>}
                    </div>

                    <div className="space-y-3 text-left mb-8">
                        {sampleQuestions.map((q, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${answers[i] === q.answer ? 'border-grass/20 bg-grass/5' : 'border-rose/20 bg-rose/5'}`}>
                                <div className={`p-1.5 rounded-lg ${answers[i] === q.answer ? 'bg-grass text-white' : 'bg-rose text-white'}`}>
                                    {answers[i] === q.answer ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{q.q}</p>
                                    <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter">{q.topic}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button onClick={() => { setCurrentQ(0); setAnswers({}); setShowResults(false); }} className="btn-primary flex-1 py-4 text-lg"><RotateCcw size={18} /> Retry Quest</button>
                        <button onClick={() => { setActive(null); setShowResults(false); setAnswers({}); }} className="btn-ghost px-10">Map</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (active) {
        const chamber = chambers.find(c => c.id === active);
        const q = sampleQuestions[currentQ];
        return (
            <div className="max-w-3xl mx-auto space-y-8 px-4 pb-12">
                <button onClick={() => { setActive(null); setAnswers({}); }} className="flex items-center gap-2 text-white hover:text-rose transition-colors text-sm font-black uppercase tracking-widest"><ArrowLeft size={18} /> Exit Chamber</button>

                <div className="glass-card p-8 md:p-12 relative overflow-hidden border-sky-100">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 text-7xl">{chamber.icon}</div>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-[10px] font-black text-sky bg-sky/10 border border-sky/20 px-3 py-1.5 rounded-full uppercase tracking-widest">{q.topic}</span>
                            <h3 className="text-xl font-black text-white mt-3">{chamber.name.split(' ').slice(1).join(' ')}</h3>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Question</span>
                            <div className="text-2xl font-black text-white">{currentQ + 1}<span className="text-white/30">/</span>{sampleQuestions.length}</div>
                        </div>
                    </div>

                    <div className="w-full bg-white/10 h-3 rounded-full mb-10 overflow-hidden p-[2px] border border-white shadow-none">
                        <motion.div animate={{ width: `${((currentQ + 1) / sampleQuestions.length) * 100}%` }} className="h-full bg-gradient-to-r from-sky to-sky rounded-full shadow-lg shadow-sky/20" />
                    </div>

                    <p className="text-2xl font-black text-white mb-10 leading-snug">{q.q}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {q.options.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(idx)}
                                className={`w-full text-left px-6 py-5 rounded-2xl border-2 text-sm font-bold transition-all relative overflow-hidden group ${answers[currentQ] === idx ? 'border-sky-500 bg-sky/10 text-sky shadow-lg shadow-sky/10' : 'border-white/10 bg-white/5 hover:border-sky-200 hover:bg-white/10 text-text-secondary hover:text-white'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all ${answers[currentQ] === idx ? 'bg-sky text-white' : 'bg-white/10 text-white/50 group-hover:bg-sky-100 group-hover:text-sky'}`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    {opt}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
                        <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="btn-ghost px-8 disabled:opacity-20 italic">Prev</button>
                        {currentQ < sampleQuestions.length - 1 ? (
                            <button onClick={() => setCurrentQ(currentQ + 1)} className="btn-primary px-10 flex items-center gap-2 group">
                                Continue Expedition <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button onClick={() => setShowResults(true)} className="btn-primary px-12 bg-gradient-to-r from-gold to-sunlight text-gold shadow-gold/20">
                                <Sparkles size={20} className="animate-pulse" /> Complete Chamber
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
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky to-sky flex items-center justify-center text-white shadow-lg shadow-sky/20">
                            <BookOpen size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-white">Concept Caverns</h1>
                    </div>
                    <p className="text-text-secondary font-medium pl-1">Master the fundamental crystals of the tech world.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-sunlight/10 border border-sunlight/30 rounded-2xl">
                        <Zap size={16} className="text-gold fill-gold" />
                        <span className="text-xs font-black text-gold uppercase tracking-widest">Rewards Up To +250 XP</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {chambers.map((c, i) => (
                    <motion.button key={c.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActive(c.id); setCurrentQ(0); setAnswers({}); }}
                        className="glass-card-hover text-left group relative overflow-hidden flex flex-col h-full border-white/10"
                    >
                        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${c.color} opacity-40`}></div>
                        <div className="text-5xl mb-6 filter drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{c.icon}</div>
                        <h3 className="text-xl font-black text-white group-hover:text-sky transition-colors mb-2 leading-tight">
                            {c.name.split(' ').slice(1).join(' ')}
                        </h3>
                        <p className="text-sm font-medium text-text-secondary mb-6 flex-1 italic">{c.desc}</p>

                        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Requirement</span>
                                <span className="text-xs font-black text-white">{c.questions} Crystals</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Reward</span>
                                <span className="text-xs font-black text-gold flex items-center gap-1">+{c.xp} XP</span>
                            </div>
                        </div>

                        <div className="absolute bottom-[-10px] right-[-10px] text-6xl opacity-5 group-hover:rotate-12 transition-transform">{c.icon}</div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ConceptCaverns;
