import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, ScrollText, Mic, MicOff } from 'lucide-react';
import { sendChatMessage } from '../services/apiService';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Greetings, Adventurer! I am your Nova AI Guide. Ask me anything — career advice, skill recommendations, study resources, or interview tips!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await sendChatMessage(userMsg);
            setMessages(prev => [...prev, { role: 'ai', text: response.reply }]);
        } catch {
            setMessages(prev => [...prev, { role: 'ai', text: "Apologies, I'm having trouble connecting. Try again in a moment!" }]);
        }
        setIsTyping(false);
    };

    const toggleVoice = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
        if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false; recognition.interimResults = true; recognition.lang = 'en-US';
        recognition.onresult = (e) => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; setInput(t); };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition; recognition.start(); setIsRecording(true);
    };

    return (
        <div className="fixed bottom-6 left-6 z-[60]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[380px] h-[520px] bg-[#0F172A] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-forest to-grass p-4 text-white shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                        <Bot size={20} className="text-sunlight" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-base text-white leading-none">Nova AI Guide</h3>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-sunlight animate-pulse"></div>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all text-white">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm font-medium
                                        ${msg.role === 'ai'
                                            ? 'bg-white/[0.06] border border-white/10 text-white rounded-tl-sm'
                                            : 'bg-gradient-to-r from-grass to-emerald-600 text-white rounded-tr-sm'}`}>
                                        {msg.text}
                                        {msg.role === 'ai' && (
                                            <div className="flex gap-3 mt-3 pt-2.5 border-t border-white/10">
                                                <button className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider hover:text-emerald-300 flex items-center gap-1 transition-colors">
                                                    <Sparkles size={10} /> Tips
                                                </button>
                                                <button className="text-[9px] font-bold text-gold uppercase tracking-wider hover:text-sunlight flex items-center gap-1 transition-colors">
                                                    <ScrollText size={10} /> Resources
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/[0.06] border border-white/10 p-3.5 rounded-2xl rounded-tl-sm">
                                        <div className="flex gap-1.5">
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-white/30 rounded-full" />
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 bg-white/30 rounded-full" />
                                            <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 bg-white/30 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-white/10 shrink-0">
                            <div className="flex gap-2">
                                <button onClick={toggleVoice}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all
                                        ${isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10'}`}>
                                    {isRecording ? <Mic size={16} /> : <MicOff size={16} />}
                                </button>
                                <div className="relative flex-1">
                                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask Nova anything..."
                                        className="w-full bg-white/[0.06] border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/10 transition-all"
                                    />
                                    <button onClick={handleSend} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-grass text-white rounded-lg flex items-center justify-center hover:bg-emerald-500 transition-all">
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 bg-gradient-to-br from-forest to-grass text-white rounded-2xl shadow-2xl shadow-grass/20 flex items-center justify-center border-2 border-white/20 group relative"
                    >
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold border-2 border-[#0F172A] rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles size={8} className="text-navy" />
                        </div>
                        <Bot size={24} className="group-hover:rotate-12 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChat;
