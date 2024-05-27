import { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';

const RegistrationRestroom = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(1);
    const [universal, setUniversal] = useState(false);
    const [comments, setComments] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/toilets/register`, {
                name,
                address,
                rating,
                universal,
                comments
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to register toilet');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>RegistrationRestroom</h1>
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
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrationRestroom;

