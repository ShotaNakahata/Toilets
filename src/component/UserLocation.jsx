import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // PropTypes をインポート
import { useLoadScript, Marker } from '@react-google-maps/api';

const UserLocation = ({ map }) => {
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    new window.google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: 'Your Location',
                    });
                },
                (error) => { // エラーコールバック関数
                    console.error("Error: ", error);
                    alert("位置情報の取得に失敗しました。ブラウザの設定を確認してください。");
                }
            );
        } else {
            alert("このブラウザでは位置情報サービスがサポートされていません。");
        }
    }, [map]);

    return null; 
};


UserLocation.propTypes = {
    map: PropTypes.object // map はオブジェクト型であることを宣言
};

export default UserLocation;
