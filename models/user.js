///vite-project/models/user.js//

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// パスワードを保存する前に自動的にハッシュ化する
userSchema.pre('save', async function (next) {
    const user = this;

    // パスワードが変更されていない場合は何もしない
    if (!user.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);
export default User;

