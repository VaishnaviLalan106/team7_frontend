import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Zap, Trophy, CheckCircle2, XCircle, RotateCcw, ArrowLeft, Sparkles, Terminal, Gamepad2, Brain } from 'lucide-react';

const puzzles = [
    { id: 'bug', name: '🐛 Fix The Bug', desc: 'Identify and resolve the logic flaw in the crystal code', xp: 100, icon: '💎' },
    { id: 'func', name: '📦 Complete Function', desc: 'Inscribe the missing logic into the sacred function', xp: 150, icon: '📜' },
    { id: 'logic', name: '🧩 Logic Puzzle', desc: 'Solve the riddle of the ancient algorithm', xp: 200, icon: '🗿' },
];

const CodeDungeon = () => {
    const [active, setActive] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [code, setCode] = useState('');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        let timer;
        if (active && timeLeft > 0 && !showResults) {
            timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0) {
            setShowResults(true);
        }
        return () => clearInterval(timer);
    }, [active, timeLeft, showResults]);

    const handleSubmit = () => setShowResults(true);

    if (showResults) {
        const success = timeLeft > 0;
        return (
            <div className="max-w-xl mx-auto py-16 px-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center border-stone-200 shadow-stone/5 shadow-2xl">
                    <div className="text-6xl mb-6">{success ? '🏆' : '⏳'}</div>
                    <h2 className="text-3xl font-black text-white mb-2">{success ? 'Puzzle Deciphered!' : 'Time Depleted'}</h2>
                    <p className="text-text-secondary font-bold text-sm mb-6 uppercase tracking-widest italic">Expedition Result: {success ? 'Solved' : 'Incomplete'}</p>

                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sunlight/20 border border-sunlight/40 rounded-2xl text-xs font-black text-gold"><Zap size={14} className="fill-gold text-gold" /> +{success ? 150 : 20} XP</span>
                        {success && <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-100 border border-stone-200 rounded-2xl text-xs font-black text-stone-600"><Trophy size={14} /> Rune Master</span>}
                    </div>

                    <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-8 mb-8 text-left relative overflow-hidden">
                        <div className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Solution Insight</div>
                        <p className="text-sm font-bold text-white leading-relaxed">
                            {success ? "You have successfully aligned the runes of logic. The crystal path is open!" : "The ancient runes require more swiftness. Meditate on the logic and retry the quest."}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button onClick={() => { setTimeLeft(60); setCode(''); setShowResults(false); }} className="btn-primary flex-1 py-4 text-lg"><RotateCcw size={18} /> Retry Quest</button>
                        <button onClick={() => { setActive(null); setShowResults(false); }} className="btn-ghost px-10">Map</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (active) {
        const puzzle = puzzles.find(p => p.id === active);
        return (
            <div className="max-w-4xl mx-auto space-y-8 px-4 pb-12">
                <button onClick={() => { setActive(null); setCode(''); }} className="flex items-center gap-2 text-white hover:text-rose transition-colors text-sm font-black uppercase tracking-widest"><ArrowLeft size={18} /> Surface to Outpost</button>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="glass-card p-10 border-white/10 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 text-7xl">{puzzle.icon}</div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="px-4 py-1.5 bg-rose text-white text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse shadow-lg shadow-rose/20">Active Timer</div>
                            <div className="text-3xl font-black text-white">{timeLeft}s</div>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-4 relative z-10">{puzzle.name}</h3>
                        <p className="text-sm font-medium text-text-secondary mb-8 leading-relaxed italic relative z-10">{puzzle.desc}</p>

                        <div className="mt-auto bg-white/5/40 p-6 rounded-3xl border-2 border-white/10 relative z-10">
                            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Terminal size={14} className="text-grass" /> Ancient Rune Inscription
                            </div>
                            <div className="font-mono text-sm text-white/80 space-y-2 opacity-60">
                                <div className="text-rose">function</div> <span className="text-grass">resolveMystery</span>(path) &#123;
                                <div className="pl-6">let key = <span className="text-gold">"..."</span>;</div>
                                <div className="pl-6">return <span className="text-rose">null</span>; <span className="text-stone-300 italic">// FIX ME</span></div>
                                &#125;
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-10 border-white/10 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-lg text-white">Your Cipher Inscription</h3>
                            <span className="text-[10px] font-black text-grass uppercase tracking-widest bg-grass/10 px-3 py-1 rounded-lg">JavaScript</span>
                        </div>
                        <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Type your solution here..."
                            className="flex-1 bg-white/5 border-2 border-white/10 rounded-[2rem] p-8 text-sm font-mono focus:outline-none focus:ring-4 focus:ring-grass/20 focus:border-grass/40 transition-all text-white placeholder-white/30 resize-none shadow-none mb-8"
                        />
                        <button onClick={handleSubmit} className="btn-primary w-full py-4 text-lg group">
                            <Sparkles size={20} className="group-hover:animate-spin" /> Cast Solution Rune
                        </button>
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
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-stone-400 to-stone-600 flex items-center justify-center text-white shadow-lg shadow-stone/20">
                            <Code2 size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-white">Code Dungeon</h1>
                    </div>
                    <p className="text-text-secondary font-medium pl-1">Unravel the logic riddles in the crystal caverns of the deep.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-sunlight/10 border border-sunlight/30 rounded-2xl">
                    <Zap size={16} className="text-gold fill-gold" />
                    <span className="text-xs font-black text-gold uppercase tracking-widest">Potential: +350 XP</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {puzzles.map((p, i) => (
                    <motion.button key={p.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => { setActive(p.id); setTimeLeft(60); setCode(''); }}
                        className="glass-card-hover text-left group relative overflow-hidden h-full border-white/10 p-10"
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-stone-300 opacity-40"></div>
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-5xl mb-8 filter drop-shadow-sm group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                        <h3 className="text-2xl font-black text-white group-hover:text-stone-600 transition-colors mb-4">{p.name}</h3>
                        <p className="text-sm font-medium text-text-secondary mb-10 italic">{p.desc}</p>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
                            <span className="flex items-center gap-2">60s Timer <RotateCcw size={12} /></span>
                            <span className="text-gold flex items-center gap-1.5"><Zap size={14} className="fill-gold" /> +{p.xp} XP</span>
                        </div>
                        <div className="absolute bottom-[-20px] right-[-20px] text-8xl opacity-5 group-hover:rotate-12 transition-transform text-stone-800">{p.icon}</div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CodeDungeon;
