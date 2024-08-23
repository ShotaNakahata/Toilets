import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import ConfirmLogout from '../common/ConfirmLogout';
import { Drawer, DrawerContent, DrawerOverlay, DrawerClose } from '../ui/drawer';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {motion} from "framer-motion"
import { headerAnimation } from '@/motionConfig';

const Header: React.FC = () => {
    const { user } = useUser();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <motion.header className="bg-transparent fixed z-50 top-0 left-0 text-white p-4 sm:p-7 w-full font-baskerville"
        {...headerAnimation}
        >
            <div className=" mx-auto flex justify-between items-center">
                <div className="header-left flex-shrink-0">
                    <Link to="/">
                        <img className="h-10 w-auto sm:h-16 sm:w-auto" src='/images/logo.jpg' alt="Logo" />
                    </Link>
                </div>
                <div className="header-right hidden sm:flex items-center space-x-8 text-xl">
                    <span>Welcome {user ? user.username : 'Guest'}</span>
                    <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150" to="/map">Map</Link>
                    <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150" to="/contact">Contact</Link>
                    <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150" to="/mypage">MyPage</Link>
                    {user ? (
                        <ConfirmLogout />
                    ) : (
                        <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150" to="/login">Login</Link>
                    )}
                </div>
                <div className="sm:hidden">
                    <button onClick={() => setIsDrawerOpen(true)} aria-label="Open Menu">
                        <Bars3Icon className="h-8 w-8 text-white" />
                    </button>
                </div>
            </div>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <div className="p-4 pt-9 text-white flex flex-col">
                        <span className='block mb-4 text-xl leading-normal text-highlight'>Where is My Restroom</span>
                        <span className="block mb-4 text-4xl leading-normal">Welcome<br /> {user ? user.username : 'Guest'}</span>
                        <Link className="hover:text-highlight leading-normal underline decoration-white active:scale-95 transition-transform duration-150 mb-2" to="/" onClick={() => setIsDrawerOpen(false)}>Home</Link>
                        <div className='text-3xl flex flex-col items-end leading-loose mt-5 mr-4'>
                            <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150 mb-2" to="/map" onClick={() => setIsDrawerOpen(false)}>Map</Link>
                            <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150 mb-2" to="/contact" onClick={() => setIsDrawerOpen(false)}>Contact</Link>
                            <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150 mb-2" to="/mypage" onClick={() => setIsDrawerOpen(false)}>MyPage</Link>
                            {user ? (
                                <div onClick={() => setIsDrawerOpen(false)}>
                                    <ConfirmLogout />
                                </div>
                            ) : (
                                <Link className="hover:text-highlight underline decoration-white active:scale-95 transition-transform duration-150 mb-2 text-white" to="/login" onClick={() => setIsDrawerOpen(false)}>Login</Link>
                            )}
                        </div>
                    </div>
                    <DrawerClose className="absolute top-4 right-4 text-white">
                        <button aria-label="Close Menu">
                            <XMarkIcon className="h-8 w-8 text-white" />
                        </button>
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        </motion.header>
    );
};

export default Header;








