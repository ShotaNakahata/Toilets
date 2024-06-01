///vite-project/server.js//
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import toiletRoutes from './routes/toiletRoutes.js';
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

// APIルートを設定
app.use('/api', userRoutes); 
app.use('/api/toilets', toiletRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
