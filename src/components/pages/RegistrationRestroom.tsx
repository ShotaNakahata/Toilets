import React, { useState } from 'react';
import axios from 'axios';
import StarRating from '../common/StarRating';
import { Link, useNavigate } from 'react-router-dom';
import SnackbarActionText from '../common/SnackbarActionText';

interface RegistrationRestroomProps {
    onNewToilet: (toilet: any) => void;
}

const RegistrationRestroom: React.FC<RegistrationRestroomProps> = ({ onNewToilet }) => {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [rating, setRating] = useState<number>(1);
    const [universal, setUniversal] = useState<boolean>(false);
    const [initialComment, setInitialComment] = useState<string>(''); // initialCommentを追加
    const [message, setMessage] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false); // スナックバーの状態を管理
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/toilets/register', {
                name,
                address,
                rating,
                universal,
                initialComment 
            });
            const newToilet = response.data;
            setMessage('Toilet registered successfully!');
            onNewToilet(newToilet); // 親コンポーネントに新しいトイレ情報を渡す
            setOpenSnackbar(true); // 成功時にスナックバーを表示
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2秒後にリダイレクト
        } catch (error) {
            setMessage('Failed to register toilet');
            console.error(error);
            setOpenSnackbar(true); // エラー時にもスナックバーを表示
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
                    <label>Initial Comment:</label> {/* initialCommentフィールド */}
                    <textarea value={initialComment} onChange={(e) => setInitialComment(e.target.value)} />
                </div>
                <button type="submit">Register Toilet</button>
                <Link to="/" className="home-button">Return to Home</Link>
            </form>
            <SnackbarActionText open={openSnackbar} handleClose={handleCloseSnackbar} message={message} />
        </div>
    );
};

export default RegistrationRestroom;
