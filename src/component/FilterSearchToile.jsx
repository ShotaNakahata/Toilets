import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import toiletsData from '../data/toiletsData';

function FilterSearchToile() {
    const [toiletList, setToiletList] = useState(toiletsData);
    const [showModal, setShowModal] = useState(false);
    const [isTopRated, setIsTopRated] = useState(false);
    const [showUniversal, setShowUniversal] = useState(false);
    const ref = useRef(null);

    const handleSearch = () => {
        const searchValue = ref.current.value.toLowerCase();
        applyFilters(searchValue, isTopRated, showUniversal);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const applyFilters = (searchTerm, topRated, universalOnly) => {
        let filtered = toiletsData.filter(toilet =>
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
        applyFilters(ref.current.value, newTopRated, showUniversal);
    };

    const toggleUniversalFilter = () => {
        const newShowUniversal = !showUniversal;
        setShowUniversal(newShowUniversal);
        applyFilters(ref.current.value, isTopRated, newShowUniversal);
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
                <div className='SearchToile-shows'>
                    {toiletList.map((toilet) => (
                        <div className="box" key={toilet.id}>
                            <h3>{toilet.name}</h3>
                            <p>{toilet.address}</p>
                            <p>Rating: {toilet.rating}</p>
                            <p>{toilet.comment}</p>
                            <p>Universal: {toilet.universal ? "Yes" : "No"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilterSearchToile;
