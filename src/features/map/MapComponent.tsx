import React, { useEffect, useImperativeHandle, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useMapState } from "../../context/MapStateContext";

const MapComponent = React.forwardRef<google.maps.Map | null>((props, ref) => {
    const { center, setCenter } = useMapState();
    const mapRef = useRef<google.maps.Map | null>(null);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    useImperativeHandle(ref, () => mapRef.current || new google.maps.Map(document.createElement('div')), [mapRef.current]);

    useEffect(() => {
        if (navigator.geolocation) {
            console.log("Attempting to fetch user location...");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    console.log("User location found:", userLocation);
                    setCenter(userLocation);
                    if (mapRef.current) {
                        mapRef.current.setCenter(userLocation);
                    }
                },
                (error) => {
                    console.error("Error fetching user location: ", error);
                    console.log("Error code:", error.code);
                    console.log("Error message:", error.message);
                    const defaultLocation = { lat: 34.705493, lng: 135.490685 }; // デフォルト位置（大阪）
                    setCenter(defaultLocation);
                    if (mapRef.current) {
                        mapRef.current.setCenter(defaultLocation);
                    }
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, [setCenter]);

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={15}
            onLoad={handleMapLoad}
        />
    );
});

export default MapComponent;
// // src/features/map/MapComponent.tsx
// import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import UserLocation from './UserLocation';
// import axios from 'axios';
// import { Toilet } from '../../interfaces/Toilet_Interfaces'; 
// import { MarkerData } from '../../interfaces/MarkerData_Interfaces';

// const apiKey = 'AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY';
// const defaultCenter = { lat: 34.705493, lng: 135.490685 };
// const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

// interface MapComponentProps {
//     onLoad?: () => void;
//     newToilets?: Toilet[];
// }

// const MapComponent = forwardRef<google.maps.Map | null, MapComponentProps>(({ onLoad, newToilets = [] }, ref) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
//     const [markers, setMarkers] = useState<MarkerData[]>([]);

//     useImperativeHandle(ref, () => map, [map]);

//     useEffect(() => {
//         const fetchToilets = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/toilets');
//                 updateMarkers(response.data);
//             } catch (error) {
//                 console.error('Error fetching toilets:', error);
//             }
//         };

//         if (map) {
//             fetchToilets();
//         }
//     }, [map]);

//     useEffect(() => {
//         if (newToilets.length > 0) {
//             updateMarkers(newToilets);
//         }
//     }, [newToilets]);

//     const updateMarkers = (data: Toilet[]) => {
//         const newMarkers = data.map(toilet => ({
//             lat: toilet.lat,
//             lng: toilet.lng,
//             title: toilet.name,
//         }));
//         setMarkers(newMarkers);
//     };

//     return (
//         <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
//             <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={center}
//                 zoom={15}
//                 onLoad={(map) => {
//                     setMap(map);
//                     if (onLoad) onLoad();
//                 }}
//             >
//                 {markers.map((marker, index) => (
//                     <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} />
//                 ))}
//                 <UserLocation map={map} onLocationFound={setCenter} />
//             </GoogleMap>
//         </LoadScript>
//     );
// });

// export default MapComponent;
