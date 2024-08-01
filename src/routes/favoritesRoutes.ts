import express, { Request, Response } from 'express';
import User from "../models/user";

const router = express.Router();

// 現在のユーザーのお気に入りを取得
// src/routes/userRoutes.ts
router.get("/current-user", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Not logged in' });
    }
    try {
        const user = await User.findById(req.session.userId).populate("favorites");
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            _id: user._id,
            username: user.username,
            email: user.email,
            favorites: user.favorites
        });
    } catch (error) {
        console.error('Error fetching favorites', error);
        res.status(500).send({ message: 'Error fetching favorites', error });
    }
});


// お気に入りのトイレを追加
router.post("/add", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Not logged in' });
    }
    const { toiletId } = req.body;
    console.log(`Add favorite: userId=${req.session.userId}, toiletId=${toiletId}`);
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (!user.favorites.includes(toiletId)) {
            user.favorites.push(toiletId);
            await user.save();
            console.log("Favorites updated", user.favorites);
        }
        res.status(200).send({ message: 'Toilet added to favorites' });
    } catch (error) {
        console.error('Error adding to favorites', error);
        res.status(500).send({ message: 'Error adding to favorites', error });
    }
});

// お気に入りのトイレを削除
router.post("/remove", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: 'Not logged in' });
    }
    const { toiletId } = req.body;
    console.log(`Remove favorite: userId=${req.session.userId}, toiletId=${toiletId}`); 
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        user.favorites = user.favorites.filter(id => id.toString() !== toiletId);
        await user.save();
        res.status(200).send({ message: 'Toilet removed from favorites' });
    } catch (error) {
        console.error('Error removing from favorites', error);
        res.status(500).send({ message: 'Error removing from favorites', error });
    }
});

router.get("/:userId", async (req: Request, res: Response) => {
    console.log(`Get favorites for userId=${req.params.userId}`); 
    try {
        const user = await User.findById(req.params.userId).populate("favorites");
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user.favorites);
    } catch (error) {
        console.error('Error fetching favorites', error);
        res.status(500).send({ message: 'Error fetching favorites', error });
    }
});

export default router;
