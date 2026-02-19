import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Briefcase, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Loader2, X, Zap, Target, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeResume } from '../services/apiService';
import { useUser } from '../context/UserContext';

const ResumeIsland = () => {
    const navigate = useNavigate();
    const { completeOnboarding, grantAchievement } = useUser();
    const fileRef = useRef(null);
    const [step, setStep] = useState('upload'); // upload | analyzing | results
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFileDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer?.files[0] || e.target?.files[0];
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.docx'))) {
            setResumeFile(file);
        }
    };

    const handleAnalyze = async () => {
        if (!resumeFile || !jobDescription.trim()) return;
        setStep('analyzing');

        try {
            const result = await analyzeResume(resumeFile, jobDescription);
            setAnalysis(result);

            // Mark onboarding as complete and grant achievement
            completeOnboarding();
            grantAchievement({
                id: 'clarity_scroll',
                name: 'Clarity Scroll Forged',
                desc: 'Analyzed your first target job',
                icon: '📜'
            });

            setTimeout(() => setStep('results'), 2000);
        } catch (err) {
            setStep('results');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <span className="text-lg">📜</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Resume Island</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                    Forge Your <span className="text-emerald-400">Clarity Scroll</span>
                </h1>
                <p className="text-text-muted text-sm max-w-lg mx-auto">Upload your resume and target job description. Nova AI will analyze your skills and craft a personalized battle plan.</p>
            </motion.div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-3">
                {['Upload', 'Analysis', 'Results'].map((label, i) => (
                    <div key={label} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${i === 0 && step === 'upload' ? 'bg-emerald-500 text-white' :
                                i === 1 && step === 'analyzing' ? 'bg-gold text-navy animate-pulse' :
                                    i === 2 && step === 'results' ? 'bg-emerald-500 text-white' :
                                        (step === 'results' && i < 2) || (step === 'analyzing' && i < 1) ? 'bg-emerald-500/20 text-emerald-400' :
                                            'bg-white/5 text-text-muted'}`}>
                            {(step === 'results' && i < 2) || (step === 'analyzing' && i < 1) ? <CheckCircle2 size={14} /> : i + 1}
                        </div>
                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider hidden sm:block">{label}</span>
                        {i < 2 && <div className="w-12 h-px bg-white/10" />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ── UPLOAD STEP ── */}
                {step === 'upload' && (
                    <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Resume Upload */}
                            <div
                                className={`relative p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center
                                    ${dragOver ? 'border-emerald-400 bg-emerald-500/10' :
                                        resumeFile ? 'border-emerald-500/30 bg-emerald-500/5' :
                                            'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'}`}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleFileDrop}
                                onClick={() => fileRef.current?.click()}
                            >
                                <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileDrop} />
                                {resumeFile ? (
                                    <div className="space-y-3">
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                            <FileText size={28} className="text-emerald-400" />
                                        </div>
                                        <p className="font-bold text-white text-sm">{resumeFile.name}</p>
                                        <p className="text-[10px] text-text-muted">{(resumeFile.size / 1024).toFixed(1)} KB • Click to replace</p>
                                        <button onClick={(e) => { e.stopPropagation(); setResumeFile(null); }} className="text-xs text-rose-400 hover:text-rose-300">Remove</button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center">
                                            <Upload size={28} className="text-text-muted" />
                                        </div>
                                        <p className="font-bold text-white text-sm">Drop your resume here</p>
                                        <p className="text-[10px] text-text-muted">PDF or DOCX • Max 5MB</p>
                                    </div>
                                )}
                            </div>

                            {/* Job Description */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase size={16} className="text-gold" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Target Job Description</span>
                                </div>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description you're targeting...&#10;&#10;Example: We are looking for a Full Stack Developer with experience in React, Node.js, PostgreSQL..."
                                    className="w-full h-[200px] bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/20 resize-none focus:outline-none focus:border-gold/30 focus:ring-2 focus:ring-gold/10 transition-all"
                                />
                                <p className="text-[10px] text-text-muted">{jobDescription.length} characters</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={handleAnalyze}
                                disabled={!resumeFile || !jobDescription.trim()}
                                className={`px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 mx-auto transition-all
                                    ${resumeFile && jobDescription.trim()
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.02]'
                                        : 'bg-white/5 text-text-muted cursor-not-allowed'}`}
                            >
                                <Sparkles size={18} /> Analyze with Nova AI
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ── ANALYZING STEP ── */}
                {step === 'analyzing' && (
                    <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-16">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 mx-auto mb-6">
                            <Loader2 size={64} className="text-gold" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2">Nova AI is analyzing...</h3>
                        <div className="space-y-2 max-w-xs mx-auto mt-6">
                            {['Parsing resume content', 'Extracting skills & experience', 'Matching against job requirements', 'Generating skill gap analysis'].map((task, i) => (
                                <motion.div key={task} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.5 }}
                                    className="flex items-center gap-3 text-sm text-text-secondary">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.5 + 0.3 }}>
                                        <CheckCircle2 size={14} className="text-emerald-400" />
                                    </motion.div>
                                    {task}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── RESULTS STEP ── */}
                {step === 'results' && analysis && (
                    <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        {/* Overall Match */}
                        <div className="text-center p-8 bg-white/[0.03] rounded-2xl border border-white/10">
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round"
                                        strokeDasharray={`${analysis.overallMatch * 3.27} 327`}
                                        initial={{ strokeDasharray: '0 327' }}
                                        animate={{ strokeDasharray: `${analysis.overallMatch * 3.27} 327` }}
                                        transition={{ duration: 1.5, ease: 'easeOut' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-3xl font-black text-white">{analysis.overallMatch}%</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white">Skill Match Score</h3>
                            <p className="text-xs text-text-muted mt-1">Estimated prep: {analysis.estimatedPrepTime}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Matched Skills */}
                            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                                    <CheckCircle2 size={18} className="text-emerald-400" /> Skills You Have
                                </h3>
                                <div className="space-y-3">
                                    {analysis.matchedSkills.map((skill) => (
                                        <div key={skill.name} className="flex items-center justify-between">
                                            <span className="text-sm text-white/80">{skill.name}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.match}%` }} transition={{ duration: 1 }} className="h-full bg-emerald-400 rounded-full" />
                                                </div>
                                                <span className="text-[10px] font-bold text-emerald-400 w-8">{skill.match}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Missing Skills */}
                            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                                <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                                    <AlertCircle size={18} className="text-gold" /> Skills to Learn
                                </h3>
                                <div className="space-y-3">
                                    {analysis.missingSkills.map((skill) => (
                                        <div key={skill.name} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/5">
                                            <div>
                                                <span className="text-sm font-bold text-white">{skill.name}</span>
                                                <p className="text-[10px] text-text-muted">{skill.weeks} weeks</p>
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded
                                                ${skill.priority === 'high' ? 'bg-rose-500/10 text-rose-400' :
                                                    skill.priority === 'medium' ? 'bg-gold/10 text-gold' :
                                                        'bg-white/5 text-text-muted'}`}>
                                                {skill.priority}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA to Roadmap */}
                        <div className="text-center p-8 bg-gradient-to-r from-gold/5 to-emerald-500/5 rounded-2xl border border-gold/20">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                                <Target size={20} className="text-gold" /> Your AI Learning Roadmap is Ready
                            </h3>
                            <p className="text-sm text-text-muted mb-6">Week-by-week plan with theory, videos, practice, and interview questions.</p>
                            <button
                                onClick={() => navigate('/roadmap')}
                                className="px-8 py-4 bg-gradient-to-r from-gold to-sunlight text-navy font-bold rounded-xl flex items-center gap-2 mx-auto hover:shadow-xl hover:scale-[1.02] transition-all shadow-lg shadow-gold/20"
                            >
                                <BookOpen size={18} /> View Full Roadmap <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeIsland;
