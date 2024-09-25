import React, { useEffect, useState } from 'react';
import { useMapState } from '../../context/MapStateContext';
import { IToilet } from '../../interfaces/Toilet_Interfaces';
import ToiletInfoModal from '../../components/common/Modals/ToiletInfoModal';

const MarkerManager: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
    const { toilets, userLocation } = useMapState();  // 追加：ユーザーの位置情報を取得
    const [selectedToilet, setSelectedToilet] = useState<IToilet | null>(null);

    useEffect(() => {
        if (map) {
            // トイレのマーカーを追加
            (toilets as unknown as IToilet[]).forEach((toilet: IToilet) => {
                const icon = toilet.universal
                    ? {
                        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#040cfb" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                            </svg>
                        `)}`,
                        scaledSize: new google.maps.Size(40, 40), // サイズ調整
                    }
                    : undefined;

                const marker = new google.maps.Marker({
                    map,
                    position: { lat: toilet.lat, lng: toilet.lng },
                    title: toilet.name,
                    icon, // accessibleがtrueならカスタムアイコン
                });

                marker.addListener('click', () => {
                    setSelectedToilet(toilet);
                });
            });

            // ユーザーの位置にマーカーを追加
            // ユーザーの位置にマーカーを追加
            if (userLocation) {
                console.log('User location:', userLocation);  // デバッグ用ログ
                const userIcon = {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - 
                            https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#212121" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
        `)}`,
                    scaledSize: new google.maps.Size(40, 40),
                };

                const userMarker = new google.maps.Marker({
                    map,
                    position: userLocation,
                    title: "Your location",
                    icon: userIcon,  // ユーザーの位置にカスタムアイコンを使用
                });

                console.log('User marker added:', userMarker);  // デバッグ用ログ
            } else {
                console.log('No user location found.');  // デバッグ用ログ
            }

        }
    }, [map, toilets, userLocation]);  // `userLocation` を依存に追加

    const handleCloseModal = () => {
        setSelectedToilet(null);
    };

    return (
        <>
            {selectedToilet && (
                <ToiletInfoModal
                    toilet={{
                        id: selectedToilet._id!.toString(),
                        name: selectedToilet.name,
                        address: selectedToilet.address,
                        averageRating: selectedToilet.averageRating,
                        universal: selectedToilet.universal,
                    }}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MarkerManager;
