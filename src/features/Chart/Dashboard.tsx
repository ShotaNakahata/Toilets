import React, { useEffect, useState } from "react";
import axios from "axios";

interface DashboardProps {
    countType: "user" | "toilet" | "universalToilet";
}

const Dashboard: React.FC<DashboardProps> = ({ countType }) => {
    const [count, setCount] = useState(0);

    // 環境変数からAPIのURLを取得
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCount = async () => {
            try {
                let endpoint = "";
                if (countType === "user") {
                    endpoint = `${apiUrl}/dashboard/user-count`;
                } else if (countType === "toilet") {
                    endpoint = `${apiUrl}/dashboard/toilet-count`;
                } else if (countType === "universalToilet") {
                    endpoint = `${apiUrl}/dashboard/universal-toilet-count`;
                }
                const response = await axios.get(endpoint);
                setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching count', error);
            }
        };
        fetchCount();
    }, [countType, apiUrl]);

    return (
        <div className="text-3xl font-bold text-center">
            {count}
        </div>
    );
};

export default Dashboard;
