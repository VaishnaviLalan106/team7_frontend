import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, FileText, Briefcase, Sparkles, X, CheckCircle2, Bot, ArrowRight, Mic, Zap, Trophy } from 'lucide-react';
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
            <div className="max-w-lg mx-auto py-16">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card text-center">
                    <div className="text-5xl mb-4 animate-chest">🎁</div>
                    <h2 className="text-2xl font-black mb-2">Treasure Unlocked!</h2>
                    <p className="text-text-secondary text-sm mb-2">The Clarity Scroll reveals your skill profile.</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold/10 rounded-lg text-xs font-bold text-gold"><Zap size={12} /> +200 XP</span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple/10 rounded-lg text-xs font-bold text-purple"><Trophy size={12} /> Scroll Forger</span>
                    </div>

                    {/* Simulated match results */}
                    <div className="glass-card bg-navy mb-6 text-left">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold">Resume vs JD Match</span>
                            <span className="text-2xl font-black text-gold">78%</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { skill: 'React.js', match: true }, { skill: 'Node.js', match: true },
                                { skill: 'TypeScript', match: false }, { skill: 'System Design', match: false },
                                { skill: 'SQL', match: true },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    {s.match ? <CheckCircle2 size={14} className="text-emerald" /> : <X size={14} className="text-coral" />}
                                    <span className="text-sm">{s.skill}</span>
                                    <span className={`text-[10px] font-bold ml-auto ${s.match ? 'text-emerald' : 'text-coral'}`}>{s.match ? 'Match' : 'Gap'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/concept-caverns" className="btn-primary flex items-center justify-center gap-2">Next Zone <ArrowRight size={16} /></Link>
                        <button onClick={() => { setDone(false); setResume(null); setJd(''); }} className="btn-ghost">Upload Another</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">🏝</span>
                    <h1 className="text-2xl font-black">Resume Island</h1>
                </div>
                <p className="text-text-secondary text-sm">Forge your resume. AI reveals the Clarity Scroll — your skill match against any role.</p>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card flex items-center gap-4 bg-gradient-to-r from-gold/5 to-purple/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-navy" />
                </div>
                <div>
                    <p className="text-sm font-medium">"Upload your resume & paste the JD. I'll forge the Clarity Scroll for you!"</p>
                    <p className="text-xs text-text-muted mt-0.5">— Nova AI</p>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold"><FileText size={20} /></div>
                        <h3 className="font-bold text-lg">Resume Scroll</h3>
                    </div>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl py-12 cursor-pointer hover:border-gold/30 hover:bg-surface-hover/30 transition-all group">
                        <input type="file" className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx" />
                        <UploadIcon size={36} className="text-text-muted group-hover:text-gold transition-colors mb-3" />
                        <span className="font-semibold text-sm text-text-secondary group-hover:text-text-primary">{resume ? resume.name : 'Drop your resume here'}</span>
                        <span className="text-xs text-text-muted mt-1">PDF, DOC, DOCX</span>
                    </label>
                    {resume && (
                        <div className="mt-4 flex items-center justify-between bg-emerald/10 px-4 py-3 rounded-xl border border-emerald/20">
                            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald" /><span className="text-sm font-medium text-emerald">{resume.name}</span></div>
                            <button onClick={() => setResume(null)} className="text-text-muted hover:text-red-400"><X size={16} /></button>
                        </div>
                    )}
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center text-purple"><Briefcase size={20} /></div>
                            <h3 className="font-bold text-lg">Target Quest</h3>
                        </div>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-xs font-bold text-gold">
                            <Mic size={12} /> Voice
                        </button>
                    </div>
                    <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the job description here..."
                        rows={8} className="w-full bg-navy border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all text-text-primary placeholder-text-muted resize-none"
                    />
                </motion.div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center">
                <button onClick={handleAnalyze} disabled={!resume || !jd.trim() || analyzing} className="btn-primary py-3.5 px-10 text-base flex items-center gap-2 disabled:opacity-40">
                    {analyzing ? (
                        <><div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin"></div>Forging Scroll...</>
                    ) : (
                        <><Sparkles size={18} /> Forge the Clarity Scroll</>
                    )}
                </button>
            </motion.div>

            <AnimatePresence>
                {analyzing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-amber flex items-center justify-center"><Sparkles size={14} className="text-navy animate-spin" /></div>
                            <div><div className="text-sm font-bold">Forging the Clarity Scroll...</div><div className="text-xs text-text-muted">AI is analyzing your skills</div></div>
                        </div>
                        <div className="space-y-3">
                            {['Parsing resume content...', 'Extracting skills & experience...', 'Matching with quest requirements...', 'Generating clarity scroll...'].map((step, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.6 }} className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${i < 2 ? 'bg-emerald' : 'bg-gold animate-pulse'}`}></div>
                                    <span className="text-sm text-text-secondary">{step}</span>
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
