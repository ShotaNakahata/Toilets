import React from 'react';
import GoogleMapsLoader from '../../features/map/GoogleMapsLoader';
import MapComponent from '../../features/map/MapComponent';
import UserLocation from '../../features/map/UserLocation';
import MarkerManager from '../../features/map/MarkerManager';
import { useMapState } from '../../context/MapStateContext';

const Map: React.FC = () => {
    const { isScriptLoaded } = useMapState(); 
    const mapRef = React.useRef<google.maps.Map | null>(null);

    return (
        <div className="Map-wrapper">
            <div className="container">
                <h2>Map</h2>
                <div className="map-contents">
                    <GoogleMapsLoader> 
                        {isScriptLoaded && (
                            <>
                                <MapComponent ref={mapRef} /> 
                                <UserLocation map={mapRef.current} /> 
                                <MarkerManager map={mapRef.current} /> 
                            </>
                        )}
                    </GoogleMapsLoader>
                </div>
            </div>
        </div>
    );
};

export default Map;
