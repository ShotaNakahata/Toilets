import express from 'express';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router(); // 'router' を使用

// 新規ユーザーの作成
router.post("/create-account", async (req, res) => {
    const { username, email, password } = req.body;
    console.log('New account registration attempt:', { username, email, password });
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.log('Email already in use');
            return res.status(409).send({ message: "Email already in use" });
        }

        // ここでハッシュ化を行わない
        const user = new UserModel({ username, email, password });
        await user.save();
        console.log('User saved with hashed password:', user.password);
        req.session.userId = user._id;
        res.status(201).send({ message: "Account created successfully", username: user.username });
    } catch (error) {
        console.error('Error during account creation:', error);
        res.status(500).send({ message: "An error occurred while creating the account" });
    }
});


// ユーザーのlogin機能
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    try {
        const user = await UserModel.findOne({ email });
        console.log('User found:', user);

        if (user) {
            console.log('Input password:', password);
            console.log('Stored hashed password:', user.password);

            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', passwordMatch);

            if (passwordMatch) {
                req.session.userId = user._id;
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


router.get('/all', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});

export default router;

