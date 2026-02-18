import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageSquare, Sparkles, Wand2, Compass, ScrollText } from 'lucide-react';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Greetings, Adventurer! I am your Nova Guide. How can I assist you on your expedition today?" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', text: input }]);
        setInput('');

        // Simulating AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "I've analyzed your request against the ancient career runes. My suggestion: traverse the Concept Caverns to sharpen your technical edge before the next Arena battle!"
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-[380px] h-[550px] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border-2 border-sunlight/30 flex flex-col overflow-hidden relative"
                    >
                        {/* Royal Rose Frame Decoration (Subtle) */}
                        <div className="absolute inset-0 pointer-events-none border-[10px] border-transparent floral-frame rounded-[2.5rem] opacity-20 z-0"></div>

                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-forest to-grass p-6 text-white relative z-10 shrink-0">
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:rotate-12 transition-transform">
                                        <Bot size={24} className="text-sunlight" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg leading-none">Nova AI Guide</h3>
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <div className="w-2 h-2 rounded-full bg-sunlight animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/80 italic">Expedition Assistant</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: msg.role === 'ai' ? -10 : 10 }} animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-bold shadow-sm ${msg.role === 'ai' ? 'bg-ivory border border-slate-100 text-forest rounded-tl-none' : 'bg-forest text-white rounded-tr-none'}`}>
                                        {msg.text}
                                        {msg.role === 'ai' && (
                                            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100/50">
                                                <button className="text-[10px] font-black text-grass uppercase tracking-tighter hover:underline flex items-center gap-1">
                                                    <Sparkles size={10} /> Tips
                                                </button>
                                                <button className="text-[10px] font-black text-gold uppercase tracking-tighter hover:underline flex items-center gap-1">
                                                    <ScrollText size={10} /> Career Rune
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-white border-t border-slate-100 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                            <div className="relative group">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Inquire the guide..."
                                    className="w-full bg-ivory border-2 border-slate-50 rounded-2xl py-4 pl-5 pr-14 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sunlight/20 focus:border-gold/30 transition-all text-forest placeholder-slate-300"
                                />
                                <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-forest text-white rounded-xl flex items-center justify-center shadow-lg shadow-forest/20 hover:scale-105 transition-all active:scale-95">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-gradient-to-br from-forest to-grass text-white rounded-[1.8rem] shadow-2xl flex items-center justify-center border-4 border-white group relative"
                    >
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-sunlight border-2 border-white rounded-full flex items-center justify-center animate-bounce">
                            <Sparkles size={10} className="text-bark" />
                        </div>
                        <Bot size={28} className="group-hover:rotate-12 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChat;
