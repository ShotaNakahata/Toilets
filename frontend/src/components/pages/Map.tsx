// frontend/src/components/pages/Map.tsx
import React, { useEffect, useState } from 'react';
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

    // モーダル表示用の状態管理
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
        <div className="bg-background min-h-screen pt-20 sm:pt-28">
            <div className="container mx-auto bg-background p-6 rounded-lg shadow-md text-white">
                <GoogleMapsLoader>
                    {isScriptLoaded && (
                        <>
                            <div className='flex mb-4 justify-center items-center'>
                                <h1 className='text-4xl'>Map Page</h1>
                            </div>

                            {/* ボタンとモーダル */}
                            <div className="mb-6 border text-white text-sm sm:text-lg flex justify-center items-center">
                                <div className="">
                                    {/* h3タグをボタンに変更 */}
                                    <button
                                        className="text-2xl bg-transparent text-white hover:text-highlight"
                                        onClick={openModal}
                                    >
                                        Check Feature Description
                                    </button>

                                    {/* モーダル表示 */}
                                    {isModalOpen && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                            <div className="bg-white text-black p-6 rounded max-w-md">
                                                
                                                <p>• You can use the map to find nearby restrooms.</p>
                                                <p>• You can search for regions or facility names using the search bar.</p>
                                                <p>• If you share your location, your position will be displayed with a black marker.</p>
                                                <p>• Red markers represent general restrooms, while blue markers indicate accessible restrooms.</p>
                                                <p>• Clicking on a marker shows basic restroom information, an option to add it to your favorites, <br/> and a button to view more details on the restroom's detail page.</p>
                                                <button
                                                    className="mt-4 bg-red-500 text-white p-2 rounded"
                                                    onClick={closeModal}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 地図とマーカーの表示 */}
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



