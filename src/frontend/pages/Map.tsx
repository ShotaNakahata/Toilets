import React from 'react';
import MapComponent from '../components/features/map/MapComponent';

interface MapProps {
    onLoad?: () => void;
}

const Map: React.FC<MapProps> = ({ onLoad }) => {
    return (
        <div className="Map-wrapper">
            <div className="container">
                <h2>Map</h2>
                <div className="map-contents">
                    <MapComponent onLoad={onLoad} /> {/* onLoad プロパティを渡す */}
                </div>
            </div>
        </div>
    );
};

export default Map;
