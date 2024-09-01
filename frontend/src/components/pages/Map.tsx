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
    // const apiUrl = 'http://localhost:4000/api';




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
    }, [setToilets, apiUrl]);  // この依存配列に `setToilets` を含めて、トイレ情報が取得されるたびに呼ばれるようにする

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


// import React, { useEffect } from 'react';
// import GoogleMapsLoader from '../../features/map/GoogleMapsLoader';
// import MapComponent from '../../features/map/MapComponent';
// import UserLocation from '../../features/map/UserLocation';
// import MarkerManager from '../../features/map/MarkerManager';
// import { useMapState } from '../../context/MapStateContext';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Map: React.FC = () => {
//     const { isScriptLoaded, toilets, setToilets } = useMapState();
//     const mapRef = React.useRef<google.maps.Map | null>(null);

//     const apiUrl = import.meta.env.VITE_API_URL;

//     useEffect(() => {
//         const fetchToilets = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/toilets`);
//                 setToilets(response.data);  // トイレ情報を設定
//             } catch (error) {
//                 console.error('Error fetching toilets:', error);
//             }
//         };

//         fetchToilets();
//     }, [setToilets, apiUrl]);  // この依存配列に `setToilets` を含めて、トイレ情報が取得されるたびに呼ばれるようにする

//     return (
//         <div className=" bg-background min-h-screen pt-20 sm:pt-28">
//             <div className="flex flex-col items-center justify-center mb-0 sm:mb-3">
//                 <h1 className="text-5xl font-bold mb-3 text-white">Map</h1>  {/* タイトルのスタイルを調整 */}
//                 <Link to="/" className="text-white hover:bg-white hover:text-background rounded-lg mb-4 inline-block border-2 p-2">Return to Home</Link>
//             </div>
//             <div className="container mx-auto bg-background p-6 rounded-lg shadow-md text-white">
//                 <div className="map-contents">
//                     <GoogleMapsLoader>
//                         {isScriptLoaded && (
//                             <>
//                                 <MapComponent ref={mapRef} />
//                                 <UserLocation map={mapRef.current} />
//                                 <MarkerManager map={mapRef.current} />
//                             </>
//                         )}
//                     </GoogleMapsLoader>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Map;
