import React, { useEffect } from 'react';

interface UserLocationProps {
    map: google.maps.Map | null;
    onLocationFound: (location: google.maps.LatLngLiteral) => void;
}

const UserLocation: React.FC<UserLocationProps> = ({ map, onLocationFound }) => {
    useEffect(() => {
        if (map && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                onLocationFound(newPos);
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        }
    }, [map, onLocationFound]);

    return null;
};

export default UserLocation;
