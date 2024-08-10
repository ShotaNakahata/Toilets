import React from 'react';

const AndMore: React.FC = () => {
    return (
        <div className="AndMore-wrapper">
            <div className="container">
                <div className="heading">
                    <h2>And More</h2>
                </div>
                <div className="AndMore">
                    <div className="image-container">
                        <div className="AndMore1">
                            <img src="/images/AccessibleToilet.jpg" alt="Accessible Toilet" />
                            <p className="text-content-theme">The best universal restroom</p>
                            <p className="text-content-detail">You can view a list of highly rated universal restrooms here.</p>
                        </div>
                        <div className="AndMore2">
                            <img src="/images/FavoAccessibleToilet..jpg" alt="Favorite Accessible Toilet" />
                            <p className="text-content-theme">The number of accessible restrooms registered on this site.</p>
                            <p className="text-content-detail">This site features a multitude of registered accessible restrooms, with the hope of making your life more convenient.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AndMore;
