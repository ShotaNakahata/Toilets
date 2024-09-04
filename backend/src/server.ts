import express, { Application } from 'express';
import session from 'express-session';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from './routes/userRoutes';
import toiletRoutes from './routes/toiletRoutes';
import commentRoutes from './routes/commentRoutes';
import sessionRoutes from './routes/sessionRoutes';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import favoritesRoutes from './routes/favoritesRoutes';
import contactRoutes from './routes/contactRoutes';
import dashboardRouter from './routes/DashboardRouter';

// NODE_ENVの設定を最初に行う
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log(`Running in ${process.env.NODE_ENV} mode`);

// 環境に応じて読み込む .env ファイルを切り替える
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });
console.log(`Loaded environment variables from ${envFile}`);

const app: Application = express();
const PORT = process.env.PORT || 4000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// CORS設定
// NODE_ENVに基づいて適切な環境変数を使用
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS_PRODUCTION
    : process.env.ALLOWED_ORIGINS_DEVELOPMENT;

const corsOptions = {
    origin: allowedOrigins ? allowedOrigins.split(',') : [], // 複数のオリジンをカンマ区切りで指定可能
    credentials: true 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/sessions',
        collectionName: 'sessions'
    }),
    cookie: {
        secure: !isDevelopment,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // クッキーの有効期限を1日に設定
    }
}));

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TESTMONGODB_URI : process.env.MONGODB_URI;

// データベース接続
mongoose.connect(MONGODB_URI || '', {
} as ConnectOptions).then(() => {
    console.log(`Connected to ${process.env.NODE_ENV === 'test' ? 'test.db' : 'dev.db'}`);

    // APIルートを設定
    app.use('/api', userRoutes);
    app.use('/api/toilets', toiletRoutes);
    app.use('/api/comments', commentRoutes);
    app.use('/admin', sessionRoutes);
    app.use('/api/favorites', favoritesRoutes);
    app.use('/api/contact', contactRoutes);
    app.use('/api/dashboard', dashboardRouter);

    if (!isDevelopment) {
        // 静的ファイルの提供
        app.use(express.static(path.join(__dirname, '../frontend')));

        // フロントエンドのルーティング設定
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
        });
    }

    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
}).catch((err) => {
    console.error('Database connection error:', err);
});

export default app;



// import express, { Application } from 'express';
// import session from 'express-session';
// import mongoose, { ConnectOptions } from 'mongoose';
// import dotenv from 'dotenv';
// import path from 'path';
// import userRoutes from './routes/userRoutes';
// import toiletRoutes from './routes/toiletRoutes';
// import commentRoutes from './routes/commentRoutes';
// import sessionRoutes from './routes/sessionRoutes';
// import cors from 'cors';
// import MongoStore from 'connect-mongo';
// import favoritesRoutes from './routes/favoritesRoutes';
// import contactRoutes from './routes/contactRoutes';
// import dashboardRouter from './routes/DashboardRouter';

// // NODE_ENVの設定を最初に行う
// process.env.NODE_ENV = process.env.NODE_ENV || 'production';
// console.log(`Running in ${process.env.NODE_ENV} mode`);

// // 環境に応じて読み込む .env ファイルを切り替える
// const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
// dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });
// console.log(`Loaded environment variables from ${envFile}`);

// const app: Application = express();
// const PORT = process.env.PORT || 4000;
// const isDevelopment = process.env.NODE_ENV !== 'production';

// // CORS設定
// const corsOptions = {
//     origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//     credentials: true // クッキーを有効にする
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// app.use(session({
//     secret: process.env.SESSION_SECRET || 'default_secret',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/sessions',
//         collectionName: 'sessions'
//     }),
//     cookie: {
//         secure: !isDevelopment,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 // クッキーの有効期限を1日に設定
//     }
// }));

// const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TESTMONGODB_URI : process.env.MONGODB_URI;

// // データベース接続
// mongoose.connect(MONGODB_URI || '', {
// } as ConnectOptions).then(() => {
//     console.log(`Connected to ${process.env.NODE_ENV === 'test' ? 'test.db' : 'dev.db'}`);

//     // APIルートを設定
//     app.use('/api', userRoutes);
//     app.use('/api/toilets', toiletRoutes);
//     app.use('/api/comments', commentRoutes);
//     app.use('/admin', sessionRoutes);
//     app.use('/api/favorites', favoritesRoutes);
//     app.use('/api/contact', contactRoutes);
//     app.use('/api/dashboard', dashboardRouter);

//     if (!isDevelopment) {
//         // 静的ファイルの提供
//         app.use(express.static(path.join(__dirname, '../frontend'))); 

//         // フロントエンドのルーティング設定
//         app.get('*', (req, res) => {
//             res.sendFile(path.join(__dirname, '../frontend', 'index.html')); 
//         });
//     }

//     if (process.env.NODE_ENV !== 'test') {
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     }
// }).catch((err) => {
//     console.error('Database connection error:', err);
// });

// export default app;
