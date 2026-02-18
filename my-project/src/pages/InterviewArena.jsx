import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Shield, Zap, Trophy, ArrowRight, Sparkles, Mic, MicOff, Users, Clock, CheckCircle2, MessageSquare, Star, Target, Volume2 } from 'lucide-react';
import { generateTest } from '../services/apiService';

const mockRounds = [
    { id: 'tech', round: 1, type: 'Technical', boss: 'Tech Lead Golem', icon: '🪨', desc: 'Data structures, algorithms, and system design', color: 'sky' },
    { id: 'behavioral', round: 2, type: 'Behavioral', boss: 'People Dragon', icon: '🐉', desc: 'Leadership, teamwork, and conflict resolution', color: 'violet' },
    { id: 'hr', round: 3, type: 'HR & Culture', boss: 'Culture Guardian', icon: '🛡️', desc: 'Values alignment, motivation, and career goals', color: 'gold' },
    { id: 'final', round: 4, type: 'Final Boss', boss: 'The Offer Guardian', icon: '🔱', desc: 'Full mock interview simulation', color: 'emerald' },
];

const mockQuestions = {
    tech: [
        { q: 'Explain the difference between REST and GraphQL. When would you choose one over the other?', hints: 'Consider: data fetching efficiency, API versioning, real-time features, learning curve.' },
        { q: 'Walk me through how you would design a URL shortener service like Bit.ly.', hints: 'Think about: hash generation, database schema, redirect logic, analytics, scalability.' },
        { q: 'What is memoization and how does React.memo differ from useMemo?', hints: 'Cover: caching concept, referential equality, when to use each, performance tradeoffs.' },
    ],
    behavioral: [
        { q: 'Tell me about a time you had a major disagreement with a teammate. How did you resolve it?', hints: 'Use STAR: Situation, Task, Action, Result. Focus on communication and compromise.' },
        { q: 'Describe a project where you had to learn a new technology quickly. What was your approach?', hints: 'Highlight: learning strategy, time management, applying knowledge, outcome.' },
    ],
    hr: [
        { q: 'Why are you interested in this position and our company specifically?', hints: 'Research the company. Align your skills and values with their mission.' },
        { q: 'Where do you see yourself in 5 years?', hints: 'Show ambition but stay realistic. Align with company growth trajectory.' },
    ],
    final: [
        { q: 'Give me your 2-minute elevator pitch. Why should we hire you?', hints: 'Concise + impactful. Lead with strongest value proposition.' },
        { q: 'What questions do you have for us?', hints: 'Ask about team culture, growth, tech stack decisions, or company roadmap.' },
    ],
};

const RoundSelector = ({ onSelect }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
                <Swords size={14} className="text-rose-400" />
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Interview Arena</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                Mock <span className="text-rose-400">Interview</span> Arena
            </h1>
            <p className="text-text-muted text-sm max-w-lg mx-auto">Practice with AI-powered interview simulations. Type or use voice to answer. Get real-time feedback.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {mockRounds.map((r) => (
                <motion.button key={r.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(r.id)}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all text-left group">
                    <div className="flex items-center gap-4 mb-3">
                        <span className="text-4xl">{r.icon}</span>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-text-muted uppercase">Round {r.round}</span>
                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-${r.color}-500/10 text-${r.color}-400`}>{r.type}</span>
                            </div>
                            <h3 className="font-bold text-white text-sm group-hover:text-gold transition-colors">{r.boss}</h3>
                        </div>
                    </div>
                    <p className="text-[11px] text-text-muted">{r.desc}</p>
                </motion.button>
            ))}
        </div>
    </motion.div>
);

const InterviewSession = ({ roundId, onComplete }) => {
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState('');
    const recognitionRef = useRef(null);

    const questions = mockQuestions[roundId] || mockQuestions.tech;
    const q = questions[current];
    const round = mockRounds.find(r => r.id === roundId);

    const toggleVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert('Voice input not supported in this browser.');
            return;
        }
        if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
            setAnswer(transcript);
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
    };

    const submitAnswer = () => {
        if (!answer.trim()) return;
        recognitionRef.current?.stop();
        setIsRecording(false);

        // Generate demo AI feedback
        const wordCount = answer.split(' ').length;
        let fb = '';
        if (wordCount < 20) fb = '⚠️ Your answer could be more detailed. Try using the STAR method (Situation, Task, Action, Result) for a more structured response.';
        else if (wordCount < 50) fb = '✅ Good response! Consider adding a specific example or metric to strengthen your answer.';
        else fb = '🌟 Excellent! Your answer is detailed and well-structured. Great use of specific examples.';

        setFeedback(fb);
        setShowFeedback(true);
        setAnswers(prev => [...prev, { question: q.q, answer, feedback: fb }]);
    };

    const next = () => {
        if (current < questions.length - 1) {
            setCurrent(c => c + 1);
            setAnswer('');
            setShowFeedback(false);
            setFeedback('');
        } else {
            onComplete({ roundId, answers: [...answers], total: questions.length });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{round?.icon}</span>
                    <div>
                        <p className="text-xs font-bold text-white">{round?.boss}</p>
                        <p className="text-[10px] text-text-muted">{round?.type} • Question {current + 1}/{questions.length}</p>
                    </div>
                </div>
                <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
                </div>
            </div>

            {/* Interviewer Question */}
            <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                            <Users size={14} className="text-rose-400" />
                        </div>
                        <span className="text-xs font-bold text-text-muted">Interviewer</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-relaxed">{q.q}</h3>

                    {/* Hint */}
                    <div className="mt-4 p-3 bg-gold/5 rounded-lg border border-gold/15">
                        <p className="text-[11px] text-gold flex items-start gap-2">
                            <Sparkles size={12} className="mt-0.5 shrink-0" /> {q.hints}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Answer Input */}
            {!showFeedback && (
                <div className="space-y-3">
                    <div className="relative">
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type your answer, or press the mic button to speak..."
                            className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-xl p-4 pr-16 text-sm text-white resize-none focus:outline-none focus:border-rose-500/30 focus:ring-2 focus:ring-rose-500/10 transition-all"
                        />
                        <button onClick={toggleVoice}
                            className={`absolute right-3 top-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all
                                ${isRecording ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30' : 'bg-white/5 border border-white/10 text-text-muted hover:text-rose-400 hover:bg-rose-500/10'}`}>
                            {isRecording ? <Mic size={18} /> : <MicOff size={18} />}
                        </button>
                    </div>

                    {isRecording && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-rose-400">
                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" /> Recording... Speak naturally
                        </motion.div>
                    )}

                    <button onClick={submitAnswer} disabled={!answer.trim()}
                        className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 transition-all
                            ${answer.trim() ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-lg' : 'bg-white/5 text-text-muted cursor-not-allowed'}`}>
                        <MessageSquare size={16} /> Submit Answer
                    </button>
                </div>
            )}

            {/* AI Feedback */}
            {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    {/* Your answer */}
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Your Answer</p>
                        <p className="text-xs text-white/70 italic">"{answer}"</p>
                    </div>

                    {/* AI feedback */}
                    <div className="p-4 bg-gradient-to-r from-gold/5 to-emerald-500/5 rounded-xl border border-gold/20">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={14} className="text-gold" />
                            <span className="text-xs font-bold text-gold">AI Feedback</span>
                        </div>
                        <p className="text-sm text-white/80">{feedback}</p>
                    </div>

                    <button onClick={next}
                        className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl flex items-center gap-2 mx-auto hover:shadow-lg transition-all">
                        {current < questions.length - 1 ? <>Next Question <ArrowRight size={16} /></> : <>View Results <Trophy size={16} /></>}
                    </button>
                </motion.div>
            )}
        </div>
    );
};

const InterviewResults = ({ result, onRetry }) => {
    const round = mockRounds.find(r => r.id === result.roundId);
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center space-y-6">
            <div className="text-6xl mb-4">{round?.icon || '🏆'}</div>
            <h2 className="text-2xl font-black text-white">
                {round?.boss} <span className="text-gold">Defeated!</span>
            </h2>
            <p className="text-text-muted text-sm">{round?.type} round completed. You answered {result.total} questions.</p>

            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10 space-y-4">
                {result.answers.map((a, i) => (
                    <div key={i} className="text-left p-4 bg-white/[0.02] rounded-xl border border-white/5">
                        <p className="text-xs font-bold text-white mb-1">Q{i + 1}: {a.question}</p>
                        <p className="text-[11px] text-text-secondary italic mb-2">"{a.answer.substring(0, 100)}..."</p>
                        <p className="text-[11px] text-gold">{a.feedback}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-2">
                <Zap size={14} className="text-gold fill-gold" />
                <span className="text-sm font-bold text-gold">+{result.total * 100} XP earned</span>
            </div>

            <button onClick={onRetry} className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all mx-auto flex items-center gap-2">
                <Swords size={16} /> Choose Another Round
            </button>
        </motion.div>
    );
};

const InterviewArena = () => {
    const [selectedRound, setSelectedRound] = useState(null);
    const [result, setResult] = useState(null);

    const retry = () => { setSelectedRound(null); setResult(null); };

    return (
        <div className="max-w-5xl mx-auto pb-12 space-y-8">
            <AnimatePresence mode="wait">
                {result ? (
                    <InterviewResults key="results" result={result} onRetry={retry} />
                ) : !selectedRound ? (
                    <RoundSelector key="selector" onSelect={setSelectedRound} />
                ) : (
                    <InterviewSession key="session" roundId={selectedRound} onComplete={setResult} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default InterviewArena;
