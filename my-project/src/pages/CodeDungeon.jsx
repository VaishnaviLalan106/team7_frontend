import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Clock, Zap, Trophy, CheckCircle2, XCircle, RotateCcw, ArrowLeft, Sparkles } from 'lucide-react';

const challenges = [
    {
        id: 'bug', name: '🐛 Fix The Bug', desc: 'Find and fix the error in the code snippet', xp: 100, color: 'from-coral to-red-400',
        items: [
            { code: 'const arr = [1,2,3];\nconsole.log(arr[3]);', question: 'What is the issue?', options: ['Index out of bounds', 'Syntax error', 'Missing semicolon', 'No issue'], answer: 0 },
            { code: 'function add(a, b) {\n  return a - b;\n}', question: 'Fix the bug:', options: ['Change - to +', 'Add return', 'Remove function', 'Add const'], answer: 0 },
        ]
    },
    {
        id: 'complete', name: '🧩 Complete Function', desc: 'Fill in the missing logic to complete the function', xp: 150, color: 'from-blue-400 to-cyan-400',
        items: [
            { code: 'function reverse(str) {\n  return ___;\n}', question: 'Complete the function:', options: ['str.split("").reverse().join("")', 'str.reverse()', 'str.flip()', 'str.sort()'], answer: 0 },
            { code: 'function isEven(n) {\n  return ___;\n}', question: 'Complete:', options: ['n % 2 === 0', 'n / 2', 'n == even', 'Math.even(n)'], answer: 0 },
        ]
    },
    {
        id: 'logic', name: '🔮 Logic Puzzle', desc: 'Solve logic and pattern problems under time pressure', xp: 200, color: 'from-purple to-violet-400',
        items: [
            { code: 'Pattern: 2, 6, 18, 54, ?', question: 'Next number?', options: ['162', '108', '72', '216'], answer: 0 },
            { code: 'If A=1, B=2... Z=26\nWhat is CAB?', question: 'Answer:', options: ['6', '312', '3+1+2', '123'], answer: 0 },
        ]
    },
];

const CodeDungeon = () => {
    const [active, setActive] = useState(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(60);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (active === null || done) return;
        if (timer <= 0) { setDone(true); return; }
        const t = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(t);
    }, [timer, active, done]);

    const challenge = active !== null ? challenges[active] : null;
    const items = challenge?.items || [];

    const handleAnswer = (idx) => {
        setAnswers({ ...answers, [currentQ]: idx });
        if (currentQ < items.length - 1) {
            setTimeout(() => setCurrentQ(currentQ + 1), 300);
        } else {
            setDone(true);
        }
    };

    const calcScore = () => {
        let c = 0;
        items.forEach((item, i) => { if (answers[i] === item.answer) c++; });
        return c;
    };

    if (done && challenge) {
        const score = calcScore();
        return (
            <div className="max-w-lg mx-auto py-16">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center">
                    <div className="text-5xl mb-4">{score === items.length ? '💎' : '🔮'}</div>
                    <h2 className="text-2xl font-black mb-2">{score === items.length ? 'Dungeon Cleared!' : 'Almost There!'}</h2>
                    <p className="text-text-secondary text-sm mb-4">{score}/{items.length} correct • {60 - timer}s used</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 rounded-lg text-xs font-bold text-gold"><Zap size={12} /> +{score * 50} XP</span>
                        {score === items.length && <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple/10 rounded-lg text-xs font-bold text-purple"><Trophy size={12} /> Dungeon Master</span>}
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => { setActive(null); setCurrentQ(0); setAnswers({}); setTimer(60); setDone(false); }} className="btn-primary flex items-center gap-2"><RotateCcw size={14} /> Retry</button>
                        <button onClick={() => { setActive(null); setDone(false); setCurrentQ(0); setAnswers({}); setTimer(60); }} className="btn-ghost">All Challenges</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (challenge) {
        const item = items[currentQ];
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <button onClick={() => { setActive(null); setCurrentQ(0); setAnswers({}); setTimer(60); setDone(false); }} className="flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium"><ArrowLeft size={16} /> Escape</button>
                <div className="glass-card">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-purple bg-purple/10 px-2.5 py-1 rounded-md">{challenge.name}</span>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${timer <= 10 ? 'bg-coral/10 border-coral/20 text-coral' : 'bg-gold/10 border-gold/20 text-gold'}`}>
                            <Clock size={14} />
                            <span className="text-sm font-bold">{timer}s</span>
                        </div>
                    </div>
                    <pre className="bg-navy rounded-xl p-4 text-sm font-mono text-emerald mb-4 overflow-x-auto">{item.code}</pre>
                    <p className="text-lg font-semibold mb-4">{item.question}</p>
                    <div className="space-y-3">
                        {item.options.map((opt, idx) => (
                            <button key={idx} onClick={() => handleAnswer(idx)} disabled={answers[currentQ] !== undefined}
                                className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${answers[currentQ] === idx ? (idx === item.answer ? 'border-emerald bg-emerald/10 text-emerald' : 'border-coral bg-coral/10 text-coral') : 'border-border hover:border-gold/20 hover:bg-surface-hover text-text-secondary'}`}
                            >{opt}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-2xl">🧩</span><h1 className="text-2xl font-black">Code Dungeon</h1></div>
                <p className="text-text-secondary text-sm">Enter the crystal cave. Solve coding puzzles under time pressure.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
                {challenges.map((c, i) => (
                    <motion.button key={c.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActive(i); setCurrentQ(0); setAnswers({}); setTimer(60); setDone(false); }}
                        className="glass-card-hover text-left group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`}></div>
                        <div className="text-3xl mb-3">{c.name.split(' ')[0]}</div>
                        <h3 className="text-lg font-bold group-hover:text-gold transition-colors mb-1">{c.name.split(' ').slice(1).join(' ')}</h3>
                        <p className="text-sm text-text-secondary mb-4">{c.desc}</p>
                        <div className="flex items-center justify-between text-xs font-bold text-text-muted">
                            <span className="flex items-center gap-1"><Clock size={12} /> 60s Timer</span>
                            <span className="text-gold flex items-center gap-1"><Zap size={12} /> +{c.xp} XP</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CodeDungeon;
