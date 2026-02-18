import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronRight, Play, ExternalLink, FileText, MessageSquare, CheckCircle2, Circle, Sparkles, Zap, Target, Hammer, Clock, Youtube, Globe, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateRoadmap } from '../services/apiService';

const ResourceBadge = ({ type }) => {
    const styles = {
        video: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        article: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        practice: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };
    const icons = { video: <Play size={8} />, article: <Globe size={8} />, practice: <Code2 size={8} /> };
    return (
        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border flex items-center gap-1 ${styles[type] || styles.article}`}>
            {icons[type]} {type}
        </span>
    );
};

const TopicCard = ({ topic, onToggle, completed }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`rounded-xl border transition-all ${completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/10'}`}>
            <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 p-4 text-left">
                <div onClick={(e) => { e.stopPropagation(); onToggle(); }} className="shrink-0 cursor-pointer">
                    {completed ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} className="text-white/20 hover:text-white/40 transition-colors" />}
                </div>
                <span className={`text-sm font-bold flex-1 ${completed ? 'text-emerald-400 line-through opacity-60' : 'text-white'}`}>{topic.name}</span>
                {expanded ? <ChevronDown size={16} className="text-text-muted" /> : <ChevronRight size={16} className="text-text-muted" />}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
                            {/* Theory */}
                            {topic.theory && (
                                <div className="p-4 bg-white/[0.03] rounded-lg border border-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={12} className="text-gold" />
                                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider">AI Theory Notes</span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed whitespace-pre-line">{topic.theory}</p>
                                </div>
                            )}

                            {/* Resources */}
                            {topic.resources && (
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Resources</span>
                                    {topic.resources.map((res, i) => (
                                        <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                                            <ResourceBadge type={res.type} />
                                            <span className="text-xs font-bold text-white/80 flex-1 group-hover:text-white">{res.title}</span>
                                            {res.duration && <span className="text-[10px] text-text-muted">{res.duration}</span>}
                                            <ExternalLink size={12} className="text-text-muted group-hover:text-white" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const WeekAccordion = ({ week, weekData, completedTopics, toggleTopic, navigate }) => {
    const [open, setOpen] = useState(week === 1);
    const topicsDone = weekData.topics.filter((_, i) => completedTopics.includes(`${week}-${i}`)).length;
    const progress = (topicsDone / weekData.topics.length) * 100;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: week * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-sm font-black text-gold shrink-0">
                    W{week}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">{weekData.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                        <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-[10px] text-text-muted">{topicsDone}/{weekData.topics.length} topics</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {weekData.projects?.length > 0 && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded hidden sm:block">
                            {weekData.projects.length} projects
                        </span>
                    )}
                    <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-1 rounded hidden sm:block">
                        {weekData.interviews?.length || 0} questions
                    </span>
                    {open ? <ChevronDown size={18} className="text-text-muted" /> : <ChevronRight size={18} className="text-text-muted" />}
                </div>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 space-y-6">
                            {/* Topics */}
                            <div className="space-y-2">
                                {weekData.topics.map((topic, i) => (
                                    <TopicCard key={i} topic={topic}
                                        completed={completedTopics.includes(`${week}-${i}`)}
                                        onToggle={() => toggleTopic(`${week}-${i}`)}
                                    />
                                ))}
                            </div>

                            {/* ── RECOMMENDED YOUTUBE VIDEOS ── */}
                            {weekData.videos && weekData.videos.length > 0 && (
                                <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/15">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Youtube size={16} className="text-rose-400" />
                                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Recommended YouTube Videos</span>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {weekData.videos.map((vid, i) => (
                                            <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-lg border border-white/5 hover:border-rose-500/30 hover:bg-rose-500/5 transition-all group">
                                                <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Play size={14} className="text-rose-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-white group-hover:text-rose-300 truncate">{vid.title}</p>
                                                    <p className="text-[10px] text-text-muted mt-0.5">{vid.channel} • {vid.duration}</p>
                                                </div>
                                                <ExternalLink size={10} className="text-text-muted shrink-0 mt-1 group-hover:text-rose-400" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── MINI PROJECTS ── */}
                            {weekData.projects && weekData.projects.length > 0 && (
                                <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/15">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Hammer size={16} className="text-emerald-400" />
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Mini Projects — Build to Learn</span>
                                    </div>
                                    <div className="space-y-3">
                                        {weekData.projects.map((project, i) => (
                                            <div key={i}
                                                onClick={() => navigate('/project-builder', { state: { project } })}
                                                className="p-4 bg-white/[0.03] rounded-lg border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all cursor-pointer group">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{project.title}</h4>
                                                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded shrink-0
                                                        ${project.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : project.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                                : 'bg-gold/10 text-gold border border-gold/20'}`}>
                                                        {project.difficulty}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-white/60 leading-relaxed mb-2">{project.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                                                        <Clock size={10} /> Est. {project.time}
                                                    </div>
                                                    <span className="text-[9px] font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                        Start Building <ChevronRight size={10} />
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── INTERVIEW QUESTIONS ── */}
                            {weekData.interviews && weekData.interviews.length > 0 && (
                                <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/15">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MessageSquare size={14} className="text-violet-400" />
                                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Interview Questions</span>
                                    </div>
                                    <div className="space-y-2">
                                        {weekData.interviews.map((iq, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg">
                                                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 mt-0.5
                                                    ${iq.type === 'technical' ? 'bg-sky-500/10 text-sky-400' : 'bg-violet-500/10 text-violet-400'}`}>
                                                    {iq.type === 'technical' ? 'TECH' : 'HR'}
                                                </span>
                                                <p className="text-xs text-white/70">{iq.q}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Roadmap = () => {
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState(null);
    const [completedTopics, setCompletedTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await generateRoadmap([]);
            setRoadmap(data);
            setLoading(false);
        };
        load();
    }, []);

    const toggleTopic = (key) => {
        setCompletedTopics(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const totalTopics = roadmap?.weeks.reduce((sum, w) => sum + w.topics.length, 0) || 0;
    const totalProjects = roadmap?.weeks.reduce((sum, w) => sum + (w.projects?.length || 0), 0) || 0;
    const overallProgress = totalTopics ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 mx-auto">
                        <Sparkles size={48} className="text-gold" />
                    </motion.div>
                    <p className="text-sm text-text-muted">Generating your personalized roadmap...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-4">
                    <BookOpen size={14} className="text-gold" />
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">AI Learning Roadmap</span>
                </div>
                <h1 className="text-3xl font-black text-white mb-2">Your Personalized <span className="text-gold">Learning Path</span></h1>
                <p className="text-text-muted text-sm">Week-by-week plan with theory, YouTube videos, mini projects & interview prep</p>
            </motion.div>

            {/* Overall Progress */}
            <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/10 flex flex-wrap items-center gap-6">
                <div className="relative w-16 h-16 shrink-0">
                    <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
                        <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
                        <circle cx="30" cy="30" r="25" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round"
                            strokeDasharray={`${overallProgress * 1.57} 157`} className="transition-all duration-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-black text-white">{overallProgress}%</span>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Target size={14} className="text-emerald-400" />
                        <span className="text-xs font-bold text-white">{completedTopics.length} / {totalTopics} topics completed</span>
                    </div>
                    <p className="text-[10px] text-text-muted">
                        {roadmap.weeks.length} weeks • {totalProjects} mini projects • {roadmap.weeks.reduce((sum, w) => sum + (w.interviews?.length || 0), 0)} interview questions
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-lg">
                    <Zap size={12} className="text-gold fill-gold" />
                    <span className="text-[10px] font-bold text-gold">{completedTopics.length * 50} XP</span>
                </div>
            </div>

            {/* Weeks */}
            <div className="space-y-4">
                {roadmap.weeks.map((weekData) => (
                    <WeekAccordion key={weekData.week} week={weekData.week} weekData={weekData}
                        completedTopics={completedTopics} toggleTopic={toggleTopic} navigate={navigate}
                    />
                ))}
            </div>
        </div>
    );
};

export default Roadmap;
