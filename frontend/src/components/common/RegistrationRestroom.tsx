import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useUser } from '../../context/UserContext';
import AlertModal from './Modals/NotificationModal';
import { toast } from "../ui/use-toast";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface RegistrationRestroomProps {
    onNewToilet: (toilet: any) => void;
}

const RegistrationRestroom: React.FC<RegistrationRestroomProps> = ({ onNewToilet }) => {
    const { user, setUser } = useUser();
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [rating, setRating] = useState<number>(1);
    const [universal, setUniversal] = useState<boolean>(false);
    const [initialComment, setInitialComment] = useState<string>('');
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalTitle, setModalTitle] = useState<string>("");

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            setShowLoginModal(true);
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/toilets/register`, {
                name,
                address,
                rating,
                universal,
                initialComment
            }, { withCredentials: true });
            const newToilet = response.data;

            toast({
                title: "Success",
                description: "Toilet registered successfully!",
                variant: "default",
            });

            onNewToilet(newToilet);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'Invalid address') {
                    setModalTitle('Address Error');
                    setModalMessage('The address you provided is invalid.');
                } else if (error.response.data.message === 'This location is already registered') {
                    setModalTitle('Registration Error');
                    setModalMessage('This toilet is already registered.');
                }
                setModalOpen(true);
            } else {
                toast({
                    title: "Error",
                    description: "Failed to register toilet",
                    variant: "destructive",
                });
                console.error('Error registering toilet:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${apiUrl}/login`, { email, password }, { withCredentials: true });
            if (response.data && response.status === 200) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleCreateAccount = async (username: string, email: string, password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/create-account`, { username, email, password });
            if (response.data && response.status === 201) {
                setUser({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    favorites: response.data.favorites
                });
            }
        } catch (error) {
            console.error('Create account failed:', error);
        }
    };

    return (
        <div className="sm:p-12 p-6 mt-5 bg-background border border-white rounded-lg max-w-1xl mx-auto">  {/* ボーダーと丸みを追加 */}
            <div className="text-center text-3xl font-bold mb-3 sm:mb-8 text-white">
                Register New Restroom
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
                <div>
                    <label className="block text-lg font-medium text-white">Toilet Name:</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="text-lg text-white"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-white">Address:</label>
                    <Input
                        type="text "
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="text-lg text-white"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium text-white">Rating:</label>
                    <StarRating rating={rating} setRating={setRating} />
                </div>
                <div className="flex items-center ">
                    <input
                        type="checkbox"
                        checked={universal}
                        onChange={(e) => setUniversal(e.target.checked)}
                        className="mr-2"
                    />
                    <label className="text-lg font-medium text-white">Universal</label>
                </div>
                <div>
                    <label className="block text-lg font-medium text-white">Initial Comment:</label>
                    <Textarea
                        value={initialComment}
                        onChange={(e) => setInitialComment(e.target.value)}
                        className="text-lg text-white"
                    />
                </div>
                <Button type="submit" className="text-lg p-3 text-white border-2 border-white hover:bg-white hover:text-gray-800">
                    Register Toilet
                </Button>
                
            </form>
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                onCreateAccount={handleCreateAccount}
            />
            <AlertModal
                open={isModalOpen}
                onClose={handleCloseModal}
                title={modalTitle}
                message={modalMessage}
            />
        </div>
    );
};

export default RegistrationRestroom;



