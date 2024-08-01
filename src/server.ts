// src/server.ts
import express, { Application } from 'express';
import session from 'express-session';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import toiletRoutes from './routes/toiletRoutes';
import commentRoutes from './routes/commentRoutes';
import sessionRoutes from './routes/sessionRoutes';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import favoritesRoutes from "./routes/favoritesRoutes"

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// CORS設定
const corsOptions = {
    origin: 'http://localhost:5173', // フロントエンドのURL
    credentials: true // クッキーを有効にする
};

app.use(cors(corsOptions)); // corsOptionsを渡すように修正


app.use(express.json()); // JSONデータを解析するため

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/sessions',
        collectionName: 'sessions'
    }),
    cookie: { 
        secure: false, // HTTPでもクッキーを送信する
        httpOnly: true, // JavaScriptからクッキーにアクセスできないようにする
        maxAge: 1000 * 60 * 60 * 24 // クッキーの有効期限を1日に設定
    }
}));

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TESTMONGODB_URI : process.env.MONGODB_URI;

// データベース接続
mongoose.connect(MONGODB_URI || '', {
} as ConnectOptions).then(() => {
    if (process.env.NODE_ENV === 'test') {
        console.log("test.dbに接続しました");
    } else {
        console.log("dev.dbに接続しました");
    }
}).catch((err) => console.log(err));

// APIルートを設定
app.use('/api', userRoutes);
app.use('/api/toilets', toiletRoutes);
app.use('/api/comments', commentRoutes);
app.use('/admin', sessionRoutes);
app.use("/api/favorites", favoritesRoutes);


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
