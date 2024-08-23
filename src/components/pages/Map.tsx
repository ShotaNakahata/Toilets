import React, { useEffect } from 'react';
import GoogleMapsLoader from '../../features/map/GoogleMapsLoader';
import MapComponent from '../../features/map/MapComponent';
import UserLocation from '../../features/map/UserLocation';
import MarkerManager from '../../features/map/MarkerManager';
import { useMapState } from '../../context/MapStateContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Map: React.FC = () => {
    const { isScriptLoaded, toilets, setToilets } = useMapState(); 
    const mapRef = React.useRef<google.maps.Map | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get(`${apiUrl}/toilets`);
                setToilets(response.data);  // トイレ情報を設定
            } catch (error) {
                console.error('Error fetching toilets:', error);
            }
        };

        fetchToilets();
    }, [setToilets,apiUrl]);  // この依存配列に `setToilets` を含めて、トイレ情報が取得されるたびに呼ばれるようにする

    return (
        <div className=" bg-background min-h-screen pt-20 sm:pt-28">
            <div className="flex flex-col items-center justify-center mb-0 sm:mb-3">
                <h1 className="text-5xl font-bold mb-3 text-white">Map</h1>  {/* タイトルのスタイルを調整 */}
                <Link to="/" className="text-white hover:bg-white hover:text-background rounded-lg mb-4 inline-block border-2 p-2">Return to Home</Link>
            </div>
            <div className="container mx-auto bg-background p-6 rounded-lg shadow-md text-white">
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
