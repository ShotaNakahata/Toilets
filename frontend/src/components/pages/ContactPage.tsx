// frontend/src/components/pages/ContactPage.tsx
import React from 'react';
import ContactForm from '../../features/contact/ContactForm';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-background relative min-h-screen flex flex-col md:flex-row">
            {/* 左側のコンテンツ（モバイルでは上に配置） */}
            <div className="mt-16 md:mt-24 w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8">
                <h1 className="text-4xl md:text-7xl font-bold mb-2 sm:mb-4 text-white">Contact Us</h1>
                <Link
                    to="/"
                    className="text-white bg-background hover:bg-white hover:text-background rounded-lg border-white border-2 block text-center mt-4 mb-4 text-base md:text-lg"
                >
                    Return to Home
                </Link>
                {/* パソコンサイズで表示するテキスト */}
                <p className="hidden md:block text-base md:text-lg text-white mb-4">
                    We’d love to hear from you! Please fill out the form below to get in touch with us.
                    Whether you have a question, feedback, or just want to say hi, we’re here to help.
                </p>
                {/* スマホサイズで表示するテキスト */}
                <p className="block md:hidden text-base md:text-lg text-white sm:mb-4 leading-relaxed">
                    Get in touch! Fill out the form below and we'll get back to you.
                </p>
            </div>

            {/* 右側のコンテンツ（モバイルでは下に配置） */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
                <div className="w-full max-w-md md:max-w-3xl">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;




