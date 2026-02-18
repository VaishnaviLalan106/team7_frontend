import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, FileText, Briefcase, Sparkles, X, CheckCircle2, Bot, ArrowRight, Mic, Zap, Trophy, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeIsland = () => {
    const [resume, setResume] = useState(null);
    const [jd, setJd] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [done, setDone] = useState(false);

    const handleUpload = (e) => { if (e.target.files[0]) setResume(e.target.files[0]); };

    const handleAnalyze = () => {
        if (!resume || !jd.trim()) return;
        setAnalyzing(true);
        setTimeout(() => { setAnalyzing(false); setDone(true); }, 3000);
    };

    if (done) {
        return (
            <div className="max-w-xl mx-auto py-16 px-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center relative border-sunlight/40 shadow-2xl shadow-gold/10">
                    <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-white/5 p-3 rounded-full border-2 border-sunlight/40 shadow-lg">
                        <div className="text-4xl animate-bounce">🎁</div>
                    </div>
                    <h2 className="text-3xl font-black text-white mt-6 mb-2">Treasure Unveiled!</h2>
                    <p className="text-text-secondary font-bold text-sm mb-4 uppercase tracking-widest italic">The Clarity Scroll reveals your path</p>

                    <div className="flex items-center justify-center gap-3 mb-8">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-sunlight/20 border border-sunlight/40 rounded-2xl text-xs font-black text-gold"><Zap size={14} className="fill-gold text-gold" /> +200 XP</span>
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-grass/10 border border-grass/20 rounded-2xl text-xs font-black text-white"><Trophy size={14} /> Scroll Master</span>
                    </div>

                    <div className="bg-white/5 border-2 border-white/10 rounded-3xl p-8 mb-8 text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 rotate-12 opacity-10">📜</div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Expedition Match</span>
                            <span className="text-3xl font-black text-gold drop-shadow-sm">78%</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { skill: 'React.js', match: true }, { skill: 'Node.js', match: true },
                                { skill: 'TypeScript', match: false }, { skill: 'System Design', match: false },
                                { skill: 'SQL', match: true },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white">
                                    <div className={`p-1.5 rounded-lg ${s.match ? 'bg-grass/20 text-white' : 'bg-rose/10 text-rose'}`}>
                                        {s.match ? <CheckCircle2 size={16} /> : <X size={16} />}
                                    </div>
                                    <span className="text-sm font-bold text-white">{s.skill}</span>
                                    <span className={`text-[10px] font-black ml-auto uppercase tracking-tighter ${s.match ? 'text-white' : 'text-rose'}`}>{s.match ? 'Matched' : 'Gap Found'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/concept-caverns" className="btn-primary flex-1 py-4 text-lg">Next Territory <ArrowRight size={18} /></Link>
                        <button onClick={() => { setDone(false); setResume(null); setJd(''); }} className="btn-ghost px-10">New Scroll</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-grass to-forest flex items-center justify-center text-white shadow-lg shadow-grass/20">
                            <ScrollText size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-white">Resume Island</h1>
                    </div>
                    <p className="text-text-secondary font-medium pl-1">Forge your legacy scroll. AI clarifies your match against destiny.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-sunlight/10 border border-sunlight/30 rounded-2xl">
                    <Zap size={16} className="text-gold fill-gold" />
                    <span className="text-xs font-black text-gold uppercase tracking-widest">Potential: +200 XP</span>
                </div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="glass-card flex items-center gap-6 bg-gradient-to-r from-grass/10 to-sunlight/10 border-grass/20 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 rotate-12 opacity-5 text-6xl">🌴</div>
                <div className="w-14 h-14 rounded-[1.2rem] bg-forest flex items-center justify-center flex-shrink-0 shadow-lg shadow-forest/20">
                    <Bot size={28} className="text-sunlight" />
                </div>
                <div>
                    <p className="text-lg font-black text-white leading-tight italic">"Adventurer, lay your parchment here. We shall forge the Clarity Scroll together!"</p>
                    <p className="text-xs font-black text-grass mt-1 uppercase tracking-widest">— Nova AI Expedition Lead</p>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card border-white/10 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-sunlight/20 flex items-center justify-center text-gold shadow-sm"><FileText size={24} /></div>
                        <div>
                            <h3 className="font-black text-lg text-white">The Career Parchment</h3>
                            <p className="text-[10px] font-black text-grass uppercase tracking-tighter">Your Current Resume</p>
                        </div>
                    </div>

                    <label className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-white/10 rounded-[2rem] py-16 cursor-pointer hover:border-sunlight hover:bg-white/5 transition-all group relative overflow-hidden">
                        <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-text-muted group-hover:text-gold group-hover:scale-110 transition-all mb-4">
                            <UploadIcon size={40} />
                        </div>
                        <span className="font-black text-lg text-text-secondary group-hover:text-white">{resume ? resume.name : 'Lay Parchment Here'}</span>
                        <span className="text-[10px] font-black text-white/40 mt-2 uppercase tracking-widest">Supports PDF, DOC, DOCX</span>
                    </label>

                    {resume && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 flex items-center justify-between bg-grass/10 px-6 py-4 rounded-[1.5rem] border-2 border-grass/20">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 size={20} className="text-grass" />
                                <span className="text-sm font-black text-white">{resume.name}</span>
                            </div>
                            <button onClick={() => setResume(null)} className="text-text-muted hover:text-rose transition-colors p-2"><X size={20} /></button>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-grass/10 flex items-center justify-center text-white shadow-sm"><Briefcase size={24} /></div>
                            <div>
                                <h3 className="font-black text-lg text-white">The Target Quest</h3>
                                <p className="text-[10px] font-black text-grass uppercase tracking-tighter">Job Description</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-gold font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gold/20 hover:scale-105 transition-all">
                            <Mic size={14} /> Voice Entry
                        </button>
                    </div>
                    <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Inscribe the quest requirements here (Paste the Job Description)..."
                        rows={10} className="w-full bg-white/5 border-2 border-white/10 rounded-[2rem] p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-grass/20 focus:border-grass/40 transition-all text-white placeholder-white/30 resize-none shadow-none"
                    />
                </motion.div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center pt-4">
                <button onClick={handleAnalyze} disabled={!resume || !jd.trim() || analyzing}
                    className="btn-primary py-5 px-16 text-xl shadow-2xl flex items-center gap-3 disabled:opacity-40 hover:scale-105 transition-transform"
                >
                    {analyzing ? (
                        <><div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>Forging Scroll...</>
                    ) : (
                        <><Sparkles size={24} className="animate-pulse" /> Forge Clarity Scroll</>
                    )}
                </button>
            </motion.div>

            <AnimatePresence>
                {analyzing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card max-w-2xl mx-auto border-sunlight/40 bg-gradient-to-br from-white to-ivory">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-sunlight flex items-center justify-center shadow-lg shadow-gold/20"><Sparkles size={20} className="text-gold animate-spin-slow" /></div>
                            <div>
                                <div className="text-lg font-black text-white leading-tight">Forging the Clarity Scroll...</div>
                                <div className="text-xs font-black text-grass uppercase tracking-widest">AI analysis in progress</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {['Deciphering parchment content...', 'Extracting hidden skills...', 'Mapping your experience path...', 'Inscribing final clarity scores...'].map((step, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.6 }} className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full shadow-sm ${i < 2 ? 'bg-grass animate-pulse' : 'bg-sunlight'}`}></div>
                                    <span className="text-sm font-bold text-text-secondary">{step}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeIsland;
