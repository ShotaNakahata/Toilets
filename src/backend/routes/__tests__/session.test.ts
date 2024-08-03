// src/routes/__tests__/session.test.ts
import { Response, response } from 'express';
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import request from 'supertest';
import mongoose from "mongoose";
import app from "../../server";
import UserModel from "../../models/user";
import dotenv from "dotenv";
import { Cookie } from 'express-session';

dotenv.config();

beforeAll(async () => {
    const uri = process.env.TESTMONGODB_URI;
    if (!uri) {
        throw new Error("TESTMONGODB_URI is not defined in .env file");
    } if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    await mongoose.connect(uri);
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Session and Authentication Tests', () => {
    test('should register a user and set a session', async () => {
        const response = await request(app)
            .post('/api/create-account')
            .send({ username: 'testuser', email: 'testuser@example.com', password: 'password123' })
            .expect(201);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.headers["set-cookie"]).toBeDefined();
        const cookies = response.headers["set-cookie"];
        console.log('Session Cookies after registration:', cookies)
    });
    test('should login a user and set a session', async () => {
        await UserModel.create({ username: 'testuser2', email: 'testuser2@example.com', password: 'password123' })
        const response = await request(app)
            .post('/api/login')
            .send({ email: 'testuser2@example.com', password: 'password123' })
            .expect(200);
        expect(response.body).toHaveProperty('username', 'testuser2');
        expect(response.headers["set-cookie"]).toBeDefined();
        const cookies = response.headers["set-cookie"];
        console.log(cookies);
    });
    test("should not allow access to protected route without session", async () => {
        const response = await request(app)
        .post("/api/toilets/register")
        .send({name: 'Test Toilet', address: 'Test Address', rating: 5, universal: true })
        .expect(401);
        expect(response.body).toHaveProperty("message","Unauthorized");
    });
    test("should allow access to protected route with session", async () => {
        const LoginResponse = await request(app)
        .post("/api/login")
        .send({ email: 'testuser2@example.com', password: 'password123' })
        .expect(200);
        const cookies = LoginResponse.headers["set-cookie"];
        const response= await request(app)
        .post('/api/toilets/register')
        .set('Cookie', cookies)
        .send({ name: 'Test Toilet', address: 'Test Address', rating: 5, universal: true })
        .expect(201);

        const WhatIsRB=response.body;
        console.log("WhatIsRB",WhatIsRB);
        expect(response.body).toHaveProperty("newToilet");
        expect(response.body.newToilet).toHaveProperty("name","Test Toilet");
    });
});