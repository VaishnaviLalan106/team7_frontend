import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Heart, Shield, Zap, Trophy, ArrowLeft, RotateCcw, Sparkles, Mic, MicOff } from 'lucide-react';

const rounds = [
    {
        round: 1, type: 'Technical', boss: 'Tech Lead Golem',
        questions: [
            { q: 'Explain the difference between REST and GraphQL.', options: ['REST uses URLs, GraphQL uses queries', 'They are identical', 'REST is newer', 'GraphQL is a database'], answer: 0 },
            { q: 'What is memoization?', options: ['Caching function results', 'A CSS property', 'A sorting algorithm', 'A testing technique'], answer: 0 },
        ]
    },
    {
        round: 2, type: 'Behavioral', boss: 'HR Dragon',
        questions: [
            { q: 'Tell me about a time you failed at something.', options: ['Describe failure + lesson learned', 'Never failed', 'Skip question', 'Not relevant'], answer: 0 },
            { q: 'Why do you want this role?', options: ['Align skills with role requirements', 'Need money', 'Random choice', 'No reason'], answer: 0 },
        ]
    },
    {
        round: 3, type: 'Final Boss', boss: '"Why should we hire you?"',
        questions: [
            { q: 'Why should we hire you over others?', options: ['Unique value + evidence', 'I am the best', 'No idea', 'Go with flow'], answer: 0 },
        ]
    },
];

const InterviewArena = () => {
    const [activeRound, setActiveRound] = useState(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [userHP, setUserHP] = useState(100);
    const [bossHP, setBossHP] = useState(100);
    const [showResults, setShowResults] = useState(false);
    const [voiceMode, setVoiceMode] = useState(false);

    const handleAnswer = (idx) => {
        const round = rounds[activeRound];
        const q = round.questions[currentQ];
        setAnswers({ ...answers, [`${activeRound}-${currentQ}`]: idx });
        if (idx === q.answer) {
            setBossHP(prev => Math.max(0, prev - 30));
        } else {
            setUserHP(prev => Math.max(0, prev - 20));
        }
    };

    const finishRound = () => {
        setShowResults(true);
    };

    const resetAll = () => {
        setActiveRound(null); setCurrentQ(0); setAnswers({}); setUserHP(100); setBossHP(100); setShowResults(false);
    };

    if (showResults) {
        const dmg = 100 - bossHP;
        return (
            <div className="max-w-lg mx-auto py-16">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center">
                    <div className="text-5xl mb-4">{bossHP <= 0 ? '🏆' : '⚔️'}</div>
                    <h2 className="text-2xl font-black mb-2">{bossHP <= 0 ? 'Boss Defeated!' : 'Battle Over!'}</h2>
                    <p className="text-text-secondary text-sm mb-4">You dealt {dmg}% damage to the interviewer.</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-navy rounded-xl p-4"><div className="text-2xl font-black text-emerald">{userHP}%</div><div className="text-xs text-text-muted">Your HP</div></div>
                        <div className="bg-navy rounded-xl p-4"><div className="text-2xl font-black text-coral">{bossHP}%</div><div className="text-xs text-text-muted">Boss HP</div></div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 rounded-lg text-xs font-bold text-gold"><Zap size={12} /> +{dmg * 4} XP</span>
                        {bossHP <= 0 && <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple/10 rounded-lg text-xs font-bold text-purple"><Trophy size={12} /> Arena Champion</span>}
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={resetAll} className="btn-primary flex items-center gap-2"><RotateCcw size={14} /> Fight Again</button>
                        <button onClick={resetAll} className="btn-ghost">All Rounds</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (activeRound !== null) {
        const round = rounds[activeRound];
        const q = round.questions[currentQ];
        const key = `${activeRound}-${currentQ}`;
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <button onClick={resetAll} className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium"><ArrowLeft size={16} /> Retreat</button>

                {/* HP Bars */}
                <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1"><Heart size={14} className="text-emerald" /><span className="text-xs font-bold">You</span></div>
                            <div className="w-full bg-navy h-3 rounded-full overflow-hidden">
                                <motion.div animate={{ width: `${userHP}%` }} className="h-full bg-gradient-to-r from-emerald to-teal-400 rounded-full" />
                            </div>
                        </div>
                        <div className="px-4 text-lg font-black text-gold">VS</div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 justify-end"><span className="text-xs font-bold">{round.boss}</span><Shield size={14} className="text-coral" /></div>
                            <div className="w-full bg-navy h-3 rounded-full overflow-hidden">
                                <motion.div animate={{ width: `${bossHP}%` }} className="h-full bg-gradient-to-r from-coral to-red-400 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple bg-purple/10 px-2.5 py-1 rounded-md">Round {activeRound + 1}: {round.type}</span>
                        <button onClick={() => setVoiceMode(!voiceMode)} className={`p-2 rounded-lg transition-all ${voiceMode ? 'bg-gold text-navy' : 'bg-surface border border-border/30 text-text-muted hover:text-gold'}`}>
                            {voiceMode ? <MicOff size={14} /> : <Mic size={14} />}
                        </button>
                    </div>

                    {voiceMode && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 my-3 px-3 py-2 rounded-xl bg-gold/10 border border-gold/20">
                            <div className="w-3 h-3 rounded-full bg-gold animate-pulse"></div>
                            <span className="text-xs font-semibold text-gold">Listening... speak your answer</span>
                        </motion.div>
                    )}

                    <p className="text-lg font-semibold my-6">{q.q}</p>
                    <div className="space-y-3">
                        {q.options.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answers[key] !== undefined}
                                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${answers[key] === idx ? (idx === q.answer ? 'border-emerald bg-emerald/10 text-emerald' : 'border-coral bg-coral/10 text-coral') : 'border-border hover:border-gold/20 hover:bg-surface-hover text-text-secondary'} disabled:cursor-default`}
                            >{opt}</button>
                        ))}
                    </div>
                    <div className="flex justify-end mt-8">
                        {currentQ < round.questions.length - 1 ? (
                            <button onClick={() => setCurrentQ(currentQ + 1)} disabled={answers[key] === undefined} className="btn-primary disabled:opacity-30">Next</button>
                        ) : (
                            <button onClick={finishRound} disabled={answers[key] === undefined} className="btn-primary flex items-center gap-1 disabled:opacity-30"><Sparkles size={16} /> Finish Round</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-2xl">⚔️</span><h1 className="text-2xl font-black">Interview Arena</h1></div>
                <p className="text-text-secondary text-sm">Enter the stone colosseum. Face boss interviewers round by round.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
                {rounds.map((r, i) => (
                    <motion.button key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActiveRound(i); setCurrentQ(0); setAnswers({}); setUserHP(100); setBossHP(100); }}
                        className="glass-card-hover text-left group relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral to-gold"></div>
                        <div className="flex items-center gap-2 mb-3">
                            <Swords size={20} className="text-coral" />
                            <h3 className="text-lg font-bold group-hover:text-gold transition-colors">Round {r.round}</h3>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">{r.type}</p>
                        <p className="text-xs text-text-muted mb-4">Boss: <span className="text-coral font-bold">{r.boss}</span></p>
                        <div className="flex items-center justify-between text-xs font-bold text-text-muted">
                            <span>{r.questions.length} Questions</span>
                            <span className="text-gold flex items-center gap-1"><Zap size={12} /> +{r.questions.length * 100} XP</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default InterviewArena;
