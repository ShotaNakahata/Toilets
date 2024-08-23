import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IToilet } from '../../../models/Toilet';
import FavoriteButton from '../../common/FavoriteButton';

interface ToiletInfoModalProps {
    toilet: {
        id: string;
        name: string;
        address: string;
        averageRating: number;
        universal: boolean;
    };
    onClose: () => void;
}

const ToiletInfoModal: React.FC<ToiletInfoModalProps> = ({ toilet, onClose }) => {
    const navigate = useNavigate();

    const handleDetailsClick = () => {
        navigate(`/toilet/${toilet.id}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{toilet.name}</h2>
                {/* Favorite Button をトイレ名の下に追加 */}
                <div className="mb-4">
                    <FavoriteButton toiletId={toilet.id} className="buttonsecondary" />
                </div>
                <p className="mb-2">Address: {toilet.address}</p>
                <p className="mb-2">Average Rating: {toilet.averageRating.toFixed(1)}</p>
                <p className="mb-4">Universal: {toilet.universal ? "Yes" : "No"}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-background border-white border-2 hover:bg-white hover:text-background text-white px-4 py-2 rounded"
                        onClick={handleDetailsClick}
                    >
                        View Details
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToiletInfoModal;

