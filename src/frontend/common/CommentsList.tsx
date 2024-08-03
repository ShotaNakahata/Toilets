import React from 'react';

interface Comment {
    user: string;
    comment: string;
    rating: number;
}

interface CommentsListProps {
    comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
    return (
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>
                    <p>{comment.comment}</p>
                    <p>Rating: {comment.rating}</p>
                    <p>By: {comment.user}</p>
                </li>
            ))}
        </ul>
    );
}

export default CommentsList;
