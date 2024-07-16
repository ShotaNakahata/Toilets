import express, { Request, Response } from 'express';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

// 新規ユーザーの作成
router.post("/create-account", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log('New account registration attempt:', { username, email, password });
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log('Email already in use');
            return res.status(409).send({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, email, password: hashedPassword });
        await user.save();
        console.log('User saved with hashed password:', user.password);
        req.session.userId = user._id.toString();  // userId を文字列として保存
        res.status(201).send({ message: "Account created successfully", username: user.username });
    } catch (error) {
        console.error('Error during account creation:', error);
        res.status(500).send({ message: "An error occurred while creating the account" });
    }
});

// ユーザーのログイン機能
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    try {
        const user = await UserModel.findOne({ email });

        if (user && user instanceof UserModel) {  // 型ガードを追加
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                req.session.userId = user._id.toString();  // userId を文字列として保存
                console.log("FoundUser&PasswordIsCorect");
                res.status(200).send({ message: "Login successful", username: user.username });
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

// Login状況を確認する
router.get("/current-user", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).send({ message: "Not logged in" });
    }
    try {
        const user = await UserModel.findById(req.session.userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
    }
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
