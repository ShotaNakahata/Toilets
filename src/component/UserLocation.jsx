//vite-project/src/component/UserLocation.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes をインポート
import { useLoadScript, Marker } from '@react-google-maps/api';

const UserLocation = ({ map, onLocationFound }) => {
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    onLocationFound(userLocation);
                    new window.google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: 'Your Location',
                    });
                },
                (error) => {
                    console.error("Error: ", error);
                    // エラーメッセージの管理方法を検討してください
                }
            );
        } else {
            console.log("このブラウザでは位置情報サービスがサポートされていません。");
            // ユーザーへの通知方法を検討してください
        }
    }, [map, onLocationFound]);

    return null; 
};

UserLocation.propTypes = {
    map: PropTypes.object.isRequired, // map は必須のオブジェクト型であることを宣言
    onLocationFound: PropTypes.func.isRequired, // onLocationFound も必須の関数型であることを宣言
};

export default UserLocation;

