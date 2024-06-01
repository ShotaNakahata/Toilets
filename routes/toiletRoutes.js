//vite-project/routes/toiletRoutes.js
import express from 'express';
import Toilet from '../models/toilet.js';

const router = express.Router();

// 登録ルート
router.post('/register', async (req, res) => {
    const { name, address, rating, universal, comments } = req.body;

    try {
        const newToilet = new Toilet({ name, address, rating, universal, comments });
        await newToilet.save();
        res.status(201).send({ message: 'Toilet registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to register toilet', error });
    }
});

// GETルート
router.get('/all', async (req, res) => {
    try {
        const toilets = await Toilet.find();
        res.status(200).json(toilets);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch toilets', error });
    }
});

export default router;

