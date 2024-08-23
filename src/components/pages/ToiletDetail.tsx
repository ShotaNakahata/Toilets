import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SnackbarActionText from '../common/SnackbarActionText';
import CommentsList from '../common/CommentsList';
import RatingForm from '../common/RatingForm';
import FavoriteButton from '../common/FavoriteButton';
import LoginModal from '../common/LoginModal';
import useFetchToiletDetails from '../../hooks/useFetchToiletDetails';
import useAuth from '../../hooks/useAuth';
import { useUser } from '../../context/UserContext';
import DeleteButton from '../common/button/DeleteButton';
import { IToilet } from '../../models/Toilet';

interface Comment {
    user: string;
    comment: string;
    rating: number;
    toiletId: string;
}

const ToiletDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toilet, comments, loading, setComments, setToilet } = useFetchToiletDetails(id!);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const { user } = useUser();
    const { showLoginModal, setShowLoginModal, handleLogin, handleCreateAccount } = useAuth();

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleCommentSubmit = async ({ comment, rating }: { comment: string; rating: number }) => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await axios.post<Comment>(`${apiUrl}/comments/add`, {
                user: user.username,
                comment,
                rating,
                toiletId: id
            });

            setComments(prevComments => [...prevComments, response.data]);

            setToilet(prevToilet => {
                if (!prevToilet) return prevToilet;

                return {
                    ...prevToilet,
                    totalRatingsCount: prevToilet.totalRatingsCount + 1,
                    totalRatingScore: prevToilet.totalRatingScore + rating,
                    averageRating: (prevToilet.totalRatingScore + rating) / (prevToilet.totalRatingsCount + 1),
                } as IToilet;
            });

            setMessage('Comment added successfully');
            setOpenSnackbar(true);
        } catch (error) {
            setMessage('Failed to add comment');
            setOpenSnackbar(true);
            console.error('Error adding comment:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/toilets/${id}`);
            setMessage(response.data.message);
            setOpenSnackbar(true);
            navigate(-1);
        } catch (error) {
            setMessage('Failed to delete toilet');
            setOpenSnackbar(true);
            console.error('Error deleting toilet:', error);
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
        <div className='p-4 pt-20 sm:pt-52 bg-background min-h-screen'>
            <div className='container flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8'>
                {/* トイレ情報セクション */}
                <div className='flex flex-col space-y-8 w-full md:w-1/2 mt-7'>
                    <h1 className='text-4xl text-white'>{toilet.name}</h1>

                    {/* ボタン要素✖️3を横並びで横長のデザインに変更し、smでのスタイルを調整 */}
                    <div className="flex space-x-2 w-full sm:w-2/3"> {/* 親要素の幅を100%使用 */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex-1 border-2 border-white bg-background text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors px-2 py-2 duration-300 text-sm sm:text-xs sm:px-4 sm:py-2">
                            Go Back
                        </button>

                        {toilet.createdBy.toString() === user?._id && (
                            <div className="flex-1 border-2 border-white bg-background text-white text-center rounded-full hover:bg-white hover:text-gray-800 transition-colors px-2 py-2 duration-300 text-sm sm:text-xs sm:px-4 sm:py-2">
                                <DeleteButton
                                    onConfirm={handleDelete}
                                    itemName="this toilet"
                                    buttonText="Delete Toilet"
                                />
                            </div>
                        )}

                        <FavoriteButton toiletId={id!} className="flex-1 border-2 border-white bg-background text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors px-2 py-2 duration-300 text-sm sm:text-xs sm:px-4 sm:py-2" />
                    </div>

                    <div className='text-3xl text-white leading-normal'>
                        <p>Rating: {toilet.rating}</p>
                        <p>Average Rating: {toilet.averageRating.toFixed(1)}</p>
                        <p>Universal: {toilet.universal ? "Yes" : "No"}</p>
                        <p>Address: {toilet.address}</p>
                    </div>
                </div>

                {/* コメントと評価フォームセクション */}
                <div className='flex flex-col space-y-8 w-full md:w-1/2'>
                    <div className='text-3xl text-white leading-relaxed'>
                        <h2 className="text-3xl font-bold mb-4">Add Rating</h2>
                        <div className="p-4 border border-white rounded-lg shadow-white mb-10"> {/* 白い枠、角丸、シャドウ */}
                            <RatingForm onSubmit={handleCommentSubmit} />
                        </div>
                        <h2 className="text-4xl font-bold mt-8 mb-4">Comments</h2>
                        <CommentsList comments={comments} />
                        <SnackbarActionText
                            open={openSnackbar}
                            handleClose={handleCloseSnackbar}
                            message={message}
                        />
                    </div>
                </div>

                <LoginModal
                    open={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLogin}
                    onCreateAccount={handleCreateAccount}
                />
            </div>
        </div>
    );
}

export default ToiletDetail;



