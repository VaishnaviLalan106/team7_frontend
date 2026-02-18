import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shuffle, Check, Sparkles } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AvatarEditor = ({ onClose }) => {
    const { user, updateAvatar, updateName, avatarOptions, funNameSuggestions } = useUser();
    const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.displayName);

    const randomName = () => {
        const random = funNameSuggestions[Math.floor(Math.random() * funNameSuggestions.length)];
        setName(random);
    };

    const handleSave = () => {
        updateAvatar(selectedAvatar);
        updateName(name);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-navy border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Sparkles size={18} className="text-gold" /> Customize Identity
                        </h2>
                        <p className="text-xs text-text-muted mt-0.5">Choose your avatar & adventure name</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-all">
                        <X size={18} />
                    </button>
                </div>

                {/* Current Preview */}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sunlight to-gold p-[2px]">
                        <div className="w-full h-full rounded-[14px] bg-navy flex items-center justify-center text-4xl">
                            {selectedAvatar}
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-white text-lg">{name || 'Unnamed'}</p>
                        <p className="text-xs text-grass font-bold uppercase tracking-wider">{user.title}</p>
                    </div>
                </div>

                {/* Avatar Grid */}
                <div className="mb-6">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Pick Your Spirit Animal</p>
                    <div className="grid grid-cols-8 gap-2">
                        {avatarOptions.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => setSelectedAvatar(emoji)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all 
                                    ${selectedAvatar === emoji
                                        ? 'bg-gold/20 border-2 border-gold scale-110 shadow-lg shadow-gold/20'
                                        : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105'}`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Name Editor */}
                <div className="mb-6">
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Adventure Name</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={24}
                            placeholder="Enter your fun name..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-white/30 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 transition-all"
                        />
                        <button
                            onClick={randomName}
                            className="px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-text-muted hover:text-gold hover:bg-gold/10 hover:border-gold/20 transition-all"
                            title="Random name"
                        >
                            <Shuffle size={18} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {funNameSuggestions.slice(0, 6).map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => setName(suggestion)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${name === suggestion ? 'bg-gold/20 border-gold/30 text-gold' : 'bg-white/5 border-white/10 text-text-muted hover:text-white hover:bg-white/10'}`}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full py-3 bg-gradient-to-r from-grass to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-grass/20"
                >
                    <Check size={18} /> Save Identity
                </button>
            </motion.div>
        </motion.div>
    );
};

export default AvatarEditor;
