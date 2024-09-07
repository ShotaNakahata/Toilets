// // frontend/src/features/Chart/Dashboard.tsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface DashboardProps {
//     countType: "user" | "toilet" | "universalToilet";
// }

// const Dashboard: React.FC<DashboardProps> = ({ countType }) => {
//     const [count, setCount] = useState(0);

//     // 環境変数からAPIのURLを取得
//     const apiUrl = import.meta.env.VITE_API_URL;
//     // const apiUrl = 'http://localhost:4000/api';
    
//     useEffect(() => {
//         const fetchCount = async () => {
//             try {
//                 let endpoint = "";
//                 if (countType === "user") {
//                     endpoint = `${apiUrl}/dashboard/user-count`;
//                 } else if (countType === "toilet") {
//                     endpoint = `${apiUrl}/dashboard/toilet-count`;
//                 } else if (countType === "universalToilet") {
//                     endpoint = `${apiUrl}/dashboard/universal-toilet-count`;
//                 }
//                 const response = await axios.get(endpoint);
//                 setCount(response.data.count);
//             } catch (error) {
//                 console.error('Error fetching count', error);
//             }
//         };
//         fetchCount();
//     }, [countType, apiUrl]);

//     return (
//         <div className="text-3xl font-bold text-center">
//             {count}
//         </div>
//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";

interface DashboardProps {
    countType: "user" | "toilet" | "universalToilet";
}

const Dashboard: React.FC<DashboardProps> = ({ countType }) => {
    const [count, setCount] = useState(0);

    // APIのURLを取得
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
        <div className="flex flex-col items-center justify-center h-full ">
            <span className="text-lg md:text-xl text-center">Total {countType === "user" ? "Users" : countType === "toilet" ? "Toilets" : "Accessible Toilets"}</span>
            <div className="text-2xl md:text-5xl lg:text-4xl font-bold text-center">
                {count}
            </div>
        </div>
    );
};

export default Dashboard;
