// src/features/contact/mailer.ts
import { error } from 'console';
import nodemailer from 'nodemailer';
import { resolve } from 'path';

// Nodemailer用のSMTP設定を作成
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'WhereIsMyRestroom@gmail.com',
        pass: 'jdzaachxzgjblpjv'
    }
});

//メール送信関数
export function sendMail(userEmail: string, subject: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: 'WhereIsMyRestroom@gmail.com', 
            to: 'WhereIsMyRestroom@gmail.com',   
            subject: `お問い合わせ: ${subject}`, 
            text: `ユーザーのメールアドレス: ${userEmail}\n\nメッセージ:\n${message}` 
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Erro occurred", error);
                reject(error);
            }else{
                console.log('Email sent: ' + info.response);
                resolve();
            }
        });
    });
}
