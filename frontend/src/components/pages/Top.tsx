// // frontend/src/components/pages/Top.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import {motion} from "framer-motion";
// import { titlecolorAnimation } from '../../config/motionConfig';

// const Top: React.FC = () => {
//     return (
//         <div className="bg-background text-white min-h-screen pt-20 font-baskerville flex flex-col justify-between items-center">
//             {/* メインタイトル */}
//             <motion.h1 
//                 className="pt-7 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wide sm:tracking-widest font-bold mb-4 leading-snug sm:leading-normal text-center"
//                 initial={titlecolorAnimation.initial}
//                 animate={titlecolorAnimation.animate}
//                 transition={titlecolorAnimation.transition}
//             >
//                 Where<br /> is <br />My Restroom??
//             </motion.h1>

//             {/* 説明文 */}
//             <div className='text-lg sm:text-2xl md:text-4xl text-center mt-2 sm:mt-20 px-4'>
//                 <p className="mb-2">This website allows you to easily find nearby toilets and detailed information.</p>
//                 <p className="mb-8">Accessible options are also available, making it convenient <br />for those who need special facilities. </p>
//             </div>

//             {/* リンクボタン */}
//             <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-10 pb-20">
//                 <Link to="/FilterSearchToile" className="btn Search flex items-center text-left hover:text-foreground">
//                     <img src="/images/IconSearch.png" alt="SearchImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
//                     View All Toilet List
//                 </Link>
//                 <Link to="/Map" className="btn NewPost flex items-center text-left hover:text-foreground">
//                     <img src="/images/IconMap.png" alt="NewPostImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
//                     View toilets using the map
//                 </Link>
//                 <Link to="/RegistrationRestroom" className="btn NewPost flex items-center text-left hover:text-foreground">
//                     <img src="/images/IconFound.png" alt="NewPostImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
//                     Register a New Toilet
//                 </Link>
//                 <a href="#dashboard" className="btn Rate flex items-center text-left hover:text-foreground">
//                     <img src="/images/IconRate.png" alt="RateImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
//                     Check the Dashboard
//                 </a>
//             </div>
//         </div>
//     );
// }

// export default Top;


// frontend/src/components/pages/Top.tsx
// frontend/src/components/pages/Top.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";
import { titlecolorAnimation } from '../../config/motionConfig';

const Top: React.FC = () => {
    return (
        <div className="bg-background text-white min-h-screen pt-20 font-baskerville flex flex-col justify-between">
            {/* メインタイトル */}
            <motion.h1 
                className="pt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide sm:tracking-widest font-bold mb-2 leading-snug sm:leading-normal text-center"
                initial={titlecolorAnimation.initial}
                animate={titlecolorAnimation.animate}
                transition={titlecolorAnimation.transition}
            >
                Where<br /> is <br />My Restroom??
            </motion.h1>

            {/* 説明文 */}
            <div className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center mt-2 sm:mt-10 px-4'>
                <p className="mb-2">This website allows you to easily find nearby toilets and detailed information.</p>
                <p className="mb-8">Accessible options are also available, making it convenient <br />for those who need special facilities.</p>
            </div>

            {/* リンクボタン - 横並びで中央揃え */}
            <div className="flex justify-center items-center pr-4 pb-20 m-9">
    <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-10">
        <Link to="/FilterSearchToile" className="btn Search flex items-center text-left text-highlight hover:text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
            <img src="/images/IconSearch.png" alt="SearchImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
            View All Toilet List
        </Link>
        <Link to="/Map" className="btn NewPost flex items-center text-left text-highlight hover:text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
            <img src="/images/IconMap.png" alt="NewPostImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
            View toilets using the map
        </Link>
        <Link to="/RegistrationRestroom" className="btn NewPost flex items-center text-left text-highlight hover:text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
            <img src="/images/IconFound.png" alt="NewPostImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
            Register a New Toilet
        </Link>
        <a href="#dashboard" className="btn Rate flex items-center text-left text-highlight hover:text-foreground text-base sm:text-lg md:text-xl lg:text-2xl">
            <img src="/images/IconRate.png" alt="RateImg" className="h-10 sm:h-18 md:h-15 w-auto mr-2" />
            Check the Dashboard
        </a>
    </div>
</div>

        </div>
    );
}

export default Top;
