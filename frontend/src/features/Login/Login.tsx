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
        <div className="bg-background relative min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-background mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-background">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-background">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-background text-white font-semibold rounded-lg hover:bg-white hover:text-background transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                <div className="flex justify-between mt-4 text-sm text-background">
                    <Link to="/CreateAccount" className="hover:underline">Create Account</Link>
                    <Link to="/Forget" className="hover:underline">Forget Password</Link>
                </div>
                <div className="text-center mt-6">
                    <Link to="/" className="text-background hover:underline">Return to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;


