import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Heart, Shield, Zap, Trophy, ArrowLeft, RotateCcw, Sparkles, Mic, MicOff, Users } from 'lucide-react';

const rounds = [
    {
        round: 1, type: 'Technical', boss: 'Tech Lead Golem', icon: '🪨',
        questions: [
            { q: 'Explain the difference between REST and GraphQL.', options: ['REST uses URLs, GraphQL uses queries', 'They are identical', 'REST is newer', 'GraphQL is a database'], answer: 0 },
            { q: 'What is memoization?', options: ['Caching function results', 'A CSS property', 'A sorting algorithm', 'A testing technique'], answer: 0 },
        ]
    },
    {
        round: 2, type: 'Behavioral', boss: 'People Dragon', icon: '🐉',
        questions: [
            { q: 'Tell me about a time you failed at something.', options: ['Describe failure + lesson learned', 'Never failed', 'Skip question', 'Not relevant'], answer: 0 },
            { q: 'Why do you want this role?', options: ['Align skills with role requirements', 'Need money', 'Random choice', 'No reason'], answer: 0 },
        ]
    },
    {
        round: 3, type: 'Final Boss', boss: '"The Offer Guardian"', icon: '🔱',
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
            <div className="max-w-xl mx-auto py-16 px-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center border-rose-200 shadow-rose/10 shadow-2xl">
                    <div className="text-6xl mb-6">{bossHP <= 0 ? '🏆' : '⚔️'}</div>
                    <h2 className="text-3xl font-black text-white mb-2">{bossHP <= 0 ? 'Beast Defeated!' : 'Battle Concluded'}</h2>
                    <p className="text-text-secondary font-bold text-sm mb-8 uppercase tracking-widest italic">You dealt {dmg}% damage to the boss</p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-6 shadow-none flex flex-col items-center">
                            <span className="text-[10px] font-black text-grass uppercase tracking-widest mb-2">Survivability</span>
                            <div className="text-3xl font-black text-grass">{userHP}%</div>
                        </div>
                        <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-6 shadow-none flex flex-col items-center">
                            <span className="text-[10px] font-black text-rose uppercase tracking-widest mb-2">Boss Vitality</span>
                            <div className="text-3xl font-black text-rose">{bossHP}%</div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-10">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sunlight/20 border border-sunlight/40 rounded-2xl text-xs font-black text-gold"><Zap size={14} className="fill-gold text-gold" /> +{dmg * 4} XP</span>
                        {bossHP <= 0 && <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest/10 border border-forest/20 rounded-2xl text-xs font-black text-white"><Trophy size={14} /> Arena Champion</span>}
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button onClick={resetAll} className="btn-primary flex-1 py-4 text-lg"><RotateCcw size={18} /> Fight Again</button>
                        <button onClick={resetAll} className="btn-ghost px-10">Retreat</button>
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
            <div className="max-w-4xl mx-auto space-y-8 px-4 pb-12">
                <button onClick={resetAll} className="flex items-center gap-2 text-white hover:text-rose transition-colors text-sm font-black uppercase tracking-widest"><ArrowLeft size={18} /> Fall Back</button>

                <div className="glass-card p-10 relative overflow-hidden border-rose-100">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 p-2 px-6 bg-rose text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-b-2xl shadow-lg">In Combat</div>

                    {/* Life Bars */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-6 mb-12">
                        <div className="flex-1 w-full">
                            <div className="flex items-center justify-between gap-3 mb-2 px-1">
                                <div className="flex items-center gap-2"><Heart size={16} className="text-rose fill-rose" /><span className="text-xs font-black text-white uppercase italic">Adventurer Vitality</span></div>
                                <span className="text-xs font-black text-white">{userHP}%</span>
                            </div>
                            <div className="w-full bg-white/10 h-5 rounded-full overflow-hidden p-1 border-2 border-white shadow-none">
                                <motion.div animate={{ width: `${userHP}%` }} className="h-full bg-gradient-to-r from-rose to-rose-400 rounded-full shadow-lg shadow-rose/20" />
                            </div>
                        </div>

                        <div className="px-6 text-2xl font-black text-gold animate-pulse shrink-0">VS</div>

                        <div className="flex-1 w-full">
                            <div className="flex items-center justify-between gap-3 mb-2 px-1 text-right">
                                <span className="text-xs font-black text-white">{bossHP}%</span>
                                <div className="flex items-center gap-2"><span className="text-xs font-black text-white uppercase italic">{round.boss}</span><Shield size={16} className="text-white" /></div>
                            </div>
                            <div className="w-full bg-white/10 h-5 rounded-full overflow-hidden p-1 border-2 border-white shadow-none">
                                <motion.div animate={{ width: `${bossHP}%` }} className="h-full bg-gradient-to-l from-forest to-grass rounded-full shadow-lg shadow-forest/20" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <span className="text-xs font-black text-white uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-xl shadow-sm">Round {activeRound + 1}: {round.type}</span>
                        <button onClick={() => setVoiceMode(!voiceMode)} className={`p-3 rounded-2xl transition-all shadow-md ${voiceMode ? 'bg-gold text-gold rotate-12' : 'bg-white border border-white/10 text-text-muted hover:text-gold'}`}>
                            {voiceMode ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                    </div>

                    {voiceMode && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 my-6 px-6 py-4 rounded-2xl bg-sunlight/20 border-2 border-sunlight/40 shadow-xl shadow-gold/10">
                            <div className="w-4 h-4 rounded-full bg-gold animate-ping"></div>
                            <span className="text-sm font-black text-gold uppercase tracking-widest">Deep Learning Listening... Speak Clearly</span>
                        </motion.div>
                    )}

                    <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border-2 border-white/5 min-h-[200px] flex flex-col justify-center mb-10 text-center relative">
                        <div className="absolute top-0 left-0 p-8 opacity-5 text-8xl">{round.icon}</div>
                        <p className="text-3xl font-black text-white relative z-10 leading-tight drop-shadow-sm">"{q.q}"</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {q.options.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answers[key] !== undefined}
                                className={`w-full text-left px-8 py-6 rounded-3xl border-2 text-sm font-black transition-all relative overflow-hidden group ${answers[key] === idx ? (idx === q.answer ? 'border-grass bg-grass text-white shadow-xl shadow-grass/20' : 'border-rose bg-rose text-white shadow-xl shadow-rose/20') : 'border-white/10 bg-white/5 hover:border-gold/30 hover:bg-white/10 text-text-secondary hover:text-white'}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all shadow-sm ${answers[key] === idx ? 'bg-white/20' : 'bg-white/10 text-white/50 group-hover:bg-sunlight group-hover:text-gold'}`}>
                                        {idx + 1}
                                    </div>
                                    {opt}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end mt-12 pt-8 border-t border-white/10">
                        {currentQ < round.questions.length - 1 ? (
                            <button onClick={() => setCurrentQ(currentQ + 1)} disabled={answers[key] === undefined} className="btn-primary px-12 capitalize shadow-lg disabled:opacity-30 italic">Next Strike</button>
                        ) : (
                            <button onClick={finishRound} disabled={answers[key] === undefined} className="btn-primary flex items-center gap-2 px-16 shadow-xl shadow-grass/20 disabled:opacity-30">
                                <Sparkles size={20} className="animate-pulse" /> Final Blow
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
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose to-rose flex items-center justify-center text-white shadow-lg shadow-rose/20">
                            <Users size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-white">Interview Arena</h1>
                    </div>
                    <p className="text-text-secondary font-medium pl-1">Prove your worth in the stone colosseum of the elite.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-sunlight/10 border border-sunlight/30 rounded-2xl">
                    <Zap size={16} className="text-gold fill-gold" />
                    <span className="text-xs font-black text-gold uppercase tracking-widest">Potential: +400 XP</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {rounds.map((r, i) => (
                    <motion.button key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActiveRound(i); setCurrentQ(0); setAnswers({}); setUserHP(100); setBossHP(100); }}
                        className="glass-card-hover text-left group relative overflow-hidden h-full border-white/10 p-8"
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose to-gold opacity-30"></div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{r.icon}</div>
                            <h3 className="text-xl font-black text-white group-hover:text-rose transition-colors leading-tight">Round {r.round}</h3>
                        </div>
                        <p className="text-sm font-black text-rose uppercase tracking-widest mb-2 italic">{r.type}</p>
                        <p className="text-sm font-medium text-text-secondary mb-8 italic">Guardian: <span className="text-white font-black tracking-normal">{r.boss}</span></p>

                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted mt-auto pt-6 border-t border-white/5">
                            <span className="flex items-center gap-1.5"><Heart size={10} className="text-rose fill-rose" /> {r.questions.length} Rounds</span>
                            <span className="text-gold flex items-center gap-1"><Zap size={12} className="fill-gold" /> +{r.questions.length * 100} XP</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default InterviewArena;
