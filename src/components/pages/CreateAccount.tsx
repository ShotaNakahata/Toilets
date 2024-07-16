import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const CreateAccount: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
            setLoading(false);
        } else if (password !== confirmPassword) {
            setErrorMessage('Password mismatch');
            setLoading(false);
        } else {
            setErrorMessage('');
            try {
                const response = await axios.post('http://localhost:4000/api/create-account', { username, email, password });
                if (response.data && response.status === 201) {
                    console.log(response.data);
                    setUser({ username: response.data.username });
                    navigate('/');
                }
            } catch (error: any) {
                setErrorMessage('Failed to create an account');
                console.error('Error during account creation:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container-log">
            <div className="loginPage-wrapper">
                <div className="loginPage-contents">
                    <h2>New create account</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                        <button type="submit" disabled={loading}>Create Account</button>
                    </form>
                    {errorMessage && <p>{errorMessage}</p>}
                    {loading && <p>Loading...</p>}
                    <div className='loginPage-another'>
                        <Link to="/login" className="login">Return to login</Link>
                        <Link to="/" className="home-button">Return to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
