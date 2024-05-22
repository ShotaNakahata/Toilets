///vite-project/routes/userRoutes.js//
import express from 'express';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router(); // 'router' を使用

// ユーザー一覧の取得
router.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 新規ユーザーの作成
router.post("/create-account", async (req, res) => {
    const {username, email, password} = req.body;
    try {
        // 新規ユーザー登録のためだから既存していないかをチェック
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(409).send({ message: "Email already in use" });
            
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({ username, email, password: hashedPassword });
            await user.save();
            req.session.userId = user._id; // セッションにユーザーIDを保存
            res.status(201).send({ message: "Account created successfully", username: user.username });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while creating the account" });
    }
});


// ユーザーのlogin機能
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user._id;
            console.log("FoundUser&PasswordIsCorect")
            res.redirect('/');
        } else {
            res.status(401).send({ message: "Invalid email or password" });
            console.log("FoundUser&PasswordIsNotCorect")
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Login状況を確認する
router.get("/current-user", async (req, res) => {
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

// ユーザー消去

export default router;

