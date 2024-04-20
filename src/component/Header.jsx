import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    
                        <div className='header-left'>
                            <img className="logo" src='/images/logo.jpg' />

                        </div>
                        <div className="header-right">
                            <a className="header-link" href="#">BookmMark</a>
                            <a className="header-link" href="#">Contact</a>
                            <a className="header-link" href="#">About_Me</a>
                            <a className="header-link login" href="#">Login</a>
                        </div>
                    </div>
                
            </header>
        );
    }
}

export default Header;