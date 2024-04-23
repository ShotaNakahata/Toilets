import React from 'react'
import { Link } from 'react-router-dom';

class Top extends React.Component {
    render() {
        return (
            <div className="top-wrapper">
                <div className="container">
                    <h1>Where is my Toilet??</h1>
                    <p>This website allows you to search for toilets near your current location.</p>
                    <p>cleanliness and convenience ratings of the toilets.</p>
                    <div className="btn-wrapper">
                        <Link to="/FilterSearchToile" className="btn Search">
                            <img src="/images/IconSearch.jpg" alt="SearchImg" />
                            Search Toilet
                        </Link>
                        <p>or</p>
                        <Link to="/指定したいパス" className="btn Search">
                            <img src="/images/IconFound.jpg" alt="NewPostImg" />
                            I Found a Toilet
                        </Link>
                        <Link to="/指定したいパス" className="btn Rate">
                            <img src="/images/IconRate.jpg" alt="RateImg" />
                            Rate the Toilet
                        </Link>

                    </div>
                </div>
            </div>
        );
    }
}

export default Top;