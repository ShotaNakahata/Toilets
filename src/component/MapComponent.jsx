import { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import toiletsData from '../data/toiletsData';
import UserLocation from './UserLocation';

const apiKey = 'AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY';
const defaultCenter = { lat: 34.705493, lng: 135.490685 }; // 大阪梅田の座標（初期中心地点）

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [markers, setMarkers] = useState([]);
    const searchRef = useRef(null); // 検索入力のためのref

    useEffect(() => {
        updateMarkers(toiletsData);
    }, []);

    const updateMarkers = (data) => {
        const geocoder = new window.google.maps.Geocoder();
        data.forEach(toilet => {
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
    };

    const handleSearch = () => {
        const query = searchRef.current.value.toLowerCase();
        const filteredData = toiletsData.filter(toilet =>
            toilet.name.toLowerCase().includes(query) ||
            toilet.address.toLowerCase().includes(query)
        );
        updateMarkers(filteredData);
    };

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
                <UserLocation map={map} onLocationFound={setCenter} />
                <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
                    <input ref={searchRef} type="text" placeholder="Search toilets..." onChange={handleSearch} />
                    <button onClick={() => setCenter(defaultCenter)}>Reset</button>
                </div>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
