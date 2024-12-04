import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

import { auth, googleProvider } from '../services/firebase';
import { AuthContext } from '../context';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    const loginWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
        } catch (error) {
          console.error('Erro ao fazer login com Google:', error);
        }
      };

    return (
        <AuthContext.Provider value={{ user, loading, logout, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};
