import React from 'react';

const AndMore: React.FC = () => {
    return (
        <div className="bg-background min-h-screen flex flex-col justify-center items-center  p-6">
            {/* タイトルとボーダーを含む全体 */}
            <div className="relative w-full max-w-6xl border-2 border-white p-6 ">
                {/* タイトル（Our Mission） */}
                <h2 className="text-2xl sm:text-5xl font-bold text-white relative z-10 bg-background inline-block px-4" 
                    style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)' }}>
                    Our Mission
                </h2>
                
                {/* コンテンツ部分 */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:mt-10">
                    {/* 左側 - 画像（モバイルでは非表示） */}
                    <div className="w-full sm:w-[45%] hidden sm:block">
                        <img
                            src="/images/AccessibleToilet.png"
                            alt="Accessible Toilet"
                            className="w-full h-auto object-cover sm:h-[400px] rounded-md"
                        />
                    </div>

                    {/* 右側 - 文章 */}
                    <div 
                        className="w-full sm:w-[50%] text-white text-lg sm:text-2xl text-left sm:text-justify leading-loose tracking-wide mt-6 sm:mt-0 sm:ml-6" 
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <p>We aim to provide a better restroom environment so that everyone can go out with peace of mind.</p>
                        <p>This website is especially designed for those who need special facilities, such as people using wheelchairs, ostomates (those with an artificial stoma), or those with small children.</p>
                        <p>We want to reduce the anxiety about finding restrooms during outings by making it easier to find restrooms equipped with various facilities.</p>
                        <p>We also welcome your comments and additional restroom information. Let’s work together to create a more comfortable restroom environment for everyone.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AndMore;


