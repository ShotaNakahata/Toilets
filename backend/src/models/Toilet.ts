// backend/src/models/Toilet.ts
import { IToilet } from '../interfaces/Toilet_Interfaces';
import mongoose, { Document, Schema } from 'mongoose';


const toiletSchema: Schema<IToilet> = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    universal: { type: Boolean, required: true },
    averageRating: { type: Number, default: 0 }, // 平均評価を保存するフィールド
    totalRatingsCount: { type: Number, default: 0 }, // 全ての評価の数を保存するフィールド
    totalRatingScore: { type: Number, default: 0 }, // 全ての評価の合計点を保存するフィールド
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lat:{type:Number,required:true},
    lng:{type:Number,required:true},
    country:{type:String,required:true},
});

const Toilet = mongoose.model<IToilet>('Toilet', toiletSchema);

export default Toilet;
