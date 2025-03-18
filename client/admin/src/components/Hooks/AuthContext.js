// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem('user') || null);

    const login = (userData, expirationMins = 0) => {
        setUser(userData);
        const 
        item = {
            user: userData,
        };
        if (expirationMins !== 0) {
            const now = new Date();
            item.expiration = new Date(now.getTime() + expirationMins * 60 * 1000).getTime();   
        }

        setUser(JSON.stringify(item));
        localStorage.setItem('user', JSON.stringify(item));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const logged = () => {
        const userData = JSON.parse(user);
        if (userData !== null) {
            const now = new Date().getTime();
            if (userData.expiration !== null && now > userData.expiration) {
                logout();
                return false;
            }
            return true;
        }
        return false;
    };
      
      

    return (
        <AuthContext.Provider value={{ user, login, logout, logged }}>
            {children}
        </AuthContext.Provider>
    );
};
