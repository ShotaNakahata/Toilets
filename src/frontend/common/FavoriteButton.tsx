import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import LoginModal from "./LoginModal";
import useAuth from "../hooks/useAuth";

interface FavoriteButtonProps {
    toiletId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ toiletId }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { user, setUser } = useUser();
    const { showLoginModal, setShowLoginModal, handleLogin, handleCreateAccount } = useAuth();

    useEffect(() => {
        if (user && user.favorites) {
            const isFavorited = user.favorites.includes(toiletId);
            setIsFavorite(isFavorited);
            console.log('User favorites:', user.favorites);
            console.log('Toilet ID:', toiletId);
            console.log("isFavorite: ", isFavorite);
        } else {
            console.log('No user or no favorites available');
            setIsFavorite(false); 
        }
    }, [user, user?.favorites, toiletId]);
    
    

    const handleFavoriteToggle = async () => {
        if (user && user.favorites) {
            try {
                if (isFavorite) {
                    console.log('/api/favorites/removeを送信中');
                    await axios.post('http://localhost:4000/api/favorites/remove', { toiletId }, { withCredentials: true });
                    setIsFavorite(false);
                    alert("Removed from favorites");

                    // User情報を更新**
                    setUser(prevUser => {
                        if (prevUser) {
                            const updatedUser = {
                                ...prevUser,
                                favorites: prevUser.favorites.filter(id => id !== toiletId)
                            };
                            console.log('Updated user after removing favorite:', updatedUser); // デバッグ用ログ
                            return updatedUser;
                        }
                        return prevUser;
                    });

                } else {
                    console.log('/api/favorites/addを送信中');
                    await axios.post('http://localhost:4000/api/favorites/add', { toiletId }, { withCredentials: true });
                    setIsFavorite(true);
                    alert("Added to favorites");

                    // User情報を更新**
                    setUser(prevUser => {
                        if (prevUser) {
                            const updatedFavorites = [...prevUser.favorites, toiletId];
                            const updatedUser = { ...prevUser, favorites: updatedFavorites };
                            console.log('Updated user after adding favorite:', updatedUser); // デバッグ用ログ
                            return updatedUser;
                        }
                        return prevUser;
                    });

                }
            } catch (error) {
                console.error('Error toggling favorite status', error);
                alert('Failed to toggle favorite status');
            }
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <>
            <button onClick={handleFavoriteToggle}>
                {isFavorite ? "Remove from Favorite" : "Add to Favorites"}
            </button>
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
        </>
    );
};

export default FavoriteButton;

