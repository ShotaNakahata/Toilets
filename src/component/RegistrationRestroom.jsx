import { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { Link, useNavigate } from 'react-router-dom';
import SnackbarActionText from './SnackbarActionText';

const RegistrationRestroom = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(1);
    const [universal, setUniversal] = useState(false);
    const [comments, setComments] = useState('');
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/api/toilets/register`, {
                name,
                address,
                rating,
                universal,
                comments
            });
            setMessage(response.data.message); // サーバーからのメッセージを取得してセット
            setOpenSnackbar(true); // スナックバーを表示
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2秒後にリダイレクト
        } catch (error) {
            setMessage('Failed to register toilet'); // エラーメッセージをセット
            setOpenSnackbar(true); // スナックバーを表示
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
                    <label>Comments:</label>
                    <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
                </div>
                <button type="submit">Register Toilet</button>
                <Link to="/" className="home-button">Return to Home</Link>
            </form>
            {message && <p>{message}</p>}
            <SnackbarActionText open={openSnackbar} handleClose={handleCloseSnackbar} message={message} />
        </div>
    );
};

export default RegistrationRestroom;
