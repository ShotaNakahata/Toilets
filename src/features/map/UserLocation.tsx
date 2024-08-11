import React, { useEffect } from 'react';
import { useMapState } from '../../context/MapStateContext';

interface UserLocationProps {
    map: google.maps.Map | null;
}

const UserLocation: React.FC<UserLocationProps> = ({ map }) => {
    const { setCenter } = useMapState();
    
    useEffect(() => {
        console.log("UserLocation component mounted.");
        if (map && navigator.geolocation) {
            console.log("Fetching user location...");
            navigator.geolocation.getCurrentPosition(position => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log("User position:", newPos);
                setCenter(newPos);
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        }
    }, [map, setCenter]);

    return null;
};

export default UserLocation;


// // src/features/map/UserLocation.tsx
// import React, { useEffect } from 'react';

// interface UserLocationProps {
//     map: google.maps.Map | null;
//     onLocationFound: (location: google.maps.LatLngLiteral) => void;
// }

// const UserLocation: React.FC<UserLocationProps> = ({ map, onLocationFound }) => {
//     useEffect(() => {
//         if (map && navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(position => {
//                 const newPos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//                 onLocationFound(newPos);
//             }, (error) => {
//                 console.error("Error getting location: ", error);
//             });
//         }
//     }, [map, onLocationFound]);

//     return null;
// };

// export default UserLocation;
