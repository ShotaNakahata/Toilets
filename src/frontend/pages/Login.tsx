// src/components/Login.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import config from '../../config/config'; // 設定ファイルをインポート

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { user, setUser } = useUser();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('API Base URL:', config.apiBaseUrl);
            console.log('Submitting login:', { email, password });
            const response = await axios.post(`${config.apiBaseUrl}/login`,
                { email, password }, { withCredentials: true });
                
            console.log('Login response:', response);

            if (response.data && response.status === 200) {
                console.log('Before setUser:', user);
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites,
                });
                console.log('After setUser:', {
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites,
                });
                navigate('/');
            }
        } catch (error: any) {
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
                        <Link to="/CreateAccount" className="CreateAccount-button">New create account</Link>
                        <Link to="/Forget" className="Forget-button">Forget password</Link>
                        <Link to="/" className="home-button">Return to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from '../../context/UserContext';
// import config from '../../config/config'; // configファイルから設定をインポート

// const Login: React.FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [errorMessage, setErrorMessage] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const { user, setUser } = useUser();

//     const navigate = useNavigate();

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             console.log('API Base URL:', config.apiBaseUrl); // ここで確認
//             console.log('Submitting login:', { email, password });
//             const response = await axios.post(`${config.apiBaseUrl}/login`, { email, password }, { withCredentials: true });
//             console.log('Login response:', response);

//             if (response.data && response.status === 200) {
//                 console.log('Before setUser:', user); // ここで現在のuser状態を確認
//                 setUser({
//                     _id: response.data._id,
//                     username: response.data.username,
//                     email: response.data.email,
//                     favorites: response.data.favorites
//                 });
//                 console.log('After setUser:', {
//                     _id: response.data._id,
//                     username: response.data.username,
//                     email: response.data.email,
//                     favorites: response.data.favorites
//                 }); // ここで新しいuser状態を確認
//                 navigate('/');
//             }
//         } catch (error: any) {
//             console.error('Login failed:', error.response ? error.response.data : error.message);
//             setErrorMessage('Failed to login. Please check your credentials and try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container-log">
//             <div className="loginPage-wrapper">
//                 <div className="loginPage-contents">
//                     <h2>Login Page</h2>
//                     <form className="login-form" onSubmit={handleSubmit}>
//                         <input 
//                             type="email" 
//                             placeholder="Email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                         />
//                         <input 
//                             type="password" 
//                             placeholder="Password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                         />
//                         <button type="submit" disabled={loading}>Login</button>
//                     </form>
//                     {errorMessage && <p>{errorMessage}</p>}
//                     {loading && <p>Loading...</p>}
//                     <div className='loginPage-another'>
//                         <Link to="/CreateAccount" className="CreateAccount-button">New create account</Link>
//                         <Link to="/Forget" className="Forget-button">Forget password</Link>
//                         <Link to="/" className="home-button">Return to Home</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
