import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { Link } from 'react-router-dom';

interface Toilet {
    _id: string;
    name: string;
    address: string;
    averageRating: number;
    comment: string;
    universal: boolean;
}

interface MyFavoritesComponentProps {
    favorites?: Toilet[];
}

const MyFavoritesComponent: React.FC<MyFavoritesComponentProps> = ({ favorites: initialFavorites }) => {
    const { user } = useUser();
    const [favorites, setFavorites] = useState<Toilet[]>(initialFavorites || []);
    const [error, setError] = useState<string | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchFavoritesDetails = async () => {
            if (user && user.favorites && user.favorites.length > 0) {
                try {
                    const response = await axios.post(`${apiUrl}/toilets/details`, { ids: user.favorites }, { withCredentials: true });
                    setFavorites(response.data);
                } catch (error) {
                    console.error('Error fetching favorite details:', error);
                    setError('Failed to fetch favorite details. Please try again later.');
                }
            } else {
                setFavorites([]);
            }
        };
        fetchFavoritesDetails();
    }, [user, apiUrl]);

    return (
        <div className="bg-background min-h-screen pt-4">
            <div className="container mx-auto p-6 sm:px-4 sm:py-2 sm:max-w-full sm:w-full">
                <div className="bg-background  sm:p-2 rounded-lg shadow-md sm:w-full">
                    <h2 className="text-3xl font-bold text-white mb-5">My Favorites</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.length > 0 ? (
                            favorites.map(toilet => (
                                <li key={toilet._id} className="bg-gray-50 p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{toilet.name}</h3>
                                    <p className="text-gray-600 mb-2"><strong>Address:</strong> {toilet.address}</p>
                                    <p className="text-gray-600 mb-2"><strong>Average Rating:</strong> {toilet.averageRating}</p>
                                    <p className="text-gray-600 mb-2"><strong>Comment:</strong> {toilet.comment}</p>
                                    <p className="text-gray-600 mb-4"><strong>Universal:</strong> {toilet.universal ? 'Yes' : 'No'}</p>
                                    <Link to={`/toilet/${toilet._id}`} className="text-blue-600 hover:underline font-semibold">
                                        View Details
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p className="text-lg text-gray-500">No favorites found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyFavoritesComponent;


