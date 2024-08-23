import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = (): string => {
    const [username, setUsername] = useState<string>("Guest");

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`${apiUrl}/current-user`);
                if (response.data && response.data.username) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsername("Guest");
            }
        }

        fetchUser();
    }, [apiUrl]);

    return username;
}

export default useUser;

