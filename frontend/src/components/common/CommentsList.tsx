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
        <ul className="space-y-4">  {/* 各コメントの間にスペースを追加 */}
            {comments.map((comment, index) => (
                <li key={index} className="p-4 bg-gray-800 text-white rounded-lg shadow-md">  {/* カードスタイル */}
                    <p className="text-lg font-semibold">{comment.comment}</p>  {/* コメント部分を強調 */}
                    <p className="text-sm text-gray-400">Rating: {comment.rating}</p>  {/* レーティングを小さく表示 */}
                    <p className="text-sm text-gray-400">By: {comment.user}</p>  {/* ユーザー名を小さく表示 */}
                </li>
            ))}
        </ul>
    );
}

export default CommentsList;
