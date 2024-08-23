import { useState, useEffect } from 'react';
import { IToilet } from '../models/Toilet';
import axios from 'axios';

interface Comment {
    user: string;
    comment: string;
    rating: number;
}

const useFetchToiletDetails = (id: string) => {
    const [toilet, setToilet] = useState<IToilet | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchToiletDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/toilets/${id}`);
                setToilet(response.data.toilet);
                setComments(response.data.comments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching toilet details:', error);
                setLoading(false);
            }
        };

        fetchToiletDetails();
    }, [id, apiUrl]);

    return { toilet, comments, loading, setComments, setToilet };
}

export default useFetchToiletDetails;

