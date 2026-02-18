import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Clock, CheckCircle2, XCircle, ArrowRight, Sparkles, Zap, Trophy, RefreshCw, BookOpen, Code2, MessageSquare, Timer } from 'lucide-react';
import { generateTest } from '../services/apiService';

const TestTypeSelector = ({ onSelect }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-4">
                <span className="text-lg">💎</span>
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Concept Caverns</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                Test Your <span className="text-sky-400">Knowledge</span>
            </h1>
            <p className="text-text-muted text-sm max-w-lg mx-auto">AI-generated assessments tailored to your skill gaps. Choose your challenge type.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
                { type: 'mcq', icon: Brain, title: 'MCQ Challenge', desc: '5 AI-generated multiple choice questions', time: '10 min', color: 'sky', emoji: '🧠' },
                { type: 'coding', icon: Code2, title: 'Coding Quest', desc: 'Solve algorithmic problems with hints', time: '30 min', color: 'emerald', emoji: '💻' },
                { type: 'behavioral', icon: MessageSquare, title: 'HR Gauntlet', desc: 'Behavioral & HR interview practice', time: '15 min', color: 'violet', emoji: '🎯' },
            ].map((t) => (
                <motion.button key={t.type} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(t.type)}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all text-left group">
                    <div className="text-4xl mb-4">{t.emoji}</div>
                    <h3 className="font-bold text-white text-sm mb-1 group-hover:text-gold transition-colors">{t.title}</h3>
                    <p className="text-[11px] text-text-muted mb-3">{t.desc}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                        <Clock size={10} /> {t.time}
                    </div>
                </motion.button>
            ))}
        </div>
    </motion.div>
);

const MCQTest = ({ test, onComplete }) => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(test.timeLimit || 600);

    useEffect(() => {
        if (timeLeft <= 0) { onComplete({ score, total: test.questions.length, answers }); return; }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const q = test.questions[current];

    const handleAnswer = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        const correct = idx === q.correct;
        if (correct) setScore(s => s + 1);
        setAnswers(prev => [...prev, { questionId: q.id, selected: idx, correct }]);
    };

    const next = () => {
        if (current < test.questions.length - 1) {
            setCurrent(c => c + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            onComplete({ score: score, total: test.questions.length, answers });
        }
    };

    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header bar */}
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-white">Q {current + 1}/{test.questions.length}</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full transition-all" style={{ width: `${((current + 1) / test.questions.length) * 100}%` }} />
                    </div>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${timeLeft < 60 ? 'bg-rose-500/10 text-rose-400 animate-pulse' : 'bg-white/5 text-text-muted'}`}>
                    <Timer size={12} /> {mins}:{secs.toString().padStart(2, '0')}
                </div>
            </div>

            {/* Question */}
            <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="text-lg font-bold text-white">{q.question}</h3>
                <div className="space-y-2">
                    {q.options.map((opt, i) => (
                        <button key={i} onClick={() => handleAnswer(i)}
                            disabled={answered}
                            className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all
                                ${answered
                                    ? i === q.correct
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                        : i === selected
                                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                            : 'bg-white/[0.02] border-white/5 text-text-muted'
                                    : selected === i
                                        ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                                        : 'bg-white/[0.02] border-white/10 text-white hover:bg-white/[0.05] hover:border-white/20'}`}
                        >
                            <span className="text-xs font-bold text-text-muted mr-3">{String.fromCharCode(65 + i)}</span>
                            {opt}
                        </button>
                    ))}
                </div>

                {answered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/[0.03] rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            {selected === q.correct ? <CheckCircle2 size={14} className="text-emerald-400" /> : <XCircle size={14} className="text-rose-400" />}
                            <span className={`text-xs font-bold ${selected === q.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {selected === q.correct ? 'Correct!' : 'Incorrect'}
                            </span>
                        </div>
                        <p className="text-xs text-text-secondary">{q.explanation}</p>
                    </motion.div>
                )}

                {answered && (
                    <button onClick={next}
                        className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl flex items-center gap-2 mx-auto hover:shadow-lg transition-all">
                        {current < test.questions.length - 1 ? <>Next <ArrowRight size={16} /></> : <>See Results <Trophy size={16} /></>}
                    </button>
                )}
            </motion.div>
        </div>
    );
};

const CodingTest = ({ test, onComplete }) => {
    const [current, setCurrent] = useState(0);
    const [code, setCode] = useState('');
    const [showHint, setShowHint] = useState(false);
    const q = test.questions[current];

    const handleSubmit = () => {
        if (current < test.questions.length - 1) {
            setCurrent(c => c + 1);
            setCode('');
            setShowHint(false);
        } else {
            onComplete({ score: test.questions.length, total: test.questions.length, answers: [] });
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10">
                <span className="text-xs font-bold text-white">Challenge {current + 1}/{test.questions.length}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gold/10 text-gold'}`}>
                    {q.difficulty}
                </span>
            </div>

            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">{q.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{q.description}</p>
                {q.examples && q.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-white/[0.02] rounded-lg border border-white/5 mb-2">
                        <p className="text-[11px] text-text-muted"><span className="text-sky-400 font-bold">Input:</span> {ex.input}</p>
                        <p className="text-[11px] text-text-muted"><span className="text-emerald-400 font-bold">Output:</span> {ex.output}</p>
                    </div>
                ))}
            </div>

            <textarea value={code} onChange={(e) => setCode(e.target.value)}
                placeholder="Write your solution here..."
                className="w-full h-48 bg-[#0D1117] border border-white/10 rounded-xl p-4 text-sm text-emerald-400 font-mono resize-none focus:outline-none focus:border-sky-500/30 focus:ring-2 focus:ring-sky-500/10"
            />

            <div className="flex items-center justify-between">
                <button onClick={() => setShowHint(!showHint)} className="text-xs text-gold hover:underline flex items-center gap-1">
                    <Sparkles size={12} /> {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                <button onClick={handleSubmit} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl flex items-center gap-2 hover:shadow-lg transition-all">
                    Submit <ArrowRight size={16} />
                </button>
            </div>

            {showHint && q.hints && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-gold/5 rounded-xl border border-gold/20">
                    <p className="text-xs text-gold">{q.hints[0]}</p>
                </motion.div>
            )}
        </div>
    );
};

const BehavioralTest = ({ test, onComplete }) => {
    const [current, setCurrent] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);
    const q = test.questions[current];

    const toggleVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert('Voice input not supported in this browser.');
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            setAnswer(transcript);
        };

        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
        recognition.start();
        setIsRecording(true);
    };

    const next = () => {
        if (current < test.questions.length - 1) {
            setCurrent(c => c + 1);
            setAnswer('');
            setIsRecording(false);
            recognitionRef.current?.stop();
        } else {
            onComplete({ score: test.questions.length, total: test.questions.length, answers: [] });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10">
                <span className="text-xs font-bold text-white">Question {current + 1}/{test.questions.length}</span>
                <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-1 rounded">BEHAVIORAL</span>
            </div>

            <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">{q.question}</h3>
                <div className="p-3 bg-gold/5 rounded-lg border border-gold/20">
                    <p className="text-xs text-gold flex items-center gap-2"><Sparkles size={12} /> Tip: {q.tips}</p>
                </div>
            </div>

            <div className="relative">
                <textarea value={answer} onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer or use voice input..."
                    className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-xl p-4 pr-16 text-sm text-white resize-none focus:outline-none focus:border-violet-500/30 focus:ring-2 focus:ring-violet-500/10"
                />
                <button onClick={toggleVoice}
                    className={`absolute right-3 top-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all
                        ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 border border-white/10 text-text-muted hover:text-violet-400 hover:bg-violet-500/10'}`}>
                    🎤
                </button>
            </div>

            {isRecording && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-rose-400">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" /> Listening... Speak now
                </motion.div>
            )}

            <button onClick={next} disabled={!answer.trim()}
                className={`px-6 py-3 font-bold rounded-xl flex items-center gap-2 mx-auto transition-all
                    ${answer.trim() ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg' : 'bg-white/5 text-text-muted cursor-not-allowed'}`}>
                {current < test.questions.length - 1 ? <>Next <ArrowRight size={16} /></> : <>Finish <Trophy size={16} /></>}
            </button>
        </div>
    );
};

const Results = ({ result, onRetry }) => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-6">
        <div className="text-6xl mb-4">{result.score >= result.total * 0.8 ? '🏆' : result.score >= result.total * 0.5 ? '⭐' : '💪'}</div>
        <h2 className="text-2xl font-black text-white">
            {result.score >= result.total * 0.8 ? 'Excellent!' : result.score >= result.total * 0.5 ? 'Good Job!' : 'Keep Practicing!'}
        </h2>
        <div className="relative w-28 h-28 mx-auto">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle cx="60" cy="60" r="50" fill="none"
                    stroke={result.score >= result.total * 0.8 ? '#22C55E' : result.score >= result.total * 0.5 ? '#FBBF24' : '#FB7185'}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(result.score / result.total) * 314} 314`}
                    initial={{ strokeDasharray: '0 314' }}
                    animate={{ strokeDasharray: `${(result.score / result.total) * 314} 314` }}
                    transition={{ duration: 1.5 }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-white">{result.score}/{result.total}</span>
            </div>
        </div>
        <div className="flex items-center justify-center gap-2">
            <Zap size={14} className="text-gold fill-gold" />
            <span className="text-sm font-bold text-gold">+{result.score * 50} XP earned</span>
        </div>
        <div className="flex gap-3 justify-center">
            <button onClick={onRetry} className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
                <RefreshCw size={16} /> Try Again
            </button>
        </div>
    </motion.div>
);

const ConceptCaverns = () => {
    const [testType, setTestType] = useState(null);
    const [test, setTest] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const startTest = async (type) => {
        setTestType(type);
        setLoading(true);
        const data = await generateTest('JavaScript & React', type);
        setTest(data);
        setLoading(false);
    };

    const handleComplete = (res) => {
        setResult(res);
        setTest(null);
    };

    const retry = () => {
        setTestType(null);
        setTest(null);
        setResult(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                        <Brain size={48} className="text-sky-400 mx-auto" />
                    </motion.div>
                    <p className="text-sm text-text-muted">AI is crafting your challenge...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-12 space-y-8">
            <AnimatePresence mode="wait">
                {result ? (
                    <Results key="results" result={result} onRetry={retry} />
                ) : !testType ? (
                    <TestTypeSelector key="selector" onSelect={startTest} />
                ) : test?.type === 'mcq' ? (
                    <MCQTest key="mcq" test={test} onComplete={handleComplete} />
                ) : test?.type === 'coding' ? (
                    <CodingTest key="coding" test={test} onComplete={handleComplete} />
                ) : test?.type === 'behavioral' ? (
                    <BehavioralTest key="behavioral" test={test} onComplete={handleComplete} />
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default ConceptCaverns;
