import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: string;
    comment: string;
    rating: number;
    date: Date;
    toilet: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
    toilet: { type: mongoose.Schema.Types.ObjectId, ref: 'Toilet', required: true } // トイレのIDを参照
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
