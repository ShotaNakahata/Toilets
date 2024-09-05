// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from '../../context/UserContext';

// const CreateAccount: React.FC = () => {
//     const [username, setUsername] = useState<string>('');
//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [confirmPassword, setConfirmPassword] = useState<string>('');
//     const [errorMessage, setErrorMessage] = useState<string>('');
//     const [loading, setLoading] = useState<boolean>(false);
//     const { setUser } = useUser();
//     const navigate = useNavigate();

//     // 環境変数からAPIのURLを取得
//     const apiUrl = import.meta.env.VITE_API_URL;
//     // const apiUrl = 'http://localhost:4000/api';
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);
//         if (!username || !email || !password || !confirmPassword) {
//             setErrorMessage('Please fill in all fields.');
//             setLoading(false);
//         } else if (password !== confirmPassword) {
//             setErrorMessage('Password mismatch');
//             setLoading(false);
//         } else {
//             setErrorMessage('');
//             try {
//                 // API URLを環境変数から取得して使用
//                 const response = await axios.post(`${apiUrl}/create-account`, { username, email, password });
//                 if (response.data && response.status === 201) {
//                     console.log(response.data);
//                     setUser({
//                         _id: response.data._id,
//                         username: response.data.username,
//                         email: response.data.email,
//                         favorites: response.data.favorites
//                     });
//                     navigate('/');
//                 }
//             } catch (error: any) {
//                 setErrorMessage('Failed to create an account');
//                 console.error('Error during account creation:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <div className="container-log">
//             <div className="loginPage-wrapper">
//                 <div className="loginPage-contents">
//                     <h2>New create account</h2>
//                     <form className="login-form" onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
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
//                         <input
//                             type="password"
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         <button type="submit" disabled={loading}>Create Account</button>
//                     </form>
//                     {errorMessage && <p>{errorMessage}</p>}
//                     {loading && <p>Loading...</p>}
//                     <div className='loginPage-another'>
//                         <Link to="/login" className="login">Return to login</Link>
//                         <Link to="/" className="home-button">Return to Home</Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateAccount;

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

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;

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
                const response = await axios.post(
                    `${apiUrl}/create-account`, 
                    { username, email, password }, 
                    { withCredentials: true }
                );
                if (response.data && response.status === 201) {
                    setUser({
                        _id: response.data._id,
                        username: response.data.username,
                        email: response.data.email,
                        favorites: response.data.favorites
                    });
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
        <div className="bg-background relative min-h-screen flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-background">Create New Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-background"
                        required
                    />
                    {errorMessage && (
                        <p className="text-red-500 text-center">{errorMessage}</p>
                    )}
                    {loading && (
                        <p className="text-gray-500 text-center">Loading...</p>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-background text-white font-semibold rounded-lg hover:bg-white hover:text-background transition-colors"
                        disabled={loading}
                    >
                        Create Account
                    </button>
                </form>
                <div className="flex justify-between mt-4">
                    <Link to="/login" className="text-background hover:underline">
                        Return to Login
                    </Link>
                    <Link to="/" className="text-background hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;

