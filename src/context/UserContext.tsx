// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

    useEffect(() => {
        if (!value) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/api/current-user', { withCredentials: true });
                    console.log('Fetched user data:', response.data); // デバッグ用ログ
                    if (response.data && response.data.username) {
                        setUser({
                            _id: response.data._id,
                            username: response.data.username,
                            email: response.data.email,
                            favorites: response.data.favorites || []
                        });
                    } else {
                        setUser(null);
                        console.log('No user found in context'); // デバッグ用ログ
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                }
            };
            fetchUser();
        }
    }, [value]);

    useEffect(()=>{
        console.log('UserContext after login/update:', user);
    },[user]);
    

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
