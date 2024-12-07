/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

import { auth, googleProvider } from '../services/firebase';
import { AuthContext } from '../context';
import { userDataBase } from '../server/user';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [entering, setEntering] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("USER: ", currentUser)
            setUser(currentUser);
            setLoading(false);
            setEntering(false)
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

    const signUpWithEmailAndPassword = async (user: { name: string, email: string, password: string, photoURL: string }) => {
        try {
            setEntering(true)
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((currentUser) => {
                    const newUser = { uid: currentUser.user.uid, email: currentUser.user.email, displayName: user.name, photoURL: user.photoURL }
                    userDataBase.createUser(newUser)
                })

        } catch (error) {
            console.error('Erro ao criar a conta:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, entering, logout, loginWithGoogle, signUpWithEmailAndPassword }}>
            {children}
        </AuthContext.Provider>
    );
};
