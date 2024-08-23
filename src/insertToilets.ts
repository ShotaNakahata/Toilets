// src/insertToilets.ts
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import Toilet from './models/Toilet'; 
import toiletsData from './data/toiletsData';
import nodeGeocoder from 'node-geocoder';

dotenv.config();

// Geocoding APIの設定
const options = {
    provider: 'google' as const,
    apiKey: 'AIzaSyCJYCyY49yx71ktTJXSx8H0JucZeuY-WRc', // ここにGoogle APIキーを記述
};
const geocoder = nodeGeocoder(options);

// データベース接続
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev.db';

mongoose.connect(MONGODB_URI, {
} as ConnectOptions).then(async () => {
    console.log('データベースに接続しました');
    await seedToilets();
    mongoose.connection.close();
}).catch((err) => {
    console.error('データベース接続に失敗しました:', err);
});

const seedToilets = async () => {
    try {
        // ShotaさんのユーザーIDを使用
        const userId = '669ea87970432cd351826be8';

        for (const toiletData of toiletsData) {
            // 住所から緯度、経度、国を取得
            const geoData = await geocoder.geocode(toiletData.address);
            if (geoData.length === 0) {
                console.error(`住所 ${toiletData.address} の緯度経度を取得できませんでした`);
                continue;
            }

            const { latitude, longitude, country } = geoData[0];

            // 初期評価の計算
            const initialTotalRatingsCount = toiletData.rating ? 1 : 0; // 初期評価があれば評価数を1とする
            const initialTotalRatingScore = toiletData.rating || 0; // 初期評価があればそれをスコアとする
            const initialAverageRating = toiletData.rating || 0; // 初期評価があればそれを平均評価とする

            const newToilet = new Toilet({
                ...toiletData,
                lat: latitude,
                lng: longitude,
                country, // 取得した国情報を保存
                createdBy: userId, // ShotaさんのIDを設定
                totalRatingsCount: initialTotalRatingsCount,
                totalRatingScore: initialTotalRatingScore,
                averageRating: initialAverageRating,
            });

            await newToilet.save();
            console.log(`${toiletData.name}をデータベースに登録しました`);
        }
        console.log('全てのトイレデータをデータベースに登録しました');
    } catch (error) {
        console.error('トイレデータの登録中にエラーが発生しました:', error);
    }
};
