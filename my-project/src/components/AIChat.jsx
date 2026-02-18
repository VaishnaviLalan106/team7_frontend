import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, X, Bot, Sparkles, Volume2 } from 'lucide-react';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hey! I'm Nova, your AI career coach. Ask me anything — type or tap the mic to talk! 🎯" },
    ]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput('');
        setIsThinking(true);

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "Great question! Based on your skill profile, I'd recommend focusing on system design fundamentals next. Want me to generate a personalized learning path? 🚀"
            }]);
            setIsThinking(false);
        }, 1500);
    };

    const toggleMic = () => {
        setIsListening(!isListening);
        if (!isListening) {
            // Simulate voice input (replace with actual voice API)
            setTimeout(() => {
                setInput('How can I improve my interview skills?');
                setIsListening(false);
            }, 2000);
        }
    };

    return (
        <>
            {/* Floating button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-24 lg:bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-coral to-lavender text-white flex items-center justify-center shadow-lg shadow-coral/25 transition-all hover:scale-105 ${isOpen ? 'hidden' : ''}`}
                whileTap={{ scale: 0.9 }}
            >
                <Bot size={24} />
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-navy-light border border-border/50 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
                        style={{ maxHeight: 'min(520px, 70vh)' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 bg-navy/50">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coral to-lavender flex items-center justify-center">
                                    <Sparkles size={16} className="text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">Nova AI</div>
                                    <div className="text-[10px] text-emerald font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block"></span> Online
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-primary transition-colors p-1">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-coral/20 text-text-primary rounded-br-sm'
                                            : 'bg-surface border border-border/30 text-text-primary rounded-bl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-surface border border-border/30 px-4 py-3 rounded-2xl rounded-bl-sm">
                                        <div className="flex gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-coral animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 rounded-full bg-lavender animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 rounded-full bg-emerald animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input bar */}
                        <div className="px-4 py-3 border-t border-border/30 bg-navy/50">
                            {isListening && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl bg-coral/10 border border-coral/20"
                                >
                                    <div className="w-3 h-3 rounded-full bg-coral animate-pulse"></div>
                                    <span className="text-xs font-semibold text-coral">Listening... speak now</span>
                                    <Volume2 size={14} className="text-coral ml-auto animate-pulse" />
                                </motion.div>
                            )}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleMic}
                                    className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${isListening
                                            ? 'bg-coral text-white shadow-lg shadow-coral/30 animate-pulse'
                                            : 'bg-surface border border-border/30 text-text-muted hover:text-coral hover:border-coral/30'
                                        }`}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask Nova anything..."
                                    className="flex-1 bg-surface border border-border/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral/50 transition-all text-text-primary placeholder-text-muted"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="p-2.5 rounded-xl bg-gradient-to-br from-coral to-lavender text-white disabled:opacity-30 transition-all hover:shadow-lg hover:shadow-coral/20 flex-shrink-0"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
