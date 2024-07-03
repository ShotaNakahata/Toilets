import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function FilterSearchToile() {
    const [toiletList, setToiletList] = useState([]); // フィルタリングされたトイレのリストを管理する変数
    const [originalToiletList, setOriginalToiletList] = useState([]); // 元のトイレのリストを保持する変数
    const [showModal, setShowModal] = useState(false);
    const [isTopRated, setIsTopRated] = useState(false);
    const [showUniversal, setShowUniversal] = useState(false);
    const [loading, setLoading] = useState(true); // ローディング中かどうかを管理する変数
    const ref = useRef(null);

    // ページが表示されたときにデータを読み込む
    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/toilets');
                setToiletList(response.data);
                setOriginalToiletList(response.data); // 元のデータをセット
                setLoading(false);
            } catch (error) {
                console.error('Error fetching toilets:', error);
                setLoading(false);
            }
        };

        // ローディング中の表示を開始
        setLoading(true);
        fetchToilets();
    }, []);

    const handleSearch = () => {
        const searchValue = ref.current.value.toLowerCase();
        applyFilters(searchValue, isTopRated, showUniversal);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const applyFilters = (searchTerm, topRated, universalOnly) => {
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
                {loading ? (
                    <p>Loading...</p> // ローディング中に表示する
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
