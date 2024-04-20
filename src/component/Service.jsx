import React from 'react'

class Service extends React.Component {
    render() {
        return (
            <div className="service-wrapper">
                <div className="container">
                    <h2>Service</h2>
                    <div className="Servicecontents">
                        <div className="ServiceContentSearch">
                            <img className="ServiceContentImg SearchIntro" src="/images/IntroSearch.jpg" alt="Search" />
                            <p className="ServiceName">Search</p>
                            <p className="ServiceDetail">You can use your current location to find the nearest available toilet on the map. This way, you're always prepared in case of an emergency!</p>
                        </div>
                        <div className="ServiceContentFound">
                            <img className="ServiceContentImg FoundIntro" src="/images/IntroShare.jpg" alt="Found" />
                            <p className="ServiceName">Share</p>
                            <p className="ServiceDetail">Register the available toilet you have found on the site! By registering, you help not only yourself for future visits but also others in search of a toilet. The toilet you find could be a lifesaver for someone else</p>
                        </div>
                        <div className="ServiceContentRate">
                            <img className="ServiceContentImg RateIntro" src="/images/IntroRate.jpg" alt="Rate" />
                            <p className="ServiceName">Rate</p>
                            <p className="ServiceDetail">Want to use a clean and well-equipped toilet? Then check the ratings! And don't forget to rate the toilets yourself. Where's the best toilet? Let's find out</p>
                        </div>
                        <div className="ServiceContentBookMark">
                            <img className="ServiceContentImg BookMarkIntro" src="/images/IntroBookMark.jpg" alt="BookMark" />
                            <p className="ServiceName">BookMark</p>
                            <p className="ServiceDetail">Don not lose track of your favorite toilets. Always ensure the utmost comfort by using your most liked restrooms. Don't forget to bookmark them!</p>
                        </div>
                    </div>
                    <h3>These features will enhance your toilet experience when you're out and about.</h3>
                </div>
            </div>


        );
    }
}

export default Service;