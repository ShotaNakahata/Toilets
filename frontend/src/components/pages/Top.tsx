// frontend/src/components/pages/Top.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";
import { titlecolorAnimation } from '../../config/motionConfig';

const Top: React.FC = () => {
    return (
        <div className="bg-white text-white min-h-screen pt-20 font-baskerville relative">
            {/* メインタイトル */}
            <motion.h1 
            className="pt-7 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wide sm:tracking-widest font-bold mb-4 left-4 sm:left-6 bottom-1 leading-snug sm:leading-normal absolute"
            initial={titlecolorAnimation.initial}
            animate={titlecolorAnimation.animate}
            transition={titlecolorAnimation.transition}
            >
            
                Where<br /> is <br />My Restroom??
            </motion.h1>

                {/* 説明文 */}
                <div className='text-lg sm:text-2xl md:text-4xl text-right relative text-white sm:left-[-40px] ml-40 mt-2 sm:mt-20'>
                    <p className="mb-2">This website allows you to easily find nearby toilets and detailed information.</p>
                    <p className="mb-8">Accessible options are also available, making it convenient <br />for those who need special facilities. </p>
                    
                </div>
            <div className="text-right px-4 sm:px-6">

                {/* リンクボタン */}
                <div className="absolute bottom-1/4 flex right-0 mb-4  text-highlight">  
                    <div className="text-lg  sm:text-xl md:text-2xl lg:text-3xl flex flex-col justify-start items-start space-y-10">
                        <Link to="/FilterSearchToile" className="btn Search flex items-center text-left hover:text-foreground">
                            <img src="/images/IconSearch.png" alt="SearchImg" className="h-10 sm:h-18 md:h-15 w-auto  mr-2" />
                            View All Toilet List
                        </Link>
                        <Link to="/Map" className="btn NewPost flex items-center text-left hover:text-foreground">
                            <img src="/images/IconFound.png" alt="NewPostImg" className="h-10 sm:h-18 md:h-15 w-auto  mr-2" />
                            View toilets using the map
                        </Link>
                        <Link to="/RegistrationRestroom" className="btn NewPost flex items-center text-left hover:text-foreground">
                            <img src="/images/IconFound.png" alt="NewPostImg" className="h-10 sm:h-18 md:h-15 w-auto  mr-2" />
                            Register a New Toilet
                        </Link>
                        <a href="#dashboard" className="btn Rate flex items-center text-left hover:text-foreground">
                            <img src="/images/IconRate.png" alt="RateImg" className="h-10 sm:h-18 md:h-15 w-auto  mr-2" />
                            Check the Dashboard
                        </a>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Top;





