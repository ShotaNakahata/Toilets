//src/component/CommentsList.jsx
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => {
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

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired
};

export default CommentsList;
