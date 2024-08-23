// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Dashboard from "../../features/Chart/Dashboard";
import CountryToiletChart from "../common/CountryToiletChart";
import RatingPieChart from '../../features/Chart/RatingPieChart';
import CountryRatingPieChart from '../../features/Chart/CountryRatingPieChart';
import axios from "axios";


interface RatingSummaryData {
    _id: number;
    count: number;
}

const DashboardPage: React.FC = () => {
    const [ratingData, setRatingData] = useState<RatingSummaryData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/toilets/ratings-summary");
                setRatingData(response.data);
            } catch (error) {
                console.error("Error fetching ratings summary", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div id="dashboard" className="flex flex-col min-h-screen max-h-screen relative">
            <div className='container text-white mt-10 '>
                <h1 className="text-6xl font-bold mb-6 text-center">Dashboard</h1>

                {/* 上段: 全体の統計情報カード */}
                <div className="flex flex-wrap gap-4 border-2 border-white justify-center items-center shadow-white h-1/6">
                    <Card className="w-full max-w-xs flex-grow h-full">
                        <CardHeader>
                            <CardTitle className="text-lg">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full flex justify-center items-center">
                            <Dashboard countType="user" />
                        </CardContent>
                    </Card>
                    <Card className="w-full max-w-xs flex-grow h-full">
                        <CardHeader>
                            <CardTitle className="text-lg">Total Toilets</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full flex justify-center items-center">
                            <Dashboard countType="toilet" />
                        </CardContent>
                    </Card>
                    <Card className="w-full max-w-xs flex-grow h-full">
                        <CardHeader>
                            <CardTitle className="text-lg">Accessible Toilets</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full flex justify-center items-center">
                            <Dashboard countType="universalToilet" />
                        </CardContent>
                    </Card>
                </div>

                {/* メインコンテナ: 国別トイレ情報と評価の円グラフ */}
                <div className="flex gap-4 mt-5 max-h-full relative">
                    <div className='flex flex-col'>

                    {/* Country-wise Toilet Summary コンテナ */}
                    <div className=" w-full border-2 border-white p-4 h-full buttom">
                        <h2 className="text-2xl font-bold  text-center">Country-wise Toilet Summary</h2>
                        <div className="h-full flex items-center justify-center">
                            <CountryToiletChart />
                        </div>
                    </div>
                    <div className=' border-2 border-white h-full '></div>
                    </div>

                    {/* 4つの PieChart を囲むコンテナ */}
                    {/*w-1/2 grid grid-cols-2 */}
                    <div className="grid grid-cols-2  gap-4 w-full">
                        <div className='border-2 border-white flex justify-center items-center '>
                            <RatingPieChart data={ratingData} />
                        </div>
                        <div className='border-2 border-white flex justify-center items-center '>
                            <CountryRatingPieChart country="Japan" />
                        </div>
                        <div className='border-2 border-white flex justify-center items-center'>
                            <CountryRatingPieChart country="Taiwan" />
                        </div>
                        <div className='border-2 border-white flex justify-center items-center '>
                            <CountryRatingPieChart country="United States" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex-grow">
                    {/* 他のコンテンツ */}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;



