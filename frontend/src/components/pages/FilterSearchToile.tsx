// frontend/src/components/pages/FilterSearchToile.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteButton from "../common/FavoriteButton";

interface Toilet {
    _id: string;
    name: string;
    address: string;
    rating: number;
    comment: string;
    universal: boolean;
}

const FilterSearchToile: React.FC = () => {
    const [toiletList, setToiletList] = useState<Toilet[]>([]);
    const [originalToiletList, setOriginalToiletList] = useState<Toilet[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isTopRated, setIsTopRated] = useState<boolean>(false);
    const [showUniversal, setShowUniversal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const ref = useRef<HTMLInputElement>(null);

    const apiUrl = import.meta.env.VITE_API_URL;
    // const apiUrl = 'http://localhost:4000/api';

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get<Toilet[]>(`${apiUrl}/toilets`);
                setToiletList(response.data);
                setOriginalToiletList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching toilets:', error);
                setLoading(false);
            }
        };

        setLoading(true);
        fetchToilets();
    }, [apiUrl]);

    const handleSearch = () => {
        const searchValue = ref.current?.value.toLowerCase() || '';
        applyFilters(searchValue, isTopRated, showUniversal);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const applyFilters = (searchTerm: string, topRated: boolean, universalOnly: boolean) => {
        let filtered = originalToiletList.filter(toilet =>
            toilet.name.toLowerCase().includes(searchTerm) ||
            toilet.address.toLowerCase().includes(searchTerm)
        );

        if (topRated) {
            filtered = filtered.sort((a, b) => b.rating - a.rating).slice(0, 5);
        }

        if (universalOnly) {
            filtered = filtered.filter(toilet => toilet.universal);
        }

        setToiletList(filtered);
    };

    const toggleRatingFilter = () => {
        const newTopRated = !isTopRated;
        setIsTopRated(newTopRated);
        applyFilters(ref.current?.value || '', newTopRated, showUniversal);
    };

    const toggleUniversalFilter = () => {
        const newShowUniversal = !showUniversal;
        setShowUniversal(newShowUniversal);
        applyFilters(ref.current?.value || '', isTopRated, newShowUniversal);
    };

    return (
        <div className="bg-background min-h-screen pt-20">
        <div className="container-SearchToile  mx-auto p-6 ">
            <div className="SearchToile-wrapper bg-background p-6 rounded-lg shadow-md">
                <h1 className="text-6xl  font-bold text-white mb-5">Search Toilets</h1>
                <h2 className="text-2xl font-semibold text-white mb-4">Filter Search Mode</h2>
                <Link to="/" className="home-button text-white  bg-background hover:bg-white hover:text-background rounded-lg border-white border-2 py-2 px-4 transition-colors">Return to Home</Link>
                <button 
                    onClick={toggleModal} 
                    className="FilterOptions-button text-white  bg-background hover:bg-white hover:text-background rounded-lg border-white border-2 py-1 px-4  ml-4  transition-colors"
                >
                    Filter Options
                </button>
                {showModal && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="modal-content bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            <h4 className="text-xl font-semibold mb-4">Filter Options</h4>
                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={isTopRated}
                                    onChange={toggleRatingFilter}
                                    className="mr-2"
                                />
                                Top 5 By Rating
                            </label>
                            <label className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    checked={showUniversal}
                                    onChange={toggleUniversalFilter}
                                    className="mr-2"
                                />
                                Only Universal
                            </label>
                            <button 
                                onClick={toggleModal} 
                                className="text-white  bg-background hover:bg-white hover:text-background rounded-lg border-white hover:border-background border-2 py-2 px-4  transition-colors w-full"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                <input 
                    type="text" 
                    ref={ref} 
                    onChange={handleSearch} 
                    className="w-full mt-4 p-2 border border-gray-300 rounded"
                    placeholder="Search by name or address"
                />
                {loading ? (
                    <p className="text-center text-gray-500 mt-4">Loading...</p>
                ) : (
                    <div className='SearchToile-shows grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6'>
                        {toiletList.map((toilet) => (
                            <div className="box bg-gray-50 p-6 rounded-lg shadow-md" key={toilet._id}>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{toilet.name}</h3>
                                <FavoriteButton toiletId={toilet._id}/>
                                <p className="text-gray-600 mt-4 mb-2">{toilet.address}</p>
                                <p className="text-gray-600 mb-2">Rating: {toilet.rating}</p>
                                <p className="text-gray-600 mb-2">{toilet.comment}</p>
                                <p className="text-gray-600 mb-4">Universal: {toilet.universal ? "Yes" : "No"}</p>
                                <Link 
                                    to={`/toilet/${toilet._id}`} 
                                    className="text-blue-600 hover:underline font-semibold"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default FilterSearchToile;

