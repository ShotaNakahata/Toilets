// src/components/ToiletDetail.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SnackbarActionText from './SnackbarActionText';
import CommentsList from './CommentsList';
import RatingForm from './RatingForm';
import useFetchToiletDetails from '../hooks/useFetchToiletDetails';
import axios from 'axios';

function ToiletDetail() {
    const { id } = useParams();
    const { toilet, comments, loading, setComments, setToilet } = useFetchToiletDetails(id); // 変更点
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');

    const handleCommentSubmit = async ({ comment, rating }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/comments/add', {
                user: 'Anonymous',
                comment,
                rating,
                toiletId: id
            });
            setComments(prevComments => [...prevComments, response.data]);

            // 平均評価を更新
            setToilet(prevToilet => ({
                ...prevToilet,
                totalRatingsCount: prevToilet.totalRatingsCount + 1,
                totalRatingScore: prevToilet.totalRatingScore + rating,
                averageRating: (prevToilet.totalRatingScore + rating) / (prevToilet.totalRatingsCount + 1)
            })); // 追加部分

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
            <button>お気に入り</button> {/* お気に入りボタン */}
            <Link to={`/FilterSearchToile`}>Go back</Link>
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
        </div>
    );
}

export default ToiletDetail;
