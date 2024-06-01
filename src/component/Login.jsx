import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Submitting login:', { email, password });
            const response = await axios.post(`http://localhost:4000/api//login`, { email, password });
            console.log('Login response:', response);

            if (response.data && response.status === 200) {
                setUser({ username: response.data.username });
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setErrorMessage('Failed to login. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-log">
            <div className="loginPage-wrapper">
                <div className="loginPage-contents">
                    <h2>Login Page</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
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
                        <button type="submit" disabled={loading}>Login</button>
                    </form>
                    {errorMessage && <p>{errorMessage}</p>}
                    {loading && <p>Loading...</p>}
                    <div className='loginPage-another'>
                        <Link to="/CreateAccount" className="/CreateAccount-button">New create account</Link>
                        <Link to="/Forget" className="/Forget-button">Forget password</Link>
                        <Link to="/" className="home-button">Return to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;



