// src/pages/LoginPage.tsx
import React from 'react';
import Login from '../../features/Login/Login'; // Loginコンポーネントをインポート

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-background"> {/* ページ全体のレイアウト */}
            <div className="w-full max-w-md p-8 shadow-md rounded-lg"> {/* ログインフォームを中央に配置 */}
                <Login /> {/* Loginコンポーネントを表示 */}
            </div>
        </div>
    );
}

export default LoginPage;
