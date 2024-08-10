// src/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import { error } from 'console';
import { request } from 'http';

const router = express.Router();

// 新規ユーザーの作成
router.post("/create-account", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log('Email already in use');
            return res.status(409).send({ message: "Email already in use" });
        }
        const user = new UserModel({ username, email, password });
        await user.save();
        // console.log('User saved with hashed password:', user.password);
        req.session.userId = user._id.toString();  // userId を文字列として保存
        res.status(201).send({
            message: "Account created successfully",
            _id: user._id,
            username: user.username,
            email: user.email,
            favorites: user.favorites
        });
    } catch (error) {
        // console.error('Error during account creation:', error);
        res.status(500).send({ message: "An error occurred while creating the account" });
    }
});

// ユーザーのログイン機能
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    try {
        const user = await UserModel.findOne({ email });

        if (user && user instanceof UserModel) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                req.session.userId = user._id.toString();
                console.log("Session after login:", req.session); 
                res.status(200).send({ 
                    message: "Login successful", 
                    username: user.username, 
                    _id: user._id,
                    favorites: user.favorites,
                    email: user.email,
                });
            } else {
                console.log("Invalid password");
                res.status(401).send({ message: "Invalid email or password" });
            }
        } else {
            console.log("User not found");
            res.status(401).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send(error);
    }
});


router.get("/current-user", async (req: Request, res: Response) => {
    console.log("<userRoutes.ts>Current session:", req.session); // 追加
    if (!req.session.userId) {
        return res.status(401).send({ message: "<userRoutes.ts>Not logged in" });
    }
    try {
        const user = await UserModel.findById(req.session.userId).populate("favorites");
        if (!user) {
            return res.status(404).send({ message: "<userRoutes.ts>User not found" });
        } 
        console.log("<userRoutes.ts>Fetched user:", user); // 追加
        res.send({
            _id: user._id,
            username: user.username,
            email: user.email,
            favorites: user.favorites || []
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "<userRoutes.ts>An error occurred" });
    }
});


router.post("/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: '<userRoutes.ts>Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.send({ message: '<userRoutes.ts>Logout successful' });
        const cookies = req.headers["set-cookie"];
        console.log("<userRoutes.ts>Session after login:", cookies);
    });
});


router.get('/all', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: '<userRoutes.ts>Failed to fetch users', error });
    }
});

export default router;
