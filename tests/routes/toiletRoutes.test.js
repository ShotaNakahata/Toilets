import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../server';
import Toilet from '../../models/Toilet';
import UserModel from '../../models/user';

// テスト用データベース接続設定
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// 各テスト前にデータベースをクリア
beforeEach(async () => {
    await Toilet.deleteMany({});
    await UserModel.deleteMany({});
});

// テスト後にデータベース接続を閉じる
afterAll(async () => {
    await mongoose.connection.close();
});

describe('トイレルートのテスト', () => {
    test('GET /api/toilets - 全てのトイレ情報を返す', async () => {
        const response = await request(app).get('/api/toilets');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/toilets/register - 認証されていない場合は401を返す', async () => {
        const response = await request(app)
            .post('/api/toilets/register')
            .send({ name: 'Test Toilet', address: '123 Test St', rating: 4, universal: true });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    test('POST /api/toilets/register - 認証されたユーザーによるトイレの登録', async () => {
        // テストユーザーを作成し、ログインする
        const user = new UserModel({ username: 'testuser', email: 'test@example.com', password: 'password' });
        await user.save();
        const loginResponse = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'password' });
        const cookie = loginResponse.headers['set-cookie'];

        const response = await request(app)
            .post('/api/toilets/register')
            .set('Cookie', cookie)
            .send({ name: 'Test Toilet', address: '123 Test St', rating: 4, universal: true });

        expect(response.status).toBe(201);
        expect(response.body.newToilet).toHaveProperty('_id');
        expect(response.body.newToilet.name).toBe('Test Toilet');
    });
});
