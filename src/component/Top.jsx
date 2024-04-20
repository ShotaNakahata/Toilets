import React from 'react'

class Top extends React.Component {
    render() {
        return (
            <div className="top-wrapper">
                <div className="container">
                    <h1>Where is my Toilet??</h1>
                    <p>This website allows you to search for toilets near your current location.</p>
                    <p>cleanliness and convenience ratings of the toilets.</p>
                    <div className="btn-wrapper">
                        <a href="#" className="btn Search">
                            <img src="/images/Search.png" alt="SearchImg" />
                            Search Toilet
                        </a>
                        <p>or</p>
                        <a href="#" className="btn NewPost">
                            <img src="/assets/images/Found.png" alt="NewPostImg" />
                            I Found a Toilet
                        </a>
                        <a href="#" className="btn Rate">
                            <img src="/assets/images/Rate.png" alt="RateImg" />
                            Rate the Toilet
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Top;