import { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
    user: string;
    comment: string;
    rating: number;
}

interface Toilet {
    name: string;
    rating: number;
    averageRating: number;
    universal: boolean;
    address: string;
    totalRatingsCount: number;
    totalRatingScore: number;
}

const useFetchToiletDetails = (id: string) => {
    const [toilet, setToilet] = useState<Toilet | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return { toilet, comments, loading, setComments, setToilet };
}

export default useFetchToiletDetails;
