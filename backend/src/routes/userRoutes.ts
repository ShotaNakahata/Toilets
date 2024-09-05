import express, { Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

// 共通のログイン処理
const loginUser = async (req: Request, user: any) => {
    req.session.userId = user._id.toString();
    await req.session.save();
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        favorites: user.favorites
    };
};

// 新規ユーザーの作成
router.post("/create-account", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: "Email already in use" });
        }
        const user = new UserModel({ username, email, password });
        await user.save();

        // 新規作成したユーザーでログイン処理を実行
        const userData = await loginUser(req, user);

        res.status(201).send({
            message: "Account created and logged in successfully",
            ...userData
        });
    } catch (error) {
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
                const userData = await loginUser(req, user);

                res.status(200).send({ 
                    message: "Login successful", 
                    ...userData
                });
            } else {
                res.status(401).send({ message: "Invalid email or password" });
            }
        } else {
            res.status(401).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/current-user", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: "Not logged in" });
    }
    try {
        const user = await UserModel.findById(req.session.userId).populate("favorites");
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        } 
        res.send({
            _id: user._id,
            username: user.username,
            email: user.email,
            favorites: user.favorites || []
        });
    } catch (error) {
        res.status(500).send({ message: "An error occurred" });
    }
});

router.post("/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.send({ message: 'Logout successful' });
    });
});

router.get('/all', async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});

export default router;

