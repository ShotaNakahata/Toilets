// src/components/pages/Map.tsx
import React, { useEffect } from 'react';
import GoogleMapsLoader from '../../features/map/GoogleMapsLoader';
import MapComponent from '../../features/map/MapComponent';
import UserLocation from '../../features/map/UserLocation';
import MarkerManager from '../../features/map/MarkerManager';
import { useMapState } from '../../context/MapStateContext';
import axios from 'axios';

const Map: React.FC = () => {
    const { isScriptLoaded, toilets, setToilets } = useMapState(); 
    const mapRef = React.useRef<google.maps.Map | null>(null);

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/toilets');
                setToilets(response.data);  // トイレ情報を設定
            } catch (error) {
                console.error('Error fetching toilets:', error);
            }
        };

        fetchToilets();
    }, [setToilets]);  // この依存配列に `setToilets` を含めて、トイレ情報が取得されるたびに呼ばれるようにする

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


// // src/features/map/Map.tsx
// import React from 'react';
// import GoogleMapsLoader from '../../features/map/GoogleMapsLoader';
// import MapComponent from '../../features/map/MapComponent';
// import UserLocation from '../../features/map/UserLocation';
// import MarkerManager from '../../features/map/MarkerManager';
// import { useMapState } from '../../context/MapStateContext';

// const Map: React.FC = () => {
//     const { isScriptLoaded, toilets, setToilets } = useMapState(); 
//     const mapRef = React.useRef<google.maps.Map | null>(null);

//     const handleLocationFound = (location: google.maps.LatLngLiteral) => {
//         const newToilet = {
//             id: 'user-location',  // ユニークなIDを設定
//             name: 'Your Location',
//             address: 'Unknown',
//             lat: location.lat,
//             lng: location.lng,
//         };
//         setToilets(prevToilets => [...prevToilets, newToilet]);
//     };

//     return (
//         <div className="Map-wrapper">
//             <div className="container">
//                 <h2>Map</h2>
//                 <div className="map-contents">
//                     <GoogleMapsLoader> 
//                         {isScriptLoaded && (
//                             <>
//                                 <MapComponent ref={mapRef} />
//                                 <UserLocation map={mapRef.current} onLocationFound={handleLocationFound} />
//                                 <MarkerManager map={mapRef.current} toilets={toilets} />
//                             </>
//                         )}
//                     </GoogleMapsLoader>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Map;
