import React from 'react'

class Message extends React.Component {
    render() {
        return (
            <div className="message-wrapper">
                <div className="container">
                    <h2 className="message-wrapper-header">Let's go find your favorite toilet.</h2>
                    <a href="#" className="btn message">Let's try!!!</a>
                </div>
            </div>
        );
    }
}

export default Message;