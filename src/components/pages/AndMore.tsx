import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer'; // Intersection Observer を使用
import { titleColorVariants } from '@/motionConfig'; // titleColorVariants をインポート

const AndMore: React.FC = () => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    React.useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, transition: { duration: 0.7 } });
        }
    }, [controls, inView]);

    return (
        <div ref={ref} className="bg-background min-h-[50vh] sm:min-h-screen flex flex-col justify-center items-center p-6">
            {/* タイトル */}
            <motion.div className="mb-10 text-center">
                <motion.h2
                    className="sm:text-5xl text-3xl font-bold text-white"
                    initial="initial"
                    animate={inView ? "animate" : "initial"}
                    variants={titleColorVariants}
                >
                    And More
                </motion.h2>
            </motion.div>

            {/* 画像とテキストのセット */}
            <div className="flex w-full justify-around items-center">
                {/* 1つ目のセット */}
                <motion.div
                    className="flex flex-col items-center sm:w-1/3 w-2/3 text-center"
                    initial={{ opacity: 0 }}
                    animate={controls}
                >
                    <img
                        src="/images/AccessibleToilet.jpg"
                        alt="Accessible Toilet"
                        className="w-full h-auto object-cover rounded-md mb-5"
                    />
                    <div className="text-box w-full h-24 sm:h-24">
                        <p className="text-white text-base sm:text-2xl font-bold sm:mb-2 mb-6 overflow-hidden text-ellipsis">
                            The best universal restroom
                        </p>
                        <p className="text-white text-sm sm:text-lg overflow-hidden text-ellipsis">
                            You can view a list of highly rated universal restrooms here.
                        </p>
                    </div>
                </motion.div>

                {/* 2つ目のセット */}
                <motion.div
                    className="flex flex-col items-center sm:w-1/3 w-2/3 text-center"
                    initial={{ opacity: 0 }}
                    animate={controls}
                >
                    <img
                        src="/images/Count.jpg"
                        alt="Favorite Accessible Toilet"
                        className="w-full h-auto object-cover rounded-md mb-5"
                    />
                    <div className="text-box w-full h-24">
                        <p className="text-white text-base sm:text-2xl font-bold sm:mb-2 overflow-hidden text-ellipsis">
                            Count of accessible restrooms on this site.
                        </p>
                        <p className="text-white text-sm sm:text-lg overflow-hidden text-ellipsis">
                            This site lists many accessible restrooms to make your life easier.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default AndMore;

