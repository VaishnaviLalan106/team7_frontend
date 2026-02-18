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
    title: 'Elite Explorer',
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
        if (userData) setUser(userData);
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

    return (
        <UserContext.Provider value={{
            user, isAuthenticated, login, logout,
            updateAvatar, updateName, updateTitle,
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
