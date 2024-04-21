import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
        } else if (password !== confirmPassword) {
            setErrorMessage('Password mismatch');
        } else {
            setErrorMessage('');
            // ここでアカウント作成の処理を行う。アカウント作成が成功したら、
            // ログインページにナビゲートします。
            navigate('/login');
        }
    };

    return (
        <div className="container-log">
            <div className="loginPage-wrapper">
                <div className="loginPage-contents">
                    <h2>New create account</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit">Create Account</button>
                    </form>
                    {errorMessage && <p>{errorMessage}</p>}
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
