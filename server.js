import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import toiletRoutes from './routes/toiletRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json()); // JSONデータを解析するため

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 本番環境ではtrueに設定してhttpsを使う
}));

// データベース接続
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("データベース接続に成功しました"))
    .catch((err) => console.log(err));

// APIルートを設定
app.use('/api', userRoutes);
app.use('/api/toilets', toiletRoutes);
app.use('/api/comments', commentRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
