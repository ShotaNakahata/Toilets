// interfaces/Toilet_Interfaces.ts
import mongoose from "mongoose";

// src/interfaces/Toilet_Interfaces.ts
export interface Toilet {
    id: string;
    name: string;
    address: string;
    lat: number;  // 緯度
    lng: number;  // 経度
}

export interface IToilet extends Document {
    _id: mongoose.Types.ObjectId;  // ここを追加
    name: string;
    address: string;
    lat: number;  // 緯度
    lng: number;  // 経度
    rating: number;
    universal: boolean;
    averageRating: number;
    totalRatingsCount: number;
    totalRatingScore: number;
    createdBy: mongoose.Types.ObjectId;
    country: string;
}
