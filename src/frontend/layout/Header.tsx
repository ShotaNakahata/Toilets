import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import ConfirmLogout from '../common/ConfirmLogout';

const Header: React.FC = () => {
    const { user } = useUser();

    return (
        <header>
            <div className="container">
                <div className='header-left'>
                    <img className="logo" src='/images/logo.jpg' alt="Logo" />
                </div>
                <div className="header-right">
                    <span className="header-link">Welcome {user ? user.username : 'Guest'}</span>
                    <Link className="header-link" to="#">BookMark</Link>
                    <Link className="header-link" to="#">Contact</Link>
                    <Link className="header-link" to="/mypage">MyPage</Link>
                    {user ? (
                    <ConfirmLogout/>
                    ):(<Link className="header-link" to="/login">Login</Link>
                    )}
            </div>
        </div>
        </header >
    );
}

export default Header;
