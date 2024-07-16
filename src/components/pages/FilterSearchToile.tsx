import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get<Toilet[]>('http://localhost:4000/api/toilets');
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
    }, []);

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
        <div className="container-SearchToile">
            <div className="SearchToile-wrapper">
                <h1>SearchToile</h1>
                <h2>Filter Search Mode</h2>
                <Link to="/MapSearchToile" className="ChangeSearchMode-button">Map Search Mode</Link>
                <Link to="/" className="home-button">Return to Home</Link>
                <button onClick={toggleModal}>Filter Options</button>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h4>Filter Options</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isTopRated}
                                    onChange={toggleRatingFilter}
                                />
                                Top 5 By Rating
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showUniversal}
                                    onChange={toggleUniversalFilter}
                                />
                                Only Universal
                            </label>
                            <button onClick={toggleModal}>Close</button>
                        </div>
                    </div>
                )}
                <input type="text" ref={ref} onChange={handleSearch} />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='SearchToile-shows'>
                        {toiletList.map((toilet) => (
                            <div className="box" key={toilet._id}>
                                <h3>{toilet.name}</h3>
                                <p>{toilet.address}</p>
                                <p>Rating: {toilet.rating}</p>
                                <p>{toilet.comment}</p>
                                <p>Universal: {toilet.universal ? "Yes" : "No"}</p>
                                <Link to={`/toilet/${toilet._id}`}>View Details</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilterSearchToile;
