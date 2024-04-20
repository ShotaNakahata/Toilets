import React from 'react';
import { Link } from 'react-router-dom'; // React RouterからLinkをインポート

class Login extends React.Component {
    render() {
        return (

            <div className="container-log">
                <div className="loginPage-wrapper">
                <div className="loginPage-contents">
                    <h2>Login Page</h2>
                    <form className="login-form">
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                    <div className='loginPage-another'>
                    <a href="/signup">新規登録の方はこちら</a>
                    <Link to="/" className="home-button">Return to Home</Link>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;
