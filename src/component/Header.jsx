import React from 'react';
import { Link } from 'react-router-dom'; 

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className='header-left'>
                        <img className="logo" src='/images/logo.jpg' />
                    </div>
                    <div className="header-right">
                        <Link className="header-link" to="#">BookMark</Link>
                        <Link className="header-link" to="#">Contact</Link>
                        <Link className="header-link" to="#">About_Me</Link>
                        <Link className="header-link login" to="/login">Login</Link> 
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
