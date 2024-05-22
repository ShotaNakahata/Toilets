// Toilet.js
import mongoose from 'mongoose';
import commentSchema from './CommentSchema';

const toiletSchema = new mongoose.Schema({
    location: { type: String, required: true },
    accessibility: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    comments: [commentSchema]  // コメントをサブドキュメントの配列として埋め込む
});

const Toilet = mongoose.model('Toilet', toiletSchema);
export default Toilet;
