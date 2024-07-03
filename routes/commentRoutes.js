// routes/commentRoutes.js
import express from 'express';
import Comment from '../models/Comment.js';
import Toilet from '../models/Toilet.js';

const router = express.Router();

// コメントの作成
router.post('/add', async (req, res) => {
    const { user, comment, rating, toiletId } = req.body;

    try {
        const newComment = new Comment({ user, comment, rating, toilet: toiletId });
        await newComment.save();

        // トイレの平均評価を更新
        const toilet = await Toilet.findById(toiletId);
        if (toilet) {
            toilet.totalRatingsCount += 1;
            toilet.totalRatingScore += rating;
            toilet.averageRating = toilet.totalRatingScore / toilet.totalRatingsCount;
            await toilet.save();
        }

        res.status(201).send(newComment);
    } catch (error) {
        res.status(500).send({ message: 'Failed to add comment', error });
    }
});

// 特定のトイレのコメントを取得
router.get('/toilet/:toiletId', async (req, res) => {
    try {
        const comments = await Comment.find({ toilet: req.params.toiletId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch comments', error });
    }
});

export default router;
