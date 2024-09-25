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
//     // const apiUrl = 'http://localhost:4000/api';

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

import React, { useEffect } from 'react';
import GoogleMapsLoader from '../../features/map/GoogleMapsLoader';
import MapComponent from '../../features/map/MapComponent';
import MarkerManager from '../../features/map/MarkerManager';
import { useMapState } from '../../context/MapStateContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Map: React.FC = () => {
    const { isScriptLoaded, setToilets } = useMapState();
    const mapRef = React.useRef<google.maps.Map | null>(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const toiletId = queryParams.get('toiletId');  // URLからtoiletIdを取得

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                if (toiletId) {
                    const response = await axios.get(`${apiUrl}/toilets/${toiletId}`);
                    setToilets([response.data.toilet]);  // 特定のトイレだけを設定
                } else {
                    const response = await axios.get(`${apiUrl}/toilets`);
                    setToilets(response.data);  // 全トイレを設定
                }
            } catch (error) {
                console.error('Error fetching toilets:', error);
            }
        };

        fetchToilets();
    }, [setToilets, toiletId, apiUrl]);

    return (
        <div className=" bg-background min-h-screen pt-20 sm:pt-28">

            <div className=" container mx-auto bg-background p-6 rounded-lg shadow-md text-white">
                <GoogleMapsLoader>
                    {isScriptLoaded && (
                        <>
                            <div className='flex mb-4 justify-center items-center'>
                                <h1 className='  text-4xl '>Map Page</h1>
                            </div>
                                <div className='mb-6 text-white text-lg space-y-2 flex '>
                                    <div className=' border flex justify-center items-center'>
                                    <p>• Use the map to visually find nearby restrooms.</p>
                                    <p>• You can search for regions or facility names using the search bar.</p>
                                    <p>• If you share your location, your position will be displayed with a black marker.</p>
                                    <p>• Red markers represent general restrooms, while blue markers indicate accessible restrooms.</p>
                                    <p>• Clicking on a marker shows basic restroom information,<br />  an option to add it to your favorites, and a button to view more details on the restroom's detail page.</p>
                                    </div>
                                </div>

                            {/* Add explanation here */}

                            <MapComponent ref={mapRef} />
                            <MarkerManager map={mapRef.current} />
                        </>
                    )}
                </GoogleMapsLoader>
            </div>
        </div>
    );
};

export default Map;

