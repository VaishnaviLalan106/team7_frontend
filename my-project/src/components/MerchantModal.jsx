import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Sparkles, Zap, Star, Shield, Smartphone } from 'lucide-react';
import { useUser } from '../context/UserContext';

const items = [
    {
        id: 1,
        name: 'Neon Forest Skin',
        description: 'A vibrant, glowing forest aesthetic for your portfolio.',
        cost: 2500,
        icon: '🌲',
        type: 'Skin',
        color: 'emerald'
    },
    {
        id: 2,
        name: 'Cyber Samurai Voice',
        description: 'Unlock the AI voice pack for a cool, disciplined mentor.',
        cost: 1500,
        icon: '🎙️',
        type: 'Voice',
        color: 'rose'
    },
    {
        id: 3,
        name: 'XP Surge Scroll',
        description: 'Double XP for your next 3 Interview Arena rounds.',
        cost: 1000,
        icon: '📜',
        type: 'Boost',
        color: 'gold'
    },
    {
        id: 4,
        name: 'Midnight Citadel Skin',
        description: 'A dark, sleek theme for serious code warriors.',
        cost: 3000,
        icon: '🏰',
        type: 'Skin',
        color: 'indigo'
    },
    {
        id: 5,
        name: 'Legendary Shield',
        description: 'Redces XP loss profile when failing a challenge.',
        cost: 5000,
        icon: '🛡️',
        type: 'Utility',
        color: 'sky'
    }
];

const MerchantModal = ({ onClose }) => {
    const { user } = useUser();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="bg-navy-deep border border-gold/30 rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative p-8 md:p-12 pb-6 border-b border-white/10 bg-gradient-to-br from-gold/10 to-transparent">
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-gold/20 p-3 rounded-2xl border border-gold/30">
                            <ShoppingBag className="text-gold" size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-white italic tracking-tight">
                            Treasure <span className="text-gold">Merchant</span>
                        </h2>
                    </div>
                    <p className="text-text-muted font-medium max-w-md italic">
                        "Welcome, traveler! My scrolls and skins are of the finest quality, forged in the depths of the Concept Caverns."
                    </p>
                </div>

                {/* Items Grid */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 custom-scrollbar">
                    <div className="grid md:grid-cols-2 gap-6">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="group relative bg-white/5 rounded-[2rem] border border-white/10 p-6 flex gap-6 hover:bg-white/10 hover:border-gold/30 transition-all cursor-pointer"
                            >
                                <div className={`w-20 h-20 rounded-3xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center text-4xl shadow-xl`}>
                                    {item.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-${item.color}-500`}>
                                            {item.type}
                                        </span>
                                        <div className="flex items-center gap-1 text-gold font-black text-sm">
                                            <Sparkles size={14} />
                                            {item.cost}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-gold transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 md:p-12 pt-6 border-t border-white/10 bg-navy/50 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="text-left">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Your Balance</p>
                            <div className="flex items-center gap-2 text-2xl font-black text-gold">
                                <Zap size={20} className="fill-gold" />
                                {user.xp.toLocaleString()} XP
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary w-full md:w-auto px-12 py-4 shadow-xl shadow-gold/10">
                        View Owned Artifacts
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MerchantModal;
