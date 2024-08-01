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
    const { user, setUser } = useUser();
    const [favorites, setFavorites] = useState<Toilet[]>(initialFavorites || []);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavoritesDetails = async () => {
            if (user && user.favorites && user.favorites.length > 0) {
                try {
                    const response = await axios.post("http://localhost:4000/api/toilets/details", { ids: user.favorites }, { withCredentials: true });
                    console.log('Fetched toilet details:', response.data); // レスポンスデータのログ出力
                    setFavorites(response.data); // response.dataがToilet[]型のデータであることを想定
                } catch (error) {
                    console.error('Error fetching favorite details:', error);
                    setError('Failed to fetch favorite details. Please try again later.');
                }
            } else {
                console.log('No favorites to fetch.');
                setFavorites([]);
            }
        };
        fetchFavoritesDetails();
    }, [user]);
    
    
    

    return (
        <div>
            <h2>My Favorites</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {favorites.length > 0 ? (
                    favorites.map(toilet => (
                        <li key={toilet._id}>
                            <p><strong>Name:</strong> {toilet.name}</p>
                            <p><strong>Address:</strong> {toilet.address}</p>
                            <p><strong>Average Rating:</strong> {toilet.averageRating}</p>
                            <p><strong>Comment:</strong> {toilet.comment}</p>
                            <p><strong>Universal:</strong> {toilet.universal ? 'Yes' : 'No'}</p>
                            <Link to={`/toilet/${toilet._id}`}>View Details</Link>
                        </li>
                    ))
                ) : (
                    <p>No favorites found.</p>
                )}
            </ul>
        </div>
    );
};

export default MyFavoritesComponent;
