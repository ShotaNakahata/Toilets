// src/routes/toiletRoutes.ts
import { error } from 'console';
import express, { Request, Response } from 'express';
import Toilet from '../models/Toilet';
import Comment from '../models/Comment';
import UserModel from '../models/user';

const router = express.Router();

const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).send({ message: 'Unauthorized' });
    }
}

// トイレの登録ルート
router.post('/register', isAuthenticated, async (req: Request, res: Response) => {
    const { name, address, rating, universal, initialComment } = req.body;
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
            createdBy: user._id
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

// 特定のトイレ情報を削除するルート
router.delete('/:id', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const toilet = await Toilet.findByIdAndDelete(req.params.id);
        if (!toilet) {
            return res.status(404).send({ message: 'Toilet not found' });
        }

        // トイレに関連するコメントも削除
        await Comment.deleteMany({ toilet: req.params.id });

        res.status(200).send({ message: 'Toilet deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete toilet', error });
    }
});


// 特定のトイレのdetail情報を表示するルート
router.post("/details", async (req: Request, res: Response) => {
    const { ids } = req.body;
    try {
        const toilets = await Toilet.find({ _id: { $in: ids } });
        res.status(200).json(toilets);
    } catch (error) {
        console.log("Error fetching toilet details:", error);
        res.status(500).send({ message: "Error fetching toilet details" });
    }
});


//：dev環境only------------------------------

//全てのトイレ情報を消去
router.delete('/deleteAll', async (req: Request, res: Response) => {
    try {
        // 消去するidを取得
        const toiletIds = await Toilet.find({}).select('_id').exec();
        const idsToDelete = toiletIds.map(Toilet => Toilet._id);

        // 全てのトイレ情報を消去
        const result = await Toilet.deleteMany({ _id: { $in: idsToDelete } });
        // 全ての関連コメントを消去
        await Comment.deleteMany({ toilet: { $in: idsToDelete } });

        // ユーザーのお気に入りからも削除されたトイレのIDを削除
        await UserModel.updateMany(
            {},
            { $pull: { favorites: { $in: idsToDelete } } }
        );
        res.status(200).send({ message: `${result.deletedCount} toilets deleted successfully` })
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete all toilets', error });
    }
});


export default router;
