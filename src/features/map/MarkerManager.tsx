import React, { useEffect, useState } from 'react';
import { useMapState } from '../../context/MapStateContext';
import { IToilet } from '../../models/Toilet';
import ToiletInfoModal from '../../components/common/Modals/ToiletInfoModal';

const MarkerManager: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
    const { toilets } = useMapState();
    const [selectedToilet, setSelectedToilet] = useState<IToilet | null>(null);

    useEffect(() => {
        if (map) {
            (toilets as IToilet[]).forEach((toilet: IToilet) => { // 型キャストを適用
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



