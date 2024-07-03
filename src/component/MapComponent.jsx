// src/components/MapComponent.jsx

import { useEffect, useState, useRef } from 'react'; 
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; 
import PropTypes from 'prop-types';
import UserLocation from './UserLocation';
import axios from 'axios';

const apiKey = 'AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY'; // ここに有効なAPIキーを設定
const defaultCenter = { lat: 34.705493, lng: 135.490685 }; 
const libraries = ['places']; // librariesをコンポーネント外で定義

const MapComponent = ({ onLoad, newToilets = [] }) => {
    const [map, setMap] = useState(null); 
    const [center, setCenter] = useState(defaultCenter); 
    const [markers, setMarkers] = useState([]); 
    const searchRef = useRef(null); 

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/toilets');
                updateMarkers(response.data);
            } catch (error) {
                console.error('Error fetching toilets:', error);
            }
        };

        if (map) {
            fetchToilets();
        }
    }, [map]);

    useEffect(() => {
        if (newToilets.length > 0) {
            updateMarkers(newToilets);
        }
    }, [newToilets]);

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
        const query = searchRef.current.value;
        if (!query) return;

        const service = new window.google.maps.places.PlacesService(map);
        service.textSearch({ query, location: center, radius: 5000 }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const searchCenter = results[0].geometry.location;
                setCenter(searchCenter);

                const newMarkers = results.map(result => ({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                    title: result.name
                }));

                setMarkers(newMarkers);
            }
        });
    };

    const moveCenter = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const newPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setCenter(newPos);
                setMarkers(prev => [...prev, {
                    lat: newPos.lat,
                    lng: newPos.lng,
                    title: 'Your Location'
                }]);
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={15}
                onLoad={(map) => {
                    setMap(map);
                    if (onLoad) onLoad();
                }}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} />
                ))}
                <UserLocation map={map} onLocationFound={setCenter} />
                <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
                    <input ref={searchRef} type="text" placeholder="Search locations..." onChange={handleSearch} />
                    <button onClick={() => setCenter(defaultCenter)}>Reset</button>
                    <button onClick={moveCenter}>Move to Current Location</button>
                </div>
            </GoogleMap>
        </LoadScript>
    );
};

MapComponent.propTypes = {
    onLoad: PropTypes.func,
    newToilets: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    )
};

export default MapComponent;