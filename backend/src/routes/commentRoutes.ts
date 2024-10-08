import express, { Request, Response } from 'express';
import Comment from '../models/Comment';
import Toilet from '../models/Toilet';

const router = express.Router();

// コメントの作成
router.post('/add', async (req: Request, res: Response) => {
    const { user, comment, rating, toiletId } = req.body;

    try {
        // 新しいコメントを作成
        const newComment = new Comment({
            user,
            comment,
            rating,
            toilet: toiletId
        });
        await newComment.save();

        // トイレ情報を取得して評価を更新
        const toilet = await Toilet.findById(toiletId);
        if (toilet) {
            // 評価数、総評価スコア、平均評価を更新
            toilet.totalRatingsCount += 1;
            toilet.totalRatingScore += rating;
            toilet.averageRating = toilet.totalRatingScore / toilet.totalRatingsCount;

            await toilet.save(); // 変更を保存
        } else {
            return res.status(404).send({ message: 'Toilet not found' });
        }

        res.status(201).send(newComment);
    } catch (error) {
        console.error("Error occurred while adding comment:", error);
        res.status(500).send({ message: 'Failed to add comment', error });
    }
});


// 特定のトイレのコメントを取得
router.get('/toilet/:toiletId', async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ toilet: req.params.toiletId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch comments', error });
    }
});

export default router;
