// models/toilet.js
import mongoose from 'mongoose';

const toiletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    universal: { type: Boolean, required: true },
    averageRating: { type: Number, default: 0 }, // 平均評価を保存するフィールド
    totalRatingsCount: { type: Number, default: 0 }, // 全ての評価の数を保存するフィールド
    totalRatingScore: { type: Number, default: 0 }, // 全ての評価の合計点を保存するフィールド
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Toilet = mongoose.model('Toilet', toiletSchema);

export default Toilet;
