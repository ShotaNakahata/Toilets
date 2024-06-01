// component/useUser.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useUser() {
    const [username, setUsername] = useState("Guest");

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get('/api/current-user');
                if (response.data && response.data.username) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsername("Guest");
            }
        }

        fetchUser();
    }, []);

    return username;
}

export default useUser;
