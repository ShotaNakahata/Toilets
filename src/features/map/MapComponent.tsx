import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocation from './UserLocation';
import axios from 'axios';
import { Toilet } from '../../interfaces/Toilet_Interfaces'; 
import { MarkerData } from '../../interfaces/MarkerData_Interfaces'; 

const apiKey = 'AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY'; // ここに有効なAPIキーを設定
const defaultCenter = { lat: 34.705493, lng: 135.490685 };
const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

interface MapComponentProps {
    onLoad?: () => void;
    newToilets?: Toilet[];
}

const MapComponent: React.FC<MapComponentProps> = ({ onLoad, newToilets = [] }) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);

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

    const updateMarkers = (data: Toilet[]) => {
        const geocoder = new google.maps.Geocoder();
        data.forEach(toilet => {
            geocoder.geocode({ address: toilet.address }, (results, status) => {
                if (status === 'OK' && results) {
                    const location = results[0].geometry?.location;
                    if (location) {
                        setMarkers(prev => [...prev, {
                            lat: location.lat(),
                            lng: location.lng(),
                            title: toilet.name
                        }]);
                    }
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    };

    const handleSearch = () => {
        const query = searchRef.current?.value;
        if (!query) return;

        const service = new google.maps.places.PlacesService(map!);
        service.textSearch({ query, location: center, radius: 5000 }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                const searchCenter = results[0].geometry?.location;
                if (searchCenter) {
                    setCenter(searchCenter.toJSON());

                    const newMarkers = results.map(result => {
                        const location = result.geometry?.location;
                        return location ? {
                            lat: location.lat(),
                            lng: location.lng(),
                            title: result.name || 'Unknown'
                        } : null;
                    }).filter(marker => marker !== null) as MarkerData[];

                    setMarkers(newMarkers);
                }
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

export default MapComponent;
