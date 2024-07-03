//src/component/RatingForm.jsx
import  { useState } from 'react';
import PropTypes from 'prop-types';

const RatingForm = ({ onSubmit }) => {
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ comment: newComment, rating: newRating });
        setNewComment('');
        setNewRating(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                評価:
                <input type="number" min="1" max="5" value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} />
            </label>
            <label>
                コメント:
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            </label>
            <button type="submit">評価を追加</button>
        </form>
    );
}

RatingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default RatingForm;
