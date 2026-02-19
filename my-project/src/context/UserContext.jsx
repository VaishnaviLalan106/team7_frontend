import React, { createContext, useContext, useState, useEffect } from 'react';

const avatarOptions = [
    '🦊', '🐱', '🐶', '🐼', '🦁', '🐨', '🐰', '🐯',
    '🦄', '🐸', '🐵', '🐙', '🦉', '🐲', '🦋', '🐧',
    '🐺', '🦜', '🐝', '🦎', '🐳', '🦈', '🐞', '🦩',
];

const funNameSuggestions = [
    'Shadow Coder', 'Pixel Knight', 'Nova Explorer', 'Code Ninja',
    'Debug Dragon', 'Binary Beast', 'Syntax Sage', 'Stack Samurai',
    'Algo Archer', 'Byte Baron', 'Data Druid', 'Loop Wizard',
    'Cipher Fox', 'Neon Nomad', 'Cloud Ranger', 'Ghost Hacker',
];

const defaultUser = {
    avatar: '🦊',
    displayName: 'Adventurer',
    title: 'Newbie Navigator',
    level: 1,
    xp: 0,
    islandsExplored: 0,
    combatHistory: [],
    hasCompletedOnboarding: false,
    achievements: [],
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('prepnova_user');
            return saved ? JSON.parse(saved) : defaultUser;
        } catch {
            return defaultUser;
        }
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('prepnova_auth') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('prepnova_user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        let finalUser = { ...defaultUser, ...userData };

        // Grant first achievement if new user
        if (!finalUser.achievements?.find(a => a.id === 'welcome_aboard')) {
            const welcomeBadge = {
                id: 'welcome_aboard',
                name: 'Welcome Aboard',
                desc: 'Joined the Quest',
                icon: '❤️',
                date: new Date().toLocaleDateString()
            };
            finalUser.achievements = [...(finalUser.achievements || []), welcomeBadge];
        }

        setUser(finalUser);
        setIsAuthenticated(true);
        localStorage.setItem('prepnova_auth', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.setItem('prepnova_auth', 'false');
    };

    const updateAvatar = (avatar) => setUser(prev => ({ ...prev, avatar }));
    const updateName = (displayName) => setUser(prev => ({ ...prev, displayName }));
    const updateTitle = (title) => setUser(prev => ({ ...prev, title }));

    const completeOnboarding = () => {
        setUser(prev => ({ ...prev, hasCompletedOnboarding: true }));
    };

    const grantAchievement = (achievement) => {
        setUser(prev => {
            if (prev.achievements?.find(a => a.id === achievement.id)) return prev;
            return {
                ...prev,
                achievements: [...(prev.achievements || []), { ...achievement, date: new Date().toLocaleDateString() }]
            };
        });
    };

    return (
        <UserContext.Provider value={{
            user, isAuthenticated, login, logout,
            updateAvatar, updateName, updateTitle,
            completeOnboarding, grantAchievement,
            avatarOptions, funNameSuggestions
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};

export default UserContext;
