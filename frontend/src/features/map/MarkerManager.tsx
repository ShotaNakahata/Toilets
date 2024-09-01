// frontend/src/features/map/MarkerManager.tsx
import React, { useEffect, useState } from 'react';
import { useMapState } from '../../context/MapStateContext';
import { IToilet } from '../../interfaces/Toilet_Interfaces';
import ToiletInfoModal from '../../components/common/Modals/ToiletInfoModal';

const MarkerManager: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
    const { toilets } = useMapState();
    const [selectedToilet, setSelectedToilet] = useState<IToilet | null>(null);

    useEffect(() => {
        if (map) {
            (toilets as unknown as IToilet[]).forEach((toilet: IToilet) => { // 型キャストを適用
                const marker = new google.maps.Marker({
                    map,
                    position: { lat: toilet.lat, lng: toilet.lng },
                    title: toilet.name,
                });

                marker.addListener('click', () => {
                    setSelectedToilet(toilet);
                });
            });
        }
    }, [map, toilets]);

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

// import React, { useEffect, useState } from 'react';
// import { useMapState } from '../../context/MapStateContext';
// import { IToilet } from '../../interfaces/Toilet_Interfaces';
// import ToiletInfoModal from '../../components/common/Modals/ToiletInfoModal';
// import { MarkerClustererF } from '@react-google-maps/api';

// const MarkerManager: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
//     const { toilets } = useMapState();
//     const [selectedToilet, setSelectedToilet] = useState<IToilet | null>(null);

//     useEffect(() => {
//         if (map) {
//             const markers = (toilets as unknown as IToilet[]).map((toilet: IToilet) => { // 型キャストを適用
//                 const marker = new google.maps.Marker({
//                     position: { lat: toilet.lat, lng: toilet.lng },
//                     title: toilet.name,
//                 });

//                 marker.addListener('click', () => {
//                     setSelectedToilet(toilet);
//                 });

//                 return marker;
//             });

//             // MarkerClustererFでマーカーをクラスター化
//             new MarkerClustererF({ map, markers });
//         }
//     }, [map, toilets]);

//     const handleCloseModal = () => {
//         setSelectedToilet(null);
//     };

//     return (
//         <>
//             {selectedToilet && (
//                 <ToiletInfoModal
//                     toilet={{
//                         id: selectedToilet._id!.toString(),
//                         name: selectedToilet.name,
//                         address: selectedToilet.address,
//                         averageRating: selectedToilet.averageRating,
//                         universal: selectedToilet.universal,
//                     }}
//                     onClose={handleCloseModal}
//                 />
//             )}
//         </>
//     );
// };

// export default MarkerManager;
