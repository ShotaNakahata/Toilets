// frontend/src/components/pages/Service.tsx
import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useOnScreen from '../../hooks/useOnScreen';
import { FadeInUpAnimation, titleColorVariants } from '../../config/motionConfig';




const Service: React.FC = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);

    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();
    const controls5 = useAnimation();
    const controls6 = useAnimation();

    const isInView1 = useOnScreen(ref1, 0.5);
    const isInView3 = useOnScreen(ref3, 0.5);

    React.useEffect(() => {
        if (isInView1) {
            controls1.start('animate');
            controls2.start('animate');
            controls5.start('animate');
        }
    }, [isInView1, controls1, controls2, controls5]);

    React.useEffect(() => {
        if (isInView3) {
            controls3.start('animate');
            controls4.start('animate');
            controls6.start('animate');
        }
    }, [isInView3, controls3, controls4, controls6]);

    return (
        <div className="bg-background">
            {/* 1ページ目: Search と Share */}
            <section className="min-h-[50vh] sm:min-h-screen flex flex-col justify-between items-center p-6">
                {/* Search */}
                <motion.div
                    ref={ref1}
                    className="flex flex-row sm:flex-col md:flex-row w-full md:h-1/2"
                    initial="hidden"
                    animate={controls1}
                    variants={FadeInUpAnimation}
                >
                    <div className="w-1/3 sm:w-full md:w-1/4 h-full mr-0">
                        <img src="/images/search.png" alt="Search" className="w-full h-auto object-cover rounded-md" />
                    </div>
                    <div className="flex-1 ml-0 md:ml-16 mt-0 sm:mt-8 md:mt-20 pl-9 sm:pl-0">
                        <p className="text-white text-1xl md:text-4xl">
                            <motion.span
                                className="text-2xl md:text-6xl font-bold"
                                initial="initial"
                                animate={controls1}
                                variants={titleColorVariants}
                            >
                                Search
                            </motion.span>
                            : Use your current location to find the nearest toilet on the map,ensuring you're always prepared for emergencies.<br className="hidden md:block" />
                            
                        </p>
                    </div>
                </motion.div>

                <div className="text-center my-8">
                    <motion.h2
                        ref={ref5}
                        className="text-3xl md:text-5xl font-bold text-white"
                        initial="initial"
                        animate={controls5}
                        variants={titleColorVariants}
                    >
                        We offer these features
                    </motion.h2>
                </div>

                {/* Share */}
                <motion.div
                    ref={ref2}
                    className="flex flex-row sm:flex-col md:flex-row-reverse w-full md:h-1/2"
                    initial="hidden"
                    animate={controls2}
                    variants={FadeInUpAnimation}
                >
                    <div className="w-1/3 sm:w-full md:w-1/4 h-full ml-0 md:ml-8">
                        <img src="/images/share.png" alt="Share" className="w-full h-auto object-cover rounded-md" />
                    </div>
                    <div className="flex-1 mr-0 md:mr-16 mt-0 sm:mt-8 md:mt-20 pl-9 sm:pl-0">
                        <p className="text-white text-1xl md:text-4xl text-right">
                            <motion.span
                                className="text-2xl md:text-6xl font-bold"
                                initial="initial"
                                animate={controls2}
                                variants={titleColorVariants}
                            >
                                Share
                            </motion.span>
                            : Register toilets you discover, helping both yourself<br className="hidden md:block" />
                            for future visits and others who might be in need.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* 2ページ目: Rate と Bookmark */}
            <section className="min-h-[50vh] sm:min-h-screen flex flex-col justify-between items-center p-6">
                {/* Rate */}
                <motion.div
                    ref={ref3}
                    className="flex flex-row sm:flex-col md:flex-row w-full md:h-1/2"
                    initial="hidden"
                    animate={controls3}
                    variants={FadeInUpAnimation}
                >
                    <div className="w-1/3 sm:w-full md:w-1/4 h-full mr-0">
                        <img src="/images/rate.png" alt="Rate" className="w-full h-auto object-cover rounded-md" />
                    </div>
                    <div className="flex-1 ml-0 md:ml-16 mt-0 sm:mt-8 md:mt-20 pl-9 sm:pl-0">
                        <p className="text-white text-1xl md:text-4xl">
                            <motion.span
                                className="text-2xl md:text-6xl font-bold"
                                initial="initial"
                                animate={controls3}
                                variants={titleColorVariants}
                            >
                                Rate
                            </motion.span>
                            : Check and contribute to toilet ratings to find the cleanest<br className="hidden md:block" />
                            and best-equipped facilities.
                        </p>
                    </div>
                </motion.div>

                <div className="text-center my-8">
                    <motion.h2
                        ref={ref6}
                        className="text-3xl md:text-5xl font-bold text-white"
                        initial="initial"
                        animate={controls6}
                        variants={titleColorVariants}
                    >
                        We offer these features
                    </motion.h2>
                </div>

                {/* Bookmark */}
                <motion.div
                    ref={ref4}
                    className="flex flex-row sm:flex-col md:flex-row-reverse w-full md:h-1/2"
                    initial="hidden"
                    animate={controls4}
                    variants={FadeInUpAnimation}
                >
                    <div className="w-1/3 sm:w-full md:w-1/4 h-full ml-0 md:ml-8">
                        <img src="/images/Favorite.png" alt="Bookmark" className="w-full h-auto object-cover rounded-md" />
                    </div>
                    <div className="flex-1 mr-0 md:mr-16 mt-0 sm:mt-8 md:mt-20 pl-9 sm:pl-0">
                        <p className="text-white text-1xl md:text-4xl text-right">
                            <motion.span
                                className="text-2xl md:text-6xl font-bold"
                                initial="initial"
                                animate={controls4}
                                variants={titleColorVariants}
                            >
                                Bookmark
                            </motion.span>
                            : Save your favorite toilets and check them on My Page! By saving them as favorites, <br className="hidden md:block" />
                            you can quickly find the toilets you like.
                        </p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Service;









