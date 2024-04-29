{/*
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
*/
}

import toiletsData from '../data/toiletsData';
import UserLocation from './UserLocation';
import { useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const apiKey = 'AIzaSyC7RC-zjoKH6t747hf6PKsgt779F5LpXlY'; // あなたのGoogle APIキー。セキュリティのため公開しないように注意
const defaultCenter = { lat: 34.705493, lng: 135.490685 }; // 初期表示する地図の中心地、大阪梅田

const MapComponent = () => {
    const [map, setMap] = useState(null); // 地図オブジェクトの状態
    const [center, setCenter] = useState(defaultCenter); // 地図の中心の状態
    const [markers, setMarkers] = useState([]); // マップ上のマーカーの状態
    const searchRef = useRef(null); // 検索入力を参照するためのref
    const libraries = ['places']; // Google Maps JavaScript APIのPlacesライブラリを使用
    

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
        const query = searchRef.current.value; // 検索ボックスからの入力値を取得
        if (!query) return; // クエリが空なら何もしない
    
        const service = new window.google.maps.places.PlacesService(map);
        service.textSearch({ query, location: center, radius: 5000 }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const searchCenter = results[0].geometry.location;
                setCenter(searchCenter); // 検索結果の最初の場所に地図の中心を移動
    
                const newMarkers = results.map(result => ({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                    title: result.name
                }));
    
                // ローカルデータから範囲内のデータをフィルタリング
                const radius = 5000; // 検索範囲（メートル）
                const filteredData = toiletsData.filter(toilet => {
                    const toiletPos = new google.maps.LatLng(toilet.lat, toilet.lng);
                    return google.maps.geometry.spherical.computeDistanceBetween(searchCenter, toiletPos) <= radius;
                });
    
                // ローカルデータのマーカーを追加
                filteredData.forEach(toilet => {
                    newMarkers.push({
                        lat: toilet.lat,
                        lng: toilet.lng,
                        title: toilet.name
                    });
                });
    
                setMarkers(newMarkers); // 新しいマーカーを設定
            }
        });
    };
    

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }} // 地図のスタイル
                center={center} // 地図の中心
                zoom={15} // 地図のズームレベル
                onLoad={setMap} // 地図がロードされた時にmap状態を設定
            >
                {markers.map((marker, index) => ( // マップ上にマーカーを配置
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