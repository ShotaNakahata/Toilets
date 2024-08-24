// src/types/express-session.d.ts
import express from 'express';

declare module 'express-session' {
    interface SessionData {
        userId?: string;
    }
}
