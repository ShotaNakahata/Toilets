///vite-project/server.js//
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();
const PORT = 4000;
app.use(cors());

app.use(express.json()); // JSONデータを解析するため

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 本番環境ではtrueに設定してhttpsを使う
}));

// データベース接続
mongoose.connect(
    "mongodb+srv://Shengtai:Shengtai48627544@whereismyrestroom.05umpfz.mongodb.net/?retryWrites=true&w=majority&appName=WhereIsMyRestroom"
).then(() => console.log("データベース接続に成功しました"))
.catch((err) => console.log(err));

app.use('/api', userRoutes); // APIルートを '/api' に設定

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
