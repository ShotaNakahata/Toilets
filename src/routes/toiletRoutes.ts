import express, { Request, Response } from 'express';
import Toilet from '../models/Toilet';
import Comment from '../models/Comment';
import UserModel from '../models/user';

const router = express.Router();

// トイレの登録ルート
router.post('/register', async (req: Request, res: Response) => {
    const { name, address, rating, universal, initialComment } = req.body;

    // ユーザーがログインしているか確認
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        // ログインしているユーザー情報を取得
        const user = await UserModel.findById(req.session.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // 新しいトイレ情報を作成し、作成者のIDを保存
        const newToilet = new Toilet({ 
            name, 
            address, 
            rating, 
            universal, 
            totalRatingsCount: initialComment ? 1 : 0, 
            totalRatingScore: initialComment ? rating : 0, 
            averageRating: initialComment ? rating : 0,
            createdBy: user._id // 投稿者のIDを保存
        });

        await newToilet.save();

        // 初期コメントがある場合、コメントも作成
        if (initialComment) {
            const newComment = new Comment({ 
                user: user.username, 
                comment: initialComment, 
                rating, 
                toilet: newToilet._id 
            });
            await newComment.save();
        }

        res.status(201).send({ message: 'Toilet registered successfully', newToilet });
    } catch (error) {
        res.status(500).send({ message: 'Failed to register toilet', error });
    }
});

// 全てのトイレ情報を取得するルート
router.get('/', async (req: Request, res: Response) => {
    try {
        const toilets = await Toilet.find();
        res.status(200).json(toilets);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch toilets', error });
    }
});

// 特定のトイレ情報を取得するルート
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const toilet = await Toilet.findById(req.params.id);
        const comments = await Comment.find({ toilet: req.params.id });

        if (!toilet) {
            return res.status(404).send({ message: 'Toilet not found' });
        }

        res.status(200).json({ toilet, comments });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch toilet', error });
    }
});

export default router;
