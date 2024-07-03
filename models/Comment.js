// models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
    toilet: { type: mongoose.Schema.Types.ObjectId, ref: 'Toilet', required: true } // トイレのIDを参照
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
