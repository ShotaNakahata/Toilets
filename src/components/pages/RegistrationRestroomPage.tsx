import React from 'react';
import RegistrationRestroom from '../common/RegistrationRestroom';
import { Link } from 'react-router-dom';

const RegistrationRestroomPage: React.FC = () => {
    const handleNewToilet = (toilet: any) => {
        console.log('New toilet registered:', toilet);
    };

    return (
        <div className="bg-background relative min-h-screen flex flex-col sm:flex-row sm:pt-16 pt-24">
            {/* 左側のコンテンツ */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center sm:p-0 sm:pt-0">
                <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-white">Register<br /> New Restroom</h1>
                <Link
                    to="/"
                    className="border-white border-2 block text-white text-center mt-4 text-lg sm:text-xl bg-background hover:bg-white hover:text-background rounded-lg mb-4"
                >
                    Return to Home
                </Link>
                <div className="hidden sm:block text-base sm:text-lg text-white mb-4">
                    <p>
                        Welcome! By registering a new restroom, you contribute to our community. Please fill out the form on the right to add a new restroom to our database.
                        Make sure to provide accurate information to help others find clean and accessible restrooms.
                    </p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Add a restroom's name and address.</li>
                        <li>Rate the cleanliness and accessibility.</li>
                        <li>Provide any additional comments that might be useful.</li>
                        <li>Mark whether the restroom is universal or not.</li>
                    </ul>
                </div>
            </div>

            {/* 右側のコンテンツ */}
            <div className="w-full sm:w-1/2 flex justify-center items-center p-8">
                <div className="w-full max-w-lg sm:max-w-3xl bg-background  sm:p-6">
                    {/* 小さい画面用のメッセージ - フォームの外側に配置 */}
                    <div className="text-white text-center mb-6 p-4 border border-white rounded-lg sm:hidden">
                        <p className="text-lg leading-relaxed">
                            Share the amazing restroom<br /> you found with everyone!<br />
                            Your post could help someone in need!
                        </p>
                    </div>
                    {/* フォーム */}
                    <RegistrationRestroom onNewToilet={handleNewToilet} />
                </div>
            </div>
        </div>
    );
};

export default RegistrationRestroomPage;


