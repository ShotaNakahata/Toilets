import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// パスワードを保存する前に自動的にハッシュ化する
userSchema.pre<IUser>('save', async function (next) {
    const user = this;

    // パスワードが変更されていない場合は何もしない
    if (!user.isModified('password')) return next();

    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (err) {
        return next(err as CallbackError); 
    }
});

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
