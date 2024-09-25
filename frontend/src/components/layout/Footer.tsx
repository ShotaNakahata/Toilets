import { Link } from 'react-router-dom';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-background text-white py-2 sm:py-8 ">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                {/* ロゴ */}
                <div className="mb-2 sm:mb-0">
                    <img src="/images/logo.png" alt="Logo" className="h-10 sm:h-16 w-auto" /> {/* smでは少し小さめに */}
                </div>
                {/* スローガン */}
                <div className="text-center sm:text-right mt-4 sm:mt-0 space-y-8">
                    <Link className="hover:text-highlight sm:text-4xl sm:pb-6  underline decoration-white active:scale-95 transition-transform duration-150" to="/contact">Contact</Link>
                    <p className="text-base sm:text-lg font-semibold text-white">A good life starts with a good toilet.</p> {/* smでフォントサイズを調整 */}
                </div>
            </div>
        </footer>
    );
}

export default Footer;

