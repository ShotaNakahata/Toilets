import { toiletsData } from './toiletsData';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import Toilet from '../models/Toilet'; 
import nodeGeocoder from 'node-geocoder';

dotenv.config();

// Geocoding APIの設定
const options = {
    provider: 'google' as const,
    apiKey: "AIzaSyCJYCyY49yx71ktTJXSx8H0JucZeuY-WRc", 
};
const geocoder = nodeGeocoder(options);

// データベース接続
const MONGODB_URI =  'mongodb+srv://Shengtai:Shengtai48627544@whereismyrestroom.05umpfz.mongodb.net/?retryWrites=true&w=majority&appName=WhereIsMyRestroom';

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
        const userId = '669ea87970432cd351826be8';

        for (const toiletData of toiletsData) {
            const geoData = await geocoder.geocode(toiletData.address);
            if (geoData.length === 0) {
                console.error(`住所 ${toiletData.address} の緯度経度を取得できませんでした`);
                continue;
            }

            const { latitude, longitude, country } = geoData[0];

            const newToilet = new Toilet({
                ...toiletData,
                lat: latitude,
                lng: longitude,
                country,
                createdBy: userId,
                totalRatingsCount: 1,
                totalRatingScore: toiletData.rating,
                averageRating: toiletData.rating,
            });

            await newToilet.save();
            console.log(`${toiletData.name}をデータベースに登録しました`);
        }
        console.log('全てのトイレデータをデータベースに登録しました');
    } catch (error) {
        console.error('トイレデータの登録中にエラーが発生しました:', error);
    }
};
