import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { useUser } from '../context/UserContext';

const ShareModal = ({ onClose }) => {
    const { user } = useUser();
    const [copied, setCopied] = useState(false);
    const profileUrl = `${window.location.origin}/profile`;

    const handleCopy = () => {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareText = `Check out my PrepNova adventure profile! I'm ${user.displayName} - Level 12 ${user.title}`;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-navy border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white">Share Profile</h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-text-muted transition-all">
                        <X size={18} />
                    </button>
                </div>

                {/* Profile Preview Card */}
                <div className="p-5 bg-gradient-to-br from-forest/20 to-grass/10 rounded-xl border border-grass/20 mb-6 text-center">
                    <div className="text-5xl mb-3">{user.avatar}</div>
                    <p className="font-bold text-white text-lg">{user.displayName}</p>
                    <p className="text-xs text-grass font-bold uppercase tracking-wider mt-1">{user.title}</p>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-1 rounded">LVL 12</span>
                        <span className="text-[10px] font-bold text-text-muted">12,450 XP</span>
                    </div>
                </div>

                {/* Copy Link */}
                <div className="flex gap-2 mb-4">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-text-muted truncate">
                        {profileUrl}
                    </div>
                    <button onClick={handleCopy} className={`px-4 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${copied ? 'bg-grass text-white' : 'bg-white/10 text-white hover:bg-white/15'}`}>
                        {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                    </button>
                </div>

                {/* Share Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
                        𝕏 Twitter
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
                        in LinkedIn
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ShareModal;
