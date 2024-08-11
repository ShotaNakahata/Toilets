// src/features/map/MarkerManager.tsx
import React, { useEffect } from 'react';
import { useMapState } from '../../context/MapStateContext';
import { Toilet } from '../../interfaces/Toilet_Interfaces';  // ここから正しくインポート

const MarkerManager: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
    const { toilets } = useMapState();

    useEffect(() => {
        if (map) {
            toilets.forEach((toilet: Toilet) => {  // 型を明示的に指定
                const marker = new google.maps.Marker({
                    map,
                    position: { lat: toilet.lat, lng: toilet.lng },
                    title: toilet.name,
                });
            });
        }
    },[map, toilets]);

    return null;
};

export default MarkerManager;
