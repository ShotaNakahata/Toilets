// frontend/src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    email: string;
    favorites: string[]; 
}

export interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode; value?: UserContextProps }> = ({ children, value }) => {
    const [user, setUser] = useState<User | null>(value?.user || null);
    const isMounted = useRef(true); // フラグの追加

    const apiUrl = import.meta.env.VITE_API_URL;
    // const apiUrl = 'http://localhost:4000/api';

    useEffect(() => {
        return () => {
            isMounted.current = false; // アンマウント時にフラグをfalseにする
        };
    }, []);

    useEffect(() => {
        if (!value) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/current-user`, { withCredentials: true });
                    console.log('Fetched user data:', response.data); // デバッグ用ログ
                    
                    // レスポンスがHTMLかJSONか確認する
                    if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
                        console.error('Fetched data is HTML, not JSON:', response.data);
                        setUser(null);
                    } else if (response.data && response.data.username) {
                        if (isMounted.current) { // フラグを使ってマウント状態を確認
                            setUser({
                                _id: response.data._id,
                                username: response.data.username,
                                email: response.data.email,
                                favorites: response.data.favorites || []
                            });
                        }
                    } else {
                        if (isMounted.current) {
                            setUser(null);
                            console.log('No user found in context'); // デバッグ用ログ
                        }
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    if (isMounted.current) {
                        setUser(null);
                    }
                }
            };
            fetchUser();
        }
    }, [value, apiUrl]);

    useEffect(() => {
        console.log('UserContext after login/update:', user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

