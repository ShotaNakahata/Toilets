import React, { useState } from 'react';

interface RatingFormProps {
    onSubmit: (data: { comment: string; rating: number }) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({ onSubmit }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [newRating, setNewRating] = useState<number>(1);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
};

export default RatingForm;

