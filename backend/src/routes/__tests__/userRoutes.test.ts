// src/routes/__tests__/userRoutes.test.ts
import * as dotenv from 'dotenv';
import request from 'supertest';
import express, { Request, Response } from 'express';
import session, { Cookie } from 'express-session';
import userRouter from "../userRoutes"
import { describe, beforeAll, test, expect } from 'vitest';
import { mockUsers } from '../../__mocks__/mockUserDB';
import { mock } from 'node:test';
import mongoose from 'mongoose';
import UserModel from '../../models/user';

dotenv.config();


const app = express();
app.use(express.json());
app.use(session({
    secret: 'test_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use("/api", userRouter);


describe("UserRoute", () => {
    let agent: any;

    beforeAll(async () => {
        const url = process.env.TESTMONGODB_URI;
        if (!url) {
            throw new Error("TESTMONGODB_URI is not defined in .env file");
        };
        console.log('Connecting to MongoDB...');
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
        await mongoose.connection.db.dropDatabase();
        console.log('Database dropped');
        await UserModel.create(mockUsers);
        console.log('Mock users created');
        agent = request.agent(app);
    },3000);

    afterAll(async()=>{
        await mongoose.disconnect();
    })

    //Login
    describe("/Login", () => {
        let UserEmail: string;
        let UserPass: string;
        beforeAll(() => {
            // beforeAll フックで変数に値を設定
            UserEmail = mockUsers[0].email;
            UserPass = mockUsers[0].password
        });
        test("User login should succeed with correct credentials", async () => {
            const res = await agent.post("/api/login").send({
                email: UserEmail,
                password: UserPass
            });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("Login successful");
            expect(res.header["set-cookie"]).toBeDefined();
        });
        test("User login should fail with incorrect credentials", async () => {
            const res = await agent.post("/api/login").send({
                email: UserEmail,
                password: 'wrongpassword'
            });
            expect(res.status).toBe(401);
            expect(res.body.message).toBe("Invalid email or password");
        });
    });


    //Logout
    describe("/logout", () => {
        test("should destroy session and clear cookie on logout", async () => {
            agent.jar.setCookie('connect.sid=s%3Avalid_session_id');
            app.use((req: Request, res: Response, next) => {
                req.session.userId = mockUsers[0]._id.toString();
                next();
            });

            const res = await agent.post("/api/logout");

            expect(res.status).toBe(200);
            expect(res.body.messege).toBe('Logout successful');
            console.log(res.headers);

            const cookies = res.headers["set-cookie"];
            expect(cookies).toBeDefined();

            const cookie = cookies.find((cookie: string) => cookie.startsWith("connect.sid="));
            expect(cookie).toBeDefined();
            expect(cookie).toMatch(/connect\.sid=;/);
        });

    });
});


