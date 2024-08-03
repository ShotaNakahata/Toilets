// src/routes/__tests__/favoritesRoutes.test.ts
import { describe, beforeAll, afterAll, test, expect } from 'vitest';
import request, { agent, SuperAgentTest } from 'supertest';
import mongoose, { Types } from 'mongoose';
import app from '../../server';
import UserModel from '../../models/user';
import dotenv from "dotenv";
import { error } from 'console';

dotenv.config();

beforeAll(async () => {
    const uri = process.env.TESTMONGODB_URI;
    if (!uri) {
        throw new Error("TESTMONGODB_URI is not defined in .env file");
    }
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped');
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Favorites Routes', () => {
    let userId: string;
    let toiletId: string;
    let agent: any;

    beforeAll(async () => {
        agent = request.agent(app);

        //mockUserの生成
        const user = await UserModel.create({
            _id: new Types.ObjectId(),
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123'
        });
        userId = user._id.toString();

        //先にlogin
        const loginResponse = await agent
            .post('/api/login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        console.log('Login response:', loginResponse.body);

        //トイレの登録
        const toiletResponse = await agent
            .post('/api/toilets/register')
            .send({ name: 'Test Toilet', address: '123 Test St', rating: 5, universal: true, initialComment: "" });

        console.log("toiletResponse", toiletResponse.body);
        toiletId = toiletResponse.body.newToilet._id;
    });

    test('should add toilet to favorites', async () => {
        const response = await agent
            .post('/api/favorites/add')
            .send({ userId, toiletId });

        console.log("'/api/favorites/add' response.status:", response.status);
        console.log("'/api/favorites/add'response.body:", response.body);
        expect(response.body).toHaveProperty('message', 'Toilet added to favorites');

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // ObjectIdと文字列を比較するために、すべてのfavoritesを文字列に変換してから比較
        const favorites = user.favorites.map(favorite => favorite.toString());
        expect(favorites).toContain(toiletId);
    });


    //favoritesからremove
    test("should remove toilet from favorites", async () => {
        const response = await agent
            .post('/api/favorites/remove')
            .send({ userId, toiletId });

        console.log("'/api/favorites/remove' response.status:", response.status);
        console.log("'/api/favorites/remove' response.body:", response.body);
        expect(response.body).toHaveProperty("message", 'Toilet removed from favorites');


        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const favorites = user.favorites.map(favorite => favorite.toString());
        expect(favorites).not.toContain(toiletId);
    });

    //favoritesをfetch
    test('should fetch user favorites',async()=>{
        await agent
        .post('/api/favorites/add')
        .send({ userId, toiletId });
        const response = await agent.get(`/api/favorites/${userId}`) 
        console.log("'/api/favorites/:userId' response.status:", response.status);
        console.log("'/api/favorites/:userId' response.body:", response.body);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ _id: toiletId.toString() })]));
        expect(Array.isArray(response.body)).toBe(true);
    })
});
