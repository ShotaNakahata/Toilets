import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import LoginModal from "./LoginModal";
import useAuth from "../../hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast"; 

interface FavoriteButtonProps {
    toiletId: string;
    className?: string;  // className プロパティを追加
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ toiletId, className }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { user, setUser } = useUser();
    const { showLoginModal, setShowLoginModal, handleLogin, handleCreateAccount } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        if (user && user.favorites) {
            const isFavorited = user.favorites.includes(toiletId);
            setIsFavorite(isFavorited);
        } else {
            setIsFavorite(false); 
        }
    }, [user, user?.favorites, toiletId]);

    const handleFavoriteToggle = async () => {
        if (user && user.favorites) {
            try {
                if (isFavorite) {
                    await axios.post('http://localhost:4000/api/favorites/remove', { toiletId }, { withCredentials: true });
                    setIsFavorite(false);
                    toast({ title: "Removed from favorites" });

                    setUser(prevUser => {
                        if (prevUser) {
                            const updatedUser = {
                                ...prevUser,
                                favorites: prevUser.favorites.filter(id => id !== toiletId)
                            };
                            return updatedUser;
                        }
                        return prevUser;
                    });

                } else {
                    await axios.post('http://localhost:4000/api/favorites/add', { toiletId }, { withCredentials: true });
                    setIsFavorite(true);
                    toast({ title: "Added to favorites" });

                    setUser(prevUser => {
                        if (prevUser) {
                            const updatedFavorites = [...prevUser.favorites, toiletId];
                            const updatedUser = { ...prevUser, favorites: updatedFavorites };
                            return updatedUser;
                        }
                        return prevUser;
                    });

                }
            } catch (error) {
                console.error('Error toggling favorite status', error);
                toast({ title: 'Failed to toggle favorite status', variant: 'destructive' });
            }
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <>
            <button 
                onClick={handleFavoriteToggle}
                className={`px-4 py-2 bg-background text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 ${className}`}
            >
                {isFavorite ? "Remove from Favorite" : "Add to Favorites"}
            </button>
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
            <Toaster />
        </>
    );
};

export default FavoriteButton;
