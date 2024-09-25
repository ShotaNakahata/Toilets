// import React, { useEffect } from 'react';
// import { useMapState } from '../../context/MapStateContext';

// interface UserLocationProps {
//     map: google.maps.Map | null;
// }

// const UserLocation: React.FC<UserLocationProps> = ({ map }) => {
//     const { setCenter } = useMapState();
//     const { setUserLocation } = useMapState();
    
    
//     useEffect(() => {
//         console.log("UserLocation component mounted.");
//         if (map && navigator.geolocation) {
//             console.log("Fetching user location...");
//             navigator.geolocation.getCurrentPosition(position => {
//                 const newPos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//                 console.log("User position:", newPos);
//                 setCenter(newPos);
//                 setUserLocation(newPos);
//             }, (error) => {
//                 console.error("Error getting location: ", error);
//             });
//         }
//     }, [map, setCenter]);

//     return null;
// };

// export default UserLocation;
import React, { useEffect } from 'react';
import { useMapState } from '../../context/MapStateContext';

interface UserLocationProps {
    map: google.maps.Map | null;
}

const UserLocation: React.FC<UserLocationProps> = ({ map }) => {
    const { setCenter, setUserLocation } = useMapState();  // setUserLocationも使用

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
                setCenter(newPos); // 中心をユーザーの位置に設定
                setUserLocation(newPos); // ユーザーの位置をMapStateに設定
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        }
    }, [map, setCenter, setUserLocation]);  // setUserLocation も依存配列に追加

    return null;
};

export default UserLocation;
