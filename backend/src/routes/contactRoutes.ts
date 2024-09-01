// src/routes/contactRoutes.ts
import express, { Request, Response } from "express";
import { sendMail } from '../util/mailer';

const router = express.Router();

router.post('/SendEmail', async (req: Request, res: Response) => {
    const { email, subject, message } = req.body;

    try{
        await sendMail(email,subject,message);
        res.status(200).send({ message: 'Your inquiry has been sent successfully.' });
    }catch(error){
        console.error('Error sending contact form:', error);
    res.status(500).send({ message: 'An error occurred while sending your inquiry.' });
    }
});

export default router;