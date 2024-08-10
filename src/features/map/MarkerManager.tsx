// import React, { useEffect, useRef } from 'react';
// import { Marker } from '@react-google-maps/api';
// import { useMapState } from '../../context/MapStateContext';
// import axios from 'axios';
// import { MarkerData } from '../../interfaces/MarkerData_Interfaces';

// const MarkerManager: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
//     const { markers, setMarkers } = useMapState();
//     const hasFetchedToilets = useRef(false); // このフラグを追加

//     useEffect(() => {
//         const fetchToilets = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/toilets');
//                 const toilets = response.data;
//                 console.log("toilets", toilets);
//                 console.log("start updatedMarker")
//                 updateMarkers(toilets);
//             } catch (error) {
//                 console.error('Error fetching toilets:', error);
//             }
//         };

//         const updateMarkers = (toilets: any[]) => {
//             if (!window.google) {
//                 console.error('Google Maps JavaScript API is not loaded.');
//                 return;
//             }
//             const geocoder = new google.maps.Geocoder();
        
//             toilets.forEach((toilet) => {
//                 geocoder.geocode({ address: toilet.address }, (results, status) => {
//                     if (status === "OK" && results) {
//                         const location = results[0].geometry?.location;
//                         if (location) {
//                             const newMarker: MarkerData = {
//                                 lat: location.lat(),
//                                 lng: location.lng(),
//                                 title: toilet.name,
//                             };
        
//                             setMarkers((prev: MarkerData[]) => {
//                                 const isDuplicate = prev.some(marker =>
//                                     marker.lat === newMarker.lat &&
//                                     marker.lng === newMarker.lng &&
//                                     marker.title === newMarker.title
//                                 );
        
//                                 if (isDuplicate) {
//                                     console.log("Duplicate marker detected, skipping:", newMarker);
//                                     return prev; // 重複している場合は追加しない
//                                 }
        
//                                 console.log("Adding marker:", newMarker);
//                                 return [...prev, newMarker];
//                             });
//                         }
//                     } else {
//                         console.error(`Geocode was not successful for the following reason: ${status}`);
//                     }
//                 });
//             });
//         };

//         if (map && !hasFetchedToilets.current) { // 初回のみ実行されるように条件追加
//             fetchToilets();
//             hasFetchedToilets.current = true; // フラグを立てて再実行を防ぐ
//             console.log("called fetchToilet");
//         }
//     }, [map, setMarkers]);

//     useEffect(() => {
//         console.log("MarkerManager re-rendered with markers:", markers);
//     }, [markers]);

//     console.log("Current markers state before rendering:", markers);
//     return (
//         <>
//             {markers.map((marker: MarkerData, index: number) => (
//                 <Marker 
//                 key={index} 
//                 position={{ lat: marker.lat, lng: marker.lng }} 
//                 title={marker.title} />
//             ))}
//         </>
//     );
// };

// export default MarkerManager;

import React, { useEffect, useCallback } from 'react';
import { Marker } from '@react-google-maps/api';
import { useMapState } from '../../context/MapStateContext';
import axios from 'axios';
import { MarkerData } from '../../interfaces/MarkerData_Interfaces';

const MarkerManager: React.FC<{ map: google.maps.Map | null }> = React.memo(({ map }) => {
    const { markers, setMarkers } = useMapState();

    const updateMarkers = useCallback((toilets: any[]) => {
        if (!window.google) {
            console.error('Google Maps JavaScript API is not loaded.');
            return;
        }
        const geocoder = new google.maps.Geocoder();

        toilets.forEach((toilet) => {
            geocoder.geocode({ address: toilet.address }, (results, status) => {
                if (status === "OK" && results) {
                    const location = results[0].geometry?.location;
                    if (location) {
                        const newMarker: MarkerData = {
                            lat: location.lat(),
                            lng: location.lng(),
                            title: toilet.name,
                        };

                        setMarkers((prev: MarkerData[]) => {
                            const isDuplicate = prev.some(marker =>
                                marker.lat === newMarker.lat &&
                                marker.lng === newMarker.lng &&
                                marker.title === newMarker.title
                            );

                            if (isDuplicate) {
                                console.log("Duplicate marker detected, skipping:", newMarker);
                                return prev;
                            }

                            console.log("Adding marker:", newMarker);
                            const updatedMarkers = [...prev, newMarker];
                            console.log("Updated markers array:", updatedMarkers);
                            return updatedMarkers;
                        });
                    }
                } else {
                    console.error(`Geocode was not successful for the following reason: ${status}`);
                }
            });
        });
    }, [setMarkers]);

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/toilets');
                const toilets = response.data;
                console.log("toilets", toilets);
                updateMarkers(toilets);

            } catch (error) {
                console.error('Error fetching toilets:', error);
            }
        };

        if (map) {
            fetchToilets();
            console.log("called fetchToilet");
        }
    }, [map, updateMarkers]);

    useEffect(() => {
        console.log("MarkerManager re-rendered with markers:", markers);
    }, [markers]);

    console.log("Current markers state before rendering:", markers);
    return (
        <>
            {markers.map((marker: MarkerData, index: number) => (
                <Marker 
                key={index} 
                position={{ lat: marker.lat, lng: marker.lng }} 
                title={marker.title} />
            ))}
        </>
    );
});

export default MarkerManager;
