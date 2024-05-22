
// vite-project/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext.jsx';

function Header() {
    const { user } = useUser(); 

    return (
        <header>
            <div className="container">
                <div className='header-left'>
                    <img className="logo" src='/images/logo.jpg' />
                </div>
                <div className="header-right">
                    <span className="header-link">Welcome {user ? user.username : 'Guest'}</span>
                    <Link className="header-link" to="#">BookMark</Link>
                    <Link className="header-link" to="#">Contact</Link>
                    <Link className="header-link" to="#">About_Me</Link>
                    <Link className="header-link login" to="/login">Login</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;

