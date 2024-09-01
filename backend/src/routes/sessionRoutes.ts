// src/routes/sessionRoutes.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// セッションデータを取得するエンドポイント
router.get('/sessions', async (req: Request, res: Response) => {
    try {
        const db = mongoose.connection.db;

        if (!db) {
            return res.status(500).json({ message: 'Database connection is not established yet.' });
        }

        const sessions = await db.collection('sessions').find().toArray();
        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ message: 'Failed to fetch sessions', error });
    }
});

export default router;
