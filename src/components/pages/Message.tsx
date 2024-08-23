import React from 'react';

const Message: React.FC = () => {
    return (
        <div className="bg-background text-white pt-10 pb-3 sm:py-20">
            <div className="container mx-auto text-center px-4">
                {/* メッセージヘッダー */}
                <h2 className="text-1xl sm:text-4xl font-bold mb-4 sm:mb-8">
                    Let's go find your favorite toilet.
                </h2>
                {/* ボタン */}
                <a 
                    href="#" 
                    className="inline-block bg-white text-black font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-full shadow-md hover:bg-gray-800 hover:text-white transition duration-300"
                >
                    Let's try!!!
                </a>
            </div>
        </div>
    );
}

export default Message;

