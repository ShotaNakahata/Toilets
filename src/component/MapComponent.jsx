import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import toiletsData from '../data/toiletsData';
import UserLocation from './UserLocation';


const apiKey = 'AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY';

const center = { lat: 34.705493, lng: 135.490685 }; // 大阪梅田の座標（初期中心地点）

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const geocoder = new window.google.maps.Geocoder();

        toiletsData.forEach(toilet => {
            geocoder.geocode({ address: toilet.address }, (results, status) => {
                if (status === 'OK') {
                    setMarkers(prev => [...prev, {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                        title: toilet.name
                    }]);
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    }, []);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={10}
                onLoad={setMap}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker} title={marker.title} />
                ))}
                {map && <UserLocation map={map} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;


