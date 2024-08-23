import React, { useEffect } from "react";
import MyFavoritesComponent from "../common/MyFavoritesComponent";
import { UserInformation } from "../common/UserInformation";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoginModal from '../common/LoginModal';
import { useUser } from '../../context/UserContext';

const MyPage: React.FC = () => {
    const { showLoginModal, setShowLoginModal, handleLogin, handleCreateAccount } = useAuth();
    const { user } = useUser();

    useEffect(() => {
        if (!user) {
            setShowLoginModal(true);
        }
    }, [user, setShowLoginModal]);

    return (
        <div className="p-4  bg-background text-white min-h-screen pt-36">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-5xl font-bold mb-6">My Page</h1>
                <Link to="/" className="text-white hover:bg-white hover:text-background rounded-lg mb-4 inline-block border-2 p-2">
                    Return to Home
                </Link>
            </div>
            <UserInformation />
            <MyFavoritesComponent />
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
        </div>
    );
};

export default MyPage;

