/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db, googleProvider, storage } from '../services/firebase';
import { AuthContext } from '../context';
import { baseUrl } from '../utils';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [entering, setEntering] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

    const loginWithEmail = async (email: string, password: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                setEntering(true);
                signInWithEmailAndPassword(auth, email, password)
                    .then(async () => {
                        const docRef = doc(db, "users", user?.uid ?? "");
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data()
                            localStorage.setItem('photoURL', userData.photoURL);
                            localStorage.setItem('displayName', userData.displayName);
                            if (location.hostname === 'localhost') {
                                location.href = "http://localhost:5173/find-task";
                            } else if (location.hostname === baseUrl) {
                                location.href = `${baseUrl}/find-task`;
                            }
                            resolve()
                        } else {
                            console.log("USER: ", user)
                            reject();
                        }

                    })
                    .catch(reject)
                    .finally(() => setEntering(false))
            } catch (error) {
                console.error('Erro ao fazer login com Google:', error);
                reject(error);
            }
        })
    };

    const signUpWithEmailAndPassword = async (user: { name: string, email: string, password: string, file: File }) => {
        try {
            setEntering(true)
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((currentUser) => {
                    setEntering(true)
                    const storageRef = ref(storage, `user_images/${user.file.name}`);
                    uploadBytes(storageRef, user.file).then(() => {
                        getDownloadURL(storageRef).then((url) => {
                            const newUser = {
                                uid: currentUser.user.uid,
                                email: currentUser.user.email,
                                displayName: user.name,
                                photoURL: url
                            };
                            createUser(newUser);
                        });
                        //setEntering(false)

                    });
                })

        } catch (error) {
            console.error('Erro ao criar a conta:', error);
        }
    };

    const createUser = async (user: any) => {
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, user)
            .then(() => {
                localStorage.setItem('photoURL', user.photoURL);
                localStorage.setItem('displayName', user.displayName);
                if (location.hostname === 'localhost') {
                    location.href = "http://localhost:5173/find-task";
                } else if (location.hostname === baseUrl) {
                    location.href = `${baseUrl}/find-task`;
                }
            });
    }

    return (
        <AuthContext.Provider value={{ user, loading, entering, logout, loginWithGoogle, signUpWithEmailAndPassword, loginWithEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
