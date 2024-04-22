import React from 'react';
import MapComponent from './MapComponent'; // MapComponent をインポート

class Map extends React.Component {
    render() {
        return (
            <div className="Map-wrapper">
                <div className="container">
                    <h2>Map</h2>
                    <div className="map-contents">
                        {/* MapComponent コンポーネントをレンダリング */}
                        <MapComponent />
                    </div>
                </div>
            </div>
        );
    }
}

export default Map;
