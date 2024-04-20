import React from 'react';

class Map extends React.Component {
    render() {
        return (
            <div className="Map-wrapper">
                <div className="container">
                    <h2>Map</h2>
                    <div id="map"></div>
                </div>
            </div>
        );
    }
}

export default Map;