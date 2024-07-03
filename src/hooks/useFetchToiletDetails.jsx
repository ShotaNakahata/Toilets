// src/hooks/useFetchToiletDetails.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchToiletDetails = (id) => {
    const [toilet, setToilet] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToiletDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/toilets/${id}`);
                setToilet(response.data.toilet);
                setComments(response.data.comments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching toilet details:', error);
                setLoading(false);
            }
        };

        fetchToiletDetails();
    }, [id]);

    return { toilet, comments, loading, setComments, setToilet }; // 変更点
}

export default useFetchToiletDetails;
