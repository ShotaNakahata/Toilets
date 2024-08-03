// src/routes/sessionRoutes.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// セッションデータを取得するエンドポイント
router.get('/sessions', async (req: Request, res: Response) => {
    try {
        const sessions = await mongoose.connection.db.collection('sessions').find().toArray();
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sessions', error });
    }
});

export default router;
