// import React, { useEffect, useImperativeHandle, useRef } from "react";
// import { GoogleMap } from "@react-google-maps/api";
// import { useMapState } from "../../context/MapStateContext";

// // forwardRefを使って関数コンポーネントがrefを受け取れるようにする
// const MapComponent = React.forwardRef<google.maps.Map | null>((props, ref) => {
//     const { center, setCenter } = useMapState();
//     const mapRef = useRef<google.maps.Map | null>(null);

//     const handleMapLoad = (map: google.maps.Map) => {
//         mapRef.current = map;
//     };

//     // useImperativeHandleを使って親コンポーネント（Map）が子コンポーネント（MapComponent）のインスタンスを制御できるようにする
//     useImperativeHandle(ref, () => mapRef.current || new google.maps.Map(document.createElement('div')), [mapRef.current]);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             console.log("Attempting to fetch user location...");
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const userLocation = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude,
//                     };
//                     console.log("User location found:", userLocation);
//                     setCenter(userLocation);
//                     if (mapRef.current) {
//                         mapRef.current.setCenter(userLocation);
//                     }
//                 },
//                 (error) => {
//                     console.error("Error fetching user location: ", error);
//                     const defaultLocation = { lat: 34.705493, lng: 135.490685 }; // 例として大阪市
//                     setCenter(defaultLocation);
//                     if (mapRef.current) {
//                         mapRef.current.setCenter(defaultLocation);
//                     }
//                 }
//             );
//         } else {
//             console.log("Geolocation is not supported by this browser.");
//         }
//     }, [setCenter]);

//     return (
//         <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             center={center}
//             zoom={15}
//             onLoad={handleMapLoad}
//         />
//     );
// });

// export default MapComponent;
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
