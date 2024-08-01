import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SnackbarActionText from '../common/SnackbarActionText';
import CommentsList from '../common/CommentsList';
import RatingForm from '../common/RatingForm';
import useFetchToiletDetails from '../../hooks/useFetchToiletDetails';
import axios from 'axios';
import FavoriteButton from '../common/FavoriteButton';
import LoginModal from '../common/LoginModal'; 
import useAuth from '../../hooks/useAuth';
import { useUser } from '../../context/UserContext';

interface Comment {
    user: string;
    comment: string;
    rating: number;
    toiletId: string;
}

interface Toilet {
    name: string;
    rating: number;
    averageRating: number;
    universal: boolean;
    address: string;
    totalRatingsCount: number;
    totalRatingScore: number;
}

const ToiletDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toilet, comments, loading, setComments, setToilet } = useFetchToiletDetails(id!);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const { user } = useUser(); // useUserフックを使用してユーザー情報を取得
    const { showLoginModal, setShowLoginModal, handleLogin, handleCreateAccount } = useAuth(); // useAuthフックを使用

    const handleCommentSubmit = async ({ comment, rating }: { comment: string; rating: number }) => {
        if (!user) {
            setShowLoginModal(true); // ユーザーがログインしていない場合、ログインモーダルを表示
            return;
        }

        try {
            const response = await axios.post<Comment>('/api/comments/add', {
                user: user.username, // ログインユーザーの名前を使用
                comment,
                rating,
                toiletId: id
            });

            setComments(prevComments => [...prevComments, response.data]);

            // 平均評価を更新
            setToilet(prevToilet => prevToilet && ({
                ...prevToilet,
                totalRatingsCount: prevToilet.totalRatingsCount + 1,
                totalRatingScore: prevToilet.totalRatingScore + rating,
                averageRating: (prevToilet.totalRatingScore + rating) / (prevToilet.totalRatingsCount + 1)
            }));

            setMessage('Comment added successfully');
            setOpenSnackbar(true);
        } catch (error) {
            setMessage('Failed to add comment');
            setOpenSnackbar(true);
            console.error('Error adding comment:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!toilet) {
        return <p>Toilet not found.</p>;
    }

    return (
        <div>
            <h1>{toilet.name}</h1>
            <FavoriteButton toiletId={id!} />{/* お気に入りボタン */}
            <button onClick={() => navigate(-1)}>Go Back</button>

            <p>Rating: {toilet.rating}</p>
            <p>Average Rating: {toilet.averageRating.toFixed(1)}</p> {/* 平均評価を表示 */}
            <p>Universal: {toilet.universal ? "Yes" : "No"}</p>
            <p>Address: {toilet.address}</p>
            <div id="map" style={{ width: '100%', height: '400px' }}></div> {/* 地図 */}
            <h2>追加評価</h2>
            <RatingForm onSubmit={handleCommentSubmit} />
            <h2>これまでのコメント</h2>
            <CommentsList comments={comments} />
            <SnackbarActionText
                open={openSnackbar}
                handleClose={handleCloseSnackbar}
                message={message}
            />
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
        </div>
    );
}

export default ToiletDetail;
