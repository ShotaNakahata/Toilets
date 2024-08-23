import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { setUser } = useUser();

    const navigate = useNavigate();

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/login`, { email, password }, { withCredentials: true });

            if (response.data && response.status === 200) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites
                });
                navigate('/');
            }
        } catch (error: any) {
            setErrorMessage('Failed to login. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 space-y-6 border-2 border-highlight shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-white">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input 
                            id="password"
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-highlight rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full flex justify-center py-2 px-4 border border-highlight rounded-md shadow-sm text-sm font-medium text-highlight bg-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
                <div className="flex justify-between mt-4 text-sm">
                    <Link to="/CreateAccount" className="text-highlight hover:underline">New create account</Link>
                    <Link to="/Forget" className="text-highlight hover:underline">Forget password</Link>
                </div>
                <div className="text-center mt-4">
                    <Link to="/" className="text-highlight hover:underline">Return to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

