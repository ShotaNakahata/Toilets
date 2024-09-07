import React from 'react';

const AndMore: React.FC = () => {
    return (
        <div className="bg-background min-h-[50vh] flex flex-col justify-center items-center mt-10 p-6">
            {/* タイトル */}
            <div className="mb-6 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-white">
                    And More
                </h2>
            </div>

            {/* 画像とテキストのセット */}
            <div className="flex w-full justify-around items-center">
                {/* 1つ目のセット */}
                <div className="flex flex-col items-center w-[35%] sm:w-[25%] text-center">
                    <img
                        src="/images/AccessibleToilet.png"
                        alt="Accessible Toilet"
                        className="w-3/4 h-auto object-cover rounded-md mb-4"
                    />
                    <div className="text-box w-full h-full flex flex-col justify-center">
                        <p className="text-white text-base sm:text-xl font-bold mb-2 sm:mb-4 overflow-hidden text-ellipsis">
                            The best accessible restroom
                        </p>
                        <p className="text-white text-sm sm:text-lg overflow-hidden text-ellipsis">
                            You can view a list of highly rated accessible restrooms here.
                        </p>
                    </div>
                </div>

                {/* 2つ目のセット */}
                <div className="flex flex-col items-center w-[35%] sm:w-[25%] text-center">
                    <img
                        src="/images/Count.png"
                        alt="Favorite Accessible Toilet"
                        className="w-3/4 h-auto object-cover rounded-md mb-4"
                    />
                    <div className="text-box w-full h-full flex flex-col justify-center">
                        <p className="text-white text-base sm:text-xl font-bold mb-2 sm:mb-4 overflow-hidden text-ellipsis">
                            Count of accessible restrooms on this site.
                        </p>
                        <p className="text-white text-sm sm:text-lg overflow-hidden text-ellipsis">
                            This site lists many accessible restrooms to make your life easier.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AndMore;



