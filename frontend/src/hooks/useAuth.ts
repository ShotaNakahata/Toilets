// frontend/src/hooks/useAuth.ts
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const useAuth = () => {
    const { setUser } = useUser();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;
    // const apiUrl = 'http://localhost:4000/api';
    
    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}/login`, { email, password }, { withCredentials: true });

            if (response.data && response.status === 200) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites 
                });
                setShowLoginModal(false);
                console.log('Login successful:', response.data); // デバッグ用ログ
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleCreateAccount = async (
        username: string, 
        email: string, 
        password: string, 
        confirmPassword: string) => {

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/create-account`, { username, email, password });
            if (response.data && response.status === 201) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites || []
                });
                setShowLoginModal(false); 
                console.log('Account created successfully:', response.data); // デバッグ用ログ
            }
        } catch (error) {
            console.error('Create account failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const logoutPromise = axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
            
            const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 4000));

            await Promise.race([logoutPromise, timeoutPromise]);
            setUser(null);
            navigate('/');
            console.log('Logout successful'); // デバッグ用ログ
        } catch (error) {
            console.log('Logout failed:', error);
        }
    }

    return {
        showLoginModal,
        setShowLoginModal,
        handleLogin,
        handleCreateAccount,
        handleLogout 
    };
};

export default useAuth;
