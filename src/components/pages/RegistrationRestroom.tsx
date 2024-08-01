import React, { useState } from 'react';
import axios from 'axios';
import StarRating from '../common/StarRating';
import { Link, useNavigate } from 'react-router-dom';
import SnackbarActionText from '../common/SnackbarActionText';
import LoginModal from '../common/LoginModal';
import { useUser } from '../../context/UserContext';

interface RegistrationRestroomProps {
    onNewToilet: (toilet: any) => void;
}

const RegistrationRestroom: React.FC<RegistrationRestroomProps> = ({ onNewToilet }) => {
    const { user, setUser } = useUser();
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [rating, setRating] = useState<number>(1);
    const [universal, setUniversal] = useState<boolean>(false);
    const [initialComment, setInitialComment] = useState<string>(''); 
    const [message, setMessage] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); 
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/toilets/register', {
                name,
                address,
                rating,
                universal,
                initialComment
            }, { withCredentials: true });
            const newToilet = response.data;
            setMessage('Toilet registered successfully!');
            onNewToilet(newToilet); 
            setOpenSnackbar(true); 
            setTimeout(() => {
                navigate('/');
            }, 2000); 
        } catch (error: any) {
            setMessage('Failed to register toilet');
            setOpenSnackbar(true);
            console.error('Error registering toilet:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:4000/api/login', { email, password }, { withCredentials: true });
            if (response.data && response.status === 200) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites:response.data.favorites
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleCreateAccount = async (username: string, email: string, password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/create-account', { username, email, password });
            if (response.data && response.status === 201) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites:response.data.favorites
                });
            }
        } catch (error) {
            console.error('Create account failed:', error);
        }
    };

    return (
        <div>
            <h1>Registration Restroom</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Toilet Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Rating:</label>
                    <StarRating rating={rating} setRating={setRating} />
                </div>
                <div>
                    <label>
                        <input type="checkbox" checked={universal} onChange={(e) => setUniversal(e.target.checked)} />
                        Universal
                    </label>
                </div>
                <div>
                    <label>Initial Comment:</label>
                    <textarea value={initialComment} onChange={(e) => setInitialComment(e.target.value)} />
                </div>
                <button type="submit">Register Toilet</button>
                <Link to="/" className="home-button">Return to Home</Link>
            </form>
            <SnackbarActionText open={openSnackbar} handleClose={handleCloseSnackbar} message={message} />
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
        </div>
    );
};

export default RegistrationRestroom;
