// src/components/pages/MyPage.tsx
import React, { useEffect } from "react";
import MyFavoritesComponent from "../common/MyFavoritesComponent";
import { UserInformation } from "../common/UserInformation";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoginModal from '../common/LoginModal';
import { useUser } from '../context/UserContext'; // useUserをインポート

const MyPage: React.FC = () => {
    const { showLoginModal, setShowLoginModal, handleLogin, handleCreateAccount } = useAuth();
    const { user } = useUser(); // useUserフックを使用してユーザー情報を取得

    useEffect(() => {
        if (!user) {
            setShowLoginModal(true);
        }
    }, [user, setShowLoginModal]);

    return (
        <div>
            <h1>My Page</h1>
            <Link to="/" className="home-button">Return to Home</Link>
            <UserInformation />
            <MyFavoritesComponent />
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
            {/* 他のコンポーネントや情報をここに追加 */}
        </div>
    );
};

export default MyPage;
