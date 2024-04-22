// テスト用のため随時書いて使う

import React, { useEffect, useState } from 'react';

const UserLocation = ({ map }) => {
    // ユーザーの位置情報を保存する状態
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    // 状態を更新してユーザーの位置情報を保存
                    setUserLocation(location);

                    new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: 'Your Location',
                    });
                },
                (error) => {
                    console.error("Error: ", error);
                }
            );
        }
    }, [map]);

    // 状態に保存されたユーザーの位置情報を外部から参照できるようにする（後述）
    return userLocation; 
};
